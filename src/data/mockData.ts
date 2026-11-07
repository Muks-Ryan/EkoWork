import {
  Institution,
  User,
  Course,
  StudentWorkItem,
  Submission,
  LearningResource,
  AcademicRecord,
  TimetableEvent,
  ServiceTicket
} from '../types';

export const mockInstitutions: Institution[] = [
  {
    id: 'inst-mak',
    name: 'Makerere University',
    shortName: 'Makerere',
    code: 'MAK',
    logo: '🎓',
    tagline: 'We Build For The Future',
    location: 'Kampala, Uganda',
    campuses: ['Main Campus (Makerere Hill)', 'Kabanyolo Campus', 'JinJa Campus'],
    faculties: [
      'School of Computing & Informatics',
      'Faculty of Engineering & Design',
      'School of Business & Management',
      'Faculty of Health Sciences'
    ],
    academicYear: '2026/2027',
    semester: 'Semester II'
  },
  {
    id: 'inst-eko',
    name: 'Eko Institute of Technology',
    shortName: 'EkoTech',
    code: 'EKO',
    logo: '⚡',
    tagline: 'Empowering African Digital Innovation',
    location: 'Lagos & Virtual Campus',
    campuses: ['Victoria Island Innovation Hub', 'Yaba Digital Center'],
    faculties: [
      'Faculty of Interactive Systems',
      'School of Software & AI',
      'School of Digital Product Management'
    ],
    academicYear: '2026/2027',
    semester: 'Trimester 1'
  },
  {
    id: 'inst-cuu',
    name: 'Cavendish University',
    shortName: 'Cavendish',
    code: 'CUU',
    logo: '🏛️',
    tagline: 'Success Begins at Cavendish',
    location: 'Ggaba Road, Kampala',
    campuses: ['Kingsgate Campus', 'Ssebagala Campus'],
    faculties: [
      'Faculty of Science & Technology',
      'Faculty of Business & Information Tech',
      'Faculty of Socio-Economic Sciences'
    ],
    academicYear: '2026/2027',
    semester: 'Semester II'
  }
];

export const mockUsers: Record<string, User> = {
  lecturer: {
    id: 'usr-lec-1',
    name: 'Heimaux Ronald',
    email: 'heimaux.ronald@mak.ac.ug',
    role: 'lecturer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    institutionId: 'inst-mak',
    department: 'Department of Interactive Design & HCI',
    identifier: 'STAFF-MAK-4491',
    title: 'Senior Lecturer & Course Director'
  },
  student: {
    id: 'usr-stu-1',
    name: 'Aine Sarah',
    email: 'aine.sarah@students.mak.ac.ug',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
    institutionId: 'inst-mak',
    department: 'Software Engineering & HCI',
    identifier: '22/U/10492/PS',
    title: 'Year 3 Undergraduate'
  },
  admin: {
    id: 'usr-adm-1',
    name: 'Dr. Kigozi Edward',
    email: 'kigozi.academic@mak.ac.ug',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    institutionId: 'inst-mak',
    department: 'Directorate of Academic Affairs & Systems',
    identifier: 'ADMIN-SYS-001',
    title: 'Academic Registrar & Institutional Admin'
  }
};

