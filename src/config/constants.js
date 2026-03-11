// src/config/constants.js
export const MARKET_SYMBOLS = [
  { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Tecnología' },
  { symbol: 'MSFT', name: 'Microsoft', sector: 'Tecnología' },
  { symbol: 'GOOGL', name: 'Google', sector: 'Tecnología' },
  { symbol: 'AMZN', name: 'Amazon', sector: 'Consumo' },
  { symbol: 'TSLA', name: 'Tesla', sector: 'Automotriz' },
  { symbol: 'NVDA', name: 'NVIDIA', sector: 'Tecnología' }
]

export const NEWS_CATEGORIES = ['Mercados', 'Tecnología', 'Economía', 'Empresas']

export const STORAGE_KEYS = {
  RECENTLY_VIEWED: 'recently_viewed',
  PORTFOLIO: 'portfolio'
}

export const APP_CONFIG = {
  refreshInterval: 60000, // 1 minuto
  maxRecentlyViewed: 10
}
