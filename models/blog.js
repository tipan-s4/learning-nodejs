const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// Schema va a definir la estructura de nuestro de modelo
// la variable schema es una funcion constructor

const blogSchema = new Schema({
    // Añadimos las propiedades de nuestro schema
    title:{
        type: String,
        required:true
    },
    snippet:{
        type:String,
        rewuired:true
    },
    body:{
        type:String,
        required :true
    }
},{timestamps:true})//Esto genera timestamps


// Creamos el modelo
// mongoose.blog('Blog') lo pluraliza automaticamente por lo que busca ('Blogs')
const Blog = mongoose.model('Blog',blogSchema)
// Exportamos el modelo
module.exports = Blog;