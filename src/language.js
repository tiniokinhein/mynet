import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import XHR from 'i18next-xhr-backend'

const allowedLanguages = ['en', 'mm']

const defaultLanguage = 'en'
let lng = defaultLanguage

const storageLanguage = localStorage.getItem('language')

if(storageLanguage && allowedLanguages.indexOf(storageLanguage) > -1) {
    lng = storageLanguage
}

i18n
.use(XHR)
.use(initReactI18next)
.init({
    lng,
    debug: false,
    keySeparator: false,
    interpolation: {
        escapeValue: false
    },
    backend: {
        allowMultiLoading: true,
        loadPath: '/translations/{{lng}}.json'
    },
    react: {
        useSuspense: false
    }
})

const language = i18n

export default language