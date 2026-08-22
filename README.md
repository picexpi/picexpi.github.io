Project Charter: Picex Ecosystem

1. The Vision

Pice is set to be the first and most powerful Hybrid Trading Hub in the Pi Network ecosystem. Our goal is to provide a similar experience to advanced exchanges like Aster and Hyperliquid; that is, to provide blazing speed (Low Latency) along with decentralized security and transparency.

2. Core Model

Unlike conventional exchanges, Picex uses a “Hybrid Engine” architecture:

The Core: A matching engine based on the order book that performs in the Backend layer (Off-chain) at a speed of milliseconds to provide a user experience similar to that of different exchanges (Binance).

The Settlement Layer: The intelligent connection of the Pi Network for asset transfers and intelligent internal settlement (On-chain), covering the DEX.

3.  Main Products and Capabilities (Product Pillars)

a) Spot Market

Direct buying and selling of Pi currencies and other future assets in the ecosystem.

Using the Order Book model to accurately determine the price by supply and demand.

b) Derivatives/Futures Market (Perpetual Futures)

Possibility of contracting perpetual contracts (Perps) using leverage.

Automated risk management system (Liquidation Engine) to prevent system debt.

This will be the main factor in attracting, professionalizing and increasing the volume of the sector (Volume).

c) DEX sector (Liquidity and Exchange)

A lightweight and fast sector for direct exchange of assets (Swap) without the need to register an order in the order book.

These are users who are looking for reliable and safe.

4.  Competitive Advantage

Aster-like Speed: Due to the use of Off-chain Matching architecture, the user will not be affected by the slowness of the blockchain network at the moment of decision-making.

Unified User Experience (Unified UX): The user does not switch between Spot, Futures and Swap, but has all the professional tools in one environment.

Scalability: Our architecture allows us to scale the system as the number of users increases, just by upgrading the server infrastructure (Docker/Nginx/PostgreSQL), without the need to change smart contracts.

5. Technical Stack - High Level

Frontend: React + TypeScript + Vite (for a super fast and reactive user interface).

Backend: Node.js (Express) to manage business logic and APIs.

 Database: PostgreSQL (for accurate and ACID-compliant management of orders, inventory, and specification history).

Real-time data: Uses WebSocket to send real-time prices and order book changes to the user.

Infrastructure: Docker and Nginx for service management and high security.
