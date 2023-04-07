const { Router } = require('express');
const { getAllRecipe, createPost } = require('../controllers/Controller.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes/:id', async (req, res) =>{
    const {id} = req.params;
    //const source = isNaN(id) ? "bdd" : "api" ; 
    //try {
      //const response = await getById(id, source);
      //res.status(200).json(response)
    //} catch (error) {
      //res.status(400).json({error: error.message});
    //}
    const recipesTotal= await getAllRecipe()
        if(id){
            let recipeId= await recipesTotal.filter(rec => rec.id == id)
            recipeId.length?
            res.status(200).json(recipeId):
            res.status(404).send('Not found or does not exist 😥')
        }
});

router.get('/recipes', async (req,res)=>{
    const name = req.query.name;
    let recipeTotal= await getAllRecipe();
      if(name){
        let recipeName= await recipeTotal.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase())) 
        recipeName.length ? //si existe, porque tiene algo-- entonces->
        res.status(200).send(recipeName) : res.status(404).send('Not found or recipe not exist 😥') // trae una receta especificamente.
      }else{
        res.status(201).send(recipeTotal) //trae todos
    }
})

router.post('/recipes', async (req, res) => {
    let {nombre, imagen, resumen, healthScore, steps} = req.body;
   try {
     let response = await createPost(nombre, imagen, resumen, healthScore, steps);
     res.status(200).json(response);
   } catch (error) {
     res.status(400).json({error: error.message});
   }
})

router.get('/diets')

module.exports = router;
