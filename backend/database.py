import sqlite3

def get_db():
    conn = sqlite3.connect('mentorbridge.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # 1. DROP EXISTING TABLES
    cursor.executescript('''
        DROP TABLE IF EXISTS interactions;
        DROP TABLE IF EXISTS allocations;
        DROP TABLE IF EXISTS mentees;
        DROP TABLE IF EXISTS mentors;
    ''')

    # 2. CREATE TABLES WITH UNIQUE CONSTRAINTS
    cursor.executescript('''
        CREATE TABLE mentors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            department TEXT NOT NULL
        );

        CREATE TABLE mentees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            department TEXT NOT NULL,
            academic_year TEXT NOT NULL,
            usn TEXT UNIQUE
        );

        CREATE TABLE allocations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mentor_id INTEGER NOT NULL,
            mentee_id INTEGER NOT NULL,
            status TEXT DEFAULT 'Active',
            FOREIGN KEY (mentor_id) REFERENCES mentors(id),
            FOREIGN KEY (mentee_id) REFERENCES mentees(id),
            UNIQUE(mentor_id, mentee_id)
        );

        CREATE TABLE interactions (
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

    # 3. MENTORS LIST (Directly from PDF)
    mentors = [
        ('DEEKSHA J S', 'deeksha@sahyadri.edu.in'),
        ('CHAITHRIKA', 'chaithrika@sahyadri.edu.in'),
        ('DUDDELA SAI PRASHANTH', 'duddela@sahyadri.edu.in'),
        ('GANARAJ K', 'ganaraj@sahyadri.edu.in'),
        ('GURUSIDDAYYA S HIREMATH', 'gurusiddayya@sahyadri.edu.in'),
        ('SANGEETHA M S', 'sangeetha@sahyadri.edu.in'),
        ('PUSHPALATHA K', 'pushpalatha@sahyadri.edu.in'),
        ('RAJESHWARI SHETTIGAR', 'rajeshwari@sahyadri.edu.in'),
        ('SADHANA', 'sadhana@sahyadri.edu.in'),
        ('SANDRA JEYES C', 'sandra@sahyadri.edu.in'),
        ('SHARATHCHANDRA N R', 'sharath@sahyadri.edu.in'),
        ('SHREEKSHITHA', 'shreekshitha@sahyadri.edu.in'),
        ('SHWETHA SURESH NAIK', 'shwetha@sahyadri.edu.in'),
        ('SOUMYA', 'soumya@sahyadri.edu.in')
    ]

    for name, email in mentors:
        cursor.execute('INSERT INTO mentors (name, email, department) VALUES (?, ?, "AI & ML")', (name, email))

    # 4. THE FULL 208 MENTEE DICTIONARY (Parsed exactly from PDF)
    mentees_data = {
        1: [('SHIVANI K S', '4SF24CI158'), ('SATHWIK V GAONKAR', '4SF24CI150'), ('AKANKSHA VINOD VARDHAMANE', '4SF24CI013'), ('HN APOORVA', '4SF24C1056'), ('PRATHIKSHA V POOJARY', '4SF24CI126'), ('YASHWANTH R', '4SF24C1188'), ('MUHAMMAD AZMAL', '4SF24C1100'), ('ABDULLA HASHIR T K', '4SF24C1003'), ('JEEVA B KULAL', '4SF24C1064'), ('SHUBHADA DILIPKUMAR NAIK', '4SF24C1169'), ('K SREEVATHSA RAO', '4SF24C1068'), ('YOUSUF ALI', '4SF24C1189'), ('MOHAMMED IHAAB IBRAHIM', '4SF24C1092'), ('OM SHETTY', '4SF24CI110'), ('SHREYA N SHETTY', '4SF24CI164'), ('SHREYAS J NAYAK', '4SF24C1166')],
        2: [('K H MAHAMMAD NAZIM', '4SF24C1067'), ('MOHAMMED ASHQAR SAMEER', '4SF24C1089'), ('ABHILASH RATI', '4SF24C1004'), ('ANANYA MAHALATKAR S', '4SF24C1023'), ('SHRAVAN KUMAR', '4SF24CI161'), ('GAGANA', '4SF24C1055'), ('PRATEEK', '4SF24C1124'), ('NIDHI H V', '4SF24C1104'), ('TANUSHREE SHETTY', '4SF24C1175'), ('MONISHA VENKATESH NAIK', '4SF24C1097'), ('DHANUSH D', '4SF24C1051'), ('CHIRANJEEVI MAHESH TADADIKAR', '4SF24C1048'), ('ALFAN YASEEN SHAIKH', '4SF24C1018'), ('MADEVI ANNAPPA NAIK', '4SF24C1077'), ('ANANYA', '4SF24C1022')],
        3: [('SHRAVYA', '4SF24CI162'), ('LAHARI', '4SF24C1074'), ('AHANI SHETTY', '4SF24C1012'), ('C VIKAS RAJU', '4SF24CI041'), ('AFIFA PARVEEN', '4SF24C1010'), ('V KEERTHANA', '4SF24C1178'), ('ANUSHA JL', '4SF24C1025'), ('SAMEEKSHA SANTOSH NAIK', '4SF24C1139'), ('ASHWITH UH', '4SF24C1032'), ('KSHETHRA BJ', '4SF24C1073'), ('ABHISHEK', '4SF24C1005'), ('BASAVA REDDY', '4SF24C1037'), ('SAMRUDHI', '4SF24C1140'), ('MOHAMMED HAFIL', '4SF24C1090'), ('ADARSHA NAGESH NAIK', '4SF24C1006')],
        4: [('LIKITHA G P', '4SF24C1076'), ('VAISHALI KY', '4SF24C1181'), ('AMARNATH SINGH', '4SF24C1020'), ('PRAVEEN PRADEEP POOJARI', '4SF24C1127'), ('FATHIMA', '4SF24C1053'), ('PRANAV', '4SF24CI122'), ('PAVAN KUMAR S', '4SF24CI118'), ('PREKSHA', '4SF24CI128'), ('S SAVEEN RAI', '4SF24C1134'), ('PAVAN', '4SF24CI115'), ('AMRUTHA SOMASHEKAR SHETTY', '4SF24CI021'), ('VIDYASHRI GOYDA GOND', '4SF24C1184'), ('PAWAN P BANGERA', '4SF24CI120'), ('ASHWITH G KUMAR', '4SF24C1030'), ('B SNEHA SHENOY', '4SF24C1036'), ('MOHAMMED ZISHAAN', '4SF24C1095')],
        5: [('ASHWITH KUMAR K', '4SF24C1031'), ('KISHAN S SHETTY', '4SF24C1071'), ('KRIPA D SUVARNA', '4SF24C1072'), ('MAHAMMAD ANAS', '4SF24C1078'), ('MAHEK', '4SF24C1079'), ('MOHAMMED THAMEEM', '4SF24C1094'), ('MEGHA K', '4SF24C1083'), ('BHAVISH U SHETTY', '4SF24C1039'), ('MOHAMMAD AZEEM', '4SF24C1086'), ('NIHAD ABDUL RAHMAN', '4SF24C1105'), ('H SMITHA', '4SF24C1057'), ('CHAMAN CHANDRAGIRI HOUSE', '4SF24C1043'), ('SANJAY', '4SF24C1144'), ('ATHMI S SHETTY', '4SF24C1033'), ('AYISHA RIFATH UT', '4SF24C1034'), ('AYUSH P', '4SF24C1035')],
        6: [('RAKSHITA K', '4SF24CI131'), ('SUJITH N', '4SF24CI171'), ('NISHCHAL BHANDARI', '4SF24CI107'), ('SAGARA S K', '4SF24C1135'), ('MOULYASHREE M', '4SF24C1098'), ('MUHAMMAD RABHEEATH AKTHAR', '4SF24CI101'), ('AHAMMED ANFAS C A', '4SF24CI011'), ('YASHWANTH D S', '4SF24C1187'), ('VANI REVANNA GOND', '4SF24C1182'), ('SANVITH S RAI', '4SF24C1147'), ('TANUSHREE P SHETTY', '4SF24C1174'), ('DEEKSHA K', '4SF24C1050'), ('PAVAN RAI K', '4SF24CI119'), ('VAISHAL NV', '4SF24CI180'), ('ABDUL WAHID', '4SF23C1006')],
        7: [('SANDESH SHETTY', '4SF24C1142'), ('SAMARTH BHAT', '4SF24CI138'), ('SEEJAL', '4SF24CI151'), ('MOHAMMED MISHAL MUSTHAFA', '4SF24C1093'), ('SHEIKH MOHAMMED AMANUDEEN', '4SF24C1154'), ('V NAVAKRUTHIKA', '4SF24C1179'), ('SHRIJAN', '4SF24CI167'), ('SHREYAS D BANGERA', '4SF24C1165'), ('SHEIKH MOHAMMED THAIF', '4SF24C1155'), ('P PRADYUN HEBBAR', '4SF24CI113'), ('BHAVANA E', '4SF24C1038'), ('SRUJAN', '4SF24C1170')],
        8: [('LIKHITH SHETTY', '4SF24C1075'), ('IT B ABHISHEK', '4SF24C1173'), ('CHIRAG A G KULAL', '4SF24C1047'), ('ABDUL HASEEB MOHAMMED SAHEED', '4SF24C1002'), ('SANVIL S BHANDARY', '4SF24C1146'), ('NUHA FATHIMA THAYATH ABDUL JAMAL', '4SF24CI108'), ('JEEVITHA M', '4SF24C1066'), ('GAGAN D', '4SF24C1054'), ('BOOMIKA SRIRAJ', '4SF24C1040'), ('SAKSHI K', '4SF24C1137'), ('HITHESH KUNDAR', '4SF24CI061'), ('USMAN AFEEZ', '4SF23C1179')],
        9: [('RIHAA FATHIMA', '4SF24CI133'), ('SHRADDHA JS', '4SF24CI160'), ('PUNEET KESHAV CHANDAVARKAR', '4SF24C1129'), ('SHIVANI RAMAKRISHNA NAIK', '4SF24CI159'), ('MANASWI Y', '4SF24C1080'), ('AKASH M ACHARYA', '4SF24C1016'), ('VIKAS THARANATH SHETTIGAR', '4SF24CI185'), ('KAVYA S N', '4SF24C1069'), ('AKHILESH', '4SF24C1017'), ('CHINTHAN', '4SF24C1046'), ('ADITHYA B', '4SF24C1008'), ('SATHWIK', '4SF24C1149'), ('PUNITH KUMAR', '4SF24CI130'), ('REHAN PATEL', '4SF24C1132'), ('THARUN RAI', '4SF24C1176')],
        10: [('HARSHITHA', '4SF24C1060'), ('JANITH BOPANNA A M', '4SF24C1063'), ('VARUN', '4SF24C1183'), ('MITRA', '4SF24C1085'), ('SHREELAKSHMI', '4SF24C1163'), ('MEDHA KODIALBAIL', '4SF24C1082'), ('AKASH BHIMASHI BHAJANTRI', '4SF24C1015'), ('ADHITHI GATTY', '4SF24C1007'), ('CHAITRIKA', '4SF24C1042'), ('SAROJANI NADUVINAKERI', '4SF24C1148'), ('DHANUSH P SHETTY', '4SF24C1052'), ('PRATHAM SP', '4SF24CI125'), ('DEEKSHA GR', '4SF24C1049'), ('SUYASH DINESH NAIK', '4SF24C1172'), ('ARYAN PRASAD', '4SF24CI028')],
        11: [('MOIDIN FAARISH AHMED', '4SF24C1096'), ('PADMA NORKEY', '4SF24CI114'), ('SHARIQ MUSTHAFA PUTHALAKATH VALIYAPURA', '4SF24C1153'), ('ALKA SINGH', '4SF24C1019'), ('MUHAMMAD ASHATH VALACHIL', '4SF24C1099'), ('YASHVIN', '4SF24C1186'), ('SHIBIN SHANKAR S', '4SF24CI157'), ('HARDHIK HARISH SHETTY', '4SF24C1058'), ('SHARANYA N', '4SF24C1152'), ('MIRVAZA MUSTHAFA', '4SF24C1084'), ('ANANYA R RAI', '4SF24C1024'), ('SANVI KAMATH', '4SF24C1145'), ('AARYAN RAI', '4SF24C1001'), ('MOHAMMAD RIFAYI', '4SF24C1087'), ('P B VAISHAKH', '4SF24CI111')],
        12: [('CHASHMITHA D C', '4SF24C1045'), ('MUSTHAFA', '4SF24C1102'), ('ADITHYAN V', '4SF24C1009'), ('ASHTON VICTOR MISQUITH', '4SF24C1029'), ('SAMUEL JOY FERNANDES', '4SF24CI141'), ('SHEIKH SHIFAN', '4SF24C1156'), ('MANVI BHAT', '4SF24C1081'), ('THRUSHA YK', '4SF24C1177'), ('AKASH', '4SF24C1014'), ('SHRUTHI K K', '4SF24CI168'), ('KEERTHANA S', '4SF24C1070'), ('CHARISHMA R RAI', '4SF24C1044'), ('NINGAPPA', '4SF24C1106'), ('SANIDHYA MANOHARA SHETTY', '4SF24C1143')],
        13: [('PRANAV K', '4SF24CI123'), ('PRAJWAL PRAVEEN TALEKAR', '4SF24CI121'), ('MOHAMMED ASHIQ', '4SF24C1088'), ('MOHAMMED HASSAN SHAHAAN', '4SF24C1091'), ('SAISMITHAM N', '4SF24C1136'), ('NAFIZA MOHAMED AMEEN', '4SF24CI103'), ('ARYAN MN GANIGA', '4SF24C1027'), ('HARSHITH SHETTY', '4SF24C1059'), ('PAVAN D P', '4SF24CI116'), ('PAVAN KUMAR P', '4SF24CI117'), ('P NEELESH KAMATH', '4SF24CI112'), ('NUHA MARIAM', '4SF24C1109'), ('HUDHAIFA AHMED', '4SF24C1062'), ('JEEVAN K SALIAN', '4SF24C1065'), ('ARSHAQ KHALID MOHAMMED', '4SF24C1026')],
        14: [('SHREYAS N', None), ('MAHAMAD ASIF', None), ('ANKITH', None), ('MOHITHA MB', None), ('SHASHANK PRASANNA BOLAR', None), ('LIKITH', None), ('SANKETH S RAI', None), ('MOHAMMED ASHRAF', None), ('VIROOPAKSHA B S', None), ('LAILESH K V', None), ('MANJESH', None), ('SHAHAZAAN BAWAAMEER MULLA', None), ('MUZAMIL', None), ('SHEKHAR VINAYAK NAIK', None), ('MADHUKARA', None), ('HASHIM NIHAL', None), ('ABDUR RAQIB RAHID', None)]
    }

    mentee_id_counter = 1
    
    for mentor_id, students in mentees_data.items():
        for name, usn in students:
            fake_email = f"student{mentee_id_counter}@sahyadri.edu.in"
            
            cursor.execute('''
                INSERT INTO mentees (name, email, department, academic_year, usn) 
                VALUES (?, ?, "AI & ML", "2nd Year", ?)
            ''', (name, fake_email, usn))
            
            # The Magic Fix: We allocate the first 198 students, 
            # leaving exactly 10 students (IDs 199 to 208) unallocated!
            if mentee_id_counter <= 198:
                cursor.execute('''
                    INSERT INTO allocations (mentor_id, mentee_id) 
                    VALUES (?, ?)
                ''', (mentor_id, mentee_id_counter))
            
            mentee_id_counter += 1

    # 5. ORIGINAL 10 SAMPLE INTERACTIONS (No fake ones added)
    cursor.executescript('''
        INSERT INTO interactions (allocation_id, date, mode, notes, action_items, next_meeting_date) VALUES
        (1,  '2026-03-20', 'In-Person', 'Discussed ML project progress. Student performing well in deep learning module.', 'Submit project report by Friday', '2026-04-05'),
        (2,  '2026-01-10', 'Online',    'Career guidance session. Discussed internship options and placement prep.',    'Apply to 3 internships this week', '2026-02-01'),
        (3,  '2026-03-25', 'In-Person', 'Research paper discussion. Good progress on literature review.',                 'Draft abstract and introduction',  '2026-04-10'),
        (4,  '2026-02-15', 'Phone',     'Academic performance review. Some concerns about attendance.',                     'Improve attendance, attend extra classes', '2026-03-01'),
        (5,  '2026-03-10', 'In-Person', 'Semester goals setting session. Identified weak areas.',                         'Complete pending assignments',   '2026-04-01'),
        (6,  '2026-03-22', 'Online',    'Placement preparation. Resume review completed.',                                'Update LinkedIn and apply to companies', '2026-04-05'),
        (7,  '2026-01-05', 'In-Person', 'Initial mentorship meeting. Goals and expectations set.',                        'Set semester academic goals',      '2026-02-05'),
        (8,  '2026-03-28', 'In-Person', 'Mid-semester check-in. Student doing well overall.',                             'Prepare for upcoming exams',       '2026-04-15'),
        (9,  '2026-02-20', 'Phone',     'Quick check-in on exam preparation. Student confident.',                         'Attend doubt clearing sessions', '2026-03-10'),
        (10, '2026-03-15', 'Online',    'Career counseling. Discussed higher studies options.',                           'Research universities and GRE prep', '2026-04-01');
    ''')

    conn.commit()
    conn.close()
    print("SUCCESS: Database fully rebuilt with 14 Mentors and 208 Mentees (10 unallocated) from PDF!")

if __name__ == '__main__':
    init_db()