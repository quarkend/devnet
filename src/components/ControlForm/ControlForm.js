import React, { useState } from 'react'
import Link from './Link/Link'

import Tab from './Tabs/Tab'
import Form from './Form/Form'

const ControlForm = () => {
  const [form, setForm] = useState({
    formLogin: true,
    formRegister: 'register'
  })

  const displayRegister = () => {
    setForm({
      formLogin: true,
      formRegister: 'register'
    })
  }

  const displayLogin = () => {
    setForm({
      formLogin: 'login',
      formRegister: true
    })
  }

  return (
    <div className="identification-container">
      <div className="register-or-login">
        <Tab
          onClick={displayRegister}
          className={
            form.formRegister === 'register'
              ? 'tab active-style active-style__signup'
              : 'tab'
          }
        >
          Inscription
        </Tab>
        <Tab
          onClick={displayLogin}
          className={
            form.formLogin === 'login'
              ? 'tab active-style active-style__login'
              : 'tab'
          }
        >
          Connexion
        </Tab>
      </div>
      {form.formRegister === 'register' ? (
        <>
          <Form form="register" />
          <div className="links">
            <Link content="Vous avez déjà un compte ?" onClick={displayLogin} />
          </div>
        </>
      ) : (
        <>
          <Form form="login" />
          <div className="links">
            <Link content="Mot de passe oublié ?" onClick={displayRegister} />
            <Link content="Pas encore de compte ?" onClick={displayRegister} />
          </div>
        </>
      )}
    </div>
  )
}

export default ControlForm
