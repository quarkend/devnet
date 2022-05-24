/* eslint-disable import/no-anonymous-default-export */
// eslint-disable-next-line import/no-anonymous-default-export
// const { useState, useEffect, useCallback } = React;
import React, { useRef, useEffect, useState, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import './search.css'
// import "../topbar/topbar.css"
import ReactDOM from 'react-dom'
import { Search } from '@material-ui/icons'
const storage = JSON.parse(localStorage.getItem('userAount'))

export default props => {
  const FilteredList = () => {
    const [open, setOpen] = useState(false)
    const dropdownSearchbar = useRef(null)
    const users = JSON.parse(localStorage.getItem('userAount'))
    const token = 'Bearer ' + JSON.parse(localStorage.getItem('token'))

    // const userId = storage.id;
    //     // const [users, setUsers] = useState([]);
    //     const [items, setItems] = useState([]);
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const res = await axios.get(`/users`,
    //             {
    //                 headers:
    //                     { "Authorization": token }
    //             }
    //         );
    //         setUsers(res.data);
    //         localStorage.setItem('userAount', JSON.stringify(res.data));
    //         console.log(res.data)
    //     };
    //     fetchUser();
    // }, [token]);

    // const filterIt = (terms, arr) => {
    //   if ("" === terms || terms.length < 3) return arr;
    //   const words = terms.match(/\w+|"[^"]+"/g);
    //   words.push(terms);
    //   return arr.filter((a) => {
    //     const v = Object.values(a);
    //     const f = JSON.stringify(v).toLowerCase();

    //     return words.every(val => f.includes(val));
    //   });
    // };
    const filterIt = (terms, arr, event) => {
      if ('' === terms || terms.length < 3) return arr
      const words = terms.match(/\w+|"[^"]+"/g)
      words.push(terms)
      return arr.filter(a => {
        const v = Object.values(a)
        const f = JSON.stringify(v).toLowerCase()

        return words.every(val => f.includes(val))
      })
    }
    const handleClickOutside = event => {
      if (
        dropdownSearchbar.current &&
        !dropdownSearchbar.current.contains(event.target)
      ) {
        setOpen(false)
      }
    }
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        // clean
        document.removeEventListener('mousedown', handleClickOutside)
      }
    })
    const [items, setItems] = useState([])

    const filterList = useCallback(
      ({ target }) => {
        const searchQuery = target.value.toLowerCase()
        const updatedList = filterIt(searchQuery, users)
        setItems(updatedList)
      },
      [users]
    )

    return (
      <div className="dropdownSearchbar" ref={dropdownSearchbar}>
        <div className="searchbar">
          <Search className=" searchIcon " />
          <input
            className="searchInput"
            id="searchBar"
            placeholder="Rechercher sur Groupomania"
            onChange={filterList}
            onClick={() => setOpen(!open)}
            {...props}
          />
        </div>
        {open && (
          <>
            <div>
              <ul>
                <List items={items} />
              </ul>
            </div>
          </>
        )}
      </div>
    )
  }

  var List = ({ items }) => (
    <ul className="search-results ">
      {items.map(item => (
        <li key={item.id}>
          <h6>{item.id}</h6>
          <span>{item.email}</span>
          <h1>{item.username}</h1>
          <img
            src={'http://localhost:8800/images/' + item.profilePicture}
            alt=""
            className="topbarImg"
          />
          <li>
            <a className="dropdown-menu__item">Profile</a>{' '}
          </li>
        </li>
      ))}
    </ul>
  )
  return (
    <div>
      <FilteredList />
    </div>
  )
}
