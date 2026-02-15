import { useState, useEffect, useMemo } from 'react'
import './App.css'
import PracticeTest from './PracticeTest'
import Textbooks from './Textbooks'
import Newspapers from './Newspapers'
import StudyPlanner from './StudyPlanner'

const API_URL = import.meta.env.VITE_API_URL || '/api'

function App() {
  const [syllabus, setSyllabus] = useState(null)
  const [progress, setProgress] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [activeSection, setActiveSection] = useState('partA')
  const [expandedUnits, setExpandedUnits] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [language, setLanguage] = useState('both')
  const [currentView, setCurrentView] = useState('syllabus')
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [menuOpen, setMenuOpen] = useState(false)

  // TNPSC Group 4 Exam Date: December 20, 2026
  const EXAM_DATE = new Date('2026-12-20T10:00:00')

  // Countdown Timer Effect
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const diff = EXAM_DATE - now

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        setCountdown({ days, hours, minutes, seconds })
      }
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [syllabusRes, progressRes] = await Promise.all([
        fetch(`${API_URL}/syllabus`),
        fetch(`${API_URL}/progress`)
      ])
      const syllabusData = await syllabusRes.json()
      const progressData = await progressRes.json()
      setSyllabus(syllabusData)
      setProgress(progressData)
    } catch (error) {
      console.error('Error fetching data:', error)
      // Load from localStorage as fallback
      const saved = localStorage.getItem('tnpscProgress')
      if (saved) setProgress(JSON.parse(saved))
    } finally {
      setLoading(false)
    }
  }

  const toggleTopic = async (topicId) => {
    const newProgress = { ...progress, [topicId]: !progress[topicId] }
    setProgress(newProgress)
    localStorage.setItem('tnpscProgress', JSON.stringify(newProgress))

    try {
      await fetch(`${API_URL}/progress/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicId })
      })
    } catch (error) {
      console.error('Error saving progress:', error)
    }
  }

  const toggleUnit = (unitId) => {
    setExpandedUnits(prev => ({ ...prev, [unitId]: !prev[unitId] }))
  }

  // Save all progress to backend
  const saveProgress = async () => {
    setSaving(true)
    setSaveSuccess(false)

    try {
      const response = await fetch(`${API_URL}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(progress)
      })

      if (response.ok) {
        localStorage.setItem('tnpscProgress', JSON.stringify(progress))
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
      }
    } catch (error) {
      console.error('Error saving progress:', error)
      alert('முன்னேற்றத்தை சேமிக்க முடியவில்லை! / Failed to save progress!')
    } finally {
      setSaving(false)
    }
  }

  // Reset with confirmation modal
  const resetProgress = async () => {
    setProgress({})
    localStorage.removeItem('tnpscProgress')
    setShowResetConfirm(false)

    try {
      await fetch(`${API_URL}/progress/reset`, { method: 'POST' })
    } catch (error) {
      console.error('Error resetting:', error)
    }
  }

  const calculateProgress = useMemo(() => {
    if (!syllabus) return { total: 0, completed: 0, percentage: 0, sections: {} }

    let total = 0
    let completed = 0
    const sections = {}

    syllabus.sections.forEach(section => {
      let sectionTotal = 0
      let sectionCompleted = 0

      section.units.forEach(unit => {
        unit.topics.forEach((_, topicIndex) => {
          const topicId = `${unit.id}-${topicIndex}`
          total++
          sectionTotal++
          if (progress[topicId]) {
            completed++
            sectionCompleted++
          }
        })
      })

      sections[section.id] = {
        total: sectionTotal,
        completed: sectionCompleted,
        percentage: sectionTotal > 0 ? Math.round((sectionCompleted / sectionTotal) * 100) : 0
      }
    })

    return {
      total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      sections
    }
  }, [syllabus, progress])

  const getUnitProgress = (unit) => {
    let total = unit.topics.length
    let completed = 0
    unit.topics.forEach((_, index) => {
      if (progress[`${unit.id}-${index}`]) completed++
    })
    return { total, completed, percentage: Math.round((completed / total) * 100) }
  }

  const filterTopics = (topics, unitId) => {
    return topics.filter((topic, index) => {
      const topicId = `${unitId}-${index}`
      const isCompleted = progress[topicId]
      const matchesFilter = filter === 'all' ||
        (filter === 'completed' && isCompleted) ||
        (filter === 'pending' && !isCompleted)
      const matchesSearch = searchQuery === '' ||
        topic.ta.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.en.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }

  const exportProgress = () => {
    if (!syllabus) return

    let report = `╔══════════════════════════════════════════════════════════════════╗
║     சுபாஷினி - TNPSC குரூப் 4 முன்னேற்ற அறிக்கை 2025-2026        ║
║     Subashini's TNPSC Group 4 Progress Report                     ║
╚══════════════════════════════════════════════════════════════════╝

📅 Generated: ${new Date().toLocaleString()}
📊 Total Progress: ${calculateProgress.completed}/${calculateProgress.total} topics (${calculateProgress.percentage}%)

💪 "முயற்சி திருவினை ஆக்கும்" - தொடர்ந்து படி, வெற்றி நிச்சயம்!
   "Effort leads to success" - Keep studying, success is certain!

Made with ❤️ by Prime | Contact: +91 9080996780
${'═'.repeat(68)}

`
    syllabus.sections.forEach(section => {
      const sectionProgress = calculateProgress.sections[section.id]
      report += `\n${section.icon} ${section.name}\n`
      report += `   ${section.nameEn}\n`
      report += `   Questions: ${section.totalQuestions} | Progress: ${sectionProgress.percentage}%\n`
      report += `${'─'.repeat(60)}\n`

      section.units.forEach(unit => {
        const unitProg = getUnitProgress(unit)
        report += `\n   ${unit.icon} ${unit.name}\n`
        report += `      [${unit.questions}Q] ${unitProg.completed}/${unitProg.total} completed\n\n`

        unit.topics.forEach((topic, index) => {
          const status = progress[`${unit.id}-${index}`] ? '✅' : '⬜'
          report += `      ${status} ${topic.ta}\n`
          report += `         ${topic.en}\n`
        })
      })
      report += '\n'
    })

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `TNPSC_Group4_Progress_${new Date().toISOString().slice(0, 10)}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        Loading syllabus...
      </div>
    )
  }

  const currentSection = syllabus?.sections.find(s => s.id === activeSection)
  const circumference = 2 * Math.PI * 20

  return (
    <div className="app-container">
      {/* SVG Definitions */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>

      {/* Header */}
      <header className="header">
        <div className="welcome-banner">
          <span className="welcome-text">🌟 வணக்கம் சுபாஷினி!</span>
          <span className="welcome-subtext">Made with ❤️ by Prime</span>
        </div>
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <div className="logo-icon">📚</div>
              <div className="logo-text">
                <h1>TNPSC குரூப் 4</h1>
                <span className="tamil">பாடத்திட்ட சரிபார்ப்பு 2025-2026</span>
              </div>
            </div>
          </div>

          <div className="header-right">
            {/* Compact Countdown Timer */}
            <div className="countdown-compact">
              <div className="countdown-mini">
                <span className="mini-icon">⏰</span>
                <div className="mini-time">
                  <span className="mini-value">{countdown.days}</span>
                  <span className="mini-sep">:</span>
                  <span className="mini-value">{String(countdown.hours).padStart(2, '0')}</span>
                  <span className="mini-sep">:</span>
                  <span className="mini-value">{String(countdown.minutes).padStart(2, '0')}</span>
                  <span className="mini-sep">:</span>
                  <span className="mini-value">{String(countdown.seconds).padStart(2, '0')}</span>
                </div>
              </div>
              <span className="countdown-date">📅 Dec 20, 2026</span>
            </div>

            {/* Exam Info Badges */}
            <div className="exam-badges-row">
              <div className="mini-badge">
                <span className="mini-badge-val">200</span>
                <span className="mini-badge-lbl">கேள்விகள்</span>
              </div>
              <div className="mini-badge">
                <span className="mini-badge-val">3 மணி</span>
                <span className="mini-badge-lbl">நேரம்</span>
              </div>
              <div className="mini-badge">
                <span className="mini-badge-val">SSLC</span>
                <span className="mini-badge-lbl">தரம்</span>
              </div>
            </div>

            <div className="made-by">
              Made with ❤️ by <span className="prime-name">Prime</span>
            </div>
          </div>
        </div>

        <div className="header-stats">
          <div className="stat-card highlight">
            <span className="stat-value">{calculateProgress.percentage}%</span>
            <span className="stat-label">மொத்த முன்னேற்றம்</span>
            <div className="stat-bar">
              <div className="stat-bar-fill" style={{ width: `${calculateProgress.percentage}%` }}></div>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-value">{calculateProgress.completed}</span>
            <span className="stat-label">முடிந்தது</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{calculateProgress.total - calculateProgress.completed}</span>
            <span className="stat-label">மீதமுள்ளது</span>
          </div>
        </div>

        {/* Menu Button */}
        <button className="menu-toggle-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="menu-icon">{menuOpen ? '✕' : '☰'}</span>
          <span className="menu-text">பட்டி / Menu</span>
        </button>
      </header>

      {/* Sliding Side Menu */}
      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <div className="side-menu-header">
          <h3>📚 TNPSC குரூப் 4</h3>
          <button className="close-menu-btn" onClick={() => setMenuOpen(false)}>✕</button>
        </div>

        <nav className="side-menu-nav">
          <button
            className={`menu-item ${currentView === 'syllabus' ? 'active' : ''}`}
            onClick={() => { setCurrentView('syllabus'); setMenuOpen(false); }}
          >
            <span className="menu-item-icon">📚</span>
            <div className="menu-item-text">
              <span className="menu-item-ta">பாடத்திட்டம்</span>
              <span className="menu-item-en">Syllabus</span>
            </div>
          </button>

          <button
            className={`menu-item ${currentView === 'planner' ? 'active' : ''}`}
            onClick={() => { setCurrentView('planner'); setMenuOpen(false); }}
          >
            <span className="menu-item-icon">📅</span>
            <div className="menu-item-text">
              <span className="menu-item-ta">திட்டமிடல்</span>
              <span className="menu-item-en">Study Planner</span>
            </div>
          </button>

          <button
            className={`menu-item ${currentView === 'practice' ? 'active' : ''}`}
            onClick={() => { setCurrentView('practice'); setMenuOpen(false); }}
          >
            <span className="menu-item-icon">📝</span>
            <div className="menu-item-text">
              <span className="menu-item-ta">மாதிரி தேர்வு</span>
              <span className="menu-item-en">Practice Test</span>
            </div>
          </button>

          <button
            className={`menu-item ${currentView === 'textbooks' ? 'active' : ''}`}
            onClick={() => { setCurrentView('textbooks'); setMenuOpen(false); }}
          >
            <span className="menu-item-icon">📖</span>
            <div className="menu-item-text">
              <span className="menu-item-ta">பாடநூல்கள்</span>
              <span className="menu-item-en">Textbooks</span>
            </div>
          </button>

          <button
            className={`menu-item ${currentView === 'newspapers' ? 'active' : ''}`}
            onClick={() => { setCurrentView('newspapers'); setMenuOpen(false); }}
          >
            <span className="menu-item-icon">📰</span>
            <div className="menu-item-text">
              <span className="menu-item-ta">செய்தித்தாள்கள்</span>
              <span className="menu-item-en">News</span>
            </div>
          </button>
        </nav>

        <div className="side-menu-footer">
          <p>Made with ❤️ by Prime</p>
          <p>For Subashini</p>
        </div>
      </div>

      {/* Menu Overlay */}
      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>}

      {/* Practice Test View */}
      {currentView === 'practice' && (
        <PracticeTest onBack={() => setCurrentView('syllabus')} />
      )}

      {/* Textbooks View */}
      {currentView === 'textbooks' && (
        <Textbooks onBack={() => setCurrentView('syllabus')} />
      )}

      {/* Newspapers View */}
      {currentView === 'newspapers' && (
        <Newspapers onBack={() => setCurrentView('syllabus')} />
      )}

      {/* Study Planner View */}
      {currentView === 'planner' && (
        <StudyPlanner onBack={() => setCurrentView('syllabus')} />
      )}

      {/* Syllabus View */}
      {currentView === 'syllabus' && (
        <>
          {/* Section Cards */}
          <div className="section-cards">
            {
              syllabus?.sections.map(section => {
                const sectionProgress = calculateProgress.sections[section.id]
                const offset = circumference - (sectionProgress?.percentage / 100) * circumference

                return (
                  <div
                    key={section.id}
                    className={`section-card ${activeSection === section.id ? 'active' : ''}`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <div className="section-icon">{section.icon}</div>
                    <div className="section-info">
                      <h3 className="tamil">{section.name.split(':')[1]?.trim() || section.name}</h3>
                      <span className="section-questions">{section.totalQuestions} கேள்விகள்</span>
                    </div>
                    <div className="section-progress">
                      <svg width="50" height="50">
                        <circle className="bg" cx="25" cy="25" r="20" strokeDasharray={circumference} />
                        <circle className="progress" cx="25" cy="25" r="20"
                          strokeDasharray={circumference}
                          strokeDashoffset={offset} />
                      </svg>
                      <span className="progress-text">{sectionProgress?.percentage || 0}%</span>
                    </div>
                  </div>
                )
              })
            }
          </div >

          {/* Content Header */}
          < div className="content-header" >
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="தலைப்புகளைத் தேடு..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-buttons">
              {['all', 'pending', 'completed'].map(f => (
                <button
                  key={f}
                  className={`filter-btn ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f === 'all' ? 'அனைத்தும்' : f === 'pending' ? 'நிலுவை' : 'முடிந்தது'}
                </button>
              ))}
            </div>
            <div className="lang-toggle">
              <button className={`lang-btn ${language === 'ta' ? 'active' : ''}`} onClick={() => setLanguage('ta')}>தமிழ்</button>
              <button className={`lang-btn ${language === 'both' ? 'active' : ''}`} onClick={() => setLanguage('both')}>Both</button>
              <button className={`lang-btn ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>EN</button>
            </div>
          </div >

          {/* Units List */}
          < div className="units-container" >
            {
              currentSection?.units.map(unit => {
                const unitProgress = getUnitProgress(unit)
                const offset = circumference - (unitProgress.percentage / 100) * circumference
                const filteredTopics = filterTopics(unit.topics, unit.id)
                const isExpanded = expandedUnits[unit.id]

                if (filteredTopics.length === 0 && searchQuery) return null

                return (
                  <div key={unit.id} className={`unit-card ${isExpanded ? 'expanded' : ''}`}>
                    <div className="unit-header" onClick={() => toggleUnit(unit.id)}>
                      <div className="unit-info">
                        <div className="unit-icon">{unit.icon}</div>
                        <div className="unit-details">
                          <h3 className="tamil">{unit.name}</h3>
                          <span>{unitProgress.completed} / {unitProgress.total} தலைப்புகள் முடிந்தது</span>
                          <div className="unit-meta">
                            <span className="question-badge">{unit.questions} கேள்விகள்</span>
                          </div>
                        </div>
                      </div>
                      <div className="unit-stats">
                        <div className="unit-progress">
                          <svg width="50" height="50">
                            <circle className="bg" cx="25" cy="25" r="20" strokeDasharray={circumference} />
                            <circle className="progress" cx="25" cy="25" r="20"
                              strokeDasharray={circumference}
                              strokeDashoffset={offset} />
                          </svg>
                          <span className="unit-progress-text">{unitProgress.percentage}%</span>
                        </div>
                        <span className="expand-icon">{isExpanded ? '▲' : '▼'}</span>
                      </div>
                    </div>
                    <div className="topics-container">
                      <div className="topics-list">
                        {unit.topics.map((topic, index) => {
                          const topicId = `${unit.id}-${index}`
                          const isCompleted = progress[topicId]
                          const matchesFilter = filter === 'all' ||
                            (filter === 'completed' && isCompleted) ||
                            (filter === 'pending' && !isCompleted)
                          const matchesSearch = searchQuery === '' ||
                            topic.ta.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            topic.en.toLowerCase().includes(searchQuery.toLowerCase())

                          if (!matchesFilter || !matchesSearch) return null

                          return (
                            <div
                              key={topicId}
                              className={`topic-item ${isCompleted ? 'completed' : ''}`}
                              onClick={() => toggleTopic(topicId)}
                            >
                              <div className="topic-checkbox">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </div>
                              <div className="topic-text">
                                {(language === 'ta' || language === 'both') && (
                                  <span className="tamil-text tamil">{topic.ta}</span>
                                )}
                                {(language === 'en' || language === 'both') && (
                                  <span className="english-text">{topic.en}</span>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div >

          {/* Footer */}
          < footer className="footer" >
            <button
              className={`action-btn save-btn ${saving ? 'saving' : ''} ${saveSuccess ? 'success' : ''}`}
              onClick={saveProgress}
              disabled={saving}
            >
              {saving ? '⏳ Saving...' : saveSuccess ? '✅ Saved!' : '💾 Save Progress'}
            </button>
            <button className="action-btn export-btn" onClick={exportProgress}>
              📥 Export Report
            </button>
            <button className="action-btn reset-btn" onClick={() => setShowResetConfirm(true)}>
              🔄 Reset All
            </button>
          </footer>

          {/* Reset Confirmation Modal */}
          {showResetConfirm && (
            <div className="modal-overlay" onClick={() => setShowResetConfirm(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-icon">⚠️</div>
                <h2>முன்னேற்றத்தை அழிக்கவா?</h2>
                <p className="modal-subtitle">Reset All Progress?</p>
                <p className="modal-text">
                  இந்த செயலை மீட்டெடுக்க முடியாது. அனைத்து தலைப்புகளின் முன்னேற்றமும் அழிக்கப்படும்.
                </p>
                <p className="modal-text-en">
                  This action cannot be undone. All topic progress will be permanently deleted.
                </p>
                <div className="modal-buttons">
                  <button className="modal-btn cancel-btn" onClick={() => setShowResetConfirm(false)}>
                    ❌ Cancel / ரத்து
                  </button>
                  <button className="modal-btn confirm-btn" onClick={resetProgress}>
                    🗑️ Reset / அழி
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {/* Floating Planner Button */}
      <button
        className={`floating-planner-btn ${currentView === 'planner' ? 'active' : ''}`}
        onClick={() => setCurrentView(currentView === 'planner' ? 'syllabus' : 'planner')}
      >
        <span className="planner-icon">📅</span>
        <span className="planner-text">திட்டமிடல்</span>
      </button>
    </div>
  )
}

export default App
