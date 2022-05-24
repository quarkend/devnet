import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { StyledLink } from '../../utils/style/Atoms'
import LightLogo from '../../assets/light-logo.png'
import DarkLogo from '../../assets/dark-logo.png'
import { useTheme } from '../../utils/hooks/hooks'
import SearchItem from '../search/SearchItem'
import { SupervisorAccountIcon } from '@material-ui/icons/SupervisorAccount'
import MenuBurger from '../menuBurger/MenuBurger'
import { AuthContext } from './../../App'
const url = 'http://localhost:8800/images/'

const HomeLogo = styled.img`
  height: 40px;
`

const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: snow;
`

function Header() {
  const { theme } = useTheme()
  const { state } = React.useContext(AuthContext)
  const storage = JSON.parse(localStorage.getItem('user'))
  const token = 'Bearer ' + JSON.parse(localStorage.getItem('token'))
  return (
    <NavContainer>
      {state.isAuthenticated && (
        <>
          <Link to="/">
            <HomeLogo src={theme === 'light' ? DarkLogo : LightLogo} />
          </Link>
          <SearchItem />

          <StyledLink $theme={theme} to="/">
            Accueil
          </StyledLink>
          <StyledLink $theme={theme} to={'/profile/' + storage.id}>
            Profile
          </StyledLink>

          <StyledLink to={'/admin/' + storage.id} $isFullLink>
            Admin
          </StyledLink>
          <StyledLink to={'/profile/' + storage.id}>
            <img
              src={
                storage.profilePicture
                  ? url + storage.profilePicture
                  : '/assets/person/noAvatar.png'
              }
              alt=""
              className="topbarImg"
            />
            <span className="topbarLinks">{storage.username} </span>
          </StyledLink>
          <MenuBurger />
        </>
      )}
    </NavContainer>
  )
}

export default Header
