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
    }

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'success') {
            alert('Email sent');
            name.value = '';
            email.value = '';
            phone.value = '';
            interest.value = '';
            message.value = '';
        } else {
            alert('Something went wrong!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});


