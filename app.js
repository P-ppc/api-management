let express = require('express');
let app = express();
let ejs = require('ejs');

app.set('views', __dirname + '/app/views');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

let index = function (req, res) {
    res.render('index');
};

app.get('/', index);
app.get('/index', index);

let server = app.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log(`app is start at http://${host}:${port}`);
});