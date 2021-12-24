const fs = require('fs')

const fsAccessFilePromise = function (path, mode = 1) {
    return new Promise((resolve, reject) => {
        fs.access(path, mode, (error) => {
            if (error) reject(error)
            else resolve("done")
        })
    })
}

const fsReadFilePromise = function (path, encoding = 'utf-8') {
    return new Promise((resolve, reject) => {
        fs.readFile(path, { encoding }, (error , data) => {
            if (error) reject(error)
            else resolve(data)
        })
    })
}

const fsWriteFilePromise = function (path, data, encoding = 'utf-8') {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, { encoding }, (error) => {
            if (error) reject(error)
            else resolve("done")
        })
    })
}

module.exports = {
    fsAccessFilePromise,
    fsReadFilePromise,
    fsWriteFilePromise
}