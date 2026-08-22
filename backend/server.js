require('dotenv').config();

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();

const PORT = Number(process.env.PORT || 5000);
const NODE_ENV = process.env.NODE_ENV || 'development';
const PUBLIC_API_URL =
  process.env.PUBLIC_API_URL || `http://localhost:${PORT}`;

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const ALLOWED_ORIGINS = String(
  process.env.ALLOWED_ORIGINS ||
    `${FRONTEND_URL},http://localhost:5173,http://localhost:3000`
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || '7d';
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || null;
const PI_API_KEY = process.env.PI_API_KEY || null;
const PI_APP_ID = process.env.PI_APP_ID || null;
const DATABASE_URL = process.env.DATABASE_URL || null;

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error(
      'JWT_SECRET is not configured. Please add JWT_SECRET to backend environment variables and restart the server.'
    );
  }

  return secret;
}

if (!DATABASE_URL) {
  console.warn(
    'DATABASE_URL is not configured. Database routes may fail until DATABASE_URL is added.'
  );
}

const pool = DATABASE_URL
  ? new Pool({
      connectionString: DATABASE_URL,
      ssl:
        NODE_ENV === 'production'
          ? {
              rejectUnauthorized: false,
            }
          : false,
    })
  : null;

app.set('trust proxy', 1);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (ALLOWED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Admin-Secret',
      'x-admin-secret',
    ],
  })
);

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

function asyncHandler(fn) {
  return function wrappedAsyncHandler(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

function normalizeUser(row) {
  if (!row) {
    return null;
  }

  return {
    id: String(row.id || row.pi_user_id || row.piUserId),
    piUserId: String(row.pi_user_id || row.piUserId || row.id),
    username: row.username || 'Pi User',
    role: row.role || 'user',
    createdAt: row.created_at || row.createdAt || null,
  };
}

function signToken(user) {
  const payload = {
    id: String(user.id),
    piUserId: String(user.piUserId || user.id),
    username: user.username,
    role: user.role || 'user',
  };

  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: TOKEN_EXPIRATION,
  });
}

function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token is missing.',
      });
    }

    const decoded = jwt.verify(token, getJwtSecret());
    req.user = decoded;

    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token.',
    });
  }
}

function authenticateAdmin(req, res, next) {
  const providedSecret =
    req.headers['x-admin-secret'] ||
    req.headers['X-Admin-Secret'] ||
    req.body?.adminSecret ||
    req.query?.adminSecret;

  if (!ADMIN_SECRET_KEY) {
    return res.status(500).json({
      success: false,
      message: 'ADMIN_SECRET_KEY is not configured.',
    });
  }

  if (providedSecret !== ADMIN_SECRET_KEY) {
    return res.status(403).json({
      success: false,
      message: 'Invalid admin secret.',
    });
  }

  return next();
}

