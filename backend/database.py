import sqlite3

def get_db():
    conn = sqlite3.connect('mentorbridge.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    cursor.executescript('''
        CREATE TABLE IF NOT EXISTS mentors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            department TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS mentees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            department TEXT NOT NULL,
            academic_year TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS allocations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mentor_id INTEGER NOT NULL,
            mentee_id INTEGER NOT NULL,
            status TEXT DEFAULT 'Active',
            FOREIGN KEY (mentor_id) REFERENCES mentors(id),
            FOREIGN KEY (mentee_id) REFERENCES mentees(id)
        );

        CREATE TABLE IF NOT EXISTS interactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            allocation_id INTEGER NOT NULL,
            date TEXT NOT NULL,
            mode TEXT NOT NULL,
            notes TEXT,
            action_items TEXT,
            next_meeting_date TEXT,
            FOREIGN KEY (allocation_id) REFERENCES allocations(id)
        );
    ''')

    # Insert sample data
    cursor.executescript('''
        INSERT OR IGNORE INTO mentors (name, email, department) VALUES
        ('Dr. Rajesh Kumar', 'rajesh@sahyadri.edu', 'Computer Science'),
        ('Prof. Priya Nair', 'priya@sahyadri.edu', 'Electronics'),
        ('Dr. Suresh Rao', 'suresh@sahyadri.edu', 'Mechanical');

        INSERT OR IGNORE INTO mentees (name, email, department, academic_year) VALUES
        ('Aditya Sharma', 'aditya@sahyadri.edu', 'Computer Science', '2nd Year'),
        ('Sneha Patel', 'sneha@sahyadri.edu', 'Electronics', '3rd Year'),
        ('Vikram Singh', 'vikram@sahyadri.edu', 'Mechanical', '1st Year');
    ''')

    conn.commit()
    conn.close()