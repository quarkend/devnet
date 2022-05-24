import React from 'react'
import './message.css'
import { format } from 'timeago.js'
import { useContext, useEffect, useRef, useState } from 'react'

import axios from 'axios'

const storage = JSON.parse(localStorage.getItem('user'))

const token = 'Bearer ' + JSON.parse(localStorage.getItem('token'))

export default function Message({ message, own }) {
  return (
    <div className={own ? 'message own' : 'message'}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}
//   useEffect(() => {
//     const getMessages = async e => {
//       try {
//         e.preventDefault()
//         const res = await axios.get(
//           '/messages/' + storage.id,

//           {
//             headers: { Authorization: token }
//           }
//         )
//         setMessage(res.data)
//         localStorage.setItem('likes', JSON.stringify(res.data))
//       } catch (err) {
//         console.log(err)
//       }
//     }
//     getMessages()
//   })
//   return (
//     <div className={own ? 'message own' : 'message'}>
//       <div className="messageTop">
//         <img
//           className="messageImg"
//           src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
//           alt=""
//         />
//         <p className="messageText">{message.text}</p>
//       </div>
//       <div className="messageBottom">{format(message.createdAt)}</div>
//     </div>
//   )
// }

// export default function Message({ own }) {
//   const [message, setMessage] = useState([])
//   const storage = JSON.parse(localStorage.getItem('user'))

//   const token = 'Bearer ' + JSON.parse(localStorage.getItem('token'))
//   useEffect(() => {
//     const getMessages = async e => {
//       try {
//         e.preventDefault()
//         const res = await axios.get(
//           '/messages/' + storage.id,

//           {
//             headers: { Authorization: token }
//           }
//         )
//         setMessage(res.data)
//         localStorage.setItem('likes', JSON.stringify(res.data))
//       } catch (err) {
//         console.log(err)
//       }
//     }
//     getMessages()
//   })
//   return (
//     <div className={own ? 'message own' : 'message'}>
//       <div className="messageTop">
//         <img
//           className="messageImg"
//           src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
//           alt=""
//         />
//         <p className="messageText">{message.text}</p>
//       </div>
//       <div className="messageBottom">{format(message.createdAt)}</div>
//     </div>
//   )
// }
