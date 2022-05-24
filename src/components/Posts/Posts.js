import React, { useState, useEffect } from 'react'
import Post from './Post/Post'
import axios from 'axios'
import './Posts'

import { get } from 'react-hook-form'

const Posts = () => {
  const [dataApi, setDataApi] = useState([])
  const [displayData, setDisplayData] = useState(true)
  useEffect(() => {
    const toFetch = async () => {
      const axiosResponse = await axios.get('http://localhost:8800/api/posts/')
      if (axiosResponse.status === 200) {
        setDataApi(axiosResponse.data)
      } else {
        setDisplayData(false)
        // localStorage.clear()
      }
    }
    toFetch()
  }, [])

  return (
    <div className="posts">
      {displayData
        ? dataApi.map(post => {
            return <Post post={post} key={post.id} />
          })
        : `Vous devez être connecté pour pouvoir poster un message`}
    </div>
  )
}

export default Posts
