import React, { useEffect, useState } from 'react'

import axios from 'axios'
import Comment from './Comment'

const Comments = ({ postId }) => {
  // States
  const [allComments, setAllComments] = useState([])
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:8800/api/posts/${postId}/comments`
      )
      const data = response.data
      if (Array.isArray(data)) {
        setAllComments(prevState => [...prevState, ...data])
      } else throw new Error("Oops, didn't xxxxget an array.")
    }
    fetchData()
  }, [postId])

  return (
    <div className="comments">
      {allComments.map(comment => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  )
}

export default Comments
