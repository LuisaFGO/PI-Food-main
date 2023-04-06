const { Router } = require('express');
const { getAllRecipe, createPost } = require('../controllers/Controller.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//router.get('/recipes/:idRecipe', (req, res) =>{
  //  res.status(201).json('Detalle de una receta')
//});

router.get('/recipes', async (req,res)=>{
    const name = req.query.name;
    let recipeTotal= await getAllRecipe();
    if(name){
        let recipeName= await recipeTotal.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase())) 
        recipeName.length ? //si existe, porque tiene algo-- entonces->
        res.status(200).send(recipeName) : res.status(404).send('Not found or recipe not exist 😥') // trae una receta q buscas especificamente.
    }else{
        res.status(201).send(recipeTotal) //trae todos
    }
})

router.post('/recipes', async (req, res) => {
    let {nombre, imagen, resumen, healthScore, steps} = req.body;
   try {
     let responde = await createPost(nombre, imagen, resumen, healthScore, steps);
     //falta conectar con la dieta 
     res.status(200).json(responde);
   } catch (error) {
     res.status(400).json({error: error.message});
   }
})

router.get('/diets')

module.exports = router;
