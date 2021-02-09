var teacher_code_var = "";

// Used to make a random code with the specified length.
function makeid(code_length){
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    var characters_length = characters.length
    var result = ""
    for (var i = 0; i < code_length;i++){
        result += characters.charAt(Math.floor(Math.random() * characters_length));
    }
    return result;
}

// Hides an HTML element. | Button
function hideButton(button) {
    console.log("hidden");
    button.style.display = "none";
}

// Set the onclick function for the teacher button.
function setTeacherBtn(tb,sb,teacher_code) {
    tb.onclick = function () {
    tb.value = makeid(8); // Generate random code.
    console.log(tb.value); // Logs the code.
    teacher_code.innerHTML =  "Teacher's Code: " + tb.value; // Set an H3's text to the code.
    teacher_code_var = tb.value; //Sets a global variable "teacher_code_var" to be equal to the code generated.
    teacher_code.style.display ="inline"; // Makes the teacher_code H3 element visible on the main page.
    hideButton(tb); // Hides teacher_button.
    hideButton(sb); // Hides student_button.
};}

// Set the onclick function for the student button.
function setStudentBtn(sb,tb) {
    sb.onclick = function () {
    console.log("Student button pressed.");
    hideButton(tb);
    hideButton(sb);
};}


window.onload = function() {
    var teacher_btn = document.getElementById("teacher-btn"); // Get teacher-btn as object.
    var student_btn = document.getElementById("student-btn"); // Get student-btn as object.
    var teacher_code = document.getElementById("teacher-code"); // Get H3 element for code display as oject.
    setTeacherBtn(teacher_btn,student_btn, teacher_code); // Set the buttons for teachers.
    setStudentBtn(student_btn, teacher_btn); // Set the buttons for students.
}