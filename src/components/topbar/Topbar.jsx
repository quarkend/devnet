import React, { useEffect, useState, useContext } from 'react'
import './topbar.css'
import { AuthContext } from './../../App'
import { BrowserRouter, useHistory, useParams } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import MenuBurger from '../menuBurger/MenuBurger'
import Button from './../ControlForm/Button/Button'
import SearchItem from '../search/SearchItem'
export default function Topbar({ user }) {
  const url = 'http://localhost:8800/images/'
  const [error, setError] = useState(null)
  // eslint-disable-next-line
  const [isLoaded, setIsLoaded] = useState(false)
  let history = useHistory()
  const { state } = React.useContext(AuthContext)
  const storage = JSON.parse(localStorage.getItem('user'))
  const token = 'Bearer ' + JSON.parse(localStorage.getItem('token'))
  // eslint-disable-next-line
  const [data, setData] = useState('')
  // eslint-disable-next-line

  let { id } = useParams()
  // const  isAdmin = storage.isAmin;
  async function getUserData() {
    const URL = `${'http://localhost:8800/api/users/'}${id}`
    const data = await fetch(URL, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    const response = await data.json()
    setData(response)
    console.log(response)
    setIsLoaded(true)
    setError(error)
  }
  useEffect(() => {
    getUserData()
  }, [])
  return (
    <BrowserRouter>
      <nav>
        {state.isAuthenticated && (
          <div>
            <div className="topbarContainer">
              <div className="topbarLeft">
                <h1>G</h1>
                <img
                  className="topbarIco"
                  src="/assets/icon/icon-left-font-monochrome-black.png"
                  alt="icon"
                  onClick={() => {
                    history.push('/')
                  }}
                />
              </div>
              <div className="topbarLeft"></div>
              {/* <div className="topbarCenter">
                <div className="searchbar">
                  <Search className="searchIcon" />
                  <input
                    placeholder="Search for friend, post or video"
                    className="searchInput"
                  />
                </div>
              </div> */}
              <div className="topbarCenter">
                <SearchItem />
              </div>{' '}
              <div className="topbarIcons">
                <div className="topbarIcon">
                  <HomeIcon
                    onClick={() => {
                      history.push('/')
                    }}
                  />
                </div>
                <div className="topbarIconItem">
                  <SupervisorAccountIcon
                    onClick={() => {
                      history.push('/admin/' + storage.id)
                    }}
                  />
                </div>
                <div className="topbarIconItem">
                  <button
                    onClick={() => {
                      history.push('/NewsFeed')
                    }}
                  >
                    NewsFeed
                  </button>
                </div>
                <div className="topbarIconItem"></div>
                <div className="topbarIconItem"></div>
              </div>{' '}
              <div className="topbarIcons">
                <div className="topbarIconItem">
                  <img
                    src={
                      state.user.profilePicture
                        ? url + state.user.profilePicture
                        : '/assets/person/noAvatar.png'
                    }
                    alt=""
                    className="topbarImg"
                    onClick={() => {
                      history.push('/profile/' + state.user.id)
                    }}
                  />
                  <span className="topbarLinks">{state.user.username} </span>
                </div>
                <div className="topbarIconItem">
                  <MenuBurger />
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </BrowserRouter>
  )
}
