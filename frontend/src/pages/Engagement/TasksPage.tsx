// frontend/src/pages/Engagement/TasksPage.tsx
import React, { useState } from 'react';
import { useI18n } from '../../i18n/I18nContext';

interface Task {
  id: number;
  titleKey: string;
  fallbackTitle: string;
  descriptionKey: string;
  fallbackDescription: string;
  reward: string;
  icon: string;
  status: 'available' | 'soon' | 'completed';
}

const tasks: Task[] = [
  {
    id: 1,
    titleKey: 'taskConnectPiTitle',
    fallbackTitle: 'Connect with Pi',
    descriptionKey: 'taskConnectPiDescription',
    fallbackDescription:
      'Connect your Pi account to unlock picex governance, payments, wallet access, and future trading features.',
    reward: 'Access',
    icon: 'π',
    status: 'available',
  },
  {
    id: 2,
    titleKey: 'taskJoinGovernanceTitle',
    fallbackTitle: 'Vote in picex Governance',
    descriptionKey: 'taskJoinGovernanceDescription',
    fallbackDescription:
      'Participate in community polls and help prioritize spot trading, wallet operations, AI support, and futures readiness.',
    reward: '0.05 Pi',
    icon: '🗳️',
    status: 'available',
  },
  {
    id: 3,
    titleKey: 'taskLearnWalletTitle',
    fallbackTitle: 'Learn Wallet Safety',
    descriptionKey: 'taskLearnWalletDescription',
    fallbackDescription:
      'Read about deposit addresses, withdrawal queues, hot wallets, cold wallets, and reconciliation before using exchange wallet features.',
    reward: 'Knowledge',
    icon: '👛',
    status: 'available',
  },
  {
    id: 4,
    titleKey: 'taskExploreMarketsTitle',
    fallbackTitle: 'Explore picex Markets',
    descriptionKey: 'taskExploreMarketsDescription',
    fallbackDescription:
      'Preview the future spot market experience, native chart data, order book design, and trading modules.',
    reward: 'Market Preview',
    icon: '📈',
    status: 'soon',
  },
  {
    id: 5,
    titleKey: 'taskTryAiSupportTitle',
    fallbackTitle: 'Try AI Support',
    descriptionKey: 'taskTryAiSupportDescription',
    fallbackDescription:
      'Use the future AI support assistant for questions about Pi login, payments, deposits, withdrawals, KYC, and fees.',
    reward: '24/7 Help',
    icon: '🤖',
    status: 'soon',
  },
  {
    id: 6,
    titleKey: 'taskReadWhitepaperTitle',
    fallbackTitle: 'Read the picex Whitepaper',
    descriptionKey: 'taskReadWhitepaperDescription',
    fallbackDescription:
      'Understand the hybrid exchange architecture, internal ledger, Pi settlement layer, token assumptions, and roadmap.',
    reward: 'Research',
    icon: '📄',
    status: 'available',
  },
];

