const path = require('path')
const { fsAccessFilePromise, fsReadFilePromise, fsWriteFilePromise } = require('./module')

Promise.all([
    fsAccessFilePromise(path.join(__dirname, './names.txt')),
    fsAccessFilePromise(path.join(__dirname, './phone.txt'))
])
.then(() => {
    return Promise.all([
        fsReadFilePromise(path.join(__dirname, './names.txt')),
        fsReadFilePromise(path.join(__dirname, './phone.txt'))
    ])
})
.then(([ resNames, resNumbers ]) => {
    let names = {}
    let numbers = {}
    let phonebook = ""
    let namesLines = resNames.split("\n")
    console.log(namesLines)
    let nums = resNumbers.split("\n")
    for (let line of namesLines) {
        let name = line.split("-")
        names[name[0]] = name[1]
    }
    for (let line of nums) {
        let number = line.split("-")
        if (numbers.hasOwnProperty(number[0])) {
            numbers[number[0]].push(number[1])
        } else {
            numbers[number[0]] = [number[1]]
        }
    }
    for (let id in names) {
        let phonebookLine = ""
        let check = Object.keys(numbers).find(numId => numId === id)
        if (check) {
            phonebookLine += `${names[id]}'s phone number${numbers[id].length > 1 ? "s are" : " is"} ${numbers[id].join(",")}\n`
        } else {
            phonebookLine += `${names[id]} hasn't any phone number.\n`
        }
        phonebook += phonebookLine
    }
    return phonebook
})
.then(phonebook => {
    return fsWriteFilePromise(path.join(__dirname, './phonebook.txt'), phonebook)
})
.then((res) => {
    console.log(res)})
.catch((err) => {
    console.log(err.message)})