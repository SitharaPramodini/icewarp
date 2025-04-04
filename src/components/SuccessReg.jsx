import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SuccessReg = () => {
  const { CLIENT_NAME, TABLE_NUMBER } = useParams(); // Destructure useParams

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 4000); 

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);


  return (
    <div className=''>
      <div className='m-4 rounded-full'>
        <h1 className="keyboard text-center md:text-[30px] text-[27px] mt-12">Hello {CLIENT_NAME}!</h1>
        <h1 className="mb-4 text-center md:text-2xl text-xl font-medium text-gray-500 font-sans mt-4">
          Welcome to Icewarp event
        </h1>

        <img className='mt-12 mx-auto w-40' src='/icon1.png' alt="icon" />
        <img className=' mx-auto md:w-72' src='/success.gif' alt="Success" />

        {/* {TABLE_NUMBER && TABLE_NUMBER !== "null" ? (
          <h1 className="mb-4 text-center text-2xl font-medium text-gray-700 mt-10 font-sans">
            Your table no: {TABLE_NUMBER}
          </h1>
        ) : (
          <h1 className="mb-4 text-center text-2xl font-medium text-gray-700 mt-10 font-sans">
            Sit with your colleague
          </h1>
        )} */}

        <p className='text-center text-gray-500 mt-12 font-sans md:text-xl text-sm'>
          Please follow us to receive the door gift
          <div className="flex justify-center">
            <a href='https://www.linkedin.com/company/fentons-information-technology/posts/?feedView=all'>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l 
                focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 
                font-medium rounded-lg text-lg px-12 py-2.5 text-center mb-2 mt-4"
              >
                Follow
              </button>
            </a>
          </div>
        </p>
      </div>
    </div>
  );
};

export default SuccessReg;