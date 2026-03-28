from dotenv import load_dotenv
load_dotenv()

from flask import Flask, jsonify, request
from flask_cors import CORS
from database import get_db, init_db
import anthropic
import os

app = Flask(__name__)
CORS(app)

# Initialize DB on startup
init_db()

# ─── MENTORS ───────────────────────────────────────────
@app.route('/api/mentors', methods=['GET'])
def get_mentors():
    db = get_db()
    mentors = db.execute('SELECT * FROM mentors').fetchall()
    return jsonify([dict(m) for m in mentors])

# ─── MENTEES ───────────────────────────────────────────
@app.route('/api/mentees', methods=['GET'])
def get_mentees():
    db = get_db()
    mentees = db.execute('SELECT * FROM mentees').fetchall()
    return jsonify([dict(m) for m in mentees])

# ─── ALLOCATIONS ───────────────────────────────────────
@app.route('/api/allocations', methods=['GET'])
def get_allocations():
    db = get_db()
    allocations = db.execute('''
        SELECT a.id, mr.name as mentor_name, mr.department,
               me.name as mentee_name, me.academic_year, a.status,
               MAX(i.date) as last_interaction
        FROM allocations a
        JOIN mentors mr ON a.mentor_id = mr.id
        JOIN mentees me ON a.mentee_id = me.id
        LEFT JOIN interactions i ON a.id = i.allocation_id
        GROUP BY a.id
    ''').fetchall()
    return jsonify([dict(a) for a in allocations])

@app.route('/api/allocations', methods=['POST'])
def add_allocation():
    data = request.json
    db = get_db()
    db.execute('INSERT INTO allocations (mentor_id, mentee_id) VALUES (?, ?)',
               [data['mentor_id'], data['mentee_id']])
    db.commit()
    return jsonify({'message': 'Allocation added!'})

# ─── INTERACTIONS ──────────────────────────────────────
@app.route('/api/interactions', methods=['POST'])
def add_interaction():
    data = request.json
    db = get_db()
    db.execute('''
        INSERT INTO interactions 
        (allocation_id, date, mode, notes, action_items, next_meeting_date)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', [data['allocation_id'], data['date'], data['mode'],
          data['notes'], data['action_items'], data['next_meeting_date']])
    db.commit()
    return jsonify({'message': 'Interaction logged!'})

@app.route('/api/interactions/<int:allocation_id>', methods=['GET'])
def get_interactions(allocation_id):
    db = get_db()
    interactions = db.execute(
        'SELECT * FROM interactions WHERE allocation_id = ?', 
        [allocation_id]
    ).fetchall()
    return jsonify([dict(i) for i in interactions])

# ─── REPORTS ───────────────────────────────────────────
@app.route('/api/reports/mentor/<int:mentor_id>', methods=['GET'])
def mentor_report(mentor_id):
    db = get_db()
    data = db.execute('''
        SELECT mr.name as mentor_name, me.name as mentee_name,
               i.date, i.mode, i.notes, i.action_items
        FROM interactions i
        JOIN allocations a ON i.allocation_id = a.id
        JOIN mentors mr ON a.mentor_id = mr.id
        JOIN mentees me ON a.mentee_id = me.id
        WHERE mr.id = ?
        ORDER BY i.date DESC
    ''', [mentor_id]).fetchall()
    return jsonify([dict(d) for d in data])

# ─── AI INSIGHTS ───────────────────────────────────────
@app.route('/api/ai/insights', methods=['GET'])
def ai_insights():
    db = get_db()
    allocations = db.execute('''
        SELECT mr.name as mentor_name, me.name as mentee_name,
               MAX(i.date) as last_interaction, a.id
        FROM allocations a
        JOIN mentors mr ON a.mentor_id = mr.id
        JOIN mentees me ON a.mentee_id = me.id
        LEFT JOIN interactions i ON a.id = i.allocation_id
        GROUP BY a.id
    ''').fetchall()

    data = [dict(a) for a in allocations]

    client = anthropic.Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))
    message = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": f"""You are analyzing mentor-mentee interactions for a college system.
            Given this data: {data}
            For each pair, classify as 'At Risk' (no interaction in 30+ days), 
            'Needs Attention' (15-30 days), or 'On Track' (within 15 days).
            Return a JSON array with fields: 
            mentor_name, mentee_name, last_interaction, status, suggestion.
            Return ONLY the JSON array, nothing else."""
        }]
    )

    import json
    insights = json.loads(message.content[0].text)
    return jsonify(insights)

if __name__ == '__main__':
    app.run(debug=True, port=5000)