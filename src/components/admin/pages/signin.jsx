import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie';
import GlobalApi from '../../../GlobalApi';
import { userLogin } from '../../../reducers/user/authSlice';

function AdminSignin() {
  const user = useSelector((state) => state.UserLogin.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[user])  

  const handleChange = (event)=>{
    setFormData({
      ...formData,
      [event.target.name]:event.target.value
    })
  }


  const handleSubmit = (event)=>{
    event.preventDefault()

    GlobalApi.UserLogin(formData).then((response)=>{
      Cookies.set('accessToken', response.data.access, { expires: 1 });
      Cookies.set('refreshToken', response.data.refresh, { expires: 7 });

      dispatch(userLogin())  
    }, (error)=>{
      setError(error.response.data)
    })
  }
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <div className='lg:w-1/4 md:w-11/12 bg-white p-8 shadow-lg border border-gray-100 rounded-lg'>
        <div>
          <h1 className='text-4xl text-gray-900 font-semibold mb-4'>Admin</h1>
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
          <button className="flex items-center border border-gray-400 rounded-3xl w-11/12 h-9 text-gray-500 mb-4 px-3">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-12 h-12 mr-2 mt-5" // Adjust width and height as needed
            >
              <g>
                <g>
                  <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573    c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z" />
                  <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334    c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0    c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019    c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464    c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648    c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z" />
                </g>
              </g>
            </svg>
            Sign in with Apple
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
        <form onSubmit={(e)=>handleSubmit(e)}>
          <input onChange={(e)=>handleChange(e)} type="email" name='email' placeholder='Email or phone' className='w-11/12 h-10 border border-gray-500 rounded-md p-2 text-sm mt-3' required/>
          <input onChange={(e)=>handleChange(e)} type="password" name='password' placeholder='Password' className='w-11/12 h-10 border border-gray-500 rounded-md p-2 text-sm mt-3 mb-3' required/>
          <button type='submit' className='border bg-blue-500 rounded-3xl w-11/12 h-12 font-semibold text-white mb-4 mt-3'>
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminSignin