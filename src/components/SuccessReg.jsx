import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaLinkedin } from "react-icons/fa";


const SuccessReg = () => {
  const { CLIENT_NAME, TABLE_NUMBER } = useParams(); // Destructure useParams

  // const navigate = useNavigate();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate("/");
  //   }, 4000); 

  //   return () => clearTimeout(timer); // cleanup
  // }, [navigate]);


  return (
    <div className=''>
              <img className='absolute min-h-screen mx-auto w-full' src='/lanscap.png' alt="icon" />
      <div className='absolute ml-[34%] m-4 rounded-full'>
        <h1 className="text-white text-center md:text-[45px] font-extrabold text-[37px] mt-12">Hello {CLIENT_NAME}!</h1>
        <h1 className="mb-4 text-center md:text-2xl text-xl font-normal text-white font-sans mt-4">
          Welcome to IceWarp's Big Event in Sri Lanka
        </h1>

        {/* <img className='mt-12 mx-auto w-40' src='/icon1.png' alt="icon" /> */}
        {/* <img className=' mx-auto md:w-72' src='/success.gif' alt="Success" /> */}

        {/* {TABLE_NUMBER && TABLE_NUMBER !== "null" ? (
          <h1 className="mb-4 text-center text-2xl font-medium text-gray-700 mt-10 font-sans">
            Your table no: {TABLE_NUMBER}
          </h1>
        ) : (
          <h1 className="mb-4 text-center text-2xl font-medium text-gray-700 mt-10 font-sans">
            Sit with your colleague
          </h1>
        )} */}

        <p className='text-center text-white mt-[22rem] mb-4 font-sans md:text-xl text-sm'>
          Please follow us to receive the door gift </p>
          <div className="flex justify-center">
            <a href='https://www.linkedin.com/company/fentons-information-technology/posts/?feedView=all'>
              {/* <button
                type="button"
                className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l 
                focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 
                font-medium rounded-lg text-lg px-12 py-2.5 text-center mb-2 mt-4"
              >
                Follow
              </button> */}


<button type="button" class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
{/* <svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
<path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd"/>
</svg> */}
<FaLinkedin class="w-4 h-4 me-2"/>

Follow in LinkedIn
</button>
            </a>
          </div>
          
      </div>
    </div>
  );
};

export default SuccessReg;