export const mockCourses: Course[] = [
  {
    id: 'crs-1',
    code: 'DES-301',
    name: 'Design Training Camp',
    faculty: 'School of Computing & Informatics',
    department: 'Department of Interactive Design & HCI',
    credits: 4,
    semester: 'Semester II',
    lecturerName: 'Heimaux Ronald',
    lecturerId: 'usr-lec-1',
    enrolledStudents: 80,
    description: 'Intensive studio course covering interface systems, typography, design tokens, and usable component architectures.',
    schedule: 'Mondays & Wednesdays · 10:00 - 12:00',
    room: 'Design Studio Lab 3B',
    progressPercent: 68
  },
  {
    id: 'crs-2',
    code: 'HCI-304',
    name: 'Interactive Course',
    faculty: 'School of Computing & Informatics',
    department: 'Department of Interactive Design & HCI',
    credits: 3,
    semester: 'Semester II',
    lecturerName: 'Heimaux Ronald',
    lecturerId: 'usr-lec-1',
    enrolledStudents: 65,
    description: 'Human-computer interaction principles, cognitive walkthroughs, state machines, and empirical usability evaluations.',
    schedule: 'Tuesdays & Thursdays · 14:00 - 16:00',
    room: 'Informatics Hall 2',
    progressPercent: 52
  },
  {
    id: 'crs-3',
    code: 'CSC-310',
    name: 'Software Engineering II',
    faculty: 'School of Computing & Informatics',
    department: 'Department of Computer Science',
    credits: 4,
    semester: 'Semester II',
    lecturerName: 'Dr. Tumwebaze Paul',
    lecturerId: 'usr-lec-2',
    enrolledStudents: 110,
    description: 'Software architecture patterns, microservice vs modular monolith tradeoffs, CI/CD, and PostgreSQL schema design.',
    schedule: 'Fridays · 09:00 - 12:00',
    room: 'Lecture Theatre A',
    progressPercent: 75
  },
  {
    id: 'crs-4',
    code: 'DBS-202',
    name: 'Advanced Database Systems',
    faculty: 'School of Computing & Informatics',
    department: 'Information Systems',
    credits: 3,
    semester: 'Semester II',
    lecturerName: 'Prof. Nalubega Grace',
    lecturerId: 'usr-lec-3',
    enrolledStudents: 95,
    description: 'Relational calculus, query execution plans, indexing strategies, Row Level Security, and ACID transaction boundaries.',
    schedule: 'Wednesdays · 14:00 - 17:00',
    room: 'Server Lab 1',
    progressPercent: 40
  }
];

// Student work items matching the reference image layout and titles
export const initialStudentWorkItems: StudentWorkItem[] = [
  {
    id: 'work-1',
    workName: 'Icon Design',
    courseName: 'Design Training Camp',
    courseCode: 'DES-301',
    updateTime: '2026.03.11 22:20',
    finished: 0,
    total: 80,
    category: 'all',
    dueDate: '2026-03-25T23:59:00',
    weighting: 15,
    description: 'Construct a unified vector icon set adhering to a 24px grid with consistent optical strokes and stroke terminals.',
    instructions: 'Submit SVG source files and a high-resolution export sheet showcasing geometric alignment, visual weight balance, and dark/light modes.',
    rubricItems: [
      { criterion: 'Optical Weight Consistency', maxPoints: 30, description: 'Uniform stroke width, corner radii, and negative space across all 16 icons.' },
      { criterion: 'Grid Alignment & Export Precision', maxPoints: 40, description: 'Pixel-perfect snapping to 24px bounding box without half-pixel blurring.' },
      { criterion: 'Design System Metaphor', maxPoints: 30, description: 'Logical iconography semantics appropriate for enterprise academic tools.' }
    ]
  },
  {
    id: 'work-2',
    workName: 'Interface Design',
    courseName: 'Design Training Camp',
    courseCode: 'DES-301',
    updateTime: '2026.02.28 22:25',
    finished: 17,
    total: 63,
    category: 'all',
    dueDate: '2026-03-15T23:59:00',
    weighting: 20,
    description: 'Desktop responsive dashboard layout adhering to single-elevation depth, 60-30-10 color discipline, and zero-pill typography.',
    instructions: 'Deliver a complete prototype covering populated state, empty state, filter controls, and tabular figure alignments.',
    rubricItems: [
      { criterion: 'Visual Hierarchy & Math', maxPoints: 40, description: 'Outer padding >= inner padding, consistent type scales, balanced headline wrapping.' },
      { criterion: 'Anti-Slop Discipline', maxPoints: 30, description: 'No decorative pills, no code prefixes, no low-contrast gray text on tinted cards.' },
      { criterion: 'Component Composition', maxPoints: 30, description: 'Reusable buttons, inputs, tables, and modal overlays.' }
    ]
  },
  {
    id: 'work-3',
    workName: 'Product Experience',
    courseName: 'Interactive Course',
    courseCode: 'HCI-304',
    updateTime: '2026.02.23 22:40',
    finished: 22,
    total: 58,
    category: 'all',
    dueDate: '2026-03-08T23:59:00',
    weighting: 25,
    description: 'Comprehensive cognitive walkthrough and task completion latency analysis of the student course registration flow.',
    instructions: 'Document user friction points, mental model mismatches, and provide audited redesign proposals with measurable benchmarks.',
    rubricItems: [
      { criterion: 'Empirical Walkthrough Rigor', maxPoints: 40, description: 'Identification of heuristic violations across Nielsen-Norman 10 heuristics.' },
      { criterion: 'Remediation Quality', maxPoints: 35, description: 'Actionable design solutions addressing cognitive load and error prevention.' },
      { criterion: 'Presentation & Metrics', maxPoints: 25, description: 'Clear quantitative latency metrics and before/after journey maps.' }
    ]
  },
  {
    id: 'work-4',
    workName: 'Design Revision Exercises',
    courseName: 'Design Training Camp',
    courseCode: 'DES-301',
    updateTime: '2026.02.10 10:25',
    finished: 33,
    total: 47,
    category: 'daily',
    dueDate: '2026-02-20T23:59:00',
    weighting: 10,
    description: 'Refactoring 3 broken enterprise screens to eliminate clutter, improve keyboard accessibility, and enforce WCAG 2.2 AA contrast.',
    instructions: 'Annotate contrast calculations and show keyboard tab stop order on every interactive element.',
    rubricItems: [
      { criterion: 'Accessibility Compliance', maxPoints: 50, description: '4.5:1 text contrast and visible focus rings on all states.' },
      { criterion: 'Information Architecture', maxPoints: 50, description: 'Streamlined form layout and grouping of related inputs.' }
    ]
  },
  {
    id: 'work-5',
    workName: 'Color Practice',
    courseName: 'Design Training Camp',
    courseCode: 'DES-301',
    updateTime: '2026.02.07 20:38',
    finished: 58,
    total: 22,
    category: 'daily',
    dueDate: '2026-02-14T23:59:00',
    weighting: 10,
    description: 'Constructing systematic color palettes using OKLCH color spaces: generating 10 harmonic lightness steps for Primary, Accent, and Neutral.',
    instructions: 'Demonstrate semantic usage for Success, Warning, Danger, and Info states without relying on color alone.',
    rubricItems: [
      { criterion: 'Color Scale Mathematics', maxPoints: 50, description: 'Perceptually uniform lightness curves and saturation control.' },
      { criterion: 'Multi-theme Optical Pairing', maxPoints: 50, description: 'Seamless contrast retention in both Light and Dark modes.' }
    ]
  },
  {
    id: 'work-6',
    workName: 'Competition Analysis',
    courseName: 'Interactive Course',
    courseCode: 'HCI-304',
    updateTime: '2026.01.23 22:17',
    finished: 27,
    total: 53,
    category: 'public',
    dueDate: '2026-02-01T23:59:00',
    weighting: 20,
    description: 'Comparative functional and pedagogical benchmarking between Canvas, Blackboard, Moodle, and EkoWork LMS architectures.',
    instructions: 'Deliver a matrix comparing grading workflow efficiency, multi-tenancy models, and mobile usability.',
    rubricItems: [
      { criterion: 'Feature Matrix Completeness', maxPoints: 40, description: 'Thorough evaluation across 15 core academic LMS workflows.' },
      { criterion: 'Architectural Analysis', maxPoints: 35, description: 'Assessment of database multi-tenancy and data isolation trade-offs.' },
      { criterion: 'Pedagogical Impact', maxPoints: 25, description: 'Student engagement and lecturer grading speed evaluations.' }
    ]
  }
];

