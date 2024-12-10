import React, { useEffect, useState } from 'react'
import '../../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userRegister } from '../../reducers/user/registerSlice'
import validateFormData from '../../validate'

function Signup() {
  const user = useSelector((state) => state.UserLogin.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [password, setPassword] = useState('')
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })

  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[user])  

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
    setError(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validate = validateFormData(formData)
    if(!validate){

      dispatch(userRegister(formData))
      navigate('/signin')
    }else{
      setError(validate)
    }
      

  }
  const handlePassword = (event) => {

    if (password != event.target.value) {
      
      setError({ password: 'Passwords do not match.' })
    }
    else {
      setFormData({
        ...formData,
        password: event.target.value
      })
      setError(null)
      
    }
  }
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <div className='lg:w-1/4 md:w-11/12 bg-white p-8 shadow-lg border border-gray-100 rounded-lg'>
        <div>
          <h1 className='text-4xl text-gray-900 font-semibold mb-4'>Sign up</h1>
          <button className="flex items-center border border-gray-400 rounded-3xl w-11/12 h-9 text-gray-500 mb-4 px-3">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-6 h-6 mr-2"
            >
              <g>
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </g>
            </svg>
            Continue with Google
          </button>
        </div>
        <div className='flex justify-between'>
          <hr className="flex-grow border-t-1 border-gray-300 mt-3" />
          <p className='mx-3'>or</p>
          <hr className="flex-grow border-t-1 border-gray-300 mt-3" />
        </div>
        {error && error[Object.keys(error)[0]] && (
          <p className='text-center' style={{ color: 'red' }}>
            {Array.isArray(error[Object.keys(error)[0]])
              ? error[Object.keys(error)[0]][0]
              : error[Object.keys(error)[0]]}
          </p>
        )}
        <form onSubmit={(e) => handleSubmit(e)}>
          <input onChange={(e) => handleChange(e)} type="text" name='first_name' placeholder='First name' className='w-11/12 h-10 border border-gray-500 rounded-md p-2 text-sm mt-3' required />
          <input onChange={(e) => handleChange(e)} type="text" name='last_name' placeholder='Last name' className='w-11/12 h-10 border border-gray-500 rounded-md p-2 text-sm mt-3' required />
          <input onChange={(e) => handleChange(e)} type="email" name='email' placeholder='Email or phone' className='w-11/12 h-10 border border-gray-500 rounded-md p-2 text-sm mt-3' required />
          <input onChange={(e) => setPassword(e.target.value)} type="password" name='password' placeholder='Password' className='w-11/12 h-10 border border-gray-500 rounded-md p-2 text-sm mt-3' required />
          <input onChange={(e) => handlePassword(e)} type="password" name='confirm_password' placeholder='Confirm password' className='w-11/12 h-10 border border-gray-500 rounded-md p-2 text-sm mt-3 mb-3' required />
          <button type='submit' disabled={error} className='border bg-blue-500 rounded-3xl w-11/12 h-12 font-semibold text-white mb-4 mt-3'>
            Sign up
          </button>
        </form>
      </div>
      <div className='mt-4'>
        <p className='text-gray-700'>
          Already have an account?{' '}
          <Link to={'/signin'} className='text-blue-500 font-semibold'>Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup