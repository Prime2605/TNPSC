# Calendar Events Data Storage
# Events and notes for study planning

CALENDAR_DATA = {
    "title": "படிப்பு திட்டமிடல்",
    "titleEn": "Study Planner",
    "description": {
        "ta": "உங்கள் படிப்பு அட்டவணையை திட்டமிடுங்கள். முக்கிய தேதிகள், தேர்வுகள் மற்றும் குறிப்புகளை சேமிக்கவும்.",
        "en": "Plan your study schedule. Save important dates, exams and notes."
    },
    "defaultEvents": [
        {
            "id": "tnpsc-exam",
            "title": "TNPSC Group 4 Exam",
            "titleTa": "TNPSC குரூப் 4 தேர்வு",
            "type": "exam",
            "color": "#dc2626",
            "icon": "📝"
        }
    ],
    "eventTypes": [
        {"id": "exam", "name": "Exam", "nameTa": "தேர்வு", "color": "#dc2626", "icon": "📝"},
        {"id": "study", "name": "Study", "nameTa": "படிப்பு", "color": "#10b981", "icon": "📚"},
        {"id": "revision", "name": "Revision", "nameTa": "திருப்புதல்", "color": "#8b5cf6", "icon": "🔄"},
        {"id": "practice", "name": "Practice Test", "nameTa": "பயிற்சி தேர்வு", "color": "#f59e0b", "icon": "✍️"},
        {"id": "deadline", "name": "Deadline", "nameTa": "கடைசி நாள்", "color": "#ef4444", "icon": "⏰"},
        {"id": "other", "name": "Other", "nameTa": "பிற", "color": "#6366f1", "icon": "📌"}
    ]
}
