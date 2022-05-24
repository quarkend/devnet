import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './chatOnline.css'
import { AuthContext } from '../../App'

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const { state, dispatch } = React.useContext(AuthContext)
  const [friends, setFriends] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])
  const url = 'http://localhost:8800/images/'
  const storage = JSON.parse(localStorage.getItem('user'))
  const users = JSON.parse(localStorage.getItem('userAount'))
  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get('/users/friends/' + storage.id)
      setFriends(res.data)
      localStorage.setItem('setFriends', JSON.stringify(res.data))
    }

    getFriends()
  }, [currentId])

  useEffect(() => {
    setOnlineFriends(friends.filter(f => onlineUsers.includes(f.id)))
  }, [friends, onlineUsers])

  const handleClick = async user => {
    try {
      const res = await axios.get(`/conversations/find/${currentId}/${user.id}`)
      setCurrentChat(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  // useEffect(() => {
  //   const getFriends = async () => {
  //     const res = await axios.get('/users/' + currentId)
  //     setFriends(res.data)
  //   }

  //   getFriends()
  // }, [currentId])

  // useEffect(() => {
  //   setOnlineFriends(onlineUsers)
  // }, [onlineUsers])

  // const handleClick = async state => {
  //   try {
  //     const res = await axios.get(
  //       `/conversations/find/${currentId}/${storage.id}`
  //     )
  //     setCurrentChat(res.data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    <div className="chatOnline">
      {users.map(o => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o.profilePicture
                  ? url + o.profilePicture
                  : '/assets/person/noAvatar.png'
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o.username}</span>
          <span className="chatOnlineName">{storage.username}</span>
        </div>
      ))}
    </div>
  )
}
