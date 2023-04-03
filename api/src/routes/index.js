const { Router } = require('express');
const { getAllRecipe } = require('../controllers/Controller.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipes/:idRecipe', (req, res) =>{
    res.status(201).json('Detalle de una receta')
});
router.get('/recipes', async (req,res)=>{
    const name = req.query.name
    let recipeTotal= await getAllRecipe();
    if(name){
        let recipeName= await recipeTotal.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase())) 
        recipeName.length ? //si existe, porque tiene algo-- entonces->
        res.status(200).send(recipeName) : res.status(404).send('Not found or recipe not exist 😥') // trae una receta q buscas especificamente.
    }else{
        res.status(201).send(recipeTotal) //trae todos
    }
})

router.post('/recipes')
router.get('/diets')

module.exports = router;
