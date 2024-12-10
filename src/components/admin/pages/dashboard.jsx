import React, { useEffect, useState } from 'react'
import Navbar from '../ui/navbar'
import profile from '../../../img/profile.jpg'
import AddUser from '../ui/addUser';
import Warning from '../ui/warning';
import GlobalApi from '../../../GlobalApi';

function Dashboard() {
    const [isToggled, setIsToggled] = useState(false);
    const [isWarned, setIsWarned] = useState(false);
    const [error, setError] = useState(null)
    const [users, setUsers] = useState([])

    useEffect(() => {
        GlobalApi.FetchUsers().then((response) => {
            setUsers(response.data)
            console.log(response.data);
            

        }, (error) => {
            setError(error.response.data)

        })
    }, [])

    return (
        <div className='w-full h-[100vh] bg-gray-100'>
            <Navbar />
            {isToggled && <AddUser isToggled={(v) => setIsToggled(v)} />}
            {isWarned && <Warning isWarned={(v) => setIsWarned(v)} />}
            <div className='w-10/12 max-h-full bg-white mx-auto mt-10 relative'>
                <button className="absolute top-2 right-12 flex items-center justify-center p-3 rounded-xl text-gray-400 bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-lg transition duration-300 ease-in-out" onClick={() => setIsToggled(!isToggled)}>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
                <div className='grid grid-cols-4 w-11/12 pb-5 pt-5 mx-auto'>
                    <p className='font-bold text-gray-400'>User</p>
                    <p className='font-bold text-gray-400'>Email</p>
                    <p className='font-bold text-gray-400'>Status</p>
                    <p className='font-bold text-gray-400 text-center'>Manage</p>
                </div>
                <div className="grid grid-cols-4 w-11/12 gap-y-5 pb-5 pt-5 mx-auto items-center border-t">
                    {users && users.map((user, index) => (
                        <React.Fragment key={index}>
                            <div className="flex items-center space-x-3">
                                <img src={profile} alt="User Profile" className="w-16 h-16 rounded-full" />
                                <span className="font-semibold text-gray-700">{user.first_name} {user.last_name}</span>
                            </div>

                            <div className="text-gray-600">{user.email}</div>

                            <div>
                                <button className={`px-4 py-2 rounded-full border ${user.is_active ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}>
                                    {user.is_active ? 'Active' : 'Blocked'}
                                </button>
                            </div>

                            <div className="flex justify-center space-x-4">
                                <button className="text-gray-500 hover:text-blue-500" onClick={() => setIsToggled(!isToggled)}>
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M16.768 3.696a1.5 1.5 0 012.121 0l1.415 1.414a1.5 1.5 0 010 2.122l-12.02 12.02a1.5 1.5 0 01-.637.39l-4.243 1.06 1.06-4.243a1.5 1.5 0 01.39-.638l12.02-12.02z" />
                                    </svg>
                                </button>
                                <button className="text-gray-500 hover:text-red-500" onClick={() => setIsWarned(!isWarned)}>
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M6 6v12m0 0h12m-12 0L12 9m0 0l6 9" />
                                    </svg>
                                </button>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard