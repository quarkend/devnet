import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Avatar.css'
const Avatar = ({ className, editable, id, imgSrc }) => {
  return (
    <div className={className}>
      <img src={`http://localhost:8800/${imgSrc}`} alt="profile_picture" />
      {editable && <input type="file" name="image" id={id} />}
      {editable && (
        <label htmlFor="image">
          {' '}
          <FontAwesomeIcon className="profile_picture__change" />{' '}
        </label>
      )}
    </div>
  )
}

export default Avatar
