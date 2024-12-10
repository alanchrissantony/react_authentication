import React, { useState } from 'react'
import { FaCamera } from 'react-icons/fa';

function AddUser({isToggled}) {
    const [profileImage, setProfileImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
        }
    };
    return (
        <div className='absolute flex justify-center items-center w-full h-full z-10'>
            <div className='relative lg:w-2/4 md:w-11/12 bg-white p-8 shadow-lg border border-gray-100 rounded-3xl'>
                <div className='flex flex-col items-center'>
                    <div className="relative w-32 h-32 mb-8">
                        <label htmlFor="imageUpload" className="cursor-pointer group">
                            <div className={`w-full h-full rounded-full overflow-hidden shadow-lg border border-gray-100 flex items-center justify-center ${profileImage ? '' : 'bg-white'}`}>
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

                    <div className='grid grid-cols-2 gap-5 w-full'>
                        <input type="text" className="border border-gray-300 p-2 rounded-lg" placeholder='Name' />
                        <input type="email" className="border border-gray-300 p-2 rounded-lg" placeholder='Email*' />
                        <input type="password" className="border border-gray-300 p-2 rounded-lg" placeholder='Password*' />
                        <input type="password" className="border border-gray-300 p-2 rounded-lg" placeholder='Confirm Password*' />
                        <textarea type="text" className="border border-gray-300 p-2 rounded-lg col-span-2" placeholder='About' />
                    </div>
                </div>
                <div className='flex justify-end space-x-4 mt-8'>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300" onClick={()=>isToggled(false)}>Cancel</button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Save</button>
                </div>
            </div>
        </div>
    )
}

export default AddUser