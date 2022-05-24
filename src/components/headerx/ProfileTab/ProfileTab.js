import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronCircleDown,
  faUserEdit,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'
import Avatar from '../../UI/Avatar/Avatar'

const ProfileTab = () => {
  const [imgSrc, setImgSrc] = useState('')

  const userName = JSON.parse(localStorage.getItem('user')).username

  const logoutHandler = async () => {
    localStorage.clear()
    // await axios.get('http://localhost:8800/api/auth/logout')
    window.location.href = 'http://localhost:3007/connexion'
  }

  useEffect(() => {
    const toFetchProfilPicture = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/users/${
            JSON.parse(localStorage.getItem('user')).id
          }`
        )

        if (response.data[0]) setImgSrc(response.data[0].profilePicture)
        else setImgSrc(imgSrc)
      } catch (err) {
        throw err
      }
    }
    toFetchProfilPicture()
  }, [])
  console.log(imgSrc)
  return (
    <nav className="profil-tab">
      <div className="profil-tab__id">
        <Avatar className="profil-tab__id-img" imgSrc={imgSrc.profilePicture} />
        <div className="profil-tab__id-user-name">{userName}ffffffff</div>
        <FontAwesomeIcon
          className="profil-tab__id-chevron"
          icon={faChevronCircleDown}
        />
      </div>
      <div className="profil-tab__menu-roller">
        <div className="profil-tab__menu-roller--edit-profile">
          <FontAwesomeIcon
            className="profil-tab__menu-roller--edit-profile-icon"
            icon={faUserEdit}
          />
          <Link to="/editprofil">Éditer le profil</Link>
        </div>
        <div
          onClick={logoutHandler}
          className="profil-tab__menu-roller--logout"
        >
          <FontAwesomeIcon
            className="profil-tab__menu-roller--logout-icon"
            icon={faSignOutAlt}
          />
          Déconnexion
        </div>
      </div>
    </nav>
  )
}

export default ProfileTab
