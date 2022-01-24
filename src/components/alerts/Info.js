import React from 'react';

function Info(props) {
  return <>

        <div className="bg-blue-200 absolute px-6 py-4 shadow-2xl z-50 right-0 mx-5 my-4 rounded-3xl text-lg flex items-center mx-auto">
            <svg viewBox="0 0 24 24" className="text-blue-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
                <path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z" ></path>
            </svg>
            <span className="text-blue-800">{props.message}</span>
        </div>

  </>;
}

export default Info;
