import React, { useState, useEffect } from 'react'

import axios from 'axios'

import Avatar from '../../UI/Avatar/Avatar'
import Date from '../../UI/Date/Date'
import Owner from './Owner/Owner'
import Text from './Text/Text'
import Media from './Media/Media'

// Permet d'afficher le temps relatif par rapport à la date actuelle, et en français
import dayjs from 'dayjs'
import Reaction from './Reaction/Reaction'
import ToRespond from './ToRespond/ToRespond'
import Comments from './Comments/Comments'
import Trash from '../../UI/Trash/Trash'
require('dayjs/locale/fr')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
// ===
const storage = JSON.parse(localStorage.getItem('user'))
const Post = ({ post }) => {
  const [mediaURL, setMediaURL] = useState(null)

  const [imgSrc, setImgSrc] = useState('')

  const id = post.id
  useEffect(() => {
    const toFetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/posts/${id}`
        )
        if (response.data.length > 0) {
          setMediaURL(response.data[0].img)
        }
      } catch (err) {
        throw err
      }
    }
    toFetch()
  }, [id])

  const {
    userId = JSON.parse(localStorage.getItem('user')).id,
    desc,
    id: postId
  } = post

  // Render Trash component if user is Admin or if user is owner of the post

  const [trash, setTrash] = useState(false)

  useEffect(() => {
    const toFetchTrash = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/post/${id}`)
        let isAdmin = await axios.get(
          `http://localhost:8800/api/user/${userId}`
        )
        isAdmin = true
        if (response.data[0].id === userId || isAdmin) {
          setTrash(true)
        }
      } catch (err) {
        throw err
      }
    }
    toFetchTrash()
  }, [id])

  const handleClick = () => {
    const deletePost = async () => {
      try {
        const response = await axios.delete(
          `http://localhost:8800/api/post/${id}`
        )
        if (response.status === 200) document.location.reload()
      } catch (err) {
        throw err
      }
    }
    deletePost()
  }

  const toFetchAvatarOfPoster = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8800/posts/byId/${post.id}`
      )
      // if (response.data[0]) setImgSrc(response.data[0].img)
      setImgSrc(response.data[0].img)
    } catch (err) {
      throw err
    }
  }
  toFetchAvatarOfPoster()

  return (
    <>
      <div className="post">
        <div className="post__owner_group">
          <Avatar className={'post__avatar'} imgSrc={imgSrc} />
          <div className="post__owner_and_date">
            {/* <Owner className="post__owner" owner={`${storage.username} `} /> */}
          </div>
        </div>
        {trash && <Trash post={post} onClick={handleClick} />}
        <Text desc={desc} />
        {mediaURL && <Media mediaURL={mediaURL} />}
        <Reaction postId={postId} />
        <Comments postId={postId} />
        <ToRespond postId={postId} />
      </div>
    </>
  )
}

export default Post
