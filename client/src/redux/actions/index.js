import axios from 'axios';

export const GET_RECIPES = "GET_RECIPES"

export function getRecipes(){
    return async function(dispatch){
        const response = await axios.get('http://localhost:3001/recipes');
    }
}