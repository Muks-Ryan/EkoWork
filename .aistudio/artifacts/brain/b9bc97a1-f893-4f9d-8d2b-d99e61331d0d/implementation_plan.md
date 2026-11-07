# EkoWork — Multi-Institutional Learning Management System (LMS)

A modern, role-aware academic platform engineered to streamline teaching, learning, assessment governance, and institutional management across higher education institutions.

***

### User Review & Critical Decisions

> [!IMPORTANT]
> Based on your responses, the system will launch directly into a **Login & Role Portal** with rapid one-click demo credentials for Student, Lecturer, and Institutional Administrator. The header includes an **Institution Switcher** (e.g. Makerere University, Eko Institute of Technology, Cavendish University) to showcase multi-tenancy and data isolation, plus a **Fast Role Switcher** to seamlessly test and evaluate all three workspaces.

- **Confirmed: Landing Flow**: Dedicated Login page with credentials and 1-click test personas for Student, Lecturer, and Admin.
- **Confirmed: Multi-Tenancy**: Active institution switcher in the top bar with tenant-scoped branding, faculties, and courses.
- **Confirmed: Role Navigation**: Instant role switcher available in the top bar to test permissions and workspace features without logging out.
- **UI Match**: Faithful reproduction of the reference interface design (`1f92952972a6cd7a61a2d561d6defb94_47c65c78.jpg`), incorporating the exact deep navy `#102A43` navigation, curved active tab treatments, structured search/filter strip, interactive submission table with actions (Notice, Reply, Cancel/Grade), and pagination.

***

## 1. Overview & Core Concept

**EkoWork** addresses the fragmentation of university teaching and administrative tools by delivering a unified, modular frontend for three core user groups:

1. **Lecturers**: Course syllabus building, lesson organization, assignment creation, student work submission grading (matching the reference UI layout), gradebook weighting, and at-risk student insights.
2. **Students**: Interactive learning center with lecture slides, notes, video modules, assignment submissions with receipt generation, GPA/transcript tracking, and academic service requests.
3. **Institutional Administrators**: Campus and faculty setup, role and staff access provisioning, academic period configuration, grading scale policies, and real-time enrollment analytics.

The application adheres strictly to the modular architectural layout specified in the project guidelines, keeping components, features, and workspace layouts decoupled and reusable.

***

## 2. User Experience & Visual Design

### Visual Identity & Design Tokens

In accordance with the project documentation and reference design image:
- **Primary Brand**: Deep Navy (`#102A43`) — used for the persistent sidebar navigation, high-contrast headings, and focused states.
- **Accent**: Royal Blue (`#2563EB`) — used for active sidebar tab highlights, primary action buttons (Export, Submit, Save, New Assignment), and active pagination items.
- **Background**: Soft Canvas Off-White (`#F8FAFC`) — spacious, clean viewport eliminating visual fatigue.
- **Surface**: Pure White (`#FFFFFF`) — single-elevation cards, clean border outlines (`#E2E8F0`), and data grid containers.
- **Semantic Accents**: Success Green (`#16A34A`), Warning Amber (`#D97706`), Danger Crimson (`#DC2626`), Info Cerulean (`#0284C7`).
- **Typography**: Clean display pairing using `Plus Jakarta Sans` for brand headers and section titles, paired with accessible body type and tabular numerals (`font-mono tabular-nums`) for all grades, ratios (e.g., `17/63`), credits, GPAs, and timestamps.

### Key User Flows

```
┌────────────────────────────────────────────────────────────────────────┐
│                          1. Authentication Gate                        │
│   • Institution Selection (Makerere / Eko Tech / Cavendish)            │
│   • 1-Click Persona Quick-Fill: Student / Lecturer / Admin             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        2. Role-Aware Workspaces                        │
├─────────────────────────┬──────────────────────────┬───────────────────┤
│    Lecturer Workspace   │    Student Workspace     │  Admin Workspace  │
├─────────────────────────┼──────────────────────────┼───────────────────┤
│ • Student Work Mgmt     │ • Course Dashboard       │ • Campus Setup    │
│   (Reference UI layout) │ • Learning Center        │ • People & Access │
│ • All/Practice/Courses  │ • Assignments & Quizzes  │ • Academic Scales │
│ • Review, Grade & Reply │ • GPA & Transcript View  │ • Enrollment Ops  │
│ • Gradebook & Insights  │ • Student Services Desk  │ • Audit & Reports │
└─────────────────────────┴──────────────────────────┴───────────────────┘
```

***

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Faithful Recreation of Reference UI in Lecturer "Student Work"
- *Chosen Approach*: Implement the exact visual hierarchy of the provided UI image (`1f92952972a6cd7a61a2d561d6defb94_47c65c78.jpg`) under the Lecturer workspace:
  - Deep navy curved sidebar with active item pill and chevron indicators
  - Folder-style segmented tabs (`All Homework`, `Daily Practice`, `Public Courses`, `Cancel Work`)
  - Filter strip with live Search input, Course dropdown, search trigger, and blue Export button
  - Submission table with columns: `Work Name`, `Course Name`, `Update Time`, `Finish/Undone` ratio (`tabular-nums`), and operational actions (`Notice`, `Reply`, `Review / Grade`)
  - Working modal dialogs for Notice (announcement/reminder dispatch), Reply/Feedback, and Submission Grading with rubrics.
