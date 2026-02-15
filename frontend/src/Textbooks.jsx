import { useState, useEffect } from 'react'
import './Textbooks.css'

const API_URL = '/api'

function Textbooks({ onBack }) {
    const [textbooks, setTextbooks] = useState(null)
    const [selectedClass, setSelectedClass] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchTextbooks()
    }, [])

    const fetchTextbooks = async () => {
        try {
            const res = await fetch(`${API_URL}/textbooks`)
            const data = await res.json()
            setTextbooks(data)
            // Default to 10th standard (most important for TNPSC)
            const class10 = data.classes.find(c => c.class === 10)
            if (class10) setSelectedClass(class10)
        } catch (error) {
            console.error('Error fetching textbooks:', error)
        } finally {
            setLoading(false)
        }
    }

    // Open the Samacheer Kalvi Guru website
    const openTextbookWebsite = () => {
        if (textbooks?.redirectUrl) {
            window.open(textbooks.redirectUrl, '_blank', 'noopener,noreferrer')
        }
    }

    if (loading) {
        return (
            <div className="textbooks-loading">
                <div className="spinner"></div>
                <p>பாடநூல்களை ஏற்றுகிறது... / Loading textbooks...</p>
            </div>
        )
    }

    if (!textbooks) {
        return (
            <div className="textbooks-error">
                <p>❌ பாடநூல்களை ஏற்ற முடியவில்லை / Failed to load textbooks</p>
                <button onClick={onBack}>← Back</button>
            </div>
        )
    }

    return (
        <div className="textbooks-container">
            <div className="textbooks-header">
                <button className="back-btn" onClick={onBack}>
                    ← பாடத்திட்டம் / Syllabus
                </button>
                <div className="textbooks-title">
                    <h2>📚 {textbooks.title}</h2>
                    <p>{textbooks.titleEn}</p>
                </div>
            </div>

            {/* Important Note */}
            <div className="textbooks-note">
                <div className="note-icon">💡</div>
                <div className="note-content">
                    <p className="note-tamil">{textbooks.note.ta}</p>
                    <p className="note-english">{textbooks.note.en}</p>
                </div>
            </div>

            {/* Class Selector */}
            <div className="class-selector">
                <h3>வகுப்பைத் தேர்வு செய்க / Select Class</h3>
                <div className="class-grid">
                    {textbooks.classes.map(cls => (
                        <button
                            key={cls.id}
                            className={`class-btn ${selectedClass?.id === cls.id ? 'active' : ''} ${cls.highlight ? 'highlight' : ''}`}
                            onClick={() => setSelectedClass(cls)}
                        >
                            <span className="class-number">{cls.class}</span>
                            <span className="class-label">{cls.nameEn}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Subject List */}
            {selectedClass && (
                <div className="subjects-section">
                    <h3 className="section-title">
                        <span className="class-badge">{selectedClass.name}</span>
                        பாட புத்தகங்கள் / Textbooks
                    </h3>

                    <div className="subjects-grid">
                        {selectedClass.subjects.map(subject => (
                            <div
                                key={subject.id}
                                className="subject-card clickable"
                                onClick={openTextbookWebsite}
                            >
                                <div className="subject-header">
                                    <span className="subject-icon">{subject.icon}</span>
                                    <div className="subject-info">
                                        <h4>{subject.name}</h4>
                                        <p>{subject.nameEn}</p>
                                    </div>
                                </div>

                                <div className="click-hint">
                                    <span>📥 Click to view / பார்க்க கிளிக் செய்க</span>
                                    <span className="arrow">→</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Official Source Link */}
            <div className="source-info">
                <p>All textbooks available at / அனைத்து பாடநூல்களும் இங்கே:</p>
                <a href={textbooks.source} target="_blank" rel="noopener noreferrer" className="source-link">
                    🌐 Samacheer Kalvi Guru
                </a>
                <button className="open-website-btn" onClick={openTextbookWebsite}>
                    📚 Open Textbooks Website / பாடநூல் வலைதளத்தைத் திற
                </button>
            </div>
        </div>
    )
}

export default Textbooks
