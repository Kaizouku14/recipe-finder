import axios from "axios"

const URL = "https://api.spoonacular.com/recipes/"
const API_KEY = process.env.REACT_APP_API_KEY


export const queryRandomRecipe = async () => {
    return await axios.get(`${URL}random?number=10&apiKey=${API_KEY}`)
                      .then(res => res.data.recipes)
                      .catch(err => err)
}   
export const queryRecipe = async (query) => {
    return await axios.get(`${URL}complexSearch?query=${query}&apiKey=${API_KEY}`)
                      .then(res => res.data.results)
                      .catch(err => err)
}

export const queryIngredients = async (id) => {
    return await axios.get(`${URL}${id}/ingredientWidget.json?apiKey=${API_KEY}`)
                     .then(res => res.data.ingredients)
                     .catch(err => err)
}

export const queryNutrients = async (id) => {
    return await axios.get(`${URL}${id}/nutritionWidget.json?apiKey=${API_KEY}`)
                      .then(res => res.data.nutrients)
                      .catch(err => err)
}

