// src/i18n/store.ts
import { atom } from 'nanostores'
import type { Lang } from './translations'

export const currentLang = atom<Lang>('es')