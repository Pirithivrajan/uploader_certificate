let generatedCode = "1234";

function generateCode(){
  generatedCode = Math.floor(1000 + Math.random()*9000).toString();
  document.getElementById("codeDisplay").innerText =
    "Generated Access Code: " + generatedCode;
}

function validateCode(){
  let entered = document.getElementById("accessCode").value;
  if(entered === generatedCode){
    alert("Access Granted. Form Submitted!");
  }else{
    alert("Invalid Access Code");
  }
}
