import React from 'react';

function Success(props) {
  return <div>
    <div className="bg-green-200 absolute px-6 py-4 shadow-2xl z-50 right-0 mx-5 my-4 rounded-3xl text-lg flex items-center mx-auto" >
      <svg viewBox="0 0 24 24" className="text-green-600 w-5 h-5 sm:w-5 sm:h-5 mr-3" >
        <path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z" ></path>
      </svg>
      <span className="text-green-800">{props.message}</span>
    </div>
  </div>;
}

export default Success;
