import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './conversation.css'

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null)
  const PF = ' http://localhost:8800/images/'
  const storage = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const friendId = storage.id
    // conversation.members.find(m => m !== currentUser._id)

    const getUser = async () => {
      try {
        const res = await axios('/users?userId=' + friendId)
        setUser(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getUser()
  }, [currentUser, conversation])

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={'http://localhost:8800/images/' + storage.profilePicure}
        alt=""
      />
      <span className="conversationName">{storage.username}</span>
    </div>
  )
}