async function ensureDatabase() {
  if (!pool) {
    return;
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      pi_user_id TEXT UNIQUE NOT NULL,
      username TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      access_token TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS payments (
      id SERIAL PRIMARY KEY,
      payment_id TEXT UNIQUE,
      txid TEXT,
      pi_user_id TEXT,
      username TEXT,
      amount NUMERIC,
      memo TEXT,
      status TEXT NOT NULL DEFAULT 'created',
      raw_payload JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS polls (
      id SERIAL PRIMARY KEY,
      pi_user_id TEXT,
      username TEXT,
      option_key TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function verifyPiAccessToken(accessToken) {
  if (!accessToken) {
    return {
      verified: false,
      reason: 'No Pi access token provided.',
    };
  }

  if (!PI_API_KEY) {
    return {
      verified: false,
      reason: 'PI_API_KEY is not configured.',
    };
  }

  try {
    const response = await fetch('https://api.minepi.com/v2/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        verified: false,
        reason: data?.message || 'Pi token verification failed.',
        data,
      };
    }

    return {
      verified: true,
      data,
    };
  } catch (error) {
    return {
      verified: false,
      reason: error.message,
    };
  }
}

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'picex backend is running',
    service: 'picex Backend',
    environment: NODE_ENV,
    publicApiUrl: PUBLIC_API_URL,
    apiBase: '/api',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    service: 'picex Backend',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    service: 'picex Backend',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

app.post(
  '/api/auth/pi-login',
  asyncHandler(async (req, res) => {
    const piUserId =
      req.body.pi_user_id ||
      req.body.piUserId ||
      req.body.uid ||
      req.body.userId;

    const username = req.body.username || req.body.name || 'Pi User';
    const accessToken = req.body.accessToken || req.body.access_token || null;

    if (!piUserId) {
      return res.status(400).json({
        success: false,
        message: 'pi_user_id is required.',
      });
    }

    const piVerification = await verifyPiAccessToken(accessToken);

    if (accessToken && piVerification.verified && piVerification.data?.uid) {
      const verifiedUid = String(piVerification.data.uid);

      if (verifiedUid !== String(piUserId)) {
        return res.status(401).json({
          success: false,
          message: 'Pi access token does not match the provided user.',
        });
      }
    }

    let user;

    if (pool) {
      const result = await pool.query(
        `
        INSERT INTO users (pi_user_id, username, role, access_token, updated_at)
        VALUES ($1, $2, 'user', $3, NOW())
        ON CONFLICT (pi_user_id)
        DO UPDATE SET
          username = EXCLUDED.username,
          access_token = EXCLUDED.access_token,
          updated_at = NOW()
        RETURNING id, pi_user_id, username, role, created_at;
        `,
        [String(piUserId), String(username), accessToken]
      );

      user = normalizeUser(result.rows[0]);
    } else {
      user = {
        id: String(piUserId),
        piUserId: String(piUserId),
        username: String(username),
        role: 'user',
        createdAt: null,
      };
    }

    const token = signToken(user);

    return res.json({
      success: true,
      message: 'Login successful.',
      token,
      user,
      piVerification: {
        verified: piVerification.verified,
        reason: piVerification.reason || null,
      },
    });
  })
);

app.get('/api/auth/me', authenticateToken, asyncHandler(async (req, res) => {
  let user = {
    id: String(req.user.id),
    piUserId: String(req.user.piUserId || req.user.id),
    username: req.user.username || 'Pi User',
    role: req.user.role || 'user',
  };

  if (pool && user.piUserId) {
    const result = await pool.query(
      `
      SELECT id, pi_user_id, username, role, created_at
      FROM users
      WHERE pi_user_id = $1
      LIMIT 1;
      `,
      [user.piUserId]
    );

    if (result.rows[0]) {
      user = normalizeUser(result.rows[0]);
    }
  }

  return res.json({
    success: true,
    user,
  });
}));

app.post('/api/auth/logout', authenticateToken, (req, res) => {
  return res.json({
    success: true,
    message: 'Logout successful.',
  });
});

app.get('/api/poll', asyncHandler(async (req, res) => {
  const options = [
    {
      key: 'excellent',
      label: 'Excellent',
    },
    {
      key: 'good',
      label: 'Good',
    },
    {
      key: 'average',
      label: 'Average',
    },
    {
      key: 'needs_work',
      label: 'Needs work',
    },
  ];

  let results = options.map((option) => ({
    ...option,
    votes: 0,
  }));

  if (pool) {
    const dbResult = await pool.query(`
      SELECT option_key, COUNT(*)::int AS votes
      FROM polls
      GROUP BY option_key;
    `);

    const voteMap = new Map(
      dbResult.rows.map((row) => [row.option_key, Number(row.votes)])
    );

    results = options.map((option) => ({
      ...option,
      votes: voteMap.get(option.key) || 0,
    }));
  }

  return res.json({
    success: true,
    question: 'How do you rate your picex experience?',
    options: results,
  });
}));

app.post(
  '/api/poll/vote',
  authenticateToken,
  asyncHandler(async (req, res) => {
    const optionKey = req.body.optionKey || req.body.option_key;

    const allowedOptions = ['excellent', 'good', 'average', 'needs_work'];

    if (!allowedOptions.includes(optionKey)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid poll option.',
      });
    }

    if (pool) {
      await pool.query(
        `
        INSERT INTO polls (pi_user_id, username, option_key)
        VALUES ($1, $2, $3);
        `,
        [
          String(req.user.piUserId || req.user.id),
          req.user.username || 'Pi User',
          optionKey,
        ]
      );
    }

    return res.json({
      success: true,
      message: 'Vote submitted successfully.',
    });
  })
);

app.post(
  '/api/payments/create',
  authenticateToken,
  asyncHandler(async (req, res) => {
    const amount = req.body.amount || null;
    const memo = req.body.memo || 'picex payment';
    const paymentId = req.body.paymentId || req.body.payment_id || null;

    if (pool) {
      await pool.query(
        `
        INSERT INTO payments
          (payment_id, pi_user_id, username, amount, memo, status, raw_payload)
        VALUES
          ($1, $2, $3, $4, $5, 'created', $6)
        ON CONFLICT (payment_id)
        DO UPDATE SET
          amount = EXCLUDED.amount,
          memo = EXCLUDED.memo,
          raw_payload = EXCLUDED.raw_payload,
          updated_at = NOW();
        `,
        [
          paymentId,
          String(req.user.piUserId || req.user.id),
          req.user.username || 'Pi User',
          amount,
          memo,
          JSON.stringify(req.body || {}),
        ]
      );
    }

    return res.json({
      success: true,
      message: 'Payment created.',
      payment: {
        paymentId,
        amount,
        memo,
        status: 'created',
      },
    });
  })
);

app.post(
  '/api/payments/approve',
  authenticateToken,
  asyncHandler(async (req, res) => {
    const paymentId = req.body.paymentId || req.body.payment_id;

    if (!paymentId) {
      return res.status(400).json({
        success: false,
        message: 'paymentId is required.',
      });
    }

    if (pool) {
      await pool.query(
        `
        INSERT INTO payments
          (payment_id, pi_user_id, username, status, raw_payload)
        VALUES
          ($1, $2, $3, 'approved', $4)
        ON CONFLICT (payment_id)
        DO UPDATE SET
          status = 'approved',
          raw_payload = EXCLUDED.raw_payload,
          updated_at = NOW();
        `,
        [
          String(paymentId),
          String(req.user.piUserId || req.user.id),
          req.user.username || 'Pi User',
          JSON.stringify(req.body || {}),
        ]
      );
    }

    return res.json({
      success: true,
      message: 'Payment approved.',
      paymentId,
    });
  })
);

app.post(
  '/api/payments/complete',
  authenticateToken,
  asyncHandler(async (req, res) => {
    const paymentId = req.body.paymentId || req.body.payment_id;
    const txid = req.body.txid || req.body.transactionId || null;

    if (!paymentId) {
      return res.status(400).json({
        success: false,
        message: 'paymentId is required.',
      });
    }

    if (pool) {
      await pool.query(
        `
        INSERT INTO payments
          (payment_id, txid, pi_user_id, username, status, raw_payload)
        VALUES
          ($1, $2, $3, $4, 'completed', $5)
        ON CONFLICT (payment_id)
        DO UPDATE SET
          txid = EXCLUDED.txid,
          status = 'completed',
          raw_payload = EXCLUDED.raw_payload,
          updated_at = NOW();
        `,
        [
          String(paymentId),
          txid,
          String(req.user.piUserId || req.user.id),
          req.user.username || 'Pi User',
          JSON.stringify(req.body || {}),
        ]
      );
    }

    return res.json({
      success: true,
      message: 'Payment completed.',
      paymentId,
      txid,
    });
  })
);

app.post(
  '/api/payments/cancel',
  authenticateToken,
  asyncHandler(async (req, res) => {
    const paymentId = req.body.paymentId || req.body.payment_id;

    if (!paymentId) {
      return res.status(400).json({
        success: false,
        message: 'paymentId is required.',
      });
    }

    if (pool) {
      await pool.query(
        `
        UPDATE payments
        SET status = 'cancelled',
            raw_payload = $2,
            updated_at = NOW()
        WHERE payment_id = $1;
        `,
        [String(paymentId), JSON.stringify(req.body || {})]
      );
    }

    return res.json({
      success: true,
      message: 'Payment cancelled.',
      paymentId,
    });
  })
);

app.get(
  '/api/admin/users',
  authenticateAdmin,
  asyncHandler(async (req, res) => {
    if (!pool) {
      return res.json({
        success: true,
        users: [],
      });
    }

    const result = await pool.query(`
      SELECT id, pi_user_id, username, role, created_at, updated_at
      FROM users
      ORDER BY created_at DESC
      LIMIT 200;
    `);

    return res.json({
      success: true,
      users: result.rows.map(normalizeUser),
    });
  })
);

app.get(
  '/api/admin/payments',
  authenticateAdmin,
  asyncHandler(async (req, res) => {
    if (!pool) {
      return res.json({
        success: true,
        payments: [],
      });
    }

    const result = await pool.query(`
      SELECT id, payment_id, txid, pi_user_id, username, amount, memo, status, created_at, updated_at
      FROM payments
      ORDER BY created_at DESC
      LIMIT 200;
    `);

    return res.json({
      success: true,
      payments: result.rows,
    });
  })
);

app.use('/api', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API route not found.',
    path: req.originalUrl,
  });
});

app.use((error, req, res, next) => {
  console.error('picex backend error:', error);

  const statusCode = error.statusCode || error.status || 500;

  return res.status(statusCode).json({
    success: false,
    message:
      NODE_ENV === 'production'
        ? error.message || 'Internal server error.'
        : error.message || 'Internal server error.',
    stack: NODE_ENV === 'production' ? undefined : error.stack,
  });
});

async function startServer() {
  try {
    await ensureDatabase();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`picex backend running on port ${PORT}`);
      console.log(`Environment: ${NODE_ENV}`);
      console.log(`Public API URL: ${PUBLIC_API_URL}`);
      console.log(`Frontend URL: ${FRONTEND_URL}`);
      console.log(`Allowed origins: ${ALLOWED_ORIGINS.join(', ')}`);
      console.log(`Pi App ID: ${PI_APP_ID || 'not configured'}`);
      console.log(`JWT_SECRET configured: ${Boolean(process.env.JWT_SECRET)}`);
      console.log(`DATABASE_URL configured: ${Boolean(DATABASE_URL)}`);
    });
  } catch (error) {
    console.error('Failed to start picex backend:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = {
  app,
  startServer,
  pool,
};
