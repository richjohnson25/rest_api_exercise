import fs from 'fs';

export const readFileSync = () => {
    return JSON.parse(fs.readFileSync('./database/db.json', 'utf-8'))
}

export const readUserFileSync = () => {
    return JSON.parse(fs.readFileSync('./database/users-db.json', 'utf-8'))
}

export const readMovieFileSync = () => {
    return JSON.parse(fs.readFileSync('./database/movies-db.json', 'utf-8'))
}

export const readTransactionFileSync = () => {
    return JSON.parse(fs.readFileSync('./database/transactions-db.json', 'utf-8'))
}

export const writeFileSync = (data) => {
    return fs.writeFileSync('./database/db.json', JSON.stringify(data))
}

export const writeUserFileSync = (data) => {
    return fs.writeFileSync('./database/users-db.json', JSON.stringify(data))
}

export const writeMovieFileSync = (data) => {
    return fs.writeFileSync('./database/movies-db.json', JSON.stringify(data))
}

export const writeTransactionFileSync = (data) => {
    return fs.writeFileSync('./database/transactions-db.json', JSON.stringify(data))
}