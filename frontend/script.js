const createStudentForm = document.getElementById("createStudentForm");
const updateStudentForm = document.getElementById("updateStudentForm");
const deleteStudentForm = document.getElementById("deleteStudentForm");
const studentList = document.getElementById("studentList");
const getStudentForm = document.getElementById("getStudentForm");

// Code for creating students (POST request)
createStudentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const roll = document.getElementById("roll").value;
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;

    const createMessage = document.getElementById("createMessage"); // Select the message element for create form

    // Create a JSON object representing the student data
    const studentData = {
        roll: parseInt(roll),
        name: name,
        address: address
    };

    // Send a POST request to create a new student
    fetch("http://localhost:8080/saveStudent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(studentData)
    })
    .then(response => {
        if (response.ok) {
            // If the response status is OK, it means the student was created successfully
            createMessage.textContent = "Student created successfully"; // Update the create form message
            // // Add the new student to the list
            // const listItem = document.createElement("li");
            // listItem.textContent = `Roll: ${studentData.roll}, Name: ${studentData.name}, Address: ${studentData.address}`;
            // listItem.setAttribute("data-roll", studentData.roll);
            // studentList.appendChild(listItem);

            // After successful student creation, clear the form data
            document.getElementById("roll").value = "";
            document.getElementById("name").value = "";
            document.getElementById("address").value = "";

        } else {
            // Handle the case where the student creation failed (you can set an error message)
            createMessage.textContent = "Student with the same roll number already exists."; // Example error message
        }
    })
    .catch(error => console.error(error));
});


// Code for updating students (PUT request)
updateStudentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const updateRoll = document.getElementById("updateRoll").value;
    const updateName = document.getElementById("updateName").value;
    const updateAddress = document.getElementById("updateAddress").value;

    const updateMessage = document.getElementById("updateMessage"); // Select the message element for update form

    // Create a JSON object representing the updated student data
    const updatedStudentData = {
        roll: parseInt(updateRoll),
        name: updateName,
        address: updateAddress
    };

    // Send a PUT request to update a student
    fetch("http://localhost:8080/updateData", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedStudentData)
    })
    .then(response => {
        if (response.ok) {
            // If the response status is OK, it means the update was successful
            updateMessage.textContent = "Student updated successfully"; // Update the update form message
            // Update the student's details in the list
            // const studentListItem = document.querySelector(`li[data-roll="${updatedStudentData.roll}"]`);
            // if (studentListItem) {
            //     studentListItem.textContent = `Roll: ${updatedStudentData.roll}, Name: ${updatedStudentData.name}, Address: ${updatedStudentData.address}`;
            // }

            // After successful student update, clear the form data
            document.getElementById("updateRoll").value = "";
            document.getElementById("updateName").value = "";
            document.getElementById("updateAddress").value = "";

        } else {
            // Handle the case where the update failed (you can set an error message)
            updateMessage.textContent = "Enter valid information"; // Example error message
        }
    })
    .catch(error => console.error(error));
});


// Code for deleting students (DELETE request)
deleteStudentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const deleteRoll = document.getElementById("deleteRoll").value;

    const deleteMessage = document.getElementById("deleteMessage"); // Select the message element for delete form

    // Send a DELETE request to delete a student
    fetch(`http://localhost:8080/deleteStudent/${deleteRoll}`, {
        method: "DELETE"
    })
    .then(response => {
        if (response.ok) {
            deleteMessage.textContent = "Student deleted successfully"; // Update the delete form message
            // Remove the deleted student from the list
            // const studentListItem = document.querySelector(`li[data-roll="${deleteRoll}"]`);
            // if (studentListItem) {
            //     studentListItem.remove();
            // }

            // After successful student deletion, clear the form data
            document.getElementById("deleteRoll").value = "";

        }
        else {
            deleteMessage.textContent = "Student not found"; // Update the delete form message
        }
    })
    .catch(error => console.error(error));
});


const getMessage = document.getElementById("getMessage");

getStudentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const getRoll = document.getElementById("getRoll").value;

    // Call the function to fetch the student data
    getStudentByRoll(getRoll);
});

function getStudentByRoll(roll) {
    fetch(`http://localhost:8080/getStudent/${roll}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Student not found');
            }
        })
        .then(student => {
            studentList.innerHTML = `Roll: ${student.roll}<br>Name: ${student.name}<br>Address: ${student.address}`; 
            // Display the student details
            // console.log(student);
            // // Update the message element
            // getMessage.textContent = JSON.stringify(student, null, 2);
        })
        .catch(error => {
            console.error(error);
            // Handle the error, e.g., show an error message
            getMessage.textContent = "An error occurred. Please try again.";
        });
}



// Fetch and display students when the page loads

// function fetchStudents() {
//     // Send a GET request to retrieve the list of students
//     fetch("http://localhost:8080/getAllStudent")
//         .then(response => response.json())
//         .then(students => {
//             studentList.innerHTML = ""; // Clear the existing list
//             students.forEach(student => {
//                 const listItem = document.createElement("li"); //For each student, it creates a new list item element (<li>)
//                 listItem.textContent = `Roll: ${student.roll}, Name: ${student.name}, Address: ${student.address}`;
//                 listItem.setAttribute("data-roll", student.roll); // Store the roll number as a data attribute
//                 studentList.appendChild(listItem);
//             });
//         })
//         .catch(error => console.error(error));
// }
// fetchStudents();
