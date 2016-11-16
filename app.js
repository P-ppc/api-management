let express = require('express');
let app = express();
let ejs = require('ejs');
let loggerFactory = require('./log/loggerFactory');

let logger = loggerFactory.logger;
loggerFactory.use(app);

// FIXME 根据不同的环境加载不同的路径
app.use('/static/css', express.static(__dirname + '/app/css'));
app.use('/static/img', express.static(__dirname + '/app/img'));
app.use('/static/js', express.static(__dirname + '/app/js'));
app.use('/static/lib', express.static(__dirname + '/app/lib'));
app.use('/static/bower', express.static(__dirname + '/app/lib/bower_components'));
app.use('/static/components', express.static(__dirname + '/app/views/components'));
app.use('/static/tpl', express.static(__dirname + '/app/views/tpl'));

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
    logger.info(`app is start at http://${host}:${port}`);
});
