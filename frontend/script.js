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
            createMessage.classList.add("success");

            // After successful student creation, clear the form data
            document.getElementById("roll").value = "";
            document.getElementById("name").value = "";
            document.getElementById("address").value = "";

        } else {
            // Handle the case where the student creation failed (you can set an error message)
            createMessage.textContent = "Failed to create student. Please try again."; // Example error message
            createMessage.classList.add("error");
        }
    })
    .catch(error => console.error(error));

    // Clear the message after 5 seconds
    setTimeout(() => {
        createMessage.textContent = "";
        createMessage.classList.remove("success", "error");
    }, 5000);
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
            updateMessage.classList.add("success");

            // After successful student update, clear the form data
            document.getElementById("updateRoll").value = "";
            document.getElementById("updateName").value = "";
            document.getElementById("updateAddress").value = "";

        } else {
            // Handle the case where the update failed (you can set an error message)
            updateMessage.textContent = "Failed to update student. Please try again."; // Example error message
            updateMessage.classList.add("error");
        }
    })
    .catch(error => console.error(error));
    // Clear the message after 5 seconds
    setTimeout(() => {
        updateMessage.textContent = "";
        updateMessage.classList.remove("success", "error");
    }, 5000);
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
            deleteMessage.classList.add("success");

            // After successful student deletion, clear the form data
            document.getElementById("deleteRoll").value = "";

        } else {
            deleteMessage.textContent = "Failed to delete student. Please try again."; // Update the delete form message
            deleteMessage.classList.add("error");
        }
    })
    .catch(error => console.error(error));
    // Clear the message after 5 seconds
    setTimeout(() => {
        deleteMessage.textContent = "";
        deleteMessage.classList.remove("success", "error");
    }, 5000);
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
        })
        .catch(error => {
            console.error(error);
            // Handle the error, e.g., show an error message
            getMessage.textContent = "An error occurred. Please try again.";
        });
}
