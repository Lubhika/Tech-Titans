document.getElementById('cgpa-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const regNo = document.getElementById('reg-no').value;
    const dept = document.getElementById('dept').value;
    const numSemesters = parseInt(document.getElementById('num-semesters').value);

    let totalCredits = 0;
    let totalGradePoints = 0;
    let allSemestersValid = true;
    let hasUGrade = false;

    document.getElementById('gpas').innerHTML = ''; // Reset the GPA display area

    for (let sem = 1; sem <= numSemesters; sem++) {
        let semesterCredits = 0;
        let semesterGradePoints = 0;
        let isSemesterValid = true;

        const subjects = document.querySelectorAll(`#semester-${sem} select`);

        subjects.forEach(subject => {
            const grade = subject.value;
            const credits = parseInt(subject.dataset.credits);

            if (grade === "Select") {
                isSemesterValid = false;
                allSemestersValid = false;
            } else if (grade === "U") { // Handle "U" grade
                hasUGrade = true;
                semesterCredits += credits;  // Still add credits to calculate GPA correctly
            } else if (grade !== "0") { // Ignore "0" for GPA calculation
                semesterCredits += credits;
                semesterGradePoints += credits * parseInt(grade);
            }
        });

        if (isSemesterValid) {
            const gpa = (semesterCredits > 0) ? (semesterGradePoints / semesterCredits).toFixed(4) : 0;
            document.getElementById('gpas').innerHTML += `<h2>Semester ${sem} GPA: ${gpa}</h2>`;
            totalCredits += semesterCredits;
            totalGradePoints += semesterGradePoints;
        } else {
            alert(`Please select grades for all subjects in Semester ${sem}.`);
            break;
        }
    }

    // Check for 'U' grade and set CGPA accordingly
    const cgpa = hasUGrade ? 0 : (totalCredits > 0) ? (totalGradePoints / totalCredits).toFixed(4) : 0;
    if (allSemestersValid) {
        document.getElementById('cgpa').innerHTML = `<h2>${name} (${regNo}) - ${dept} - Overall CGPA: ${cgpa}</h2>`;
    }
});

document.getElementById('num-semesters').addEventListener('change', function() {
    const numSemesters = parseInt(this.value);
    const semestersContainer = document.getElementById('semesters-container');
    semestersContainer.innerHTML = '';

    for (let sem = 1; sem <= numSemesters; sem++) {
        const semDiv = document.createElement('div');
        semDiv.className = 'semester';
        semDiv.id = `semester-${sem}`;
        semDiv.innerHTML = `<h3>Semester ${sem}</h3>`;

        const subjects = getSubjectsForSemester(sem);
        subjects.forEach(subject => {
            const subjectDiv = document.createElement('div');
            subjectDiv.className = 'form-group';
            subjectDiv.innerHTML = `
                <label for="subject-${sem}-${subject.name}">${subject.name} (${subject.credits} credits):</label>
                <select id="subject-${sem}-${subject.name}" data-credits="${subject.credits}" required>
                    <option value="Select">Select</option>
                    <option value="10">O</option>
                    <option value="9">A+</option>
                    <option value="8">A</option>
                    <option value="7">B+</option>
                    <option value="6">B</option>
                    <option value="5">C</option>
                    <option value="U">U</option>
                    <option value="0">0</option> <!-- Added 0 option -->
                </select>
            `;
            semDiv.appendChild(subjectDiv);
        });

        semestersContainer.appendChild(semDiv);
    }
});

function getSubjectsForSemester(semester) {
    const subjectsBySemester = {
        1: [
            { name: "Communicative English", credits: 3 },
            { name: "Engineering Chemistry", credits: 3 },
            { name: "Matrices and Calculus", credits: 4 },
            { name: "Engineering Physics", credits: 3 },
            { name: "Problem Solving and Python Programming", credits: 3 },
            { name: "Heritage of Tamil", credits: 1 },
            { name: "Physics and Chemistry Laboratory", credits: 2 },
            { name: "Problem Solving and Python Programming Laboratory", credits: 2 },
            { name: "Communicative English Laboratory", credits: 1 }
        ],
        2: [
            { name: "Technical English", credits: 3 },
            { name: "Statistics and Numerical Method", credits: 4 },
            { name: "Physics for Computer Science Engineers", credits: 3 },
            { name: "Engineering Graphics", credits: 4 },
            { name: "Programming in C", credits: 3 },
            { name: "Tamils and Technology", credits: 1 },
            { name: "Environmental Science and Sustainability", credits: 2 },
            { name: "NCC Credit Course Level 1", credits: 2 },
            { name: "Technical English Laboratory", credits: 1 },
            { name: "Engineering Practices Laboratory", credits: 2 },
            { name: "Programming in C Laboratory", credits: 2 }
        ],
        3: [
            { name: "Discrete Mathematics", credits: 4 },
            { name: "Digital Principal and Computer Organisation", credits: 4 },
            { name: "Object Oriented Programming using C++ and Java", credits: 3 },
            { name: "Data Structure and Algorithms", credits: 3 },
            { name: "Foundation of Data Science", credits: 3 },
            { name: "Data Structure and Algorithms Laboratory", credits: 2 },
            { name: "Object Oriented Programming using C++ and Java Laboratory", credits: 2 },
            { name: "Data Science Laboratory", credits: 2 },
            { name: "Quantitative Aptitude and Verbal Analogy", credits: 1 }
        ],
        4: [
            { name: "Probability and Statistics", credits: 4 },
            { name: "Theory of Computation", credits: 3 },
            { name: "Engineering Secure Software System", credits: 3 },
            { name: "Database Management System and Security", credits: 3 },
            { name: "Operating System and Security", credits: 3 },
            { name: "Network Essentials", credits: 4 },
            { name: "NCC Credit Course Level 2", credits: 3 },
            { name: "Database Management System and Security Laboratory", credits: 2 },
            { name: "Operating System and Security Laboratory", credits: 2 },
            { name: "Quantitative Aptitude and Behavioural Skills", credits: 1 }
        ],
        5: [
            { name: "Distributed System", credits: 3 },
            { name: "Cyber Law", credits: 3 },
            { name: "Cyber Forensics", credits: 3 },
            { name: "Mandatory Course", credits: 0 },
            { name: "Open Elective I", credits: 3 },
            { name: "Cryptography and Cyber Security", credits: 4 },
            { name: "Professional Elective I", credits: 3 },
            { name: "Security Laboratory", credits: 2 },
            { name: "Quantitative Aptitude and Communication Skills", credits: 1 }
        ],
        6: [
            { name: "Internet of Things", credits: 3 },
            { name: "Open Elective II", credits: 3 },
            { name: "Mandatory Course II", credits: 0 },
            { name: "NCC Credit Course Level 3", credits: 3 },
            { name: "Artificial Intelligence and Machine Learning", credits: 4 },
            { name: "Professional Elective II", credits: 3 },
            { name: "Professional Elective III", credits: 3 },
            { name: "Professional Elective IV", credits: 3 },
            { name: "Mini Project", credits: 2 },
            { name: "Quantitative Aptitude and Soft Skills", credits: 1 }
        ],
        7: [
            { name: "Human Values and Ethics", credits: 2 },
            { name: "Elective Management", credits: 3 },
            { name: "Open Elective III", credits: 3 },
            { name: "Professional Elective V", credits: 3 },
            { name: "Professional Elective VI", credits: 3 },
            { name: "Internship", credits: 1 }
        ],
        8: [
            { name: "Project Work", credits: 10 }
        ]
    };

    return subjectsBySemester[semester];
}