export const mockSubmissions: Submission[] = [
  {
    id: 'sub-1',
    workId: 'work-2',
    studentId: 'usr-stu-1',
    studentName: 'Aine Sarah',
    studentMatric: '22/U/10492/PS',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
    submittedAt: '2026-03-01 14:32',
    status: 'graded',
    score: 94,
    maxScore: 100,
    grade: 'A',
    feedback: 'Exceptional attention to spatial geometry and typography. Outer container padding consistently exceeds inner gaps, and tabular figures align cleanly in the submission list.',
    fileName: 'aine_sarah_interface_design_v2.pdf',
    fileSize: '4.8 MB',
    submissionReceiptId: 'RCP-2026-DES301-8812'
  },
  {
    id: 'sub-2',
    workId: 'work-2',
    studentId: 'usr-stu-2',
    studentName: 'Mugerwa Davis',
    studentMatric: '22/U/10495/PS',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    submittedAt: '2026-03-02 09:14',
    status: 'submitted',
    maxScore: 100,
    fileName: 'mugerwa_davis_dashboard_submission.zip',
    fileSize: '12.4 MB',
    submissionReceiptId: 'RCP-2026-DES301-8815'
  },
  {
    id: 'sub-3',
    workId: 'work-2',
    studentId: 'usr-stu-3',
    studentName: 'Nakato Brenda',
    studentMatric: '22/U/10502/PS',
    studentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
    submittedAt: '2026-03-02 11:45',
    status: 'submitted',
    maxScore: 100,
    fileName: 'nakato_b_interface_deliverable.pdf',
    fileSize: '3.2 MB',
    submissionReceiptId: 'RCP-2026-DES301-8819'
  },
  {
    id: 'sub-4',
    workId: 'work-2',
    studentId: 'usr-stu-4',
    studentName: 'Ocen Emmanuel',
    studentMatric: '22/U/10518/PS',
    studentAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=160&q=80',
    submittedAt: '2026-03-03 16:20',
    status: 'late',
    maxScore: 100,
    fileName: 'ocen_e_late_submission.fig',
    fileSize: '18.1 MB',
    submissionReceiptId: 'RCP-2026-DES301-8830'
  },
  {
    id: 'sub-5',
    workId: 'work-1',
    studentId: 'usr-stu-1',
    studentName: 'Aine Sarah',
    studentMatric: '22/U/10492/PS',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
    submittedAt: '2026-03-04 18:05',
    status: 'submitted',
    maxScore: 100,
    fileName: 'aine_sarah_icon_system.svg',
    fileSize: '1.2 MB',
    submissionReceiptId: 'RCP-2026-DES301-9002'
  }
];

