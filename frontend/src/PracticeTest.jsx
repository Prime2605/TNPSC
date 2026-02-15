import { useState, useEffect } from 'react'
import './PracticeTest.css'

const API_URL = '/api'

function PracticeTest({ onBack }) {
    const [tests, setTests] = useState([])
    const [currentTest, setCurrentTest] = useState(null)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState({})
    const [showResults, setShowResults] = useState(false)
    const [timeLeft, setTimeLeft] = useState(0)
    const [testStarted, setTestStarted] = useState(false)

    useEffect(() => {
        fetchTests()
    }, [])

    useEffect(() => {
        if (testStarted && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1)
            }, 1000)
            return () => clearInterval(timer)
        } else if (timeLeft === 0 && testStarted) {
            handleSubmit()
        }
    }, [timeLeft, testStarted])

    const fetchTests = async () => {
        try {
            const res = await fetch(`${API_URL}/practice-tests`)
            const data = await res.json()
            setTests(data.tests || [])
        } catch (error) {
            console.error('Error fetching tests:', error)
        }
    }

    const startTest = (test) => {
        setCurrentTest(test)
        setCurrentQuestion(0)
        setAnswers({})
        setShowResults(false)
        setTimeLeft(test.duration * 60)
        setTestStarted(true)
    }

    const getAllQuestions = () => {
        if (!currentTest) return []
        return currentTest.sections.flatMap(section =>
            section.questions.map(q => ({ ...q, sectionName: section.name }))
        )
    }

    const handleAnswer = (questionId, answerId) => {
        setAnswers(prev => ({ ...prev, [questionId]: answerId }))
    }

    const handleSubmit = async () => {
        setTestStarted(false)
        setShowResults(true)

        // Calculate score
        const questions = getAllQuestions()
        let correct = 0
        questions.forEach(q => {
            if (answers[q.id] === q.answer) correct++
        })

        // Save results
        try {
            await fetch(`${API_URL}/test-results`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    testId: currentTest.id,
                    testName: currentTest.name,
                    score: correct,
                    total: questions.length,
                    percentage: Math.round((correct / questions.length) * 100),
                    date: new Date().toISOString(),
                    answers
                })
            })
        } catch (error) {
            console.error('Error saving results:', error)
        }
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    // Test List View
    if (!currentTest) {
        return (
            <div className="practice-test-container">
                <div className="practice-header">
                    <button className="back-btn" onClick={onBack}>
                        ← பாடத்திட்டம் / Syllabus
                    </button>
                    <h2>📝 மாதிரி தேர்வு / Practice Tests</h2>
                </div>

                <div className="test-list">
                    {tests.map(test => (
                        <div key={test.id} className="test-card">
                            <div className="test-info">
                                <h3>{test.name}</h3>
                                <p>{test.nameEn}</p>
                                <div className="test-meta">
                                    <span>📊 {test.totalQuestions} கேள்விகள்</span>
                                    <span>⏱️ {test.duration} நிமிடங்கள்</span>
                                </div>
                            </div>
                            <button className="start-test-btn" onClick={() => startTest(test)}>
                                🚀 தேர்வு தொடங்கு / Start Test
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const questions = getAllQuestions()
    const question = questions[currentQuestion]

    // Results View
    if (showResults) {
        let correct = 0
        questions.forEach(q => {
            if (answers[q.id] === q.answer) correct++
        })
        const percentage = Math.round((correct / questions.length) * 100)

        return (
            <div className="practice-test-container">
                <div className="results-container">
                    <h2>📊 தேர்வு முடிவுகள் / Test Results</h2>

                    <div className={`score-display ${percentage >= 60 ? 'pass' : 'fail'}`}>
                        <div className="score-circle">
                            <span className="score-number">{percentage}%</span>
                            <span className="score-label">{correct}/{questions.length}</span>
                        </div>
                        <p className="score-message">
                            {percentage >= 80 ? '🎉 அருமை! Excellent!' :
                                percentage >= 60 ? '👍 நல்லது! Good!' :
                                    '📚 மேலும் படிக்கவும் / Keep studying!'}
                        </p>
                    </div>

                    <div className="answers-review">
                        <h3>📋 விடை விளக்கம் / Answer Review</h3>
                        {questions.map((q, idx) => (
                            <div key={q.id} className={`review-item ${answers[q.id] === q.answer ? 'correct' : 'wrong'}`}>
                                <div className="review-header">
                                    <span className="q-number">Q{idx + 1}</span>
                                    <span className={`status ${answers[q.id] === q.answer ? 'correct' : 'wrong'}`}>
                                        {answers[q.id] === q.answer ? '✅' : '❌'}
                                    </span>
                                </div>
                                <p className="q-text">{q.question.ta}</p>
                                <div className="answer-info">
                                    <p><strong>உங்கள் பதில்:</strong> {answers[q.id] || 'பதில் இல்லை'}</p>
                                    <p><strong>சரியான பதில்:</strong> {q.answer}</p>
                                </div>
                                <div className="explanation">
                                    <strong>விளக்கம்:</strong> {q.explanation.ta}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="result-actions">
                        <button className="retry-btn" onClick={() => startTest(currentTest)}>
                            🔄 மீண்டும் எழுது / Retry
                        </button>
                        <button className="back-to-list-btn" onClick={() => setCurrentTest(null)}>
                            📋 தேர்வு பட்டியல் / Test List
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Question View
    return (
        <div className="practice-test-container">
            <div className="test-header">
                <div className="test-title">
                    <h2>{currentTest.name}</h2>
                    <span className="question-counter">
                        கேள்வி {currentQuestion + 1} / {questions.length}
                    </span>
                </div>
                <div className={`timer ${timeLeft < 60 ? 'warning' : ''}`}>
                    ⏱️ {formatTime(timeLeft)}
                </div>
            </div>

            <div className="progress-bar-test">
                <div
                    className="progress-fill"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
            </div>

            <div className="question-card">
                <div className="section-badge">{question.sectionName}</div>
                <div className="question-text">
                    <p className="tamil">{question.question.ta}</p>
                    <p className="english">{question.question.en}</p>
                </div>

                <div className="options">
                    {question.options.map(option => (
                        <button
                            key={option.id}
                            className={`option-btn ${answers[question.id] === option.id ? 'selected' : ''}`}
                            onClick={() => handleAnswer(question.id, option.id)}
                        >
                            <span className="option-id">{option.id}</span>
                            <span className="option-text">
                                {option.ta}
                                {option.ta !== option.en && <small>{option.en}</small>}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="navigation-buttons">
                <button
                    className="nav-btn prev"
                    onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestion === 0}
                >
                    ← முந்தைய / Previous
                </button>

                {currentQuestion < questions.length - 1 ? (
                    <button
                        className="nav-btn next"
                        onClick={() => setCurrentQuestion(prev => prev + 1)}
                    >
                        அடுத்தது / Next →
                    </button>
                ) : (
                    <button className="nav-btn submit" onClick={handleSubmit}>
                        ✅ சமர்ப்பி / Submit
                    </button>
                )}
            </div>

            <div className="question-dots">
                {questions.map((_, idx) => (
                    <button
                        key={idx}
                        className={`dot ${idx === currentQuestion ? 'active' : ''} ${answers[questions[idx].id] ? 'answered' : ''}`}
                        onClick={() => setCurrentQuestion(idx)}
                    >
                        {idx + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default PracticeTest
