require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Recipe, Diets } = require('../db')

//Traigo info de la api
const getApiInfo= async () =>{
    const apiUrl= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`);
    //tarea: hacer un validador
    const apiInfo= await apiUrl.data.results.map(recipe =>{
        return {
            id: recipe.id,
            name: recipe.name,
            image: recipe.image.url,
            resumen: recipe.title,
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

const createPost = async (nombre, imagen, resumen, healthScore, steps) => {
    return await Recipe.create({nombre, imagen, resumen, healthScore, steps})
}

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
}
