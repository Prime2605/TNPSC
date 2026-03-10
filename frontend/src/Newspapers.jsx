import { useState, useEffect } from 'react'
import './Newspapers.css'

const API_URL = import.meta.env.VITE_API_URL || '/api'

function Newspapers({ onBack }) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchNewspapers()
    }, [])

    const fetchNewspapers = async () => {
        try {
            const res = await fetch(`${API_URL}/newspapers`)
            const newsData = await res.json()
            setData(newsData)
        } catch (error) {
            console.error('Error fetching newspapers:', error)
        } finally {
            setLoading(false)
        }
    }

    const openNewspaper = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    if (loading) {
        return (
            <div className="newspapers-loading">
                <div className="spinner"></div>
                <p>செய்தித்தாள்களை ஏற்றுகிறது... / Loading newspapers...</p>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="newspapers-error">
                <p>❌ செய்தித்தாள்களை ஏற்ற முடியவில்லை / Failed to load newspapers</p>
                <button onClick={onBack}>← Back</button>
            </div>
        )
    }

    return (
        <div className="newspapers-container">
            <div className="newspapers-header">
                <button className="back-btn" onClick={onBack}>
                    ← பாடத்திட்டம் / Syllabus
                </button>
                <div className="newspapers-title">
                    <h2>📰 {data.title}</h2>
                    <p>{data.titleEn}</p>
                </div>
            </div>

            {/* Description */}
            <div className="newspapers-intro">
                <div className="intro-icon">💡</div>
                <div className="intro-content">
                    <p className="intro-tamil">{data.description.ta}</p>
                    <p className="intro-english">{data.description.en}</p>
                </div>
            </div>

            {/* Tips Section */}
            <div className="tips-section">
                <h3>📌 படிப்பதற்கான குறிப்புகள் / Reading Tips</h3>
                <div className="tips-grid">
                    {data.tips.map((tip, idx) => (
                        <div key={idx} className="tip-card">
                            <p className="tip-tamil">{tip.ta}</p>
                            <p className="tip-english">{tip.en}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* News Categories */}
            {data.categories.map(category => (
                <div key={category.id} className="category-section">
                    <h3 className="category-title">
                        <span className="category-badge">{category.nameTa}</span>
                        {category.name}
                    </h3>

                    <div className="papers-grid">
                        {category.papers.map(paper => (
                            <div
                                key={paper.id}
                                className={`paper-card ${paper.recommended ? 'recommended' : ''}`}
                                onClick={() => openNewspaper(paper.url)}
                                style={{ '--paper-color': paper.color }}
                            >
                                {paper.recommended && (
                                    <div className="recommended-badge">⭐ Recommended</div>
                                )}

                                <div className="paper-header">
                                    <span className="paper-icon">{paper.icon}</span>
                                    <div className="paper-info">
                                        <h4>{paper.name}</h4>
                                        <p className="paper-name-tamil">{paper.nameTa}</p>
                                    </div>
                                </div>

                                <div className="paper-description">
                                    <p>{paper.descriptionTa}</p>
                                    <p className="desc-english">{paper.description}</p>
                                </div>

                                <div className="paper-action">
                                    <span>🔗 வலைதளத்தைத் திற / Open Website</span>
                                    <span className="arrow">→</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Newspapers
