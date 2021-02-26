import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import './profile.scss'
import apiUrl from '../../apiConfig'
import Card from '../Card/Card'
import Masonry from 'react-masonry-css'

function Profile ({ user, owner }) {
  const [index, setIndex] = useState([])
  const [show, setShow] = useState(false)
  const [message, setRecipe] = useState({})
  const [recipeId, setRecipeId] = useState(null)
  const [setText] = useState('')
  const [editDeleteShow, setEditDeleteShow] = useState(false)
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
      const updatedRecipe = { [event.target.name]: event.target.value }
      const editedRecipe = Object.assign({}, prevRecipe, updatedRecipe)
      return editedRecipe
    })
  }

  const handleClose = () => setShow(false)
  const handleShow = (event) => {
    setRecipeId(event.target.id)
    setShow(true)
    axios({
      url: `${apiUrl}/recipes/${event.target.id}`,
      method: 'GET',
      headers: {
        Authorization: `Token token=${user.token}`
      }
    })
      .then((res) => setRecipe(res.data.message))
      .then(() => setText(message.content))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/recipes/${recipeId}`,
      method: 'PATCH',
      headers: {
        Authorization: `Token token=${user.token}`
      },
      data: { message }
    }).then(() => {
      return axios({
        url: `${apiUrl}/profile/`,
        method: 'GET',
        headers: {
          Authorization: `Token token=${user.token}`
        }
      })
        .then((res) => setIndex(res.data.messages))
        .then(() => setShow(false))
        .then(() => setEditDeleteShow(false))
    })
  }

  const handleCheck = (event) => {
    event.persist()
    const value =
      event.target.name === 'name' && event.target.checked === true
        ? 'Anonymous'
        : user.username
    setRecipe((prevRecipe) => {
      const updatedRecipe = { [event.target.name]: value }
      const editedRecipe = Object.assign({}, prevRecipe, updatedRecipe)
      return editedRecipe
    })
  }

  const handleDelete = (event) => {
    axios({
      url: `${apiUrl}/recipes/${event.target.name}`,
      method: 'DELETE',
      headers: {
        Authorization: `Token token=${user.token}`
      },
      data: { message }
    }).then(() => {
      return axios({
        url: `${apiUrl}/#/profile`,
        method: 'GET',
        headers: {
          Authorization: `Token token=${user.token}`
        }
      }).then((res) => setIndex(res.data.messages))
    })
  }

  const breakpointColumnsObj = {
    default: 3,
    1390: 2,
    940: 1
  }

  const breakpointColumnsObjOf2 = {
    default: 2,
    940: 1
  }

  useEffect(() => {
    axios({
      url: `${apiUrl}/#/profile/`,
      method: 'GET',
      headers: {
        Authorization: `Token token=${user.token}`
      }
    }).then((res) => setIndex(res.data.messages))
  }, [])

  const recipeData = index.map((item) => (
    <div key={item._id}>
      <Card
        owner={item.owner}
        user={user}
        handleDelete={handleDelete}
        recipeName={item.recipeName}
        difficulty={item.difficulty}
        description={item.description}
        img={item.img}
        prepTime={item.prepTime}
        cookTime={item.cookTime}
        servings={item.servings}
        ingredients={item.ingredients}
        directions={item.directions}
        handleShow={handleShow}
        setEditDeleteShow={editDeleteShow}
      />
    </div>
  ))
  return (
    <div className="profile-container">
      <div className="profile-data">
        <div className="user-info">
          <p>Hello, {user.username} </p>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="recipes">Your Recipes ({index.length})</div>
      <div className="profile-index-container">
        {recipeData.length > 2 && (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {recipeData.reverse()}
          </Masonry>
        )}
        {recipeData.length <= 2 && (
          <Masonry
            breakpointCols={breakpointColumnsObjOf2}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {recipeData.reverse()}
          </Masonry>
        )}
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        data-backdrop="true"
        keyboard={false}
      >
        <Modal.Body className="update-recipe-container">
          <form onSubmit={handleSubmit} id="recipe" name="recipe">
            <div className="header-container">
              <div className="closeButton" onClick={() => setShow(!show)}>
                X
              </div>
            </div>
            <h1>Update Your Recipe</h1>
            <div
              setText={setText}
              className="create-recipe-textarea"
              name="recipeName"
              rows={8}
              placeholder=""
              editValue={message.recipeName}
              handleChange={handleContentChange}
            />
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
            <div className="create-recipe-optional">
              <div className="create-recipe-option">
                Level of Difficulty:
                <input
                  onChange={handleChange}
                  value={message.difficulty}
                  name="difficulty"
                  placeholder="Level of Difficulty"
                ></input>
              </div>
              <div className="create-recipe-option">
                Description:
                <input
                  onChange={handleChange}
                  value={message.description}
                  name="Description"
                  placeholder="Description"
                ></input>
              </div>
              <div className="create-recipe-option">
                Image:
                <input
                  onChange={handleChange}
                  value={message.img}
                  name="img"
                  placeholder="Image URL"
                ></input>
              </div>
              <div className="create-recipe-option">
                Prep Time:
                <input
                  onChange={handleChange}
                  value={message.prepTime}
                  name="prepTime"
                  placeholder="Prep Time"
                ></input>
              </div>
              <div className="create-recipe-option">
                Cook Time:
                <input
                  onChange={handleChange}
                  value={message.cookTime}
                  name="cookTime"
                  placeholder="Cook Time"
                ></input>
              </div>
              <div className="create-recipe-option">
                Servings:
                <input
                  onChange={handleChange}
                  value={message.servings}
                  name="servings"
                  placeholder="Servings"
                ></input>
              </div>
              <div className="create-recipe-option">
                Ingredients:
                <input
                  onChange={handleChange}
                  value={message.ingredients}
                  name="ingredients"
                  placeholder="Ingredients"
                ></input>
              </div>
              <div className="create-recipe-option">
                Directions:
                <input
                  onChange={handleChange}
                  value={message.directions}
                  name="directions"
                  placeholder="Directions"
                ></input>
              </div>
            </div>
            <Button
              className="edit-send"
              variant="secondary"
              onClick={handleClose}
              type="submit"
            >
              Send
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default Profile
