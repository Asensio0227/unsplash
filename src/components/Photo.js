import React from 'react'

const Photo = ({name,regular,medium,description,portfolio,likes}) => {
  return (
    <article className='photo'>
      <img src={regular} alt={description} />
      <div className="photo-info">
        <header>
          <h4>{name}</h4>
          <p>{likes} likes</p>
        </header>
        <a href={portfolio}>
        <img src={medium} alt='' className="user-img" />
        </a>
      </div>
    </article>
  )
}

export default Photo
