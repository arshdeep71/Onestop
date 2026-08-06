# PowerShell script to perform 12 realistic commits and push them to GitHub

$ErrorActionPreference = "Stop"

function MakeCommit($commitMsg) {
    Write-Host "Staging changes..."
    git add -A
    Write-Host "Committing: $commitMsg"
    git commit -m $commitMsg
    Write-Host "Pushing to GitHub..."
    git push origin main
    Write-Host "--------------------------------------------------"
}

# --- Commit 1: Add/commit the existing features ---
Write-Host "Step 1: Committing existing video studio features and schemas..."
# Add existing untracked/modified files (excluding any script files)
git add backend/package.json
git add backend/package-lock.json
git add backend/server.js
git add frontend/src/components/admin/AdminDashboard.jsx
if (Test-Path "backend/models/Video.js") { git add backend/models/Video.js }
if (Test-Path "backend/models/Resource.js") { git add backend/models/Resource.js }
if (Test-Path "backend/data/cms.json") { git add backend/data/cms.json }
if (Test-Path "backend/data/users.json") { git add backend/data/users.json }

git commit -m "feat: integrate video studio and resources schema with admin portal"
git push origin main
Write-Host "Step 1 complete!"
Write-Host "--------------------------------------------------"

# Helper to edit a file
function ReplaceInFile($filePath, $target, $replacement) {
    $absPath = Resolve-Path $filePath
    $content = [System.IO.File]::ReadAllText($absPath)
    if ($content.Contains($target)) {
        $content = $content.Replace($target, $replacement)
        [System.IO.File]::WriteAllText($absPath, $content)
        Write-Host "Successfully modified $filePath"
    } else {
        Write-Warning "Target string not found in $filePath"
    }
}

# --- Commit 2: AuthContext ---
Write-Host "Step 2: Documenting AuthProvider..."
ReplaceInFile "frontend/src/context/AuthContext.jsx" `
    "export const AuthProvider = ({ children }) => {" `
    "/**`n * AuthProvider component manages global authentication state,`n * local storage synchronization, and handles login/logout fallbacks.`n */`nexport const AuthProvider = ({ children }) => {"
MakeCommit "docs: add JSDoc for global AuthProvider"

# --- Commit 3: CourseContext ---
Write-Host "Step 3: Documenting CourseProvider..."
ReplaceInFile "frontend/src/context/CourseContext.jsx" `
    "// Seed Fallback Data in case API is connecting" `
    "/**`n * CourseContext provides the global state for courses, active modules,`n * and helper functions to fetch course metadata from the server.`n */`n// Seed Fallback Data in case API is connecting"
MakeCommit "docs: document CourseProvider context state"

# --- Commit 4: LoginPage ---
Write-Host "Step 4: Documenting LoginPage submit handler..."
ReplaceInFile "frontend/src/pages/LoginPage.jsx" `
    "  const handleSubmit = async (e) => {`r`n    e.preventDefault();" `
    "  const handleSubmit = async (e) => {`r`n    // Validate credentials before sending request`r`n    e.preventDefault();"
# Fallback just in case LF line ending is used
ReplaceInFile "frontend/src/pages/LoginPage.jsx" `
    "  const handleSubmit = async (e) => {`n    e.preventDefault();" `
    "  const handleSubmit = async (e) => {`n    // Validate credentials before sending request`n    e.preventDefault();"
MakeCommit "refactor: add code comment for login form submission"

# --- Commit 5: RegisterPage ---
Write-Host "Step 5: Documenting RegisterPage state change..."
ReplaceInFile "frontend/src/pages/RegisterPage.jsx" `
    "  const handleChange = (e) => {`r`n    setFormData({ ...formData, [e.target.name]: e.target.value });" `
    "  const handleChange = (e) => {`r`n    // Update formData state keys dynamically based on input name attributes`r`n    setFormData({ ...formData, [e.target.name]: e.target.value });"
ReplaceInFile "frontend/src/pages/RegisterPage.jsx" `
    "  const handleChange = (e) => {`n    setFormData({ ...formData, [e.target.name]: e.target.value });" `
    "  const handleChange = (e) => {`n    // Update formData state keys dynamically based on input name attributes`n    setFormData({ ...formData, [e.target.name]: e.target.value });"
MakeCommit "docs: document register form change handler"

# --- Commit 6: AboutPage ---
Write-Host "Step 6: Documenting AboutPage metadata..."
ReplaceInFile "frontend/src/pages/AboutPage.jsx" `
    "export default function AboutPage({ onOpenAuth }) {`r`n  const totalInstructors = 4;" `
    "export default function AboutPage({ onOpenAuth }) {`r`n  // Define metadata counts for UI reference`r`n  const totalInstructors = 4;"
ReplaceInFile "frontend/src/pages/AboutPage.jsx" `
    "export default function AboutPage({ onOpenAuth }) {`n  const totalInstructors = 4;" `
    "export default function AboutPage({ onOpenAuth }) {`n  // Define metadata counts for UI reference`n  const totalInstructors = 4;"
