import { useState, useEffect } from 'react'
import './StudyPlanner.css'

const API_URL = '/api'

function StudyPlanner({ onBack }) {
    const [config, setConfig] = useState(null)
    const [events, setEvents] = useState([])
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(null)
    const [showEventModal, setShowEventModal] = useState(false)
    const [showNotepad, setShowNotepad] = useState(false)
    const [newEvent, setNewEvent] = useState({
        title: '',
        titleTa: '',
        type: 'study',
        notes: '',
        time: ''
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [configRes, eventsRes] = await Promise.all([
                fetch(`${API_URL}/calendar/config`),
                fetch(`${API_URL}/calendar/events`)
            ])
            const configData = await configRes.json()
            const eventsData = await eventsRes.json()
            setConfig(configData)
            setEvents(eventsData.events || [])
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    const getDaysInMonth = (date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()
        const startingDay = firstDay.getDay()

        const days = []
        // Add empty cells for days before the first day of month
        for (let i = 0; i < startingDay; i++) {
            days.push(null)
        }
        // Add actual days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i))
        }
        return days
    }

    const formatDate = (date) => {
        return date.toISOString().split('T')[0]
    }

    const getEventsForDate = (date) => {
        if (!date) return []
        const dateStr = formatDate(date)
        return events.filter(e => e.date === dateStr)
    }

    const isToday = (date) => {
        if (!date) return false
        const today = new Date()
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
    }

    const navigateMonth = (direction) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1))
    }

    const handleDateClick = (date) => {
        if (!date) return
        setSelectedDate(date)
        setShowNotepad(true)
    }

    const openAddEvent = () => {
        setNewEvent({
            title: '',
            titleTa: '',
            type: 'study',
            notes: '',
            time: ''
        })
        setShowEventModal(true)
    }

    const handleAddEvent = async () => {
        if (!newEvent.title || !selectedDate) return

        const event = {
            id: `event-${Date.now()}`,
            ...newEvent,
            date: formatDate(selectedDate),
            createdAt: new Date().toISOString()
        }

        try {
            await fetch(`${API_URL}/calendar/events`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(event)
            })
            setEvents([...events, event])
            setShowEventModal(false)
        } catch (error) {
            console.error('Error adding event:', error)
        }
    }

    const handleDeleteEvent = async (eventId) => {
        try {
            await fetch(`${API_URL}/calendar/events/${eventId}`, {
                method: 'DELETE'
            })
            setEvents(events.filter(e => e.id !== eventId))
        } catch (error) {
            console.error('Error deleting event:', error)
        }
    }

    const getEventType = (typeId) => {
        return config?.eventTypes.find(t => t.id === typeId) || config?.eventTypes[0]
    }

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    const monthNamesTa = [
        'ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்',
        'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'
    ]
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    if (loading) {
        return (
            <div className="planner-loading">
                <div className="spinner"></div>
                <p>திட்டமிடலை ஏற்றுகிறது... / Loading planner...</p>
            </div>
        )
    }

    const days = getDaysInMonth(currentDate)
    const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []

    return (
        <div className="planner-container">
            <div className="planner-header">
                <button className="back-btn" onClick={onBack}>
                    ← பாடத்திட்டம் / Syllabus
                </button>
                <div className="planner-title">
                    <h2>📅 {config?.title}</h2>
                    <p>{config?.titleEn}</p>
                </div>
            </div>

            {/* Introduction */}
            <div className="planner-intro">
                <div className="intro-icon">💡</div>
                <div className="intro-content">
                    <p className="intro-tamil">{config?.description.ta}</p>
                    <p className="intro-english">{config?.description.en}</p>
                </div>
            </div>

            <div className="planner-layout">
                {/* Calendar */}
                <div className="calendar-section">
                    <div className="calendar-nav">
                        <button onClick={() => navigateMonth(-1)}>◀</button>
                        <div className="month-year">
                            <span className="month-ta">{monthNamesTa[currentDate.getMonth()]}</span>
                            <span className="month-en">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
                        </div>
                        <button onClick={() => navigateMonth(1)}>▶</button>
                    </div>

                    <div className="calendar-grid">
                        {dayNames.map(day => (
                            <div key={day} className="day-header">{day}</div>
                        ))}
                        {days.map((date, idx) => {
                            const dayEvents = getEventsForDate(date)
                            const isSelected = selectedDate && date && formatDate(selectedDate) === formatDate(date)
                            return (
                                <div
                                    key={idx}
                                    className={`day-cell ${!date ? 'empty' : ''} ${isToday(date) ? 'today' : ''} ${isSelected ? 'selected' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}
                                    onClick={() => handleDateClick(date)}
                                >
                                    {date && (
                                        <>
                                            <span className="day-number">{date.getDate()}</span>
                                            {dayEvents.length > 0 && (
                                                <div className="event-dots">
                                                    {dayEvents.slice(0, 3).map((e, i) => (
                                                        <span
                                                            key={i}
                                                            className="event-dot"
                                                            style={{ background: getEventType(e.type)?.color }}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {/* Event Type Legend */}
                    <div className="event-legend">
                        {config?.eventTypes.map(type => (
                            <div key={type.id} className="legend-item">
                                <span className="legend-dot" style={{ background: type.color }}></span>
                                <span>{type.icon} {type.nameTa}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notepad / Day View */}
                {showNotepad && selectedDate && (
                    <div className="notepad-section">
                        <div className="notepad-header">
                            <h3>
                                📝 {selectedDate.getDate()} {monthNamesTa[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                            </h3>
                            <button className="close-btn" onClick={() => setShowNotepad(false)}>✕</button>
                        </div>

                        <button className="add-event-btn" onClick={openAddEvent}>
                            ➕ நிகழ்வு சேர் / Add Event
                        </button>

                        {selectedDateEvents.length === 0 ? (
                            <div className="no-events">
                                <span className="no-events-icon">📭</span>
                                <p>இந்த நாளில் நிகழ்வுகள் இல்லை</p>
                                <p className="en">No events on this day</p>
                            </div>
                        ) : (
                            <div className="events-list">
                                {selectedDateEvents.map(event => {
                                    const eventType = getEventType(event.type)
                                    return (
                                        <div
                                            key={event.id}
                                            className="event-card"
                                            style={{ '--event-color': eventType?.color }}
                                        >
                                            <div className="event-header">
                                                <span className="event-type-icon">{eventType?.icon}</span>
                                                <div className="event-info">
                                                    <h4>{event.title}</h4>
                                                    {event.titleTa && <p>{event.titleTa}</p>}
                                                    {event.time && <span className="event-time">🕐 {event.time}</span>}
                                                </div>
                                                <button
                                                    className="delete-event-btn"
                                                    onClick={() => handleDeleteEvent(event.id)}
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                            {event.notes && (
                                                <div className="event-notes">
                                                    <strong>📌 Notes:</strong>
                                                    <p>{event.notes}</p>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Add Event Modal */}
            {showEventModal && (
                <div className="modal-overlay" onClick={() => setShowEventModal(false)}>
                    <div className="event-modal" onClick={e => e.stopPropagation()}>
                        <h3>➕ புதிய நிகழ்வு / New Event</h3>

                        <div className="form-group">
                            <label>Event Title (English)</label>
                            <input
                                type="text"
                                value={newEvent.title}
                                onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                                placeholder="e.g., Study Tamil Grammar"
                            />
                        </div>

                        <div className="form-group">
                            <label>தலைப்பு (Tamil - Optional)</label>
                            <input
                                type="text"
                                value={newEvent.titleTa}
                                onChange={e => setNewEvent({ ...newEvent, titleTa: e.target.value })}
                                placeholder="எ.கா., தமிழ் இலக்கணம் படிக்க"
                            />
                        </div>

                        <div className="form-group">
                            <label>Event Type / வகை</label>
                            <div className="type-selector">
                                {config?.eventTypes.map(type => (
                                    <button
                                        key={type.id}
                                        className={`type-btn ${newEvent.type === type.id ? 'active' : ''}`}
                                        style={{ '--type-color': type.color }}
                                        onClick={() => setNewEvent({ ...newEvent, type: type.id })}
                                    >
                                        {type.icon} {type.nameTa}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Time / நேரம் (Optional)</label>
                            <input
                                type="time"
                                value={newEvent.time}
                                onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Notes / குறிப்புகள்</label>
                            <textarea
                                value={newEvent.notes}
                                onChange={e => setNewEvent({ ...newEvent, notes: e.target.value })}
                                placeholder="Add your notes here... / இங்கே குறிப்புகளை எழுதுங்கள்..."
                                rows={4}
                            />
                        </div>

                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={() => setShowEventModal(false)}>
                                ❌ Cancel / ரத்து
                            </button>
                            <button className="save-btn" onClick={handleAddEvent}>
                                ✅ Save / சேமி
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default StudyPlanner
