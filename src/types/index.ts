export type UserRole = 'student' | 'lecturer' | 'admin';

export interface Institution {
  id: string;
  name: string;
  shortName: string;
  code: string;
  logo: string;
  tagline: string;
  location: string;
  campuses: string[];
  faculties: string[];
  academicYear: string;
  semester: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  institutionId: string;
  department: string;
  identifier: string; // Matriculation No or Staff ID
  title?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  faculty: string;
  department: string;
  credits: number;
  semester: string;
  lecturerName: string;
  lecturerId: string;
  enrolledStudents: number;
  description: string;
  schedule: string;
  room: string;
  progressPercent?: number;
}

export type WorkCategory = 'all' | 'daily' | 'public' | 'cancelled';

export interface StudentWorkItem {
  id: string;
  workName: string;
  courseName: string;
  courseCode: string;
  updateTime: string;
  finished: number;
  total: number;
  category: WorkCategory;
  dueDate: string;
  weighting: number;
  description: string;
  instructions: string;
  rubricItems: { criterion: string; maxPoints: number; description: string }[];
}

export interface Submission {
  id: string;
  workId: string;
  studentId: string;
  studentName: string;
  studentMatric: string;
  studentAvatar: string;
  submittedAt: string;
  status: 'submitted' | 'graded' | 'late' | 'missing';
  score?: number;
  maxScore: number;
  grade?: string;
  feedback?: string;
  fileName: string;
  fileSize: string;
  submissionReceiptId?: string;
}

export interface LearningResource {
  id: string;
  courseId: string;
  title: string;
  topic: string;
  type: 'slides' | 'notes' | 'video' | 'reading';
  sizeOrDuration: string;
  uploadedAt: string;
  week: number;
}

export interface SemesterGrade {
  courseCode: string;
  courseTitle: string;
  credits: number;
  score: number;
  grade: string;
  gradePoint: number;
  status: 'Passed' | 'Distinction' | 'Pending';
}

export interface AcademicRecord {
  studentId: string;
  program: string;
  currentYear: number;
  currentSemester: number;
  cgpa: number;
  maxGpa: number;
  creditsEarned: number;
  totalCreditsRequired: number;
  progressionStatus: 'Normal Progress' | 'Probation' | 'Dean\'s Honours';
  semesters: {
    semesterName: string;
    gpa: number;
    credits: number;
    courses: SemesterGrade[];
  }[];
}

export interface TimetableEvent {
  id: string;
  courseCode: string;
  courseTitle: string;
  type: 'Lecture' | 'Lab' | 'Tutorial' | 'Exam';
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  room: string;
  building: string;
  lecturer: string;
  status: 'Scheduled' | 'Room Changed' | 'Cancelled';
}

export interface ServiceTicket {
  id: string;
  ticketNo: string;
  studentId: string;
  category: 'Registration' | 'Document' | 'Academic Appeal' | 'Exemption' | 'Financial';
  title: string;
  submittedDate: string;
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  assignedTo: string;
  notes: string;
}

export interface NoticePayload {
  workId: string;
  workName: string;
  courseName: string;
  title: string;
  message: string;
  recipientFilter: 'undone' | 'all';
  sendEmail: boolean;
  sendInApp: boolean;
}
