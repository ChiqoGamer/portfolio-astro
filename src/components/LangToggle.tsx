// src/components/LangToggle.tsx
import { useStore } from '@nanostores/react'
import { currentLang } from '../i18n/store'

export default function LangToggle() {
  const lang = useStore(currentLang)

  const toggle = () => {
    const next = lang === 'es' ? 'en' : 'es'
    currentLang.set(next)
    localStorage.setItem('lang', next)
  }

  return (
    <button onClick={toggle}>
      {lang === 'es' ? '🇺🇸 EN' : '🇦🇷 ES'}
    </button>
  )
}