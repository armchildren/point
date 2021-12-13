const express = require('express');
const app = express();

const nodemailer = require("nodemailer"); 

const PORT = process.env.PORT || 5000;


app.use(express.static('project'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/project/index.html')
});

app.post('/', (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'raffi.gukasyan777@gmail.com',
            pass: 'Rraaffii220033'
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: 'raffi.gukasyan777@gmail.com',
        subject: `Сообщения от клиента ${req.body.email}`,
        text: `Имя - ${req.body.name} 
    Номер телефона - ${req.body.tel}`,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            res.send('error');
        }
        else {
            console.log('Email sent:' + info.response);
            res.send('success');
        }
    })
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
