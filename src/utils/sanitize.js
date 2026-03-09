// src/utils/sanitize.js
import DOMPurify from 'dompurify'

// Configuración de DOMPurify
DOMPurify.setConfig({
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
  ALLOWED_ATTR: ['href', 'title', 'target'],
  FORBID_TAGS: ['script', 'style', 'iframe'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick'],
})

export const sanitizeInput = (input) => {
  if (typeof input === 'string') return DOMPurify.sanitize(input.trim())
  return input
}

export const sanitizeObject = (obj) => {
  const sanitized = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      sanitized[key] = sanitizeInput(obj[key])
    }
  }
  return sanitized
}

export const sanitizeHtml = (html) => DOMPurify.sanitize(html)

// 🔹 Función para registrar como directiva y método global
export const registerSanitizeDirective = (app) => {
  app.directive('sanitize', {
    mounted(el, binding) {
      if (binding.value) el.innerHTML = sanitizeHtml(binding.value)
    },
    updated(el, binding) {
      if (binding.value) el.innerHTML = sanitizeHtml(binding.value)
    },
  })
  app.config.globalProperties.$sanitize = sanitizeHtml
}