import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi) // สำหรับโหลดไฟล์ JSON ที่เป็นข้อมูลการแปล
  .use(LanguageDetector) // สำหรับตรวจจับภาษาจาก browser หรือ query string
  .use(initReactI18next) // สำหรับเชื่อมต่อกับ react-i18next
  .init({
    fallbackLng: "en", // ภาษาเริ่มต้น
    supportedLngs: ["en", "th"], // ภาษาที่รองรับ
    interpolation: {
      escapeValue: false, // React มีการป้องกัน XSS ให้แล้ว
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // ที่อยู่ไฟล์แปล JSON
    },
  });

export default i18n;
