const express = require('express');
const mongoose = require('mongoose')
const Blog = require('./models/blog')
// express app
const app = express();
const dbURI = process.env.dbURI;

// register view engine (Le decimos a express que usaremos ejs)
app.set('view engine', 'ejs')


// listen for requests
// app.listen(3000);


// Connexion con mongodb
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))
// Comprobamos que se conecta correctamente a la base de datos para seguir con la ejecucion del programa


// Haceoms uso del middleware
// Haremos uso del midldleware para servir nuestros archivos estaticos
// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     // Para que no se pare la ejeccion usamos next()
//     next();
// });

// Le decimos a express que busque en el directorio public
app.use(express.static('public'))
// Hace posible el envio de datos con post
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});
  
  
app.get('/', (req, res) => {
    // Redirigimos a la pagina principal
    res.redirect('/blogs');
    // const blogs = [
    //     { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    //     { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    //     { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    // ];
    // // res.send('<p>home page</p>');
    // //   El segundo parametro hace que busque en el directotio actual
    // // Con ejs no haace falta indicar el directorio solo el nombre del archivo
    // // Le enviamos unos objetos que index se encargara de mostrar
    // res.render('index', { title: 'Home', blogs })
    //  res.sendFile('./views/index.html', { root: __dirname });
});


app.get('/blogs', (req, res) => {
    // Recogemos todos los blogs y los enviamos ordenados por el ultimo creado
    Blog.find().sort({ createdAt: -1 })
    .then(result => {
        res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
        console.log(err);
    });
});


// Recogemos los datos enviados con post
app.post('/blogs', (req, res) => {
    // Notese que nos devuelve un objeto con las mismas propiedades que nuestro objeto/modelo blog
    // console.log(req.body);
    // Guaradamos los blogs
    const blog = new Blog(req.body);
  
    blog.save()
      .then(result => {
        res.redirect('/blogs');
      })
      .catch(err => {
        console.log(err);
      });
  });


// Pagina para crear blogs
// Nota: debe estar antes que app.get('/blogs/:id') dado que express se ejecuta de arriba 
// a abajo y estaria buscando la url ('blogs/:id/create)
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

// Recogemos un blog con un id determinado
app.get('/blogs/:id', (req, res) => {
    // Recogemos el id del blog con el uso de params
    const id = req.params.id;
    // Enviamos el blog con dicho id
    Blog.findById(id)
      .then(result => {
        res.render('details', { blog: result, title: 'Blog Details' });
    })
      .catch(err => {
        console.log(err);
    });
});
  

// Borramos un blog con un determinado id
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    // Borramos el blog con dicho id
    Blog.findByIdAndDelete(id)
    // Al haber hecho uso de ajax no podemos redirigir desde express por
    // lo que enviamos un json del que se encarga el navegador(javascript)
    // de manejar y redirigir por nosotros
      .then(result => {
        res.json({ redirect: '/blogs' });
    })
      .catch(err => {
        console.log(err);
    });
});

// mongoose and mongo sandbox routes
app.get('/add-blog',(req,res)=>{
    // Creamos nuevos blogs
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'more about my blog'
    })
    blog.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.get('/all-blogs',(req,res)=>{
    // Busca todos los blogs
    Blog.find()
    .then(result=>{
        res.send(result)
    })
    .catch(err=>{
        console.log(err)
    })
})


app.get('/single-blog', (req, res) => {
    // Solo un blog
    Blog.findById('60812bc18be7bd3ca8f04fdc')
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });


app.get('/about', (req, res) => {
    // res.send('<p>about page</p>');
    res.render('about', { title: 'About' })
    //   res.sendFile('./views/about.html', { root: __dirname });
});


// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// 404 page
// use funciona como un else
// Debe despues de todas las demas get
app.use((req, res) => {
    // Le indicamos que es un error con status
    res.status(404).render('404', { title: '404' });
    //   res.status(404).sendFile('./views/404.html', { root: __dirname });
});