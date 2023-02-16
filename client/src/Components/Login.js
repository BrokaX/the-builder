import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='Register'>
      <div>
        <h3>Login to your account</h3>
        <form>
        <label htmlFor='Email'>Email</label>
          <input type='Email' name='email'/>          
          <label htmlFor='Password'>Password</label>
          <input type='password' name='password'/>
          <label htmlFor='Password'>Confirm Password</label>
          <input type='password' name='password2'/>
        </form>
        <p>Don't have an account yet? <Link to="/register">Create one</Link></p>
      </div>
    </div>
  )
}
