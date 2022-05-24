import React from 'react'
import { useEffect, useState } from 'react'
import Card from './../../components/card/Card'
import DefaultPicture from '../../assets/noAvatar.png'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { useParams } from 'react-router-dom'
import { AuthContext } from './../../App'
import axios from 'axios'
import { useFetch, useTheme } from '../../utils/hooks/hooks'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()
export default function Freelances() {
  return (
    <QueryClientProvider client={queryClient}>
      <Freelance />
    </QueryClientProvider>
  )
}
function Freelance() {
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
  const token = 'Bearer ' + JSON.parse(localStorage.getItem('token'))
  const { state } = React.useContext(AuthContext)
  const userId = state.user.id
  const [isDataLoading, setDataLoading] = useState(false)
  // const [error, setError] = useState(false)
  const [freelancersList, setFreelancesList] = useState([])
  const { id } = useParams()

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

  // if (error) {
  //   return <span>Oups il y a eu un problème</span>
  // }
  // const { theme } = useTheme()
  // const { data, isLoading, error } = useFetch(
  //   `http://localhost:8000/freelances`
  // )

  // const freelancersList = data?.freelancersList
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
    <div>
      <QueryClientProvider theme={theme} client={queryClient}>
        <PageTitle>Trouvez votre prestataire</PageTitle>
        <PageSubtitle>
          Chez Shiny nous réunissons les meilleurs profils pour vous.
        </PageSubtitle>
        {isDataLoading ? (
          <LoaderWrapper>
            <Loader theme={theme} />
          </LoaderWrapper>
        ) : (
          <CardsContainer>
            <h1>{data.username}</h1>
            {freelancersList.map((profile, id) => (
              <Card
                key={`${profile.name}-${id}`}
                label={profile.email}
                title={profile.username}
                picture={profile.profilePicture}
              />
            ))}
          </CardsContainer>
        )}
      </QueryClientProvider>
    </div>
  )
}