export const mockLearningResources: LearningResource[] = [
  {
    id: 'res-1',
    courseId: 'crs-1',
    title: 'Lecture 01: Foundations of Academic Design Systems',
    topic: 'Design Tokens & Spatial Ratios',
    type: 'slides',
    sizeOrDuration: '14.2 MB · 42 Slides',
    uploadedAt: '2026-02-04',
    week: 1
  },
  {
    id: 'res-2',
    courseId: 'crs-1',
    title: 'Studio Recording: Implementing Optical Balance & Anti-Slop Discipline',
    topic: 'Live Demonstration & Code Walkthrough',
    type: 'video',
    sizeOrDuration: '54 mins · 1080p',
    uploadedAt: '2026-02-11',
    week: 2
  },
  {
    id: 'res-3',
    courseId: 'crs-1',
    title: 'Study Notes: WCAG 2.2 AA Contrast & Tabular Numeral Strategies',
    topic: 'Accessibility & Numerical Alignment',
    type: 'notes',
    sizeOrDuration: 'PDF · 8 Pages',
    uploadedAt: '2026-02-18',
    week: 3
  },
  {
    id: 'res-4',
    courseId: 'crs-1',
    title: 'Essential Reading: Ten Usability Heuristics for Enterprise Dashboards',
    topic: 'Cognitive Architecture & Mental Models',
    type: 'reading',
    sizeOrDuration: 'Curated Paper · 16 Pages',
    uploadedAt: '2026-02-25',
    week: 4
  },
  {
    id: 'res-5',
    courseId: 'crs-2',
    title: 'HCI Lecture 03: State Machine Modeling for Asynchronous Forms',
    topic: 'Interactive Validation Cycles',
    type: 'slides',
    sizeOrDuration: '8.5 MB · 36 Slides',
    uploadedAt: '2026-02-15',
    week: 3
  }
];

export const mockAcademicRecord: AcademicRecord = {
  studentId: 'usr-stu-1',
  program: 'Bachelor of Science in Software Engineering (BSE)',
  currentYear: 3,
  currentSemester: 2,
  cgpa: 3.84,
  maxGpa: 4.0,
  creditsEarned: 96,
  totalCreditsRequired: 124,
  progressionStatus: 'Dean\'s Honours',
  semesters: [
    {
      semesterName: 'Year 3 Semester I (2025/2026)',
      gpa: 3.90,
      credits: 18,
      courses: [
        { courseCode: 'DES-301', courseTitle: 'Interface & Interaction Design', credits: 4, score: 92, grade: 'A', gradePoint: 4.0, status: 'Passed' },
        { courseCode: 'CSC-301', courseTitle: 'Algorithms Analysis & Complexity', credits: 4, score: 88, grade: 'B+', gradePoint: 3.5, status: 'Passed' },
        { courseCode: 'NET-302', courseTitle: 'Distributed Systems & Cloud Computing', credits: 4, score: 95, grade: 'A', gradePoint: 4.0, status: 'Distinction' },
        { courseCode: 'DBS-301', courseTitle: 'Database Optimization & Storage Engines', credits: 3, score: 90, grade: 'A', gradePoint: 4.0, status: 'Passed' },
        { courseCode: 'RES-300', courseTitle: 'Research Methodology & Ethics', credits: 3, score: 86, grade: 'B+', gradePoint: 3.5, status: 'Passed' }
      ]
    },
    {
      semesterName: 'Year 2 Semester II (2024/2025)',
      gpa: 3.80,
      credits: 19,
      courses: [
        { courseCode: 'CSC-204', courseTitle: 'Object Oriented Software Construction', credits: 4, score: 91, grade: 'A', gradePoint: 4.0, status: 'Passed' },
        { courseCode: 'SWE-202', courseTitle: 'Requirements Engineering & Domain Modeling', credits: 4, score: 87, grade: 'B+', gradePoint: 3.5, status: 'Passed' },
        { courseCode: 'MTH-206', courseTitle: 'Probability & Statistics for Computing', credits: 4, score: 84, grade: 'B', gradePoint: 3.0, status: 'Passed' },
        { courseCode: 'HCI-201', courseTitle: 'Introduction to Usability & Ergonomics', credits: 4, score: 96, grade: 'A', gradePoint: 4.0, status: 'Distinction' },
        { courseCode: 'COM-200', courseTitle: 'Technical Communication & Leadership', credits: 3, score: 89, grade: 'B+', gradePoint: 3.5, status: 'Passed' }
      ]
    }
  ]
};

