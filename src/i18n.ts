import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            app_title: "NeuroQuest Academy",
            telemetry_title: "Telemetry & AI Engine",
            clicks: "Clicks:",
            errors: "Errors:",
            time_spent: "Time Spent:",
            frustration_level: "Frustration Level",
            module_title: "Play the Demo",
            module_desc: "Try it yourself: Drag the shapes or use your voice to solve the ratio!",
            check_answer: "Check Answer",
            ai_help_msg: "It looks like this is tricky. The numerator is half the denominator on the left. Can you make it the same on the right?",
            correct_alert: "Excellent! The ratio is balanced.",
            wrong_alert: "Not quite right. Try again!",
            level_low: "Low",
            level_med: "Medium",
            level_high: "High",
            // Landing Page Additions
            nav_features: "Features",
            nav_demo: "Demo",
            nav_market: "Impact",
            nav_roadmap: "Roadmap",
            nav_pricing: "Pricing",
            hero_title: "Learning Reimagined for Every Mind",
            hero_subtitle: "Combining 3D game-based learning, AI-powered personalization, and IB curriculum alignment to create an inclusive educational platform for neurodiverse learners.",
            get_started: "Get Started Free",
            watch_demo: "Watch Demo",
            stat_market: "$185.3B",
            stat_market_p: "EdTech Market",
            stat_cagr: "23.4%",
            stat_cagr_p: "CAGR Growth",
            stat_asd: "1 in 36",
            stat_asd_p: "Children with ASD",
            feat_title: "Powerful Features",
            feat_subtitle: "Everything you need to support, educate, and empower neurodivergent minds.",
            feat1_t: "3D Game-Based Learning",
            feat1_d: "Immersive 3D environments teaching IB curriculum subjects from grades 1-12 with engaging gameplay.",
            feat2_t: "AI-Powered Emotion Detection",
            feat2_d: "Real-time emotion recognition to adapt interventions and prevent frustration dynamically.",
            feat3_t: "Adaptive Learning Paths",
            feat3_d: "Personalized difficulty and pacing that adjusts securely to each student's strengths.",
            feat4_t: "Social Skills Development",
            feat4_d: "AI-driven social simulations teaching empathy, turn-taking, and real-world skills.",
            feat5_t: "Sensory Customization",
            feat5_d: "Fully customizable sensory settings including visual complexity and audio levels.",
            feat6_t: "Bilingual Support",
            feat6_d: "Full Arabic and English support with culturally sensitive content for the MENA market.",
            // Voice Additions
            voice_start: "Start Voice",
            voice_stop: "Stop Listening",
            voice_listening: "Listening...",
            voice_unsupported: "Voice input not supported on this browser.",
            voice_error: "Microphone error."
        }
    },
    ar: {
        translation: {
            app_title: "أكاديمية نيوروكويست",
            telemetry_title: "محرك الذكاء الاصطناعي",
            clicks: "النقرات:",
            errors: "الأخطاء:",
            time_spent: "الوقت المنقضي:",
            frustration_level: "مستوى الإحباط",
            module_title: "جرب العرض التجريبي",
            module_desc: "جرب بنفسك: اسحب الأشكال أو استخدم صوتك لحل النسبة المئوية!",
            check_answer: "تحقق من الإجابة",
            ai_help_msg: "يبدو أن هذا صعب بعض الشيء. البسط هو نصف المقام على اليسار. هل يمكنك جعله يطابق على اليمين؟",
            correct_alert: "ممتاز! النسبة متوازنة.",
            wrong_alert: "غير صحيح. حاول مرة أخرى!",
            level_low: "منخفض",
            level_med: "متوسط",
            level_high: "مرتفع",
            // Landing Page Additions
            nav_features: "المميزات",
            nav_demo: "التجربة",
            nav_market: "التأثير",
            nav_roadmap: "الخارطة",
            nav_pricing: "الأسعار",
            hero_title: "إعادة تصور التعلم لكل عقل",
            hero_subtitle: "الجمع بين التعلم القائم على الألعاب ثلاثية الأبعاد، والذكاء الاصطناعي، ومناهج البكالوريا الدولية (IB) لإنشاء منصة شاملة.",
            get_started: "ابدأ مجاناً",
            watch_demo: "شاهد العرض",
            stat_market: "$185.3 مليار",
            stat_market_p: "سوق تكنولوجيا التعليم",
            stat_cagr: "23.4%",
            stat_cagr_p: "النمو السنوي",
            stat_asd: "1 من 36",
            stat_asd_p: "طفل مشخص بالتوحد",
            feat_title: "مميزات قوية",
            feat_subtitle: "كل ما تحتاجه لدعم وتعليم وتمكين العقول المتباينة عصبياً.",
            feat1_t: "التعلم القائم على الألعاب 3D",
            feat1_d: "بيئات ثلاثية الأبعاد غامرة لتدريس مناهج IB من الصف 1-12 من خلال ألعاب تفاعلية.",
            feat2_t: "اكتشاف المشاعر بالذكاء الاصطناعي",
            feat2_d: "التعرف على المشاعر في الوقت الفعلي لتكييف التدخلات ومنع الإحباط.",
            feat3_t: "مسارات تعلم تكيفية",
            feat3_d: "صعوبة ووتيرة مخصصة تتكيف مع نقاط قوة كل طالب بشكل آمن.",
            feat4_t: "تنمية المهارات الاجتماعية",
            feat4_d: "محاكاة اجتماعية يقودها الذكاء الاصطناعي لتعليم التعاطف ومهارات التفاعل.",
            feat5_t: "تخصيص حسي",
            feat5_d: "إعدادات حسية قابلة للتخصيص بالكامل بما في ذلك التعقيد البصري ومستويات الصوت.",
            feat6_t: "دعم ثنائي اللغة",
            feat6_d: "دعم كامل للغتين العربية والإنجليزية مع محتوى حساس ثقافياً للسوق.",
            // Voice Additions
            voice_start: "ابدأ الصوت",
            voice_stop: "إيقاف الاستماع",
            voice_listening: "جاري الاستماع...",
            voice_unsupported: "الإدخال الصوتي غير مدعوم في متصفحك.",
            voice_error: "خطأ في الميكروفون."
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
