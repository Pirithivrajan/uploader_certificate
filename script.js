// 🔐 HARD CODED SUPABASE CONFIG (Permanent)
const SUPABASE_URL = "https://YOUR_SUPABASE_URL.supabase.co";
const SUPABASE_KEY = "YOUR_ANON_KEY";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ================= ADMIN FUNCTIONS =================

// Generate Random Access Code
function generateAccessCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Create Student
async function createStudent() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  const access_code = generateAccessCode();

  const { error } = await supabase
    .from("students")
    .insert([{ name, email, phone, access_code }]);

  if (error) {
    alert("Error: " + error.message);
  } else {
    alert("Student Created!\nAccess Code: " + access_code);
    loadStudents();
  }
}

// Load Students Table
async function loadStudents() {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return alert(error.message);

  const table = document.getElementById("studentTable");
  if (!table) return;

  table.innerHTML = "";

  data.forEach(student => {
    table.innerHTML += `
      <tr>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.access_code}</td>
      </tr>
    `;
  });
}

// ================= STUDENT FUNCTIONS =================

// Login with Access Code
async function studentLogin() {
  const code = document.getElementById("accessCode").value;

  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("access_code", code)
    .single();

  if (error || !data) {
    alert("Invalid Access Code");
    return;
  }

  document.getElementById("studentDetails").style.display = "block";
  document.getElementById("studentName").value = data.name;
  document.getElementById("studentEmail").value = data.email;
  document.getElementById("studentId").value = data.id;

  window.currentStudentId = data.id;
}

// Upload Certificates to Supabase Storage
async function uploadCertificates() {
  const personalFile = document.getElementById("personalCert").files[0];
  const professionalFile = document.getElementById("professionalCert").files[0];
  const description = document.getElementById("description").value;

  if (!window.currentStudentId) {
    alert("Login First");
    return;
  }

  if (personalFile) {
    await supabase.storage
      .from("certificates")
      .upload(`personal/${window.currentStudentId}_${personalFile.name}`, personalFile);
  }

  if (professionalFile) {
    await supabase.storage
      .from("certificates")
      .upload(`professional/${window.currentStudentId}_${professionalFile.name}`, professionalFile);
  }

  await supabase
    .from("students")
    .update({
      personal_certs: 1,
      professional_certs: 1
    })
    .eq("id", window.currentStudentId);

  alert("Certificates Uploaded Successfully!");
}
