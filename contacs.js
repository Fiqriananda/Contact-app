import { rejects } from 'assert'
import validator from 'validator';
import * as fs from 'fs'
// const readline = require('readline')

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

if(!fs.existsSync('./data')){
    fs.mkdirSync('./data')
}

if(!fs.existsSync('./data/contacs.json')){
    fs.writeFileSync('./data/contacs.json', '[]', 'utf-8')
}


// const Question = (pertanyaan) => {
//     return new Promise((resolve, reject)=>{
//         rl.question(pertanyaan, (nama)=>{
//             resolve(nama)
//         });
//     });
// }

const loadContact = () =>{
    const file = fs.readFileSync('data/contacs.json', 'utf-8')
    const contacts = JSON.parse(file)
    return contacts;
}

const simpanContact = (nama, hp, email) =>{
    const contact = {nama, hp, email}
    const contacts = loadContact();

    //cek duplikat
    if(email){
        if(!validator.isEmail(email)){
            console.log('EMAIL TIDAK VALID')
            return false;
        }
    }
    if(hp){
        if(!validator.isMobilePhone(hp, 'id-ID')){
            console.log('HP TIDAK VALID')
            return false;
        }
    }
    const duplicate = contacts.find((contact) => contact.nama === nama);
    if (duplicate){
        console.log('Contact sudah terdaftar');
        return false;
    }
    contacts.push(contact)

    fs.writeFileSync('data/contacs.json', JSON.stringify(contacts, null, 2))

    console.log('TYTY')
}

const listContacts = () => {
    console.log('Daftar Kontak : ')
    const contacts = loadContact();
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.hp}`)
    });
}

const detailContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())

    if(!contact){
        console.log(`Nama tidak ditemukan ${nama}`)
        return false;
    }

    console.log(contact.nama);
    console.log(contact.hp)
    console.log(contact.email)

}

const deleteContact = (nama) =>{
    const contacts = loadContact();
    const newContact = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase())
    if(contacts.length === newContact.length){
        console.log('nama tidak ditemukan')
        return false;
    }
    fs.writeFileSync('data/contacs.json', JSON.stringify(newContact, null, 2))
    console.log(`${nama} berhasil di hapus`)

}

export {simpanContact, listContacts, detailContact, deleteContact}