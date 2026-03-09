// src/services/stockApi.js

export const SYMBOLS = ['AAPL','MSFT','GOOGL','AMZN','TSLA','META','NVDA','JPM','JNJ','WMT']

export const obtenerAccionesReales = async () => {
  console.log('⚠ Usando datos de respaldo (evita CORS)')
  return SYMBOLS.map(s => obtenerDatosRespaldo(s))
}

// Método para asignar las clases de la badge de sector
export const sectorBadgeClass = (sector) => {
  switch (sector) {
    case 'Tecnología': return 'badge badge-primary'
    case 'Consumo': return 'badge badge-accent'
    case 'Automotriz': return 'badge badge-info'
    case 'Financiero': return 'badge badge-warning'
    case 'Salud': return 'badge badge-success'
    default: return 'badge badge-ghost'
  }
}

const obtenerSector = (symbol) => {
  const sectores = {
    AAPL: 'Tecnología', MSFT: 'Tecnología', GOOGL: 'Tecnología', 
    AMZN: 'Consumo', TSLA: 'Automotriz', META: 'Tecnología', 
    NVDA: 'Tecnología', JPM: 'Financiero', JNJ: 'Salud', WMT: 'Consumo'
  }
  return sectores[symbol] || 'Otros'
}

export const obtenerDatosRespaldo = (symbol) => {
  const respaldo = {
    AAPL: {nombre: 'Apple Inc.', precio: 175.5},
    MSFT: {nombre: 'Microsoft', precio: 420.3},
    GOOGL: {nombre: 'Google', precio: 145.8},
    AMZN: {nombre: 'Amazon', precio: 185.2},
    TSLA: {nombre: 'Tesla', precio: 240.15},
    META: {nombre: 'Meta', precio: 480.75},
    NVDA: {nombre: 'NVIDIA', precio: 950.2},
    JPM: {nombre: 'JPMorgan', precio: 185.5},
    JNJ: {nombre: 'Johnson & Johnson', precio: 160.3},
    WMT: {nombre: 'Walmart', precio: 65.4}
  }

  const datos = respaldo[symbol] || {nombre: symbol, precio: 100.0}
  return {
    id: symbol,
    nombre: datos.nombre,
    simbolo: symbol,
    precio: datos.precio,
    variacion: parseFloat((Math.random() * 10 - 5).toFixed(2)), // siempre número
    sector: obtenerSector(symbol),
    timestamp: new Date().toISOString()
  }
}