let fs = require('fs');
let path = require('path');
let log4js = require('log4js');
let config = require(__dirname + '/config');

let checkAndCreateDir = function (dir) {
    if (!fs.existsSync(dir)) {
        console.log(`mkdir ${dir}`);
        fs.mkdirSync(dir);
    } 
};

// 初始化日志文件目录
checkAndCreateDir('logs/');

if (config.appenders) {
    let baseDir = config.customBaseDir;
    let defaultAtt = config.customDefaultAtt;

    for (let i = 0, j = config.appenders.length; i < j; i++) {
        let item = config.appenders[i];

        if (item.type == "console") {
            continue;
        }

        if (defaultAtt) {
            for (let att in defaultAtt) {
                if (!item[att]) {
                    item[att] = defaultAtt[att];
                }
            }
        }

        if (baseDir) {
            if (!item.filename) {
                item.filename = baseDir;
            } else {
                item.filename = baseDir + item.filename;
            }
        }

        let filename = item.filename;

        if (!filename) {
            continue;
        }
        let pattern = item.pattern;
        if (pattern) {
            filename += pattern;
        }

        let dir = path.dirname(filename);
        checkAndCreateDir(dir);
    }
}

log4js.configure(config);

let logConsole = log4js.getLogger('console');
let logDebug = log4js.getLogger('logDebug');
let logInfo = log4js.getLogger('logInfo');
let logWarn = log4js.getLogger('logWarn');
let logError = log4js.getLogger('logError');

let fileLog = {};
fileLog.debug = function (msg) {
    if (!msg) {
        msg = "";
    }
    logDebug.debug(msg);
};

fileLog.info = function (msg) {
    if (!msg) {
        msg = "";
    }
    logInfo.info(msg);
};

fileLog.warn = function (msg) {
    if (!msg) {
        msg = "";
    }
    logWarn.warn(msg);
};

fileLog.error = function (msg, exp) {
    if (!msg) {
        msg = "";
    }
    if (!exp) {
        msg += '\r\n' + exp;
    }
    logError.error(msg);
};

// 加载环境变量
let env = process.env.NODE_ENV || 'development';
// 获取logger
let getLogger = function () {
    let logger;
    switch (env) {
        case "development":
        case "testing":
            logger = logConsole;
            break;
        case "production":
            logger = fileLog;
            break;
        default:
            logger = logConsole;
    }
    return logger;
};
module.exports.logger = getLogger();
// 配合express用的方法
module.exports.use = function (app) {
    // 页面请求日志, level用auto时, 默认级别是INFO
    let logger;
    switch (env) {
        case "development":
        case "testing":
            logger = logConsole;
            break;
        case "production":
            logger = logInfo;
            break;
        default:
            logger = logConsole;
    }
    app.use(log4js.connectLogger(logger, {
        level: 'info', 
        format: ':method :url from: :remote-addr :status :response-timems'
    }));
};
