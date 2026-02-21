// FIXED ADMIN CREDENTIALS
const ADMIN_ID = "Admineee23";
const ADMIN_PASSWORD = "Admin@23";

// ADMIN LOGIN
function adminLogin(){
  const id = document.getElementById("adminId").value;
  const pass = document.getElementById("adminPassword").value;

  if(id === ADMIN_ID && pass === ADMIN_PASSWORD){
    document.getElementById("adminLogin").style.display = "none";
    document.getElementById("adminDashboard").style.display = "block";
  } else {
    alert("Invalid Admin Credentials");
  }
}

// GENERATE ACCESS CODE
function generateAccessCode(){
  return Math.random().toString(36).substring(2,8).toUpperCase();
}

// CREATE STUDENT (Local Demo)
let students = [];

function createStudent(){
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  const accessCode = generateAccessCode();

  students.push({name,email,phone,accessCode});
  alert("Student Created!\nAccess Code: " + accessCode);

  loadStudents();
}

// LOAD STUDENTS
function loadStudents(){
  const table = document.getElementById("studentTable");
  table.innerHTML = "";

  students.forEach(s=>{
    table.innerHTML += `
      <tr>
        <td>${s.name}</td>
        <td>${s.email}</td>
        <td>${s.accessCode}</td>
      </tr>
    `;
  });
}

// STUDENT LOGIN
function studentLogin(){
  const code = document.getElementById("accessCode").value;
  const student = students.find(s => s.accessCode === code);

  if(student){
    alert("Welcome " + student.name);
  } else {
    alert("Invalid Access Code");
  }
}
