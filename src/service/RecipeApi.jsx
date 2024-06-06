import axios from "axios"

const URL = "https://api.spoonacular.com/recipes/"


export const queryRecipe = async (query) => {
    return await axios.get(`${URL}complexSearch?query=${query}&apiKey=${process.env.REACT_APP_API_KEY}`)
                      .then(res => res.data.results)
                      .catch(err => err)
}

export const queryIngredients = async (id) => {
    return await axios.get(`${URL}${id}/ingredientWidget.json?apiKey=${process.env.REACT_APP_API_KEY}`)
                     .then(res => res.data.ingredients)
                     .catch(err => err)
}

export const queryNutrients = async (id) => {
    return await axios.get(`${URL}${id}/nutritionWidget.json?apiKey=${process.env.REACT_APP_API_KEY}`)
                      .then(res => res.data.nutrients)
                      .catch(err => err)
}

export const queryRandomRecipe = async () => {
    return await axios.get(`${URL}random?number=10&apiKey=${process.env.process.env.REACT_APP_API_KEY}`)
                      .then(res => res.data.recipes)
                      .catch(err => err)
}