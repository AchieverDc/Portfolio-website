function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.width === '300px') {
        sidebar.style.width = '0';
    } else {
        sidebar.style.width = '300px';
    }
}


const form = document.querySelector('form');
function sendEmail() {
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "jeremiahtani44@proton.me",
        Password : "0C50BA866EC512B1BF66114A428FB4D8D745",
        To : "jeremiahtani44@proton.me",
        From : document.getElementById("email").value,
        Subject : "New Contact Form Enquiry",
        Body : "Name: " + document.getElementById("name").value
            + "<br> Email: " + document.getElementById("email").value
            + "<br> Message: " + document.getElementById("message").value
    }).then(
        message => alert("Message Sent Successfully!")
    );
}