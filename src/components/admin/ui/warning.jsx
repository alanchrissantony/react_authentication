function Warning({isWarned}) {

    return (
        <div className='absolute flex justify-center items-center w-full h-full z-10'>
            <div className='relative lg:w-2/4 md:w-11/12 bg-white p-8 shadow-lg border border-gray-100 rounded-3xl'>
                <div className='flex flex-col items-center'>
                    <h3 className='text-gray-500 font-semibold'>Deleting this user will permanently remove all associated data. Are you sure you want to proceed?</h3>
                </div>
                <div className='flex justify-end space-x-4 mt-8'>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300" onClick={()=>isWarned(false)}>Cancel</button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Save</button>
                </div>
            </div>
        </div>
    )
}

export default Warning