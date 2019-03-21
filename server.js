var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = 3000;
// app.get('/', function(req, res) {
//     res.render('index');
// });
app.post('/send-email', function(req, res) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'swergiy@gmail.com',
            pass: 'Pajujypus_0410'
        }
    });
    req.body.to = 'swergiy@gmail.com';
    console.log(req.body.to);
    
    let mailOptions = {
        from: `"Tribal site" <${req.body.from}>`, // sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        html: '<ul><li>місто</li><li>товар</li><li>ім\'я</li><li>відділення</li></ul>' // html body
        // text: req.body.body, // plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        // res.render('index');
    });
});
app.listen(port, function() {
    console.log('Server is running at port: ', port);
});