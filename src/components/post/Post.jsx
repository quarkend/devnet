import React, { useEffect, useState, useContext } from 'react'

import { AuthContext } from './../../App'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { format } from 'timeago.js'
import './post.css'
import styled, { css } from 'styled-components'
import { useForm } from 'react-hook-form'
import UpdateProfilePhoto from './../../pages/profile/UpdateProfilePhoto'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Chat, Cancel } from '@material-ui/icons'
import MenuDots from '../menuBurger/MenuDots'
import Trash from './../UI/Trash/Trash'
import Reaction from '../Posts/Post/Reaction/Reaction'

const USER_INFO_URL = '/users/'
const url = 'http://localhost:8800/images/'
export default function Post({ post }) {
  const PostContainer = styled.div`
    width: 100%;
    border-radius: 10px;
    /* -webkit-box-shadow: 0px 0px 25px -8px rgba(0,0,0,0.58); 
box-shadow: 0px 0px 25px -8px rgba(0,0,0,0.58); */
    margin: 30px 0;
    width: 45rem;
    overflow: hidden;
    margin: 2rem auto;

    border-radius: 5px;

    background-color: #f4f4f4;
  `
  const PostWrapper = styled.div`
    padding: 10px;
  `
  const PostTopLeft = styled.div`
    display: flex;
    align-items: center;
  `
  const PostTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `
  const PostProfileImg = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  `
  const PostUsername = styled.span`
    font-size: 14px;
    font-weight: 500;
    margin: 0 10px;
  `
  const PostImg = styled.img`
    margin-top: 20px;
    width: 100%;
    max-height: 500px;
    object-fit: contain;
  `
  const PostBottomLeft = styled.div`
    display: flex;
    align-items: center;
    margin: 0 10px;
  `
  const LikeIcon = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 5px;
    cursor: pointer;
  `
  const PostCommentText = styled.div`
    cursor: pointer;

    font-size: 15px;
  `
  const ListOfComments = styled.div`
    padding-left: 0.5rem;
    display: block;
    width: auto;
    margin: auto;
    height: auto;
    /* box-shadow: 0px 0px 13px rgb(172, 160, 160);
        background-color: rgb(231, 220, 220); */
    outline: none;
    transition: 0.3s;
    border: 0.5px solid rgb(185, 181, 181);
  `
  const Comm = styled.button`
    background-color: transparent;
    border: none;
    align-self: center;
  `
  const { state } = React.useContext(AuthContext)
  const { handleSubmit, register } = useForm()
  const [data, setData] = useState('')
  const [showUpdatePhoto, setShowUpdatePhoto] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const [comments, setComments] = useState([])

  const [newComment, setNewComment] = useState('')
  const [users, setUsers] = useState([])
  // eslint-disable-next-line
  const { user } = useContext(AuthContext)
  const [error, setError] = useState(null)
  // eslint-disable-next-line
  const [isLoaded, setIsLoaded] = useState(false)
  const storage = JSON.parse(localStorage.getItem('user'))
  const history = useHistory()
  const postId = post.id
  const token = 'Bearer ' + JSON.parse(localStorage.getItem('token'))
  const [like, setLike] = useState([])
  const [likes, setLikes] = useState([])
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:8800/api/users`, {
        headers: { Authorization: token }
      })
      setUsers(res.data)
      localStorage.setItem('userAount', JSON.stringify(res.data))
      console.log(res.data)
    }
    fetchUser()
  }, [token])
  const likeHandler = () => {
    axios
      .post(
        `/likes`,
        {
          postId: post.id,
          userId: storage.id,
          like: 1
        },
        {
          headers: { Authorization: token }
        }
      )
      .then(response => {
        setLike(response.data.like)

        localStorage.setItem('like', JSON.stringify(response.data))
        console.log(like)
      })
  }
  useEffect(() => {
    axios
      .get(
        `/likes`,

        {
          headers: { Authorization: token }
        }
      )
      .then(response => {
        setLikes(response.data.likes)

        localStorage.setItem('likes', JSON.stringify(response.data))
        console.log(likes)
      })
  })

  useEffect(() => {
    axios
      .get(`/posts/byId/${post.id}`, {
        headers: { Authorization: token }
      })
      .then(response => {
        localStorage.setItem('post', JSON.stringify(response.data))
      })
  }, [post.id, token])
  console.log(post)
  useEffect(() => {
    axios
      .get(`/posts/${post.id}/comments`, {
        headers: { Authorization: token }
      })
      .then(response => {
        setComments(response.data)
        console.log(response.data)
        localStorage.setItem('comments', JSON.stringify(response.data))
      })
  }, [post.id, token])
  const addComment = () => {
    axios
      .post(
        '/comments',
        {
          content: newComment,
          postId: post.id,
          userId: storage.id
        },
        {
          headers: { Authorization: token }
        }
      )
      .then(response => {
        if (response.data.error) {
          console.log(response.data.error)
        } else {
          const commentToAdd = {
            content: newComment,
            username: response.data.username
          }
          setComments([...comments, commentToAdd])
          setNewComment('')
        }
      })
  }
  const deleteComment = id => {
    axios
      .delete(`/comments/${id}`, {
        headers: { Authorization: token }
      })
      .then(() => {
        setComments(
          comments.filter(val => {
            return val.id !== id
          })
        )
      })
  }
  const [trash, setTrash] = useState(false)
  useEffect(() => {
    const toFetchTrash = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/post/${post.id}`
        )
        let isAdmin = await axios.get(
          `http://localhost:8800/api/user/${
            JSON.parse(localStorage.getItem('user')).id
          }`
        )
        isAdmin = isAdmin.data[0].admin
        if (
          response.data[0].id === JSON.parse(localStorage.getItem('user')).id ||
          isAdmin
        ) {
          setTrash(true)
        }
      } catch (err) {
        throw err
      }
    }
    toFetchTrash()
  }, [post.id])
  // const conf = window.confirm('Etes vous sur de vouloir Supprimer definitivement votre compte ?')
  // if(conf)
  const handleClick = () => {
    const deletePost = async () => {
      try {
        const response = await axios.delete(
          `http://localhost:8800/api/post/${post.id}`
        )
        if (response.status === 200) document.location.reload()
      } catch (err) {
        throw err
      }
    }
    deletePost()
  }

  const deletePost = id => {
    axios
      .delete(`http://localhost:8800/api/posts/${post.id}`, {
        headers: { Authorization: token }
      })

      .then(() => {
        window.confirm(
          'Etes vous sur de vouloir Supprimer definitivement votre POST ?'
        )
        window.location.reload()
        history.push('/')
      })
  }
  async function handleUpdateProfilePhoto(data) {
    const formData = new FormData()
    formData.append('image', data.image[0])
    console.log(data.image[0])
    const sendPhoto = await fetch(
      'http://localhost:8800/api/posts/upimg/' + post.id,
      {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + token
        },
        body: formData
      }
    )
    const response = await sendPhoto.json()
    console.log(response)
    getUserData()
    setShowUpdatePhoto(true)
    if (sendPhoto.ok) {
      console.log(response)
      setTimeout(() => {
        history.push(window.location.reload())
      }, 300)
    }
  }
  async function getUserData() {
    const URL = `${USER_INFO_URL}${state.user.id}`
    const data = await fetch(URL, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    const response = await data.json()
    setData(response)
    setIsLoaded(true)
    setError(error)
    console.log(response)
  }
  useEffect(() => {
    getUserData()
  }, [])
  function handleShowComment(e) {
    setShowComment(!showComment)
  }

  let userAuth
  if (post.userId === storage.id) {
    userAuth = (
      <div className="post-button">
        <div className="postBottom">
          <PostBottomLeft>
            {' '}
            <i
              className="fas fa-portrait white fa-2x"
              onClick={() => {
                setShowUpdatePhoto(!showUpdatePhoto)
              }}
            ></i>
            {showUpdatePhoto && (
              <UpdateProfilePhoto
                submit={handleSubmit(handleUpdateProfilePhoto)}
                register={register({ required: true })}
              />
            )}
          </PostBottomLeft>
          <div className="postBottomRight">
            <Trash
              className="shareIcon"
              onClick={() => {
                deletePost(post.id)
              }}
            />
          </div>
        </div>
      </div>
    )
  } else if (!!storage.isAdmin === true) {
    userAuth = (
      <div className="post-button">
        <i
          className="fas fa-portrait white fa-2x"
          onClick={() => {
            setShowUpdatePhoto(!showUpdatePhoto)
          }}
        ></i>
        {showUpdatePhoto && (
          <UpdateProfilePhoto
            submit={handleSubmit(handleUpdateProfilePhoto)}
            register={register({ required: true })}
          />
        )}
      </div>
    )
  }
  return (
    <div className="card">
      <PostContainer>
        <PostWrapper>
          <PostTop>
            <PostTopLeft>
              <PostUsername>
                {/* {users.filter((u) => u.id === post?.userId)[0].username} */}
              </PostUsername>
              {users.map(user => {
                if (post.userId === user.id) {
                  return (
                    <div key={user.id + post.id}>
                      {/* <h2 key={"h2" + user.id}>Publié par <Link to={"/users/" + user.id} key={user.id + post.id} className="nav-link">{user.username} vvv</Link></h2> */}
                      <PostProfileImg
                        src={
                          user.profilePicture
                            ? url + user.profilePicture
                            : '/assets/person/noAvatar.png'
                        }
                        alt="center"
                      />
                      {user.username}
                    </div>
                  )
                } else {
                  return null
                }
              })}
            </PostTopLeft>
            <div className="postTopRight">
              <span className="postDate">{format(post.createdAt)}</span>
              <p className="postDate">
                {' '}
                Posté le{' '}
                {post.createdAt
                  .split('T')
                  .join(' à ')
                  .split('.000Z')
                  .join('')}
              </p>
            </div>
            <MenuDots />
          </PostTop>
          <div className="detail">
            <div className="">
              <h3>Title:{post.title} </h3>
              <PostImg
                src={post.img ? url + post.img : '/assets/icon/gallery.png'}
                alt="center"
              />
            </div>
            {userAuth}
            <hr />
            <h3>
              Description:{post.desc}
              {like}
            </h3>
            <hr />
          </div>
          <PostBottomLeft>
            <LikeIcon
              src="/assets/icon/like.png"
              onClick={likeHandler}
              alt=""
            />
            <LikeIcon
              src="/assets/icon/heart.png"
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter"> {like} people like it</span>
          </PostBottomLeft>
          {/* {showComment.shown ? <Comment />
                        : ""} */}
          <PostCommentText>
            <form>
              <input
                className=""
                id="comm"
                type="text"
                name="comment"
                placeholder="Laisser un commentaire "
                autoComplete="off"
                value={newComment}
                onChange={event => {
                  setNewComment(event.target.value)
                }}
              />
              {/* <input type="text" placeholder="Mettre a jour "        onChange={(event) => {
                                  setUpdateComment(event.target.value);
                                }}value={updateComment}/> */}
            </form>
            <div>
              <Comm id="comm" onClick={addComment}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </Comm>
              {/* <button id="comm" onClick={handleUpdateComment}> update Comment</button> */}
            </div>
          </PostCommentText>
          {showComment.shown ? (
            <ListOfComments>
              <ul className="comments">
                {comments.map((comment, key) => {
                  return (
                    <li key={key} className="comment">
                      {comment.content}

                      {showComment &&
                        storage.id ===
                        <div className="listOfComments"></div> && (
                          <div
                            className="update__container"
                            key={comment.id}
                          ></div>
                        )}
                      {
                        <Trash
                          className="shareIcon"
                          onClick={() => {
                            deleteComment(comment.id)
                          }}
                        />
                      }
                      {/* {trash && <Trash post={post} onClick={handleClick} />} */}
                      {/* <Chat
                        title="Modification"
                        onClick={handleShowComment}
                        data-id={comment.id}
                      ></Chat> */}
                    </li>
                  )
                })}
              </ul>
            </ListOfComments>
          ) : (
            ''
          )}
        </PostWrapper>
        <div className="topbarIcon">
          <div className="topbarIconItem">
            <Chat
              onClick={() => setShowComment({ shown: !showComment.shown })}
            />
            <span className="topbarIconBadge">{comments.length}</span>
          </div>
        </div>
      </PostContainer>
    </div>
  )
}
