import React from 'react'
// import Header from '../components/header/Header'
import Header from './headerx/Header'
import Posts from '../components/Posts/Posts'
import WhatsUp from '../components/WhatsUp/WhatsUp'
import './NewsFeed.css'
const NewsFeed = ({ transparent }) => {
  return (
    <div className={transparent ? 'transparent' : 'container__global'}>
      <Header profileTab={true} />
      <div className="container">
        <WhatsUp />
        <h3 className="publication__title">Publications récentes</h3>
        <Posts />
      </div>
    </div>
  )
}

export default NewsFeed
