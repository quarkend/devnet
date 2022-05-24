import React, { useState, useEffect } from 'react'

import axios from 'axios'

import dayjs from 'dayjs'
import Trash from '../../../UI/Trash/Trash'
import Avatar from '../../../UI/Avatar/Avatar'
require('dayjs/locale/fr')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const Comment = ({ comment }) => {
  // // Render Trash component if user is Admin or if user is owner of the comment

  const { id: comment_id } = comment
  const [trash, setTrash] = useState(false)
  const [imgSrc, setImgSrc] = useState('')

  useEffect(() => {
    const toFetchTrash = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/comment/${comment_id}`
        )
        let isAdmin = await axios.get(
          `http://localhost:8800/api/user/${
            JSON.parse(localStorage.getItem('user')).id
          }`
        )
        isAdmin = isAdmin.data[0].admin
        if (
          response.data[0].owner_id ===
            JSON.parse(localStorage.getItem('user')).id ||
          isAdmin
        ) {
          setTrash(true)
        }
      } catch (err) {
        throw err
      }
    }
    toFetchTrash()
  }, [comment_id])

  const handleClick = () => {
    const deleteComment = async () => {
      try {
        const response = await axios.delete(
          `http://localhost:8800/api/comments/${comment_id}`
        )
        if (response.status === 200) document.location.reload()
      } catch (err) {
        throw err
      }
    }
    deleteComment()
  }

  const toFetchAvatarOfCommenter = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8800/api/user/image/${comment.owner_id}`
      )
      if (response.data[0]) setImgSrc(response.data[0].profilePicture)
      else setImgSrc('./images/profils/default/mee.png')
    } catch (err) {
      throw err
    }
  }
  toFetchAvatarOfCommenter()

  return (
    <div className="comment">
      <div className="comment__owner-infos">
        <Avatar className="comment__owner_avatar" imgSrc={imgSrc} />
        {/* <div className="comment__owner-id">{comment.owner_id}</div> */}
        <div className="comment__owner-name">
          {`${comment.owner_firstname} ${comment.owner_lastname}`}
        </div>
      </div>
      {trash && <Trash comment={comment} onClick={handleClick} />}
      <div className="comment__message">{comment.message}</div>
      <div className="comment__date">
        {dayjs(comment.created_at)
          .locale('fr')
          .fromNow()}
      </div>
    </div>
  )
}

export default Comment
