import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Chat, Cancel } from '@material-ui/icons'
const ToRespond = ({ Post }) => {
  const [showComment, setShowComment] = useState(false)
  const storage = JSON.parse(localStorage.getItem('user'))
  const [comments, setComments] = useState([])
  let token = 'Bearer ' + storage.token
  const stor = JSON.parse(localStorage.getItem('post'))
  const [post, setPost] = useState([])
  // States
  const [commentMessage, setCommentMessage] = useState('')
  useEffect(() => {
    axios
      .get(`http://localhost:8800/posts/byId/${stor.id}`, {
        headers: { Authorization: token }
      })
      .then(response => {
        setPost(response.data)
        localStorage.setItem('post', JSON.stringify(response.data))
      })
  }, [token])
  console.log(post)
  useEffect(() => {
    axios
      .get(`http://localhost:8800/api/posts/${stor.id}/comments`, {
        headers: { Authorization: token }
      })
      .then(response => {
        setComments(response.data)
        console.log(response.data)
        localStorage.setItem('comments', JSON.stringify(response.data))
      })
  }, [stor.id, token])
  const submitHandle = async e => {
    e.preventDefault()

    const data = {
      postId: post.id,
      userId: storage.id,

      content: commentMessage
    }
    await axios.post(`http://localhost:8800/api/comments/`, data)

    // this code is just for MVP, it will be upgrade in final version
    document.location.reload()
  }

  const inputHandle = e => {
    setCommentMessage(e.target.value)
  }
  const deleteComment = id => {
    axios
      .delete(`http://localhost:8800/api/comments/${id}`, {
        headers: { Authorization: token }
      })
      .then(() => {
        window.location.reload()
        setComments(
          comments.filter(val => {
            return val.id !== id
          })
        )
      })
  }
  function handleShowComment(e) {
    setShowComment(!showComment)
  }

  return (
    <>
      <div className="listOfComments">
        <h5>Nombre :{comments.length}</h5>
        <ul className="comments">
          {comments.map((comment, key) => {
            return (
              <li key={post.id + comment.id} className="comment">
                {comment.content}:{comment.postId}
                {showComment &&
                  stor.id === <div className="listOfComments"></div> && (
                    <div className="update__container" key={comment.id}></div>
                  )}
                {
                  <Cancel
                    className="shareIcon"
                    onClick={() => {
                      deleteComment(comment.id)
                    }}
                  />
                }
                <Chat
                  title="Modification"
                  onClick={handleShowComment}
                  data-id={comment.id}
                >
                  Comments
                </Chat>
              </li>
            )
          })}
        </ul>
      </div>
      <hr className="divider" />
      <form onSubmit={submitHandle} id={'form-comment'}>
        <input
          type="text"
          placeholder="Écrivez un commentaire..."
          onChange={inputHandle}
          value={commentMessage}
          id="input-comment"
        />
      </form>
    </>
  )
}

export default ToRespond
