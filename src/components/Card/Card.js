import React, { useState, useRef } from 'react'
import './card.scss'
import { Button, Overlay } from 'react-bootstrap'
// import { FaEdit } from 'react-icons/fa'
// import { RiDeleteBin2Fill } from 'react-icons/ri'

function Card ({
  owner,
  user,
  id,
  handleShow,
  handleDelete,
  recipeName,
  difficulty,
  description,
  img,
  prepTime,
  cookTime,
  servings,
  ingredients,
  directions
}) {
  const [show, setShow] = useState(false)
  const target = useRef(null)

  return (
    <div className="card-container">
      <div className="card-heading">

        {window.location.hash.match('#/profile') ? (
          <Button
            className="btn-icon"
            ref={target}
            onClick={() => setShow(!show)}
          >
          </Button>
        ) : (
          ''
        )}
      </div>
      <div>
        <h2 className="name">{recipeName}</h2>
        <br />
        <h3 className="description">{description}</h3>
        <h3 className="img"><img src={img}/></h3>
        <h3 className="ingredients">{ingredients}</h3>
        <h3 className="directions">{directions}</h3>
        <h3 className="servings">{servings}</h3>
        <br />
      </div>
      <div className="bottom-content">
        {prepTime !== 'not provided' && prepTime !== ' ' && prepTime ? (
          <p className="prepTime">{prepTime}</p>
        ) : (
          ''
        )}
        {cookTime !== 'not provided' && cookTime !== ' ' && cookTime ? (
          <p className="cookTime">{cookTime}</p>
        ) : (
          ''
        )}
        {difficulty !== 'not provided' && difficulty !== ' ' && difficulty ? (
          <p className="difficulty">{difficulty}</p>
        ) : (
          ''
        )}
      </div>

      <div>
        <Overlay
          target={target.current}
          show={show}
          placement="left"
          data-backdrop="true"
        >
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div
              {...props}
              style={{
                padding: '2px 10px',
                color: 'white',
                borderRadius: 3,
                ...props.style
              }}
            >
              {user && user._id === owner ? (
                <Button id={id} variant="secondary" onClick={handleShow}>
                  Edit?
                </Button>
              ) : (
                ''
              )}
              {user && user._id === owner ? (
                <Button name={id} variant="danger" onClick={handleDelete}>
                  Delete?
                </Button>
              ) : (
                ''
              )}
              {user && user._id === owner ? (
                <Button
                  name="cancel"
                  variant="secondary"
                  onClick={() => setShow(false)}
                >
                  Cancel
                </Button>
              ) : (
                ''
              )}
            </div>
          )}
        </Overlay>
      </div>
    </div>
  )
}

export default Card
