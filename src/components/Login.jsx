import React, { useState } from 'react'
import useForm from '../hooks/useForm'
import { helpHttp } from '../helpers/helpHttp'
import { TYPE_AUTH, useAuthDispatch } from '../context/AuthContext'

const initialForm = {
  email: '',
  password: ''
}
const validateForm = (form) => {
  const error = {}
  const regexEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/

  if (!form.email.trim()) {
    error.email = 'debe introducir un correo'
  } else if (!regexEmail.test(form.email.trim())) {
    error.email = 'debe ser un correo valido'
  }
  if (!form.password.trim()) {
    error.password = 'debe introducir una contraseña'
  } else if (form.password.trim().length < 6) {
    error.password = 'la contraseña debe tener al menos 6 caracteres'
  }
  return error
}

const Login = () => {
  const api = helpHttp()
  const [validAuthError, setValidAuthError] = useState(false)
  const authDispatch = useAuthDispatch()

  // Form
  const {
    form,
    errors,
    handlerChange,
    handlerBlur,
    handlerSubmit
  } = useForm(initialForm, validateForm)
  const submitForm = (e) => {
    e.preventDefault()

    handlerSubmit().then((valid) => {
      if (valid) {
        api.get('http://localhost:3000/0').then(res => {
          const { email, password } = form

          if (email === res.email && password === res.password) {
            // AUTH
            authDispatch({ type: TYPE_AUTH.LOGIN, payload: res })
          } else {
            setValidAuthError(true)
            setTimeout(() => {
              setValidAuthError(false)
            }, 5000)
          }
        }).catch((err) => {
          const statusText = err.statusText || 'No es posible validar las credenciales'
          setValidAuthError(statusText)
        })
      }
    })
  }

  return (
    <>
      {validAuthError && <span>Las credenciales son incorrectas</span>}
      <section className='bg-gray-50 dark:bg-gray-900'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Iniciar sesión
              </h1>
              <form className='space-y-4 md:space-y-6' onSubmit={submitForm}>
                <div>
                  {errors.email && <span className='text-red-500'>{errors.email}</span>}
                  <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Tu correo</label>
                  <input type='text' name='email' id='email' className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='name@company.com' onChange={handlerChange} />
                </div>
                <div>
                  {errors.password && <span className='text-red-500'>{errors.password}</span>}
                  <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Contraseña</label>
                  <input type='password' name='password' id='password' placeholder='••••••••' className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={handlerChange} />
                </div>
                <div className='flex items-center justify-between' />
                <button type='submit' className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>Entrar</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
