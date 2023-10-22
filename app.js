// Ambil argument lewat comand line
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { simpanContact, listContacts, detailContact, deleteContact } from './contacs.js';

yargs(hideBin(process.argv)).command('add', 'menambahkan contact', function(yargs){
    return yargs.option('nama', {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string"
    }).option('hp', {
        describe: "Nomor Handphone",
        demandOption: true,
        type: "string"
    }).option('email', {
        describe: "Email",
        demandOption: true,
        type: "string"
    });
}, function(argv){
    simpanContact(argv.nama, argv.hp, argv.email)
}
// menambahkan List
).command('list', 'Menampilkan contact', function(argv){
    listContacts()
})
// Menambahkan detail
.command('detail', 'Menampilkan Detail Berdasarkan Nama', function(yargs){
    return yargs.option('nama', {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string"
    })      
}, function(argv){
    detailContact(argv.nama);
}).command('delete', 'Delete Data', function(yargs){
    return yargs.option('nama', {
        describe: "Nama Lengkap",
        demandOption: true,
        type:"string"
    })
}, function(argv){
    deleteContact(argv.nama);
}).demandCommand().parse();

// const {Question, simpanContact} = require("./contacs.js")


// const main = async () => {
//     const nama = await Question('Masukan Nama Anda : ');
//     const hp = await Question('Masukan Nomor Hp Anda : ');
//     const email = await Question('Masukan Email Anda : ');

//     simpanContact(nama, hp, email)

// }

// main()


