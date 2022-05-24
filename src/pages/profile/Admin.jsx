import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import User from './User'
import './profile.css'
import styled from 'styled-components'
import { Loader } from '../../utils/style/Atoms'
import './profile.css'
import colors from '../../utils/style/colors'
import DefaultPicture from '../../assets/noAvatar.png'
import Card from '../../components/card/Card'
import { useFetch, useTheme } from '../../utils/hooks/hooks'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
const POSTS_URL = 'http://localhost:8800/api/posts/'
const queryClient = new QueryClient()
export default function Admin() {
  return (
    <QueryClientProvider client={queryClient}>
      <Admins />
    </QueryClientProvider>
  )
}
function Admins() {
  const CardsContainer = styled.div`
    display: grid;
    gap: 24px;
    grid-template-rows: 350px 350px;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-items: center;
  `

  const PageTitle = styled.h1`
    font-size: 30px;
    color: black;
    text-align: center;
    padding-bottom: 30px;
  `

  const PageSubtitle = styled.h2`
    font-size: 20px;
    color: ${colors.secondary};
    font-weight: 300;
    text-align: center;
    padding-bottom: 30px;
  `
  const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
  `
  const [freelancersList, setFreelancesList] = useState([])
  let { id } = useParams()
  const [users, setUsers] = useState([])
  // eslint-disable-next-line
  const [user, setUser] = useState([])
  const [isDataLoading, setDataLoading] = useState(false)
  const storage = JSON.parse(localStorage.getItem('user'))
  const token = 'Bearer ' + JSON.parse(localStorage.getItem('token'))
  const userId = storage.id
  // eslint-disable-next-line

  // async function getUserData() {
  //   const URL = `${'http://localhost:8800/api/users/'}${userId}`
  //   const data = await fetch(URL, {
  //     headers: {
  //       Authorization: 'Bearer ' + token
  //     }
  //   })
  //   const response = await data.json()
  //   setData(response)
  //   console.log(response)
  // }
  // useEffect(() => {
  //   getUserData()
  // }, [])
  // async function getPostData() {
  //   const URL = `${POSTS_URL}`
  //   const data = await fetch(URL, {
  //     headers: {
  //       Authorization: 'Bearer ' + token
  //     }
  //   })
  //   const response = await data.json()
  //   setData(response)
  //   console.log(response)
  // }
  // useEffect(() => {
  //   getPostData()
  // }, [])
  // useEffect(() => {
  //   axios
  //     .get(`/users/${id}`, {
  //       headers: { Authorization: token }
  //     })
  //     .then(response => {
  //       setUser(response.data)
  //       console.log(response.data)
  //       localStorage.setItem(' setLisuserIdX', JSON.stringify(response.data))
  //     })
  // }, [id, token])
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await axios.get(`/users`, {
  //       headers: { Authorization: token }
  //     })
  //     setUsers(res.data)
  //     localStorage.setItem('userAount', JSON.stringify(res.data))
  //     console.log(res.data)
  //   }
  //   fetchUser()
  // }, [token])

  useEffect(() => {
    const fetchUser = async () => {
      // setDataLoading(true)
      try {
        const res = await axios.get(`/users`, {
          headers: { Authorization: token }
        })

        setFreelancesList(res.data)
        localStorage.setItem('userAoddddddunt', JSON.stringify(res.data))
        console.log(res.data)
      } catch (err) {
        console.log('===== error =====', err)
        // setError(true)
      } // finally {
      //   setDataLoading(false)
      // }
    }
    fetchUser()
  }, [token])

  const { theme } = useTheme()
  const { isLoading, error, data } = useQuery('users', () =>
    fetch('/users').then(res => res.json())
  )
  if (isLoading)
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    )

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="profilePageContainer">
      <QueryClientProvider theme={theme} client={queryClient}>
        {/* <div className="profile">
          <div className="card">
            <h4 className="profile-title">Admin</h4>
          </div>
        </div> */}
        {/* {users.map(u => (
        <User key={u.id} user={u} />
      ))} */}
        <PageTitle>Administrateur</PageTitle>
        <PageSubtitle>Nos collaborateurs chez Groupomania.</PageSubtitle>
        {isDataLoading ? (
          <LoaderWrapper>
            <Loader theme={theme} />
          </LoaderWrapper>
        ) : (
          <CardsContainer>
            {freelancersList.map((profile, id) => (
              <Card
                key={`${profile.name}-${id}`}
                label={profile.username}
                title={profile.email}
                picture={profile.profilePicture}
              />
            ))}
          </CardsContainer>
        )}
      </QueryClientProvider>
    </div>
  )
}
