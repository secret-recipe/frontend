import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Card from '../Card/Card'
import Masonry from 'react-masonry-css'

const Index = ({ user, searchValue }) => {
  const [index, setIndex] = useState([])

  useEffect(() => {
    axios({
      url: `${apiUrl}/recipes/`,
      method: 'GET'
    }).then((res) => setIndex(res.data.messages))
  }, [])

  const searchValueLowerCase = searchValue.toLowerCase()

  const filterData = index.filter(
    (item) =>
      item.recipeName.toLowerCase().includes(searchValueLowerCase) ||
      item.difficulty.toLowerCase().includes(searchValueLowerCase) ||
      item.servings.toLowerCase().includes(searchValueLowerCase) ||
      item.description.toLowerCase().includes(searchValueLowerCase) ||
      item.ingredients.toLowerCase().includes(searchValueLowerCase) ||
      item.prepTime.toLowerCase().includes(searchValueLowerCase) ||
      item.cookTime.toLowerCase().includes(searchValueLowerCase)
  )

  const breakpointColumnsObj = {
    default: 3,
    1000: 2,
    700: 1
  }

  const breakpointColumnsObjOf2 = {
    default: 2,
    940: 1
  }

  const messageData = filterData.map((item) => (
    <div key={item._id} className="card-item">
      <Card
        owner={item.owner}
        name={item.name}
        recipeName={item.recipeName}
        difficulty={item.difficulty}
        description={item.description}
        prepTime={item.prepTime}
        cookTime={item.cookTime}
        user={user}
        servings={item.servings}
        ingredients={item.ingredients}
        directions={item.directions}
      />
    </div>
  ))
  return (
    <div className="recipe-count-container">
      <div className="recipe-box">
        {index.length} <br />
        Recipes Posted
      </div>
      <div className="index-header-text">
        Post a delicious SECRET family recipe - or bid on one! Buy now if available...
      </div>
      <div className="masonry-container">
        {messageData.length > 2 && (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {messageData.reverse()}
          </Masonry>
        )}
        {messageData.length <= 2 && (
          <Masonry
            breakpointCols={breakpointColumnsObjOf2}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {messageData.reverse()}
          </Masonry>
        )}
      </div>
    </div>
  )
}

export default Index
