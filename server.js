var express = require("express"),
    path = require("path"),
    nodeMailer = require("nodemailer"),
    bodyParser = require("body-parser");

var app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
var port = 3000;
app.get('/', function(req, res) {
    res.render('index');
});
app.post("/send-email", function(req, res) {
    const output = `
     <b>У вас нове замовлення</b>
    <h3>Деталі замовлення</h3>
    <p> <b> &#8226; ТОВАР </b> ${req.body.order}</p>
    <ul>
      <li>Ім\'я прізвище: ${req.body.name}</li>
      <li>Місто відправлення: ${req.body.city}</li>
      <li>Email: ${req.body.from}</li>
      <li>Телефон: ${req.body.phone}</li>
    </ul>
    <h3>Повідомлення</h3>
    <p>${req.body.body}</p>
  `;
    let transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "swergiy@gmail.com",
            pass: "Pajujypus_0410"
        },
        tls: {
            rejectUnauthorized: false, //NOTE: you only need to set rejectUnauthorized to false if you are running on a local server, you can remove it after testing
        }
    });
    req.body.to = "swergiy@gmail.com";
    console.log(req.body.to);
    
    let mailOptions = {
        from: `"Tribal site" <${req.body.from}>`, // sender address
        to: req.body.to, // list of receivers
        subject: "Order from Tribal", // Subject line
        html: output // html body
        // text: req.body.body, // plain text body
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }

        console.log('Message sent: %s', info.messageId);
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.send({
            msg: "Email has been sent!"
        });
    });
});
app.listen(port, function() {
    console.log("Server is running at port: ", port);
});