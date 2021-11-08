const fs = require('fs')

// Los streams se para leer o escribir grandes cantidades de datos en intervalos de tiempo

// Para leer
const readStream = fs.createReadStream('./docs/blog3.txt')
// Escribir
const writeStream = fs.createWriteStream('./docs/blog4.txt')

// Leemos un archivo y escribimos su contenido en otro
// readStream.on('data',(data)=>{
//     console.log('--- MORE DATA ---')
//     console.log(data.toString())
//     writeStream.write('\n ---MORE DATA--- \n')
//     writeStream.write(data)
// })

// hace lo mismo que lo anterior pero con menos codigo (excepto mostrar el contenido)
readStream.pipe(writeStream)