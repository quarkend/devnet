import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultPicture from '../../assets/noAvatar.png'
import { useTheme } from '../../utils/hooks/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import colors from '../../utils/style/colors'
import { useParams, useHistory } from 'react-router-dom'
import {
  faChevronCircleDown,
  faUserEdit,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'
import { StyledLink } from '../../utils/style/Atoms'
export default function Card({ label, title, picture }) {
  let { id } = useParams()
  let history = useHistory()
  const { theme } = useTheme()
  const [isFavorite, setIsFavorite] = useState(false)
  const star = isFavorite ? '⭐️' : ''
  const CardLabel = styled.span`
    color: #5843e4;
    font-size: 22px;
    font-weight: normal;
    padding-left: 15px;
  `

  const CardTitle = styled.span`
    color: black;
    font-size: 22px;
    font-weight: normal;
    align-self: center;
  `

  const CardImage = styled.img`
    height: 150px;
    width: 150px;
    align-self: center;
    border-radius: 50%;
  `

  const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 15px;
    background-color: ${colors.backgroundLight};
    border-radius: 30px;
    width: 300px;
    height: 300px;
    transition: 200ms;
    &:hover {
      cursor: pointer;
      box-shadow: 2px 2px 10px #e2e3e9;
    }
  `
  return (
    <CardWrapper theme={theme} onClick={() => setIsFavorite(!isFavorite)}>
      <CardLabel theme={theme}>{label}</CardLabel>
      <CardImage
        src={
          picture ? 'http://localhost:8800/images/' + picture : DefaultPicture
        }
        alt="freelance"
      />
      <CardTitle theme={theme}>
        {star} {title} {star}
      </CardTitle>

      <StyledLink $isFullLink to="/editprofil">
        <FontAwesomeIcon icon={faUserEdit} />
      </StyledLink>

      <StyledLink
        $isFullLink
        className="fas fa-user-slash white fa-2x"
        onClick={() => {
          history.push('/deleteuser/' + id)
        }}
      ></StyledLink>
    </CardWrapper>
  )
}
Card.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  picture: PropTypes.string
}
Card.defaultProps = {
  label: '',
  title: 'mon title default',
  picture: DefaultPicture
}
