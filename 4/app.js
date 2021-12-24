const path = require('path')
const { fsAccessFilePromise, fsReadFilePromise, fsWriteFilePromise } = require('./fspromisemodule.js')

function createPhonebook(resNames, resNumbers) {
    let names = {}
    let numbers = {}
    let phonebook = ""
    let namesLines = resNames.split("\r\n")
    let numbersLines = resNumbers.split("\r\n")
    for (let line of namesLines) {
        let name = line.split("-")
        names[name[0]] = name[1]
    }
    for (let line of numbersLines) {
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
}

async function run(){
    try {
        await fsAccessFilePromise(path.join(__dirname, './names.txt'))
        await fsAccessFilePromise(path.join(__dirname, './phone.txt'))

        const resNames = await fsReadFilePromise(path.join(__dirname, './names.txt'))
        const resNumbers = await fsReadFilePromise(path.join(__dirname, './phone.txt'))

        const phonebook = createPhonebook(resNames, resNumbers)
        await fsWriteFilePromise(path.join(__dirname, './phonebook.txt'), phonebook)
        console.log('done')
    } catch(err) {
        console.log(err.message)
    }
}
run()

