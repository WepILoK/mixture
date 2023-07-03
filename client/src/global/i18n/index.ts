import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "./ru.json"

i18n.use(initReactI18next).init({
    resources: {
        ru: { translation: ru },
    },
    lng: localStorage.getItem("lang") || "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;