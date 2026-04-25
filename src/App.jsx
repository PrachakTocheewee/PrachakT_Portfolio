import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import { useEffect, useState } from 'react'
import ReactGA from 'react-ga4' // 1. Import GA4

// Initialize GA4 ด้วย Measurement ID ของคุณ
ReactGA.initialize('G-2WGTN5Q4ZX')

export default function App() {
  const [typedText, setTypedText] = useState('')

  // ข้อมูล Senior Project
  const seniorProject = {
    title: 'Electricity Demand Forecasting (Time Series Analysis)',
    subtitle: 'Thammasat University - Special Project',
    kpi: '1.5660% MAPE (98.4340% Accuracy)',
    details: [
      'Analyzed historical time series data to identify complex electricity demand patterns and seasonality.',
      'Implemented and tuned ARIMA, SARIMA, and Modified SARIMA models to optimize predictive performance.',
      'Evaluated performance metrics to select the Modified SARIMA model for its superior accuracy.',
      'Developed data visualizations to communicate forecasting trends to stakeholders.',
      'Result: Identified Modified SARIMA as the best-performing model, achieving a MAPE of 1.5660%.',
      'Impact: Identified key demand patterns to support data-driven decision-making.',
    ],
    pdfLink: '/Project-ST495.pdf',
    github: 'https://github.com/PrachakTocheewee',
  }

  const additionalProjects = [
    {
      title: 'Find Your Hat',
      description:
        'Interactive terminal game built with JavaScript where players navigate a grid while avoiding obstacles.',
      link: 'https://r35cpz.csb.app/',
    },
    {
      title: 'Jammming',
      description:
        'React web application integrated with the Spotify API to search and create customized playlists.',
      link:
        'https://accounts.spotify.com/en/login?continue=https%3A%2F%2Faccounts.spotify.com%2Fauthorize%3Fscope%3Dplaylist-modify-public%26response_type%3Dtoken%26redirect_uri%3Dhttp%253A%252F%252Fprachak32-jammming.surge.sh%26client_id%3Db2592ea953504e46bafdef956d077f24&client_id=b2592ea953504e46bafdef956d077f24',
    },
    {
      title: 'Infinity Health',
      description:
        'Full-stack exercise tracker (MERN stack) with secure authentication and activity management.',
      link: 'https://infinity-health.vercel.app/',
    },
  ]

  // GA4 Pageview & Typing Effect
  useEffect(() => {
    // ส่งข้อมูล Pageview เมื่อ Component mount
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname })

    const text =
      'Data Analyst specializing in Forecasting & Business Intelligence'
    let i = 0
    const typing = setInterval(() => {
      i++
      setTypedText(text.slice(0, i))
      if (i === text.length) clearInterval(typing)
    }, 30)
    return () => clearInterval(typing)
  }, [])

  // Fade-in Effect
  useEffect(() => {
    const els = document.querySelectorAll('.fade-in')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('show')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="app">
      {/* 1. NAVIGATION */}
      <nav className="nav">
        <h2 className="logo">Prachak.T</h2>
        <div className="nav-center">
          <span className="contact-label">Contact:</span>
          <span>📧 prachak.toc@gmail.com</span>
          <span>📱 086-002-5138</span>
          <a
            href="https://github.com/PrachakTocheewee"
            target="_blank"
            rel="noreferrer"
          >
            🐙 GitHub
          </a>
          <a
            href="https://linkedin.com/in/prachak-tocheewee"
            target="_blank"
            rel="noreferrer"
          >
            💼 LinkedIn
          </a>
        </div>
        <div className="nav-links">
          <a href="#projects">Projects</a>
          <a
            href="/Resume_Prachak_Tocheewee_Eng.pdf"
            target="_blank"
            rel="noreferrer"
            className="nav-resume-btn"
          >
            Resume
          </a>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="hero fade-in">
        <div className="hero-left">
          <h1>Hi, I'm Prachak 👋</h1>
          <h2>
            {typedText}
            <span className="cursor">|</span>
          </h2>
          <p className="hero-desc">
            Transforming raw data into business decisions through analytics,
            forecasting, and software development.
          </p>
        </div>
        <img src="/profile.jpg" className="avatar" alt="Prachak Profile" />
      </section>

      {/* 3. EDUCATION SECTION */}
      <section className="section fade-in">
        <div className="section-header">
          <h2>Education</h2>
          <div className="line"></div>
        </div>
        <div className="edu-container">
          <div className="edu-item">
            <div className="edu-dot"></div>
            <div className="edu-card">
              <h3>Thammasat University</h3>
              <p className="edu-date">Aug 2016 – May 2020</p>
              <p className="edu-degree">
                Bachelor of Science, Major in Statistics
              </p>
              <ul className="edu-details">
                <li>
                  <strong>Data Analysis & Research:</strong> Gained
                  comprehensive knowledge in statistical research methodologies,
                  quantitative data analysis, and hypothesis testing.
                </li>
                <li>
                  <strong>Statistical Programming:</strong> Developed
                  proficiency in statistical computing to automate data
                  processing and perform advanced modeling.
                </li>
                <li>
                  <strong>Problem Solving:</strong> Applied mathematical
                  theories to real-world scenarios, strengthening analytical
                  thinking and data-driven decision-making.
                </li>
              </ul>
              <div className="edu-tags">
                <span>Statistics</span>
                <span>Data Analysis</span>
                <span>Research</span>
                <span>R/Python</span>
              </div>
            </div>
          </div>

          <div className="edu-item">
            <div className="edu-dot"></div>
            <div className="edu-card">
              <h3>Junior Software Developer Bootcamp</h3>
              <p className="edu-date">Jan 2022 – Apr 2022</p>
              <ul className="edu-details">
                <li>
                  Built full-stack web applications using the MERN stack (React,
                  Node.js, MongoDB).
                </li>
                <li>
                  Mastered Agile methodologies, Scrum, and Teamwork for
                  efficient software delivery.
                </li>
                <li>
                  Developed secure CRUD applications with authentication using
                  PassportJS and Express.
                </li>
              </ul>
              <div className="edu-tags">
                <span>React</span>
                <span>Node.js</span>
                <span>MongoDB</span>
                <span>Agile</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SENIOR PROJECT SECTION */}
      <section id="projects" className="section fade-in">
        <div className="section-header">
          <h2>Senior Project</h2>
          <div className="line"></div>
        </div>

        <div className="edu-container">
          <div className="edu-item">
            <div className="edu-dot"></div>
            <div className="edu-card">
              <h3>{seniorProject.title}</h3>
              <p className="edu-date">{seniorProject.subtitle}</p>
              <div
                className="kpi"
                style={{
                  color: '#60a5fa',
                  margin: '15px 0',
                  fontWeight: 'bold',
                }}
              >
                {seniorProject.kpi}
              </div>
              <ul className="edu-details">
                {seniorProject.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
              <div style={{ marginTop: '20px' }}>
                <a
                  href={seniorProject.pdfLink}
                  target="_blank"
                  rel="noreferrer"
                  className="nav-resume-btn"
                  style={{ fontSize: '13px', display: 'inline-block' }}
                >
                  View Full Project Report (PDF) →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ADDITIONAL PROJECTS */}
      <section className="section fade-in">
        <div className="section-header">
          <h2>Additional Projects</h2>
          <div className="line"></div>
        </div>
        <div className="cards">
          {additionalProjects.map((p, i) => (
            <div className="card" key={i}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="btn"
                style={{ marginTop: '10px', display: 'inline-block' }}
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="footer fade-in">
        <p>© 2026 Prachak Tocheewee | Built with React</p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to Top ↑
        </button>
      </footer>
    </div>
  )
}
