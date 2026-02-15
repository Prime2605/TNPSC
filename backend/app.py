from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from syllabus_data import SYLLABUS_DATA
from practice_tests import PRACTICE_TESTS
from textbooks_data import TEXTBOOKS_DATA
from newspapers_data import NEWSPAPERS_DATA
from calendar_data import CALENDAR_DATA

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROGRESS_FILE = os.path.join(BASE_DIR, 'progress.json')
TEST_RESULTS_FILE = os.path.join(BASE_DIR, 'test_results.json')
CALENDAR_EVENTS_FILE = os.path.join(BASE_DIR, 'calendar_events.json')

def load_progress():
    if os.path.exists(PROGRESS_FILE):
        try:
            with open(PROGRESS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

def save_progress(data):
    with open(PROGRESS_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def load_test_results():
    if os.path.exists(TEST_RESULTS_FILE):
        with open(TEST_RESULTS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"results": []}

def save_test_results(data):
    with open(TEST_RESULTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

@app.route('/api/syllabus', methods=['GET'])
def get_syllabus():
    return jsonify(SYLLABUS_DATA)

@app.route('/api/progress', methods=['GET'])
def get_progress():
    return jsonify(load_progress())

@app.route('/api/progress', methods=['POST'])
def update_progress():
    data = request.json
    save_progress(data)
    return jsonify({'success': True})

@app.route('/api/progress/toggle', methods=['POST'])
def toggle_topic():
    data = request.json
    topic_id = data.get('topicId')
    progress = load_progress()
    progress[topic_id] = not progress.get(topic_id, False)
    save_progress(progress)
    return jsonify({'success': True, 'completed': progress[topic_id]})

@app.route('/api/progress/reset', methods=['POST'])
def reset_progress():
    save_progress({})
    return jsonify({'success': True})

# Practice Test APIs
@app.route('/api/practice-tests', methods=['GET'])
def get_practice_tests():
    return jsonify(PRACTICE_TESTS)

@app.route('/api/practice-tests/<test_id>', methods=['GET'])
def get_practice_test(test_id):
    for test in PRACTICE_TESTS['tests']:
        if test['id'] == test_id:
            return jsonify(test)
    return jsonify({'error': 'Test not found'}), 404

@app.route('/api/test-results', methods=['GET'])
def get_test_results():
    return jsonify(load_test_results())

@app.route('/api/test-results', methods=['POST'])
def save_test_result():
    data = request.json
    results = load_test_results()
    results['results'].append(data)
    save_test_results(results)
    return jsonify({'success': True})

# Textbooks API
@app.route('/api/textbooks', methods=['GET'])
def get_textbooks():
    return jsonify(TEXTBOOKS_DATA)

# Newspapers API
@app.route('/api/newspapers', methods=['GET'])
def get_newspapers():
    return jsonify(NEWSPAPERS_DATA)

# Calendar APIs
def load_calendar_events():
    if os.path.exists(CALENDAR_EVENTS_FILE):
        with open(CALENDAR_EVENTS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"events": []}

def save_calendar_events(data):
    with open(CALENDAR_EVENTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

@app.route('/api/calendar/config', methods=['GET'])
def get_calendar_config():
    return jsonify(CALENDAR_DATA)

@app.route('/api/calendar/events', methods=['GET'])
def get_calendar_events():
    return jsonify(load_calendar_events())

@app.route('/api/calendar/events', methods=['POST'])
def add_calendar_event():
    data = request.json
    events = load_calendar_events()
    events['events'].append(data)
    save_calendar_events(events)
    return jsonify({'success': True, 'event': data})

@app.route('/api/calendar/events/<event_id>', methods=['DELETE'])
def delete_calendar_event(event_id):
    events = load_calendar_events()
    events['events'] = [e for e in events['events'] if e.get('id') != event_id]
    save_calendar_events(events)
    return jsonify({'success': True})

@app.route('/api/calendar/events/<event_id>', methods=['PUT'])
def update_calendar_event(event_id):
    data = request.json
    events = load_calendar_events()
    for i, event in enumerate(events['events']):
        if event.get('id') == event_id:
            events['events'][i] = data
            break
    save_calendar_events(events)
    return jsonify({'success': True, 'event': data})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
