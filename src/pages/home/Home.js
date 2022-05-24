import React from 'react'
import { AuthContext } from './../../App'
// import './home.css'
import Post from './../../components/post/Post'
import Share from './../../components/share/Share'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { StyledLink } from '../../utils/style/Atoms'
import { useTheme } from '../../utils/hooks/hooks'
import HomeIllustration from '../../assets/home-illustration.svg'
import Sidebar from './../../components/sidebar/Sidebar'
import Rightbar from './../../components/rightbar/Rightbar'
const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const HomerContainer = styled.div`
  margin: 30px;
  background-color: ${colors.background};
  padding: 60px 90px;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
`

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  ${StyledLink} {
    max-width: 250px;
  }
`

const StyledTitle = styled.h2`
  padding-bottom: 30px;
  max-width: 280px;
  line-height: 50px;
`

const Illustration = styled.img`
  flex: 1;
`
const initialState = {
  posts: [],
  isFetching: false,
  hasError: false
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_POSTS_REQUEST':
      return {
        ...state,
        isFetching: true,
        hasError: false
      }
    case 'FETCH_POSTS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        posts: action.payload
      }
    case 'FETCH_POSTS_FAILURE':
      return {
        ...state,
        hasError: true,
        isFetching: false
      }
    default:
      return state
  }
}
export const Home = () => {
  const { theme } = useTheme()
  const { state: authState } = React.useContext(AuthContext)
  const [state, dispatch] = React.useReducer(reducer, initialState)
  React.useEffect(() => {
    dispatch({
      type: 'FETCH_POSTS_REQUEST'
    })
    fetch('http://localhost:8800/api/posts', {
      headers: {
        Authorization: `Bearer ${authState.token}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw res
        }
      })
      .then(resJson => {
        dispatch({
          type: 'FETCH_POSTS_SUCCESS',
          payload: resJson
        })
      })
      .catch(error => {
        console.log(error)
        dispatch({
          type: 'FETCH_POSTS_FAILURE'
        })
      })
  }, [authState.token])
  return (
    <HomeWrapper>
      <Sidebar />
      <HomerContainer theme={theme}>
        <Share />

        <LeftCol>
          <StyledTitle theme={theme}>Partager commenter ...</StyledTitle>
          <StyledLink to="/profile/" $isFullLink>
            Profile
          </StyledLink>
        </LeftCol>

        {state.isFetching ? (
          <span className="loader">LOADING...</span>
        ) : state.hasError ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : (
          <>
            {state.posts.map(post => (
              <Post key={post.id.toString()} post={post} />
            ))}
          </>
        )}
      </HomerContainer>
      <Rightbar />
    </HomeWrapper>
    // <div className="homeContainer">
    //   {/* <Sidebar/> */}
    //   <div className="feed">
    //     <div className="feedWrapper">
    //       <Share />
    //     </div>
    //     {state.isFetching ? (
    //       <span className="loader">LOADING...</span>
    //     ) : state.hasError ? (
    //       <span className="error">AN ERROR HAS OCCURED</span>
    //     ) : (
    //       <>
    //         {state.posts.map((post) => (
    //           <Post key={post.id.toString()} post={post} />
    //         ))}
    //       </>
    //     )}
    //   </div>
    //   {/* <Rightbar/>   */}
    // </div>
  )
}
export default Home

//   return (

//   )
// }
