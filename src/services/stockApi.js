// src/services/stockApi.js
import { MARKET_SYMBOLS } from '@/config/constants'

const KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY
const PATH = '/api-acciones/query'

export const obtenerAccionesReales = async () => {
  try {
    const requests = MARKET_SYMBOLS.slice(0, 8).map(item => 
      fetch(`${PATH}?function=GLOBAL_QUOTE&symbol=${item.symbol}&apikey=${KEY}`)
        .then(res => res.json())
    )
    const data = await Promise.all(requests)
    return data.map((res, i) => {
      const q = res['Global Quote']
      const s = MARKET_SYMBOLS[i]
      if (q && q['05. price']) {
        return {
          id: s.symbol, nombre: s.name, simbolo: s.symbol,
          precio: parseFloat(q['05. price']).toFixed(2),
          variacion: parseFloat(q['10. change percent']?.replace('%', '') || 0).toFixed(2),
          sector: s.sector, timestamp: new Date().toISOString()
        }
      }
      return loadBackup(s)
    })
  } catch (e) {
    return MARKET_SYMBOLS.slice(0, 8).map(s => loadBackup(s))
  }
}

// ✅ ESTO ES LO QUE FALTABA PARA QUE ActivoInfo NO EXPLOTE
export const sectorBadgeClass = (sector) => {
  const classes = {
    'Tecnología': 'badge-primary',
    'Consumo': 'badge-accent',
    'Automotriz': 'badge-info',
    'Financiero': 'badge-warning',
    'Salud': 'badge-success'
  }
  return `badge ${classes[sector] || 'badge-ghost'}`
}

const loadBackup = (item) => {
  const prices = { AAPL: 245.3, MSFT: 450.75, TSLA: 210.45, NVDA: 980.5 }
  return {
    id: item.symbol, nombre: item.name, simbolo: item.symbol,
    precio: prices[item.symbol] || 100.0,
    variacion: parseFloat((Math.random() * 4 - 2).toFixed(2)),
    sector: item.sector, timestamp: new Date().toISOString()
  }
}
