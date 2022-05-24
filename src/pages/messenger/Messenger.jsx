import React from 'react'
import './messenger.css'
import Topbar from '../../components/topbar/Topbar'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { useContext, useEffect, useRef, useState } from 'react'

import axios from 'axios'
import { io } from 'socket.io-client'
import { AuthContext } from './../../App'
const users = JSON.parse(localStorage.getItem('userAount'))
export default function Messenger() {
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newConversation, setNewConversation] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const socket = useRef()
  const storage = JSON.parse(localStorage.getItem('user'))
  const users = JSON.parse(localStorage.getItem('userAount'))
  const messagex = JSON.parse(localStorage.getItem('messages'))
  const token = 'Bearer ' + JSON.parse(localStorage.getItem('token'))
  // http://localhost:8800/api
  const scrollRef = useRef()
  const user = JSON.parse(localStorage.getItem('user')) || null
  useEffect(() => {
    socket.current = io('//localhost:8800')
    socket.current.on('getMessage', data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage &&
      currentChat.members.includes(arrivalMessage.sender) &&
      setMessages(prev => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current.emit('addUser', user.id)
    socket.current.on('getUsers', users => {
      setOnlineUsers(users.filter(f => users.some(u => u.userId === f)))
    })
  }, [user])

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get('/conversations/' + storage.id, {
          headers: { Authorization: token }
        })
        setConversations(res.data)
        localStorage.setItem('conversations', JSON.stringify(res.data))
      } catch (err) {
        console.log(err)
      }
    }
    getConversations()
  }, [user.id])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get('/messages/' + currentChat.id)
        setMessages(res.data)
        localStorage.setItem('messages', JSON.stringify(res.data))
      } catch (err) {
        console.log(err)
      }
    }
    getMessages()
  }, [currentChat])

  const handleSubmit = async e => {
    e.preventDefault()
    const message = {
      sender: user.id,
      text: newMessage,
      conversationId: currentChat.id
    }
    // conversationId: currentChat._id,
    const members = JSON.parse(localStorage.getItem('userAount'))
    const receiverId = storage.id
    members.find(user => user !== user.id)

    socket.current.emit('sendMessage', {
      senderId: user.id,
      receiverId,
      text: newMessage
    })

    try {
      const res = await axios.post('/messages/', message)
      setMessages([...messages, res.data])
      setNewMessage('')
    } catch (err) {
      console.log(err)
    }
  }

  // useEffect(() => {
  //   scrollRef.current.scrollIntoView({ behavior: 'smooth' })
  // }, [messages])

  // const handleSubmittt = async e => {
  //   e.preventDefault()
  //   const conversations = {
  //     receiverId: user.id,
  //     members: user.id,
  //     conversations: conversations
  //   }

  //   try {
  //     const res = await axios.post('/conversations/', conversations)
  //     setConversations([...conversations, res.data])
  //     setNewConversation('')
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // useEffect(() => {
  //   scrollRef.current.scrollIntoView({ behavior: 'smooth' })
  // }, [messages])

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map(c => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map(m => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user.id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={e => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="chatBoxTop">
                  {messages.map(m => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user.id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <span className="noConversationText">
                    Open a conversation to start a chat.
                  </span>
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={e => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user.id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  )
}
// import React from 'react'
// import { Link } from 'react-router-dom'

// import './messenger.css'

// const Messenger = () => {
//   const [roomName, setRoomName] = React.useState('')

//   const handleRoomNameChange = event => {
//     setRoomName(event.target.value)
//   }

//   return (
//     <div className="chat-room-container">
//       <input
//         type="text"
//         placeholder="Room"
//         value={roomName}
//         onChange={handleRoomNameChange}
//         className="text-input-field"
//       />
//       <Link to={`/${roomName}`} className="enter-room-button">
//         Join room
//       </Link>
//     </div>
//   )
// }

// export default Messenger
