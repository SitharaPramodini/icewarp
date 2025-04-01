import React from 'react';
import { useParams } from 'react-router-dom';

const SuccessUnreg = () => {
  const { name } = useParams(); // Access the 'name' parameter

  return (
    <div>
        <div className='m-4 rounded-full'>
        <h1 className="keyboard text-center text-[40px] mt-12 mb-[-8px]">Hello {name}!</h1>
        <h1 class="mb-4 text-center text-2xl font-extrabold text-gray-500 ">Welcome to icewarp event</h1>

        
<img className='rounded-full shadow-inner mt-16' src='success.jpg'/>
{/* <h1 class="mb-4 text-center text-2xl font-medium text-gray-700 mt-10 ">Your table no: 14</h1> */}



<p className='text-center text-gray-500'>please follow us to receive the door gift

<div class="flex justify-center">
    <a href='https://www.linkedin.com/company/fentons-information-technology/posts/?feedView=all'>
  <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-12 py-2.5 text-center mb-2 mt-4">
    Follow
  </button>
  </a>
</div>


</p>

</div>
    </div>
  )
}

export default SuccessUnreg