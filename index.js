'use strict';
const tinify = require('tinify');
const fs = require('fs');
const chalk = require('chalk');
const config = require('./config');

const optimizeMany = (files) => {
    files.forEach(f => {
        let path = config.IMAGE_SOURCE_PATH + f
        resizeOne(path)
        compressOne(path)
        console.log(chalk.green(f + ' has been optimized.'))
    })
}

const resizeOne = (path) => {
    var source = tinify.fromFile(path);
    var resized = source.resize({
        method: "fit",
        width: config.RESIZING_INFO.X,
        height: config.RESIZING_INFO.Y,
    });
    resized.toFile(path);
}

const compressOne = (path) => {
    var source = tinify.fromFile(path);
    source.toFile(path);
}

const printJSON = (files) => {
    console.log(JSON.stringify(files));
}


tinify.key = config.TINY_API_KEY;

fs.readdir(config.IMAGE_SOURCE_PATH, (err, files) => {
    if (err) {
        console.error(chalk.red(err))
        return
    }

    console.log(chalk.blue("Found " + files.length + " files"))

    printJSON(files);
    optimizeMany(files)
})