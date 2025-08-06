import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

// Import images
import epmLogo from './assets/images/superservicios-gris-negro.svg'
import citySkyline from './assets/images/fondo-factura-web-epm.1c0b9aa1f1b4805f.svg'
import notificationIcon from './assets/images/icn-notificaciones.svg'
import historyIcon from './assets/images/icn-historico.svg'
import emailIcon from './assets/images/icn-factura-correo.svg'
import pdfIcon from './assets/images/icn-descargar-factura.svg'
import afiniaLogo from './assets/images/afinia.png'
import checLogo from './assets/images/chec.png'
import edeqLogo from './assets/images/edeq.png'
import essaLogo from './assets/images/essa.png'
import censLogo from './assets/images/cens.png'

// Import pages
import SignUp from './pages/SignUp'

function App() {
  const [textSize, setTextSize] = useState('normal')
  const [language, setLanguage] = useState('EN')
  const [isSpeakerOn, setIsSpeakerOn] = useState(false)

  // Content translations
  const content = {
    EN: {
      header: {
        goToWebsite: "Go to epm.com.co",
        title: "EPM Web Invoice",
        information: "Information",
        decreaseText: "Decrease text size",
        increaseText: "Increase text size",
        speaker: "Speaker",
        help: "Help"
      },
      hero: {
        title: "Check and pay your EPM bills",
        ctaButton: "Sign up or log in"
      },
      benefits: {
        title: "Benefits of registering:",
        notifications: "Receive notifications when your bill is available",
        history: "View payment and consumption history",
        email: "Receive your bill in your email",
        pdf: "Download your bill in PDF"
      },
      partners: {
        title: "If your bill is from these companies, click on the logo to pay them"
      },
      footer: {
        superservicios: "Superservicios",
        lastUpdate: "Last update: 30/05/2025",
        terms: "Terms and conditions of the site",
        copyright: "EPM © All rights reserved",
        privacy: "Privacy - Terms"
      }
    },
    ES: {
      header: {
        goToWebsite: "Ir a epm.com.co",
        title: "Factura Web EPM",
        information: "Información",
        decreaseText: "Reducir texto",
        increaseText: "Aumentar texto",
        speaker: "Altavoz",
        help: "Ayuda"
      },
      hero: {
        title: "Consulta y paga tus facturas de EPM",
        ctaButton: "Regístrate o inicia sesión"
      },
      benefits: {
        title: "Beneficios de registrarte:",
        notifications: "Recibir notificaciones cuando tu factura esté disponible",
        history: "Consultar históricos de pagos y consumos",
        email: "Recibir la factura en tu correo",
        pdf: "Descargar tu factura en PDF"
      },
      partners: {
        title: "Si tu factura es de estas empresas, haz clic en el logo para pagarlas"
      },
      footer: {
        superservicios: "Vigilado Superservicios",
        lastUpdate: "Última actualización: 30/05/2025",
        terms: "Términos y condiciones del sitio",
        copyright: "EPM © Todos los derechos reservados",
        privacy: "Privacidad - Términos"
      }
    }
  }

  const currentContent = content[language as keyof typeof content]

  const increaseTextSize = () => {
    setTextSize(prev => {
      if (prev === 'small') return 'normal'
      if (prev === 'normal') return 'large'
      return 'large'
    })
  }

  const decreaseTextSize = () => {
    setTextSize(prev => {
      if (prev === 'large') return 'normal'
      if (prev === 'normal') return 'small'
      return 'small'
    })
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value)
  }

  const toggleSpeaker = () => {
    setIsSpeakerOn(prev => !prev)
    // Here you can add actual audio functionality
    if (!isSpeakerOn) {
      // Speaker turned on - could trigger audio feedback
      console.log('Speaker turned ON')
    } else {
      // Speaker turned off
      console.log('Speaker turned OFF')
    }
  }

  return (
    <Routes>
      <Route path="/" element={
        <div className={`app ${textSize}`}>
          {/* Header */}
          <header className="header">
            <div className="header-content">
              <div className="header-left">
                <a href="#" className="header-link">{currentContent.header.goToWebsite}</a>
                <img src={epmLogo} alt="EPM Logo" className="epm-logo" />
                <span className="header-title">{currentContent.header.title}</span>
              </div>
              <div className="header-right">
                <button className="header-icon-btn" title={currentContent.header.information}>
                  <svg className="icon-info" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                </button>
                <div className="text-size-controls">
                  <button className="header-icon-btn" onClick={decreaseTextSize} title={currentContent.header.decreaseText}>
                    A-
                  </button>
                  <button className="header-icon-btn" onClick={increaseTextSize} title={currentContent.header.increaseText}>
                    A+
                  </button>
                </div>
                <button 
                  className={`header-icon-btn ${isSpeakerOn ? 'speaker-on' : 'speaker-off'}`} 
                  title={currentContent.header.speaker}
                  onClick={toggleSpeaker}
                >
                  <svg className="icon-speaker" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    {isSpeakerOn ? (
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    ) : (
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                    )}
                  </svg>
                </button>
                <select className="language-selector" value={language} onChange={handleLanguageChange}>
                  <option value="EN">EN</option>
                  <option value="ES">ES</option>
                </select>
                <a href="#" className="header-link">{currentContent.header.help}</a>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="main-content">
            <div className="hero-section" style={{ backgroundImage: `url(${citySkyline})`, width : '100%', height : '100%', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="hero-content">
                <h1 className="hero-title">{currentContent.hero.title}</h1>
                <Link to="/signup" className="cta-button">{currentContent.hero.ctaButton}</Link>
              </div>
              <div className="hero-illustration">
                
              </div>
            </div>

            {/* Benefits Section */}
            <section className="benefits-section">
              <h2 className="benefits-title">{currentContent.benefits.title}</h2>
              <div className="benefits-grid">
                <div className="benefit-card">
                  <img src={notificationIcon} alt="Notification" className="benefit-icon-img" />
                  <p>{currentContent.benefits.notifications}</p>
                </div>
                <div className="benefit-card">
                  <img src={historyIcon} alt="History" className="benefit-icon-img" />
                  <p>{currentContent.benefits.history}</p>
                </div>
                <div className="benefit-card">
                  <img src={emailIcon} alt="Email" className="benefit-icon-img" />
                  <p>{currentContent.benefits.email}</p>
                </div>
                <div className="benefit-card">
                  <img src={pdfIcon} alt="PDF Download" className="benefit-icon-img" />
                  <p>{currentContent.benefits.pdf}</p>
                </div>
              </div>
            </section>

            {/* Partner Companies Section */}
            <section className="partners-section">
              <h3 className="partners-title">{currentContent.partners.title}</h3>
              <div className="partners-grid">
                <div className="partner-logo" style={{backgroundImage: `url(${afiniaLogo})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}/>
                <div className="partner-logo" style={{backgroundImage: `url(${checLogo})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}/>
                <div className="partner-logo" style={{backgroundImage: `url(${edeqLogo})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}/>
                <div className="partner-logo" style={{backgroundImage: `url(${essaLogo})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}/>
                <div className="partner-logo" style={{backgroundImage: `url(${censLogo})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}/>
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="footer">
            <div className="footer-content">
              <div className="footer-left">
                <div className="footer-item">
                  <svg className="footer-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                  {currentContent.footer.superservicios}
                </div>
                <div className="footer-item">
                  {currentContent.footer.lastUpdate}
                </div>
              </div>
              <div className="footer-right">
                <a href="#" className="footer-link">{currentContent.footer.terms}</a>
                <div className="footer-copyright">{currentContent.footer.copyright}</div>
              </div>
            </div>
          </footer>

          {/* Floating Privacy Button */}
          <button className="floating-privacy-btn">
            <svg className="refresh-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
            <span>{currentContent.footer.privacy}</span>
          </button>
        </div>
      } />
      
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default App 