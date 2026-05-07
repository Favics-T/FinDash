CryptoLens — Crypto Market Intelligence Dashboard
 Overview
Findash is a modern crypto analytics and market intelligence dashboard built for investors, analysts, and fintech users who want to monitor cryptocurrency markets and make informed decisions through clear data visualization and actionable insights.
Unlike traditional trading apps, CryptoLens focuses on:


Market intelligence


Trend analysis


Decision-support insights


Real-time market monitoring


Asset comparison and tracking


The platform provides an interactive and scalable dashboard experience with advanced charts, market movers, watchlists, and comparative analytics.

Features
Dashboard Overview


Global crypto market overview


Market sentiment indicator


Fear & Greed index


Top gainers and losers


Interactive price charts


Market intelligence feed



 Markets Page


Real-time cryptocurrency market table


Search and filtering


Sort by:


Market cap


Volume


24h change


Trending assets




 Coin Detail Analytics


Interactive historical charts


7D / 30D / 1Y chart ranges


Coin statistics:


Market cap


Circulating supply


Trading volume


Price trends


 Watchlist System


Save favorite assets


Quick market monitoring


Persistent local storage support

 Asset Comparison


Compare cryptocurrencies side-by-side


Analyze:


Price performance


Market cap


Volume


Volatility trends





 Performance & UX Features


Debounced search


API caching strategy


Loading skeletons


Error handling states


Responsive layout


Dark fintech-inspired UI



 Tech Stack
Frontend


React.js


Vite
Tailwind CSS
State Management


Zustand
Charts & Visualization
Chart.js
react-chartjs-2
API


CoinGecko API



Design


Figma / Stitch AI



 Project Architecture
src/  components/    layout/    ui/    charts/  features/    dashboard/    markets/    coin/    watchlist/    compare/  hooks/    useCryptoData.js    useDebounce.js  services/    cryptoApi.js  store/    useCryptoStore.js  utils/

 Project Goals
This project was built to strengthen:


Advanced React architecture


Component decomposition


Reusable UI systems


API integration patterns


State management


Data-driven dashboard design


Frontend scalability practices



 Key Engineering Concepts
Reusable Component Design
The UI is built using modular reusable components such as:


Cards
Tables
Badges
Buttons
Charts
Loaders

Centralized API Layer
All API requests are abstracted into a dedicated service layer to improve:

scalability
maintainability
separation of concerns


State Management
Global state is managed with Zustand for:


selected assets


watchlist management


market data caching


loading/error handling



Data Visualization
Interactive charts are used to:


visualize trends


improve decision-making


track market movement



 Future Improvements


Real-time websocket updates


AI-generated market insights


Portfolio tracking


Advanced filtering system


Notification & alert system


Authentication


Multi-theme support



screenshots coming soon

 Installation
Clone the repository:
git clone https://github.com/Favics-T/FinDash
Navigate into the project:
cd findash
Install dependencies:
npm install
Start development server:
npm run dev

 API Reference
CoinGecko API
Used for:
Market data
Coin details
Historical charts
Trending assets


 Learning Outcomes
This project demonstrates:

Scalable frontend architecture
Advanced dashboard UI composition
Fintech-style product thinking
Real-world API consumption
State management best practices
Interactive data visualization



 Author
Built by Taiwo as part of a frontend engineering and dashboard architecture learning journey.