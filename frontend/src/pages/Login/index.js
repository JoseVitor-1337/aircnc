import React, { Fragment, useState } from 'react'
import api from '../../services/api'

export default function Login(props) {

  const [ email, setEmail ] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    const response = await api.post('/sessions', { email })

    localStorage.setItem('user', response.data._id)

    props.history.push('/dashboard')
  }

  const onChange = (event) => {
    setEmail(event.target.value)
  }

  return (
    <Fragment>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para  
        sua empresa
      </p>

      <form onSubmit={handleSubmit}> 
        <label htmlFor="email">E-MAIL</label>
        <input 
          type="email" 
          id="email" 
          onChange={onChange}
          value={email}
          placeholder="Seu melhor e-mail"
        />
        <button className="btn" type="submit">Entrar</button>
      </form>
    </Fragment>
  )
}