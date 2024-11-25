function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.width === '200px') {
        sidebar.style.width = '0';
    } else {
        sidebar.style.width = '200px';
    }
}

const contactForm = document.querySelector('.contact-form');
let name = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let interest = document.getElementById('interest');
let message = document.getElementById('message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let formData = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        interest: interest.value,
        message: message.value
    };

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/sendEmail'); // Update this line to point to the API endpoint
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onload = function() {
        console.log(xhr.responseText);
        if (xhr.status === 200) { // Check for successful response
            alert('Email sent successfully!');
            // Clear form fields
            name.value = '';
            email.value = '';
            phone.value = '';
            interest.value = '';
            message.value = '';
        } else {
            alert('Something went wrong!'); // Handle error cases
        }
    };

    xhr.onerror = function() {
        alert('Request failed. Please try again later.'); // Handle network errors
    };

    xhr.send(JSON.stringify(formData));
});


