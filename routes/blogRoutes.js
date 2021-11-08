const express = require('express');
const blogController = require('../controllers/blogController');
// Requreimos las funciones que tienen la logica del programa

const router = express.Router();
// Hacemos uso del objeto router de express y lo exportamos
// notese como ahora no es app.get sino router.get

router.get('/create', blogController.blog_create_get);
router.get('/', blogController.blog_index);
router.post('/', blogController.blog_create_post);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);

module.exports = router;