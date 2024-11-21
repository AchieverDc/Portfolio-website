const express = require('express');
const app = express();

const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5000;

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';


// Middleware
app.use(express.static('public'));
app.use(express.json())

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/', (req, res)=>{
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'teleair96@gmail.com',
            pass: 'tlusdtavtdbrexfw'
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'teleair96@gmail.com',
        subject: `From: ${req.body.email}
        Phone: ${req.body.phone}
        Interest: ${req.body.interest}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sent: ' + info.response);
            res.send('success')
        }
    })
})

app.listen(PORT, ()=>{
    console.log(`Server running on port${PORT}`)
})