import React, { useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect, withRouter } from 'react-router-dom'

// import Picker from 'emoji-picker-react'
// import Col from 'react-bootstrap/Col'
import './recipe.scss'

const Recipe = ({ user, msgAlert }) => {
  const [message, setRecipe] = useState({ recipeName: user.username })
  const [recipeId, setRecipeId] = useState(null)
  const [setText] = useState('')
  const handleCheck = (event) => {
    event.persist()
    const value =
      event.target.recipeName === 'name' && event.target.checked === true
        ? 'Anonymous'
        : user.username
    setRecipe((prevRecipe) => {
      const updatedRecipe = { [event.target.recipeName]: value }
      const editedRecipe = Object.assign({}, prevRecipe, updatedRecipe)
      return editedRecipe
    })
  }
  const handleContentChange = (text) => {
    setRecipe((prevRecipe) => {
      const updatedRecipe = { description: text }
      const editedRecipe = Object.assign({}, prevRecipe, updatedRecipe)
      return editedRecipe
    })
  }
  const handleChange = (event) => {
    event.persist()
    setRecipe((prevRecipe) => {
      const updatedRecipe = { [event.target.recipeName]: event.target.value }
      const editedRecipe = Object.assign({}, prevRecipe, updatedRecipe)
      return editedRecipe
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/#/recipes/`,
      method: 'POST',
      headers: {
        Authorization: `Token token=${user.token}`
      },
      data: { message }
    })
      .then((res) => setRecipeId(res.data.message._id))
      .then(setRecipe({}))
  }

  return (
    <div className="create-recipe-container">
      {recipeId && <Redirect to={'/profile'} />}
      <div className="create-recipe-title-row">
        <div className="create-recipe-title">
          <h1>Post a Recipe</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit} id="recipe" name="recipe">
        <div
          setText={setText}
          className="create-recipe-textarea"
          name="content"
          rows={8}
          placeholder=""
          editValue={message.description}
          handleChange={handleContentChange}
        />
        <div className="create-recipe">
          Recipe Name:
          <input
            name="recipeName"
            onChange={handleChange}
            placeholder="Recipe Name"
          />
        </div>
        <div className="create-recipe">
          Image:
          <input
            name="img"
            onChange={handleChange}
            placeholder="Image URL"
          />
        </div>
        <div className="create-recipe">
          Servings:
          <input
            name="servings"
            onChange={handleChange}
            placeholder="Servings"
          />
        </div>
        <div className="create-recipe">
          Ingredients:
          <input
            name="ingredients"
            onChange={handleChange}
            placeholder="Ingredients"
          />
        </div>
        <div className="create-recipe">
          Directions:
          <input
            name="directions"
            onChange={handleChange}
            placeholder="Directions"
          />
        </div>
        <div>
          <div className="checkbox">
            <input
              id="checkbox"
              type="checkbox"
              name="name"
              onClick={handleCheck}
            />{' '}
            <label htmlFor="checkbox">
              <span>Post as anonymous</span>
            </label>
          </div>
          <h5 className="create-recipe-add-optional-title">
            Add to your post (optional)
          </h5>
          <div className="create-recipe-optional">
            <div className="create-recipe-option">
              Prep Time:
              <input
                name="prepTime"
                onChange={handleChange}
                placeholder="Prep Time"
              />
            </div>
            <div className="create-recipe-option">
              Cook Time:
              <input
                name="cookTime"
                onChange={handleChange}
                placeholder="Cook Time"
              />
            </div>
            <div className="create-recipe-option">
              Level of Difficulty:
              <input
                name="difficulty"
                onChange={handleChange}
                placeholder="Level of Difficulty"
              />
            </div>
          </div>
        </div>
        {/* <Picker/> */}
        <button to="/" type="submit" className="create-recipe-submit">
          Submit Post
        </button>
      </form>
    </div>
  )
}
export default withRouter(Recipe)