export const mockTimetableEvents: TimetableEvent[] = [
  {
    id: 'tt-1',
    courseCode: 'DES-301',
    courseTitle: 'Design Training Camp',
    type: 'Lecture',
    day: 'Monday',
    startTime: '10:00',
    endTime: '12:00',
    room: 'Design Studio Lab 3B',
    building: 'Block B, Computing Complex',
    lecturer: 'Heimaux Ronald',
    status: 'Scheduled'
  },
  {
    id: 'tt-2',
    courseCode: 'HCI-304',
    courseTitle: 'Interactive Course',
    type: 'Lecture',
    day: 'Tuesday',
    startTime: '14:00',
    endTime: '16:00',
    room: 'Informatics Hall 2',
    building: 'Main ICT Tower',
    lecturer: 'Heimaux Ronald',
    status: 'Scheduled'
  },
  {
    id: 'tt-3',
    courseCode: 'DES-301',
    courseTitle: 'Design Training Camp (Studio Crit)',
    type: 'Lab',
    day: 'Wednesday',
    startTime: '10:00',
    endTime: '12:00',
    room: 'Interactive Media Hub',
    building: 'Block B, Computing Complex',
    lecturer: 'Heimaux Ronald',
    status: 'Room Changed'
  },
  {
    id: 'tt-4',
    courseCode: 'CSC-310',
    courseTitle: 'Software Engineering II',
    type: 'Lecture',
    day: 'Friday',
    startTime: '09:00',
    endTime: '12:00',
    room: 'Lecture Theatre A',
    building: 'Engineering Block',
    lecturer: 'Dr. Tumwebaze Paul',
    status: 'Scheduled'
  }
];

export const mockServiceTickets: ServiceTicket[] = [
  {
    id: 'tkt-1',
    ticketNo: 'TKT-2026-0814',
    studentId: 'usr-stu-1',
    category: 'Document',
    title: 'Official Academic Transcript for Internship Application',
    submittedDate: '2026-03-01',
    status: 'Approved',
    priority: 'Medium',
    assignedTo: 'Academic Records Bureau',
    notes: 'Transcript verified by Registrar. Available for verified digital dispatch or physical collection at Room 104.'
  },
  {
    id: 'tkt-2',
    ticketNo: 'TKT-2026-0820',
    studentId: 'usr-stu-1',
    category: 'Registration',
    title: 'Elective Course Substitution Approval (HCI-402 in place of NET-401)',
    submittedDate: '2026-03-03',
    status: 'Under Review',
    priority: 'High',
    assignedTo: 'Head of Department, Software Engineering',
    notes: 'Pending departmental board review scheduled for Tuesday 10:00 AM.'
  },
  {
    id: 'tkt-3',
    ticketNo: 'TKT-2026-0792',
    studentId: 'usr-stu-1',
    category: 'Financial',
    title: 'Tuition Clearance Statement Verification',
    submittedDate: '2026-02-20',
    status: 'Completed',
    priority: 'Low',
    assignedTo: 'University Bursar Office',
    notes: '100% tuition and functional fees verified for Semester II. Exam permit activated.'
  }
];
