const fs = require('fs')

//Leer ficheros con nodejs

// fs.readFile('./docs/blog1.txt',(err,data)=>{
//     if (err){
//         console.log(err)
//     }
//     console.log(data.toString())
// })

// // Esto se produce antes que la lectura del archivo
// console.log('last line')



// Escribir archivos(nota: el segundo parametro es el texto qeu queremos escribir)

// fs.writeFile('./docs/blog1.txt', 'hola mundo' ,()=>{
//     console.log('file written')
// })
// Nota si el archivo que queremos modificar no existe node lo crea
// fs.writeFile('./docs/blog2.txt', 'hola mundo' ,()=>{
//     console.log('file written')
// })



// Directorios

// Comprobamos que el directorio no existe y lo creamos
// if(!fs.existsSync('./assets')){
//     fs.mkdir('./assets',(err)=>{
//         // Nota: no se sobreescribe un directorio si ya existe
//         if (err){
//             console.log(err)
//         }
//         console.log('folder created')
//     })
// } 
// // Si ya existe borramos el directorio
// else{
//     fs.rmdir('./assets',(err)=>{
//         if(err){
//             console.log(err)
//         }
//         console.log('folder deleted')
//     })
// }



// Borrar archivos

if (fs.existsSync('./docs/blog2.txt')) {
    fs.unlink('./docs/blog2.txt', (err) => {
        if (err) {
            console.log(err)
        }
        console.log('file deleted')
    })
}