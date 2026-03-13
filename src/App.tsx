import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Brain, Moon, Sun, ArrowRight, Gamepad2, HeartPulse, Activity, Users, Settings2, Globe2, Volume2, VolumeX, LogIn, LogOut } from 'lucide-react';
import TelemetryPanel from './components/TelemetryPanel';
import RatioBox from './components/RatioBox';
import { UDLPanel } from './components/UDLPanel';
import { EmotionQuest } from './components/game/EmotionQuest';
import { AITutor } from './components/game/AITutor';
import { useAuthSim, saveProgressSim } from './services/firebaseSim';
import './App.css';

export interface TelemetryData {
  clicks: number;
  errors: number;
  timeSpent: number;
}

function App() {
  const { t, i18n } = useTranslation();
  const { user, loginAnonymously, logout } = useAuthSim();
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    clicks: 0,
    errors: 0,
    timeSpent: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry(prev => {
        const newData = { ...prev, timeSpent: prev.timeSpent + 1 };
        // Save simulated progress every 10 seconds if user logged in
        if (user && newData.timeSpent % 10 === 0) {
          saveProgressSim(user.uid, newData).catch(console.error);
        }
        return newData;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [user]);

  useEffect(() => {
    const handleClick = () => {
      setTelemetry(prev => ({ ...prev, clicks: prev.clicks + 1 }));
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('dark', !isDark);
  };

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'ar' : 'en';
    setLang(newLang);
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const handleMathError = () => {
    setTelemetry(prev => ({ ...prev, errors: prev.errors + 1 }));
  };

  const resetTelemetry = () => {
    setTelemetry({ clicks: 0, errors: 0, timeSpent: 0 });
  };

  return (
    <div className="app-container">
      {/* Sticky Header */}
      <header className="app-header glass">
        <div className="logo">
          <Brain size={32} />
          <h1>{t('app_title')}</h1>
        </div>
        <nav className="desktop-nav" style={{ display: 'flex', gap: '2rem', fontWeight: 600 }}>
          <a href="#features" style={{ color: 'inherit', textDecoration: 'none' }}>{t('nav_features')}</a>
          <a href="#demo" style={{ color: 'inherit', textDecoration: 'none' }}>{t('nav_demo')}</a>
          <a href="#stats" style={{ color: 'inherit', textDecoration: 'none' }}>{t('nav_market')}</a>
        </nav>
        <div className="controls">
          {user ? (
            <button className="icon-btn" onClick={logout} title="Simulated Logout">
              <LogOut />
            </button>
          ) : (
             <button className="icon-btn" onClick={loginAnonymously} title="Simulated Anonymous Login">
               <LogIn />
             </button>
          )}
          <button className="icon-btn" onClick={() => setVoiceEnabled(!voiceEnabled)} title={voiceEnabled ? "Turn off Voice Assistant" : "Turn on Voice Assistant"}>
            {voiceEnabled ? <Volume2 /> : <VolumeX />}
          </button>
          <button className="icon-btn" onClick={toggleTheme}>
            {isDark ? <Sun /> : <Moon />}
          </button>
          <button className="btn" onClick={toggleLang}>
            {lang === 'en' ? 'عربي' : 'English'}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="badge">🚀 Transforming Autism Education</div>
        <h1 className="hero-title">{t('hero_title')}</h1>
        <p className="hero-subtitle">{t('hero_subtitle')}</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="#demo" className="btn primary-btn" style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            {t('get_started')} <ArrowRight size={20} />
          </a>
          <a href="#features" className="btn" style={{ padding: '1rem 2rem', textDecoration: 'none' }}>{t('watch_demo')}</a>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section id="stats" className="stats-ribbon">
        <div className="stat-item">
          <h3>{t('stat_market')}</h3>
          <p>{t('stat_market_p')}</p>
        </div>
        <div className="stat-item">
          <h3>{t('stat_cagr')}</h3>
          <p>{t('stat_cagr_p')}</p>
        </div>
        <div className="stat-item">
          <h3>{t('stat_asd')}</h3>
          <p>{t('stat_asd_p')}</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section text-center">
        <h2 className="section-title">{t('feat_title')}</h2>
        <p className="section-subtitle">{t('feat_subtitle')}</p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><Gamepad2 size={28} /></div>
            <h3>{t('feat1_t')}</h3>
            <p>{t('feat1_d')}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><HeartPulse size={28} /></div>
            <h3>{t('feat2_t')}</h3>
            <p>{t('feat2_d')}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Activity size={28} /></div>
            <h3>{t('feat3_t')}</h3>
            <p>{t('feat3_d')}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Users size={28} /></div>
            <h3>{t('feat4_t')}</h3>
            <p>{t('feat4_d')}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Settings2 size={28} /></div>
            <h3>{t('feat5_t')}</h3>
            <p>{t('feat5_d')}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Globe2 size={28} /></div>
            <h3>{t('feat6_t')}</h3>
            <p>{t('feat6_d')}</p>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section - Now including Emotion Quest and AI Tutor */}
      <section id="demo" className="section section-bg">
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <h2 className="section-title">Interactive AI Demo</h2>
          <p className="section-subtitle">Experience the live Telemetry & Math logic working together with on-device Emotion/Frustration AI and Voice commands.</p>
        </div>
        
        {/* New 3D Game Area */}
        <EmotionQuest />
        
        {/* Existing Telemetry + New AI Tutor */}
        <div className="demo-wrapper" style={{ marginTop: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <TelemetryPanel telemetry={telemetry} t={t} lang={lang} voiceEnabled={voiceEnabled} />
          <RatioBox onError={handleMathError} onSuccess={resetTelemetry} t={t} lang={lang} voiceEnabled={voiceEnabled} />
          <AITutor />
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="app-footer">
        <div className="footer-cta">
          <h2>Ready to Transform Autism Education?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Join us in building the future of inclusive, personalized learning.</p>
          <button className="btn primary-btn">Contact Us</button>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 NeuroQuest Academy Prototype.</span>
          <span>Dubai Future Foundation Incubator Candidate</span>
        </div>
      </footer>
      
      {/* UDL Control Panel */}
      <UDLPanel />
    </div>
  );
}

export default App;
