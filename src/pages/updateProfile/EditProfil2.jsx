// import React, { useState } from 'react'
// import FormikForm from './FormikForm'

// export default function UpdateProfile() {
//   const [fields, updateFields] = useState({
//     name: 'Admin',
//     email: 'admin@example.com',
//     mobile_no: '012345678'
//   })

//   return (
//     <div className="container">
//       <FormikForm fields={fields} updateFields={updateFields} />
//     </div>
//   )
// }
// import React from 'react'
// import EditProfilModal from '../components/EditProfilModal/EditProfilModal'
// // import NewsFeed from './NewsFeed'
// import './EditProfil.css'
// const EditProfil = () => {
//   return (
//     <div className="container__global">
//       <EditProfilModal />
//       <div className="newsfeed">{/* <NewsFeed transparent /> */}</div>
//     </div>
//   )
// }

// export default EditProfil

// // import React, { useRef, useEffect, useState } from 'react'
// // import { useHistory } from 'react-router-dom'

// // import axios from 'axios'

// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// // import { faTimes, faImage } from '@fortawesome/free-solid-svg-icons'
// // import { Link } from 'react-router-dom'
// // import './UpdateProfile.css'
// // export const AuthContext = React.createContext()
// // const reducer = (state, action) => {
// //   switch (action.type) {
// //     case 'LOGIN':
// //       localStorage.setItem('user', JSON.stringify(action.payload.user))
// //       localStorage.setItem('token', JSON.stringify(action.payload.token))
// //       return {
// //         ...state,
// //         isAdmin: true,
// //         isAuthenticated: true,
// //         user: action.payload.user,
// //         token: action.payload.token
// //       }
// //     case 'X':
// //       localStorage.clear()
// //       return {
// //         ...state,
// //         isAuthenticated: false,
// //         user: null
// //       }
// //     default:
// //       return state
// //   }
// // }

// // const EditProfil = () => {
// //   const initialState = {
// //     isAuthenticated: false,
// //     isAdmin: false,
// //     user: JSON.parse(localStorage.getItem('user')) || null,
// //     // admin: JSON.parse(localStorage.getItem("admin")) || null,
// //     token: null
// //   }
// //   const [state, dispatch] = React.useReducer(reducer, initialState)
// //   React.useEffect(() => {
// //     const user = JSON.parse(localStorage.getItem('user') || null)
// //     const token = JSON.parse(localStorage.getItem('token') || null)
// //     if (user && token) {
// //       dispatch({
// //         type: 'LOGIN',
// //         payload: {
// //           user,
// //           token
// //         }
// //       })
// //     }
// //   }, [])

// //   const refUsername = useRef()
// //   const refEmail = useRef()

// //   const [imgSrc, setImgSrc] = useState('')

// //   useEffect(() => {
// //     const toFetchEmail = async () => {
// //       try {
// //         refUsername.current.value = 'quarkend'
// //         const response = await axios.get(
// //           `http://localhost:8800/api/users/${state.user.id}`
// //         )
// //         const email = response.data.email
// //         refEmail.current.value = email
// //       } catch (err) {
// //         throw err
// //       }
// //     }
// //     toFetchEmail()
// //   }, [])

// //   const history = useHistory()

// //   const desactivateAccount = () => {
// //     if (!window.confirm(`Voulez-vous vraiment désactiver le compte ?`)) return

// //     const userId = JSON.parse(localStorage.getItem('user')).id
// //     axios.get(`http://localhost:8800/api/auth/desactivateAccount/${userId}`)
// //     localStorage.clear()
// //     const toRedirect = link => {
// //       history.push(link)
// //     }
// //     toRedirect('/conextion')
// //   }

// //   const [userNewInfos, setUserNewInfos] = useState({
// //     username: ''
// //   })

// //   let updatedUserNewInfos = {}
// //   const saveChange = async e => {
// //     e.preventDefault()
// //     updatedUserNewInfos = {
// //       ...userNewInfos,

// //       username: refUsername.current.value,
// //       profilePicture: document.getElementById('profil_image').files[0]
// //     }
// //     setUserNewInfos(updatedUserNewInfos)

// //     const post = new FormData()

// //     post.append('username', refUsername.current.value)
// //     post.append(
// //       'profil_image',
// //       document.getElementById('profil_image').files[0]
// //     )

// //     await axios.put(
// //       `http://localhost:8800/api/users/${
// //         JSON.parse(localStorage.getItem('user')).id
// //       }`,
// //       post
// //     )

// //     const id = JSON.parse(localStorage.getItem('user')).id
// //     const user = {
// //       ...updatedUserNewInfos,
// //       id: id
// //     }

// //     localStorage.clear()
// //     localStorage.setItem('user', JSON.stringify(user))
// //     window.location.href = '/'
// //   }