- *Why*: Directly aligns with the uploaded design asset while applying the approved EkoWork design tokens.

### Decision 2: Multi-Institution Context Simulation
- *Chosen Approach*: Centralized `InstitutionContext` managing tenant context (e.g., Makerere University, Eko Institute of Technology, Cavendish University). Switching institutions updates branding logos, faculties, program offerings, and enrolled course codes.
- *Why*: Fulfills Principle 5 ("Institution-aware: Every institution-owned record and operation must respect the selected institution context") without backend friction.

### Decision 3: Modular Architecture in Alignment with Project Specification
- *Chosen Approach*: Organize the code strictly following the project structure:
  - `src/components/ui`: Generic buttons, inputs, selects, modals, tabs, badges, stat cards.
  - `src/layouts`: Workspace shells (Sidebar, Topbar, Institution Selector, Fast Role Switcher).
  - `src/features`: Business capabilities (`student-work`, `submissions`, `courses`, `learning-resources`, `academic-records`, `institution-setup`).
  - `src/workspaces`: Role compositions (`StudentWorkspace`, `LecturerWorkspace`, `AdminWorkspace`).
- *Why*: Modular, maintainable, and directly matches both the provided project instructions and folder blueprints.

***

## 4. Technical Architecture & Data Strategy

### System Component Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                                App.tsx                                 │
│          ┌──────────────────────────────────────────────────┐          │
│          │ AuthContext & InstitutionContext State Provider  │          │
│          └────────────────────────┬─────────────────────────┘          │
│                                   │                                    │
│                 ┌─────────────────┴─────────────────┐                  │
│                 ▼                                   ▼                  │
│        [ Login / Auth Screen ]            [ Workspace Layout ]         │
│        • Fast Demo Personas               ├─ Topbar (Search/Role/Inst) │
│        • Multi-tenant Select              ├─ Sidebar (Navy, Collapsed) │
│                                           └─ Viewport Container        │
│                                                     │                  │
│         ┌───────────────────────────────────────────┼────────────────┐ │
│         ▼                                           ▼                ▼ │
│  Lecturer Workspace                         Student Workspace  Admin Workspace
│  ├─ StudentWorkManagement (Reference UI)    ├─ Dashboard       ├─ Setup & Campuses
│  ├─ SubmissionsReviewModal                  ├─ LearningCentre  ├─ Academic Catalog
│  ├─ Gradebook & Weighting                   ├─ Assignments     ├─ People & Roles
│  └─ ClassInsights                           ├─ AcademicRecords └─ Governance
└────────────────────────────────────────────────────────────────────────┘
```

### State & Interactive Handlers

1. **Authentication & Session**: Switch easily between `student`, `lecturer`, and `admin` roles, preserving realistic mock profiles with photos and department affiliations.
2. **Student Work Management Interactions**:
   - Filter by work title, course select, or category tab (`All Homework`, `Daily Practice`, `Public Courses`, `Cancel Work`).
   - "Notice" action: Opens a dispatch modal allowing the lecturer to send targeted reminders to unfinished students (`Finish/Undone` group).
   - "Reply" action: Opens feedback editor with quick templates and comment threads.
   - "Review / Grade" action: Opens full grading panel with rubric scoring and score calculation.
   - "Export" action: Generates a CSV download of student submissions and scores.
3. **Student Workspace Interactions**:
   - Course lecture notes, downloadable slides, and reading lists.
   - Assignment file submission simulator with instant confirmation receipt.
   - Academic transcript calculation with cumulative GPA and progression status.
4. **Institutional Admin Interactions**:
   - Add/edit campuses, faculties, and departments.
   - Toggle grading scale schemes (Standard 4.0 GPA, 5.0 Scale, or Percentage Moderation).

***

## 5. Verification Plan

### Automated Build & Lint Verification
- Execute `compile_applet` and `lint_applet` to ensure zero TypeScript errors, valid imports, and strict type safety.

### Manual UX & Responsive Walkthrough
1. **Login & Role Selection**: Launch application, verify clean login portal, switch to Lecturer role.
2. **Lecturer Student Work Management (Reference UI)**:
   - Verify sidebar layout with deep navy `#102A43` background and active blue `#2563EB` pill tab.
   - Verify filter search by keyword and course dropdown filter.
   - Test folder tabs (`All Homework`, `Daily Practice`, `Public Courses`).
   - Open Notice modal, compose a student notice, and verify toast confirmation.
   - Open Review/Grade modal, adjust marks, and verify updated finish ratio.
3. **Student Workspace**:
   - Switch role to Student via top bar switcher.
   - View enrolled courses and learning resources.
   - Test assignment submission flow and check transcript/GPA display.
4. **Admin Workspace**:
   - Switch role to Administrator.
   - Inspect academic structure, faculties, and grading scale policy adjustments.
5. **Multi-Institution Switch**:
   - Change institution from Makerere University to Eko Institute of Technology; verify header branding and faculty lists update accordingly.
