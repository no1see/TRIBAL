var express = require("express"),
    path = require("path"),
    nodeMailer = require("nodemailer"),
    bodyParser = require("body-parser");

var app = express();
var jsonObj = require("../leather-landing/allGoods.json");

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    // TODO:
    // aspan photo and price to email
    // IF WEB STORM SERVER
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');

    // IF VS CODE SERVER
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of mispanleware
    next();
});
var port = 3000;
function findGoodByCode(code) {
    return jsonObj.filter(
        function(jsonObj){return jsonObj.code == code }
    );
}
// var goodObj = findGoodByCode('0005');
// console.log(goodObj);
app.get('/', function(req, res) {
    res.render('index');
});
app.post("/send-email", function(req, res) {
    var goodObj = findGoodByCode(req.body.order);
    const output = `
        <h1>У вас нове замовлення</h1>
        <h3>Деталі замовлення:</h3>
    
        <p> <b> ТОВАР </b> </p>
        <img src="cid:${req.body.order}-1.jpeg" alt="Фото товару" style="width: 250px; height: auto;">
        <p><b>Код товару </b><span>${req.body.order}</span></p>
        <p><b>Назва товару </b><span>${goodObj[0].name}</span></p>
        <p><b>Ціна товару </b><span>${goodObj[0].price} грн.</span></p>

        <h3>Деталі замовника:</h3>

        <p><b>Ім\'я прізвище:</b><span>${req.body.name}</span></p>
        <p><b>Місто відправлення:</b><span>${req.body.city}</span>&nbsp;<span>${req.body.number}</span></p>
        <p><b>Email:</b><span>${req.body.from}</span></p>
        <p><b>Телефон:</b><span>${req.body.phone}</span></p>

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
        from: `"Tribal site" <${req.body.from}>`, // sender aspanress
        to: req.body.to, // list of receivers
        subject: "Order from Tribal", // Subject line
        html: output, // html body
        // text: req.body.body, // plain text body
        attachments: [
            {
              filename: `${req.body.order}-1.jpeg`,
              path:  'assets/images/sell/'+ req.body.order + '/'+ req.body.order + '-1.jpeg',
              cid: `${req.body.order}-1.jpeg` 
            }
          ]
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