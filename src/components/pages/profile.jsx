import React, { useEffect, useState } from 'react'
import '../../App.css'
import { FaCamera } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import { logout } from '../../reducers/user/authSlice';


function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [profileImage, setProfileImage] = useState(null);
  const user = useSelector((state) => state.UserLogin.user);

  useEffect(()=>{
    if(!user){
      navigate('/signin')
    }
  },[])  

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleLogout = () =>{
    dispatch(logout())
    navigate('/signin')
  }
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className="w-full h-[50vh] bg-gradient-to-l from-green-400 to-blue-400">

      </div>
      <div className='absolute top-1/2 transform -translate-y-1/3 w-11/12 md:w-1/2 min-h-[50vh] bg-white p-8 shadow-lg border border-gray-100 rounded-3xl'>
      <div className='flex justify-between w-full'>
        <FaSignOutAlt className='text-gray-300 text-2xl cursor-pointer' onClick={handleLogout}/>
        <FaPen className='text-gray-300 text-xl cursor-pointer' />
      </div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48">

          <label htmlFor="imageUpload" className="cursor-pointer group">
            <div className={`w-full h-full rounded-full overflow-hidden shadow-lg border border-gray-100 flex items-center justify-center
              ${profileImage ? '' : 'bg-white'}`}>
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-100 font-semibold">No Image</div>
              )}
            </div>

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full transition-opacity duration-300 ease-out">
              <FaCamera className="text-white text-xl" />
            </div>
          </label>

          <input id="imageUpload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        </div>
        <div className='grid grid-cols-1 mt-16'>
          <h1 className='text-2xl font-semibold text-gray-500 text-center'>{user?.first_name} {user?.last_name}</h1>
          <h1 className='text-gray-500 text-center mb-3'>Python Developer</h1>

          <h1 className='text-gray-500 font-semibold text-center'>About me</h1>
          <p className='text-gray-500 text-sm text-center'>Hey there, I'm Catherine Tresa - a passionate Python developer who likes to make weird things with technology. I'm always on the lookout for innovative methods to develop rich experiences and applications that push the limits of what's possible. When I'm not busy coding, you can find me plotting my next great escape from university (just kidding, maybe!). I love python and web development, with a strong emphasis on "Progressive Enhancement". So if you're looking for a passionate developer with a creative edge, look no further!</p>
        </div>
      </div>
    </div>
  )
}

export default Profile