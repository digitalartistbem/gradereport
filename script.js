// Sample data - replace with your actual student data
const students = [
  {
    studentId: "2026001",
    name: "Juan Dela Cruz",
    grades: {
      prelim: { lecture: { quizzes: 80, exam: 90, bonus: 5 }, lab: { quizzes: 85, exam: 80, bonus: 0 }, attendance: 8 },
      midterm: { lecture: { quizzes: 70, exam: 75, bonus: 5 }, lab: { quizzes: 80, exam: 70, bonus: 0 }, attendance: 9 },
      prefinal: { lecture: { quizzes: 85, exam: 88, bonus: 5 }, lab: { quizzes: 82, exam: 85, bonus: 0 }, attendance: 10 },
      finals: { lecture: { quizzes: 90, exam: 92, bonus: 5 }, lab: { quizzes: 88, exam: 90, bonus: 0 }, attendance: 10 }
    }
  }
];

// Transmutation function
function transmuteGrade(score) {
  if(score >= 97) return "1.0";
  if(score >= 94) return "1.25";
  if(score >= 91) return "1.5";
  if(score >= 88) return "1.75";
  if(score >= 85) return "2.0";
  if(score >= 82) return "2.25";
  if(score >= 79) return "2.5";
  if(score >= 76) return "2.75";
  if(score >= 73) return "3.0";
  if(score >= 70) return "3.25";
  if(score >= 67) return "3.5";
  if(score >= 64) return "3.75";
  if(score >= 61) return "4.0";
  if(score >= 58) return "4.25";
  if(score >= 55) return "4.5";
  if(score >= 50) return "4.75";
  return "5.0";
}

// Weighting calculation
function calculateTerm(term) {
  const lec = term.lecture;
  const lab = term.lab;

  const lecTotal = lec.quizzes*0.4 + lec.exam*0.5 + lec.bonus*0.1;
  const labTotal = lab.quizzes*0.4 + lab.exam*0.5 + lab.bonus*0.1;

  return lecTotal*0.4 + labTotal*0.6;
}

// Show report
function showReport() {
  const id = document.getElementById("studentId").value.trim();
  const student = students.find(s => s.studentId === id);

  if(!student){
    document.getElementById("report").innerHTML = "<p>Student not found</p>";
    return;
  }

  let html = `<h2>${student.name} (${student.studentId})</h2>`;
  html += "<table border='1' cellpadding='5'><tr><th>Term</th><th>Score</th><th>Grade</th></tr>";

  const termWeights = {prelim:0.2, midterm:0.2, prefinal:0.2, finals:0.4};
  let finalScore = 0;

  for(const term in student.grades){
    const score = calculateTerm(student.grades[term]);
    html += `<tr><td>${term.charAt(0).toUpperCase() + term.slice(1)}</td><td>${score.toFixed(2)}</td><td>${transmuteGrade(score)}</td></tr>`;
    finalScore += score * termWeights[term];
  }

  html += `<tr><td colspan="2"><b>Final Score</b></td><td>${finalScore.toFixed(2)} (${transmuteGrade(finalScore)})</td></tr>`;
  html += "</table>";

  document.getElementById("report").innerHTML = html;
}
