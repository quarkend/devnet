import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentAlt, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
// import { POST, PATCH } from '../../../../api/axios'
// import ENDPOINTS from '../../../../api/endpoints'
const storage = JSON.parse(localStorage.getItem('user'))
const Reaction = ({ postId }) => {
  // State
  const [nbOfLikes, setNbOfLikes] = useState(0)
  const [postLiked, setPostLiked] = useState(false)

  const likeHandle = async () => {
    const data = {
      userId: storage.id,
      postId: postId
    }

    await axios.post('http://localhost:8800/api/likes', data)
    document.location.reload()
  }

  useEffect(() => {
    const getLikesNb = async () => {
      const response = await axios.post('http://localhost:8800/api/likes', {
        postId
      })

      const nbOfLikes = response.data[0].total
      setNbOfLikes(nbOfLikes)
    }
    getLikesNb()
  }, [postId])

  useEffect(() => {
    const getColorLikeButton = async () => {
      const data = {
        postId,
        userId: storage.id
      }
      const response = await axios.post('http://localhost:8800/api/likes', data)
      if (response.data[0]) {
        setPostLiked(true)
      } else {
        setPostLiked(false)
      }
    }
    getColorLikeButton()
  }, [postId])

  return (
    <div className="to-interact">
      <div className="to-interact__nb-of-likes">
        <FontAwesomeIcon icon={faThumbsUp} color={'#38618c'} />
        <p className="to-interact__nb-of-likes--number">{nbOfLikes}</p>
      </div>
      <hr />
      <div className="to-interact__buttons">
        <button
          className={postLiked ? 'button__liked' : null}
          onClick={likeHandle}
        >
          <span>
            <FontAwesomeIcon
              icon={faThumbsUp}
              color={postLiked ? '#38618C' : 'gray'}
            />
          </span>
          J'aime
        </button>
        <button>
          <span>
            <FontAwesomeIcon icon={faCommentAlt} color={'#f57251'} />
          </span>
          Commenter
        </button>
      </div>
      <hr />
    </div>
  )
}

export default Reaction
