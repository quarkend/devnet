// import React, { useState } from 'react'
// import FormikForm from './FormikForm'

// export default function UpdateProfile() {
//   const [fields, updateFields] = useState({
//     name: 'Admin',
//     email: 'admin@example.com',
//     mobile_no: '012345678'
//   })

//   return (
//     <div className="container">
//       <FormikForm fields={fields} updateFields={updateFields} />
//     </div>
//   )
// }
import React, { useRef, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import './UpdateProfile.css'

import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faImage } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import NewsFeed from '../../components/NewsFeed'
import EditProfilModal from './../../components/EditProfilModal/EditProfilModal'

const EditProfil = () => {
  return (
    <div className="container__global">
      <EditProfilModal />
      <div className="newsfeed">{/* <NewsFeed transparent /> */}</div>
    </div>
  )
}

export default EditProfil