// //   useEffect(() => {
// //     const toFetchProfilPicture = async () => {
// //       try {
// //         const response = await axios.get(
// //           `http://localhost:8800/api/users/${state.user.id}`
// //         )

// //         if (response.data[0]) setImgSrc(response.data[0].img)
// //         else setImgSrc('./images/profils/default/mee.png')
// //       } catch (err) {
// //         throw err
// //       }
// //     }
// //     toFetchProfilPicture()
// //   }, [])

// //   const img = document.getElementById('img')

// //   return (
// //     <div className="modal">
// //       <div className="modal__close">
// //         <Link to="/">
// //           <FontAwesomeIcon icon={faTimes} className="modal__close--icon" />
// //         </Link>
// //       </div>
// //       <form className="modal__infos" onSubmit={saveChange}>
// //         {/* <Avatar className="modal__photo" editable id="profil_image" /> */}
// //         <div className="modal__photo">
// //           <img src={`http://localhost:8800/${imgSrc}`} alt="profile_picture" />
// //           <input type="file" name="profil_image" id="profil_image" />
// //           <label htmlFor="profil_image">
// //             <FontAwesomeIcon
// //               icon={faImage}
// //               className="profile_picture__change"
// //             />
// //           </label>
// //         </div>

// //         <div className="modal__username">
// //           <span>Nom : </span>
// //           <input ref={refUsername} type="text" name="" id="" />
// //         </div>
// //         <div className="modal__email">
// //           <span>Email : </span>
// //           <input
// //             type="email"
// //             name=""
// //             id="modal__email--input"
// //             ref={refEmail}
// //             disabled
// //           />
// //         </div>
// //         <div className="modal__save">
// //           <input
// //             type="submit"
// //             name="modal__save"
// //             id="modal__save"
// //             value="Enregistrer"
// //           />
// //         </div>
// //         <button className="modal__delete_account" onClick={desactivateAccount}>
// //           Désactiver le compte
// //         </button>
// //       </form>
// //     </div>
// //   )
// // }

// // export default EditProfil

// import React from 'react'
// import { Formik } from 'formik'
// import { AuthContext } from './../../App'
// // const user = JSON.parse(localStorage.getItem('user'))

// const token = 'Bearer ' + JSON.parse(localStorage.getItem('token'))

// const Basic = () => (
//   <div>
//     <h6>formik</h6>

//     <Formik
//       initialValues={{ username: '', email: '', password: '' }}
//       validate={values => {
//         const errors = {}
//         if (!values.email) {
//           errors.email = 'Required'
//         } else if (
//           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//         ) {
//           errors.email = 'Invalid email address'
//         }
//         return errors
//       }}
//       onSubmit={(values, { setSubmitting }) => {
//         const { state } = React.useContext(AuthContext)
//         const sendedUsername = fetch(
//           'http://localhost:8800/api/users/' + state.user.id,
//           {
//             method: 'put',
//             headers: {
//               'Content-Type': 'application/json',
//              Authorization: 'Bearer ' + token
//             },
//             body: JSON.stringify(values)
//           }
//         )
//         const response = sendedUsername.json()
//         console.log(response)
//         // setTimeout(() => {
//         //   alert(JSON.stringify(values, null, 2))
//         //   setSubmitting(false)
//         // }, 400)
//       }}
//     >
//       {({
//         values,
//         errors,
//         touched,
//         handleChange,
//         handleBlur,
//         handleSubmit,
//         isSubmitting
//         /* and other goodies */
//       }) => (
//         <form onSubmit={handleSubmit}>
//           <div className="form-group row">
//             <label className="col-sm-2 col-form-label">username</label>
//             <div className="col-sm-10">
//               <label type="text" name="username" className="form-control">
//                 <input
//                   type="username"
//                   name="username"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   value={values.username}
//                 />
//                 {errors.username && touched.username && errors.username}
//               </label>
//             </div>
//           </div>
//           <div className="form-group row">
//             <label className="col-sm-2 col-form-label">Email</label>
//             <div className="col-sm-10">
//               <label type="text" name="brand_name" className="form-control">
//                 {' '}
//                 <input
//                   type="email"
//                   name="email"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   value={values.email}
//                 />
//                 {errors.email && touched.email && errors.email}
//               </label>
//             </div>
//           </div>
//           <div className="form-group row">
//             <label className="col-sm-2 col-form-label">password</label>
//             <div className="col-sm-10">
//               <label type="text" name="device_type" className="form-control">
//                 <input
//                   type="password"
//                   name="password"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   value={values.password}
//                 />
//                 {errors.password && touched.password && errors.password}
//               </label>
//             </div>
//           </div>

//           <button type="submit" disabled={isSubmitting}>
//             Submit
//           </button>
//         </form>
//       )}
//     </Formik>
//   </div>
// )

// export default Basic
