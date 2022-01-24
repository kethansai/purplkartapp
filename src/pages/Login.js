import axios from 'axios'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link,useNavigate  } from 'react-router-dom'
import Danger from '../components/alerts/Danger'
import Success from '../components/alerts/Success'

function Login() {

  let navigate = useNavigate();

  const [alert,setAlert] = useState(null)
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [cookie, setCookie] = useCookies('Session')

  const login = () => {
    axios
      .post(process.env.REACT_APP_REST_URL + '/users.php', {
        email: email,
        pwd: pwd,
        type:"login"
      })
      .then((res) => {
        console.log(res)
        if (res.data[0].res === 'success') {
          setAlert(<Success message={res.data[0].message}/>)
          setCookie('user-session', res.data, { maxAge: 60 * 60 * 24 * 100 })
          if(res.data.length == 2){
            if(res.data[1].isAdmin) navigate('/admin'); 
          }else navigate('/user'); 
        }
        if(res.data[0].res === 'danger') setAlert(<Danger message={res.data[0].message}/>)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  return (
    <>
      {alert ? alert:<></>}
      <div className="py-48 flex flex-col items-center justify-center bg-gray-100">
        <div
          className=" flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
          <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
            Join us Now
          </div>
          <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
            Enter your credentials to get access account
          </div>

          <div className="mt-10">
              <div className="flex flex-col mb-5">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs tracking-wide text-gray-600"
                >
                  E-Mail Address:
                </label>
                <div className="relative">
                  <div
                    className=" inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                  >
                    <i className="fas fa-at text-blue-500"></i>
                  </div>

                  <input
                    onChange={e=>setEmail(e.target.value)}
                    id="email"
                    type="email"
                    name="email"
                    className=" text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="password"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Password:
                </label>
                <div className="relative">
                  <div
                    className=" inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                  >
                    <span>
                      <i className="fas fa-lock text-blue-500"></i>
                    </span>
                  </div>

                  <input
                    onChange={e=>setPwd(e.target.value)}
                    id="password"
                    type="password"
                    name="password"
                    className=" text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex w-full">
                <button
                  onClick={login}
                  className=" flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in">
                  <span className="mr-2 uppercase">Login</span>
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-6">
          <Link
            to="/register"
            target="_blank"
            className="inline-flex items-center text-gray-700 font-medium text-xs text-center"
          >
            <span className="ml-2">
              You have an account?
              <Link to="/register" className="text-xs ml-2 text-blue-500 font-semibold">
                Signup here
              </Link>
            </span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Login
