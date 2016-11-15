module.exports = {   
    customBaseDir: "logs/",
    customDefaultAtt: {
        type: "dateFile",
        absolute: false,
        alwaysIncludePattern: true
    },
    appenders: [
        {type: "console", category: "console"},
        {pattern: "debug/yyyyMMdd.txt", category: "logDebug"},
        {pattern: "info/yyyyMMdd.txt", category: "logInfo"},
        {pattern: "warn/yyyyMMdd.txt", category: "logWarn"},
        {pattern: "error/yyyyMMdd.txt", category: "logError"}
    ],
    replaceConsole: true,
    levels: {
        logDebug: "DEBUG",
        logInfo: "INFO",
        logWarn: "WARNING",
        logErr: "ERROR"
    }
};