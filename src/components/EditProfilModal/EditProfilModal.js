import React, { useRef, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faImage } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './EditProfil.css'
import Avatar from './../UI/Avatar/Avatar'
const url = 'http://localhost:8800/images/'
export const AuthContext = React.createContext()
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('token', JSON.stringify(action.payload.token))
      return {
        ...state,
        isAdmin: true,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      }
    case 'X':
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    default:
      return state
  }
}

const EditProfil = () => {
  const initialState = {
    isAuthenticated: false,
    isAdmin: false,
    user: JSON.parse(localStorage.getItem('user')) || null,
    // admin: JSON.parse(localStorage.getItem("admin")) || null,
    token: null
  }
  const [state, dispatch] = React.useReducer(reducer, initialState)
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || null)
    const token = JSON.parse(localStorage.getItem('token') || null)
    if (user && token) {
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          token
        }
      })
    }
  }, [])

  const refUsername = useRef()
  const refEmail = useRef()

  const [imgSrc, setImgSrc] = useState('')

  useEffect(() => {
    const toFetchEmail = async () => {
      try {
        refUsername.current.value = ''
        const response = await axios.get(
          `http://localhost:8800/api/users/${state.user.id}`
        )
        const email = response.data.email
        refEmail.current.value = email
      } catch (err) {
        throw err
      }
    }
    toFetchEmail()
  }, [])

  const history = useHistory()

  const supprimerAccount = () => {
    if (!window.confirm(`Voulez-vous vraiment supprimer le compte ?`)) return

    const userId = JSON.parse(localStorage.getItem('user')).id
    axios.get(`http://localhost:8800/api/auth/delete/${userId}`)
    localStorage.clear()
    const toRedirect = link => {
      history.push(link)
    }
    toRedirect('/conextion')
  }

  const [userNewInfos, setUserNewInfos] = useState({
    username: ''
  })

  let updatedUserNewInfos = {}
  const saveChange = async e => {
    e.preventDefault()
    updatedUserNewInfos = {
      ...userNewInfos,

      username: refUsername.current.value,
      profilePicture: document.getElementById('profil_image').files[0]
    }
    setUserNewInfos(updatedUserNewInfos)

    const post = new FormData()

    post.append('username', refUsername.current.value)
    post.append('image', document.getElementById('profil_image').files[0])

    await axios.put(
      `http://localhost:8800/api/users/${
        JSON.parse(localStorage.getItem('user')).id
      }`,
      post
    )

    const id = JSON.parse(localStorage.getItem('user')).id
    const user = {
      ...updatedUserNewInfos,
      id: id
    }

    localStorage.clear()
    localStorage.setItem('user', JSON.stringify(user))
    window.location.href = '/'
  }

  useEffect(() => {
    const toFetchProfilPicture = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/users/${state.user.id}`
        )

        if (response.data) setImgSrc(response.data.profilePicture)
        else setImgSrc('./images/profils/default/mee.png')
        console.log(response.data.profilePicture)
      } catch (err) {
        throw err
      }
    }
    toFetchProfilPicture()
  }, [])

  const profilePicture = document.getElementById('profil_image')

  return (
    <div className="modal">
      <div className="modal__close">
        <Link to="/">
          <FontAwesomeIcon icon={faTimes} className="modal__close--icon" />
        </Link>
      </div>
      <form className="modal__infos" onSubmit={saveChange}>
        <Avatar className="modal__photo" editable id="profil_image" />
        <div className="modal__photo">
          <img
            className="modal__photo"
            src={url + `${imgSrc}`}
            alt="profile_picture"
          />

          <input type="file" name="img" id="profil_image" />
          <label htmlFor="profil_image">
            <FontAwesomeIcon
              icon={faImage}
              className="profile_picture__change"
            />
          </label>
        </div>

        <div className="modal__username">
          <span>Nom : </span>
          <input ref={refUsername} type="text" name="" id="" />
        </div>
        <div className="modal__email">
          <span>Email : </span>
          <input
            type="email"
            name=""
            id="modal__email--input"
            ref={refEmail}
            disabled
          />
        </div>
        <div className="modal__save">
          <input
            type="submit"
            name="modal__save"
            id="modal__save"
            value="Enregistrer"
          />
        </div>
        <button className="modal__delete_account" onClick={supprimerAccount}>
          supprimer le compte
        </button>
      </form>
    </div>
  )
}

export default EditProfil
// import { useReducer } from 'react'

// const initialValue = {
//   firstName: '',
//   lastName: '',
//   username: '',
//   email: ''
// }

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'update':
//       return {
//         ...state,
//         [action.payload.key]: action.payload.value
//       }
//     default:
//       throw new Error(`Unknown action type: ${action.type}`)
//   }
// }

// const Form = () => {
//   const [state, dispatch] = useReducer(reducer, initialValue)

//   const inputAction = event => {
//     dispatch({
//       type: 'update',
//       payload: { key: event.target.name, value: event.target.value }
//     })
//   }

//   return (
//     <div>
//       <input
//         value={state.firstName}
//         type="text"
//         name="firstName"
//         onChange={inputAction}
//       />
//       <input
//         value={state.lastName}
//         type="text"
//         name="lastName"
//         onChange={inputAction}
//       />
//       <input
//         value={state.username}
//         type="text"
//         onChange={inputAction}
//         name="username"
//       />
//       <input
//         value={state.email}
//         type="email"
//         name="email"
//         onChange={inputAction}
//       />
//     </div>
//   )
// }

// export default Form
