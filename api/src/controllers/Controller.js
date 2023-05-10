require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Recipe, Diets } = require('../db')

//Traigo info de la api
const getApiInfo= async () =>{
    const apiUrl= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    //tarea: hacer un validador
    const apiInfo= await apiUrl.data.results.map(recipe =>{
        return {
            id: recipe.id,
            nombre: recipe.title,
            image: recipe.image,
            diets: recipe.diets,
            resumen: recipe.summary,
            healthScore: recipe.healthScore,
            steps: recipe.analyzedInstructions[0]?.steps.map(recipe => {
                return {
                    number: recipe.number,
                    step: recipe.step
                }})
        }
    })
    return apiInfo
}

//traer Db
const getDbInfo = async ()=>{
    return await Recipe.findAll({
        include:{
          model: Diets,
          attributes: ['nombre'],
          through: {
            attributes: [], // A Traves de la tabla atributes. 
        }
    } 
})
}

 //Concatenar API + DB //
 const getAllRecipe= async ()=>{
    const apiInfo= await getApiInfo();//traiga la info de la API
    const dbInfo= await getDbInfo(); // traiga la info de la DB
    const infoTotal= await apiInfo.concat(dbInfo) // concatena toda la info en un [].
    return infoTotal
}

const createPost = async (nombre, imagen, diets, resumen, healthScore, steps) => {
    const newRecipe = await Recipe.create({nombre, imagen, resumen, healthScore, steps});
    let dietRecipeDb = await Diets.findAll({
      where: {nombre: diets}
  })
  newRecipe.addDiet(dietRecipeDb);
}


const getDiet =async() =>{
const allDiets = ['gluten free', 'ketogenic', 'vegetarian', 'lacto vegetarian','ovo vegetarian', 'lacto ovo vegetarian', 'vegan', 'pescetarian', 'paleolithic', 'primal', 'low fodmap', 'whole 30', 'dairy free'];
//const apiUrl= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipesInformation=true&number=15`);
//const allDiets= await apiUrl.data.results.map(d => {return {diets: d.diets}});
allDiets.forEach(d => {
  Diets.findOrCreate({
      where: { nombre: d}
  })
})
const dietTypes = await Diets.findAll();
return dietTypes;
};



//const getById = async (id, source) =>{
  //const receta = source === "api" 
  //? (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}/${id}`))
    //.data.results 
  //: await Recipe.findByPk(id);
  //return receta;
  //if(source === "api"){
    //const apiUrl= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}/${id}`);
    //const apiInfo= await apiUrl.data.results.findByPK(id);
    //return apiInfo;
  //}
//}

module.exports = {
    getAllRecipe,
    createPost,
    getDiet,
}