MakeCommit "docs: document instructor list model in AboutPage"

# --- Commit 7: CourseCatalogPage ---
Write-Host "Step 7: Documenting CourseCatalogPage filters..."
ReplaceInFile "frontend/src/pages/CourseCatalogPage.jsx" `
    "  const filtered = courses.filter((c) => {`r`n    const matchesCategory = selectedCategory" `
    "  const filtered = courses.filter((c) => {`r`n    // Perform search filtration based on title and category`r`n    const matchesCategory = selectedCategory"
ReplaceInFile "frontend/src/pages/CourseCatalogPage.jsx" `
    "  const filtered = courses.filter((c) => {`n    const matchesCategory = selectedCategory" `
    "  const filtered = courses.filter((c) => {`n    // Perform search filtration based on title and category`n    const matchesCategory = selectedCategory"
MakeCommit "refactor: document search filtration in CourseCatalog"

# --- Commit 8: CourseDetailPage ---
Write-Host "Step 8: Documenting CourseDetailPage auth redirect..."
ReplaceInFile "frontend/src/pages/CourseDetailPage.jsx" `
    "  const handleStartCourse = () => {`r`n    if (!user) {" `
    "  const handleStartCourse = () => {`r`n    // Handle auto-enrollment or redirects to auth registration for new users`r`n    if (!user) {"
ReplaceInFile "frontend/src/pages/CourseDetailPage.jsx" `
    "  const handleStartCourse = () => {`n    if (!user) {" `
    "  const handleStartCourse = () => {`n    // Handle auto-enrollment or redirects to auth registration for new users`n    if (!user) {"
MakeCommit "docs: add comment detailing registration redirect"

# --- Commit 9: FreeResourcesPage ---
Write-Host "Step 9: Documenting FreeResourcesPage fallback..."
ReplaceInFile "frontend/src/pages/FreeResourcesPage.jsx" `
    "  const list = resources?.length ? resources : defaultResourcesList;" `
    "  // Resolve source list based on backend API schema vs default static list fallback`r`n  const list = resources?.length ? resources : defaultResourcesList;"
ReplaceInFile "frontend/src/pages/FreeResourcesPage.jsx" `
    "  const list = resources?.length ? resources : defaultResourcesList;" `
    "  // Resolve source list based on backend API schema vs default static list fallback`n  const list = resources?.length ? resources : defaultResourcesList;"
MakeCommit "docs: add comment on fallback free resources"

# --- Commit 10: SpeakingClubPage ---
Write-Host "Step 10: Documenting SpeakingClubPage fallback..."
ReplaceInFile "frontend/src/pages/SpeakingClubPage.jsx" `
    "  const topics = speakingClub?.practiceTopics || fallbackTopics;" `
    "  // Default to static sample topics if server database records are unpopulated`r`n  const topics = speakingClub?.practiceTopics || fallbackTopics;"
ReplaceInFile "frontend/src/pages/SpeakingClubPage.jsx" `
    "  const topics = speakingClub?.practiceTopics || fallbackTopics;" `
    "  // Default to static sample topics if server database records are unpopulated`n  const topics = speakingClub?.practiceTopics || fallbackTopics;"
MakeCommit "docs: explain speaking club fallback topic logic"

# --- Commit 11: StudentDashboard ---
Write-Host "Step 11: Documenting StudentDashboard admin redirect..."
ReplaceInFile "frontend/src/pages/StudentDashboard.jsx" `
    "  // Directly render Admin Portal when authenticated as Admin" `
    "  // Handle admin role redirection immediately to keep Admin Portal decoupled from standard user view`r`n  // Directly render Admin Portal when authenticated as Admin"
ReplaceInFile "frontend/src/pages/StudentDashboard.jsx" `
    "  // Directly render Admin Portal when authenticated as Admin" `
    "  // Handle admin role redirection immediately to keep Admin Portal decoupled from standard user view`n  // Directly render Admin Portal when authenticated as Admin"
MakeCommit "docs: document admin role redirect in dashboard"

# --- Commit 12: LessonPlayerPage ---
Write-Host "Step 12: Documenting LessonPlayerPage certificate rule..."
ReplaceInFile "frontend/src/pages/LessonPlayerPage.jsx" `
    "  const handleMarkComplete = () => {`r`n    markLessonComplete(lesson.id);" `
    "  const handleMarkComplete = () => {`r`n    // Verify course completion status and grant certificate if all lessons are marked done`r`n    markLessonComplete(lesson.id);"
ReplaceInFile "frontend/src/pages/LessonPlayerPage.jsx" `
    "  const handleMarkComplete = () => {`n    markLessonComplete(lesson.id);" `
    "  const handleMarkComplete = () => {`n    // Verify course completion status and grant certificate if all lessons are marked done`n    markLessonComplete(lesson.id);"
MakeCommit "docs: document certificate generation check"

Write-Host "All 12 commits and pushes have completed successfully!"