const EngagementTasksPage: React.FC = () => {
  const { t, lang } = useI18n();
  const [claimedTasks, setClaimedTasks] = useState<number[]>([]);

  const isRtl = lang === 'fa' || lang === 'ar';

  const tx = (key: string, fallback: string) => {
    const value = t(key);
    return value && value !== key ? value : fallback;
  };

  const handleClaim = (task: Task) => {
    if (task.status === 'soon') return;

    if (!claimedTasks.includes(task.id)) {
      setClaimedTasks((prev) => [...prev, task.id]);
    }
  };

  const completedCount = claimedTasks.length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <div
      style={{
        ...styles.page,
        direction: isRtl ? 'rtl' : 'ltr',
      }}
    >
      <main style={styles.container}>
        <section style={styles.header}>
          <div style={styles.kicker}>
            picex Engagement Center
          </div>

          <h1 style={styles.title}>
            {tx('tasksTitle', 'picex Community Tasks')}
          </h1>

          <p style={styles.subtitle}>
            {tx(
              'tasksSubtitle',
              'Complete educational and community tasks to learn how picex works: Pi login, governance, wallet safety, market data, AI support, and future trading modules.'
            )}
          </p>

          <div style={styles.progressCard}>
            <div>
              <strong style={styles.progressNumber}>
                {completedCount}/{tasks.length}
              </strong>

              <span style={styles.progressLabel}>
                {tx('tasksCompleted', 'tasks completed')}
              </span>
            </div>

            <div style={styles.progressTrack}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${progressPercent}%`,
                }}
              />
            </div>
          </div>
        </section>

        <section style={styles.grid}>
          {tasks.map((task) => {
            const isClaimed = claimedTasks.includes(task.id);
            const isSoon = task.status === 'soon';

            return (
              <article key={task.id} style={styles.taskCard}>
                <div style={styles.taskIcon}>
                  {task.icon}
                </div>

                <div style={styles.taskContent}>
                  <div style={styles.taskTopRow}>
                    <strong style={styles.taskTitle}>
                      {tx(task.titleKey, task.fallbackTitle)}
                    </strong>

                    <span
                      style={{
                        ...styles.statusBadge,
                        ...(isClaimed
                          ? styles.statusCompleted
                          : isSoon
                            ? styles.statusSoon
                            : styles.statusAvailable),
                      }}
                    >
                      {isClaimed
                        ? tx('completed', 'Completed')
                        : isSoon
                          ? tx('comingSoon', 'Coming soon')
                          : tx('available', 'Available')}
                    </span>
                  </div>

                  <p style={styles.taskDescription}>
                    {tx(task.descriptionKey, task.fallbackDescription)}
                  </p>

                  <div style={styles.taskFooter}>
                    <div style={styles.rewardBox}>
                      <span style={styles.rewardLabel}>
                        {tx('reward', 'Reward')}
                      </span>

                      <strong style={styles.rewardValue}>
                        {task.reward}
                      </strong>
                    </div>

                    <button
                      style={{
                        ...styles.actionButton,
                        ...(isClaimed ? styles.actionButtonCompleted : {}),
                        ...(isSoon ? styles.actionButtonDisabled : {}),
                      }}
                      onClick={() => handleClaim(task)}
                      disabled={isClaimed || isSoon}
                    >
                      {isClaimed
                        ? tx('claimed', 'Claimed')
                        : isSoon
                          ? tx('soon', 'Soon')
                          : tx('claim', 'Claim')}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    padding: '76px 20px',
    fontFamily: 'Tahoma, sans-serif',
    background:
      'radial-gradient(circle at top left, rgba(255,202,40,0.14), transparent 30%), radial-gradient(circle at bottom right, rgba(111,45,189,0.32), transparent 34%), linear-gradient(180deg, #0f0820 0%, #180d31 100%)',
    color: '#ffffff',
  },
  container: {
    width: 'min(1120px, 100%)',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '36px',
  },
  kicker: {
    display: 'inline-flex',
    marginBottom: '14px',
    padding: '8px 16px',
    borderRadius: '999px',
    background: 'rgba(255,202,40,0.12)',
    border: '1px solid rgba(255,202,40,0.28)',
    color: '#ffca28',
    fontSize: '12px',
    fontWeight: 900,
    textTransform: 'uppercase',
  },
  title: {
    margin: '0 0 12px',
    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
    lineHeight: 1.2,
    fontWeight: 950,
  },
  subtitle: {
    maxWidth: '760px',
    margin: '0 auto',
    color: '#d8cfee',
    fontSize: '15px',
    lineHeight: 1.9,
  },
  progressCard: {
    width: 'min(560px, 100%)',
    margin: '28px auto 0',
    padding: '18px',
    borderRadius: '20px',
    background:
      'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.045))',
    border: '1px solid rgba(255,255,255,0.13)',
    boxShadow: '0 20px 44px rgba(0,0,0,0.28)',
  },
  progressNumber: {
    display: 'block',
    color: '#ffca28',
    fontSize: '26px',
    fontWeight: 950,
  },
  progressLabel: {
    color: '#d8cfee',
    fontSize: '13px',
  },
  progressTrack: {
    width: '100%',
    height: '10px',
    borderRadius: '999px',
    overflow: 'hidden',
    marginTop: '14px',
    background: 'rgba(255,255,255,0.1)',
  },
  progressFill: {
    height: '100%',
    borderRadius: '999px',
    background: 'linear-gradient(90deg, #ffca28, #f4b942)',
    transition: 'width 0.3s ease',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  taskCard: {
    display: 'flex',
    gap: '16px',
    padding: '22px',
    border: '1px solid rgba(255,255,255,0.13)',
    borderRadius: '24px',
    background:
      'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.045))',
    boxShadow: '0 20px 44px rgba(0,0,0,0.26)',
    backdropFilter: 'blur(14px)',
  },
  taskIcon: {
    flex: '0 0 auto',
    width: '56px',
    height: '56px',
    borderRadius: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255,202,40,0.12)',
    border: '1px solid rgba(255,202,40,0.24)',
    fontSize: '26px',
  },
  taskContent: {
    flex: 1,
    minWidth: 0,
  },
  taskTopRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '10px',
    marginBottom: '10px',
  },
  taskTitle: {
    color: '#ffffff',
    fontSize: '16px',
    lineHeight: 1.5,
  },
  taskDescription: {
    margin: '0 0 16px',
    color: '#d8cfee',
    fontSize: '13px',
    lineHeight: 1.8,
  },
  taskFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
  },
  rewardBox: {
    display: 'grid',
    gap: '2px',
  },
  rewardLabel: {
    color: '#b9aed5',
    fontSize: '11px',
  },
  rewardValue: {
    color: '#ffca28',
    fontSize: '13px',
  },
  statusBadge: {
    flex: '0 0 auto',
    padding: '5px 10px',
    borderRadius: '999px',
    fontSize: '11px',
    fontWeight: 900,
    whiteSpace: 'nowrap',
  },
  statusAvailable: {
    background: 'rgba(34,197,94,0.12)',
    color: '#86efac',
    border: '1px solid rgba(34,197,94,0.22)',
  },
  statusSoon: {
    background: 'rgba(255,202,40,0.12)',
    color: '#ffca28',
    border: '1px solid rgba(255,202,40,0.24)',
  },
  statusCompleted: {
    background: 'rgba(59,130,246,0.12)',
    color: '#bfdbfe',
    border: '1px solid rgba(59,130,246,0.22)',
  },
  actionButton: {
    padding: '9px 15px',
    background: 'linear-gradient(135deg, #ffe7a3, #ffca28, #f4b942)',
    color: '#180d31',
    border: 'none',
    borderRadius: '999px',
    cursor: 'pointer',
    fontWeight: 950,
    fontSize: '12px',
  },
  actionButtonCompleted: {
    background: 'rgba(59,130,246,0.16)',
    color: '#bfdbfe',
    cursor: 'default',
  },
  actionButtonDisabled: {
    background: '#4b5563',
    color: '#d1d5db',
    cursor: 'not-allowed',
  },
};

export default EngagementTasksPage;
