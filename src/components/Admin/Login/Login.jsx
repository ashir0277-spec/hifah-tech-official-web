import React, {useState} from 'react'
import { Eye, EyeOff } from 'lucide-react';
// import loader from '../../../assets/loading/loading_white.json'
// import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';
import loaderIcon from '../../../assets/icons/warn.svg'
import loaderwarn from '../../../assets/icons/warn.svg'
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc,setDoc  } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import DangerPopup from '../Popups/DanderPopup';

import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [showPass, setshowPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [warnPopup, setWarnPopup] = useState(false)
    // const [error, setError] = useState('')

    // const API_URL = process.meta.env.VITE_API_URL;
  const [token, setToken] = useState('') // Fallback if token exists
  const BaseUrl = 'https://hifah-technology-official-backend-production.up.railway.app/api';

  const handleSubmit2 = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorText('');

    try {
      const res = await axios.post(`${BaseUrl}/signin`, { email, password });
      if (res.data.token) {
        setToken(res.data.token);
        navigate("/admin/dashboard");
        localStorage.setItem("adminToken", res.data.token);
      }
    } catch (err) {
      setErrorText(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  
  };

   const loginUser = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    console.log("Auth response:", res);

    // const user = res.user;
    
    const user = auth.currentUser;
    console.log(user);
    
const token = await user.getIdToken(true);

// since this is the only admin user
const role = "admin";

// store auth data
localStorage.setItem("token", token);
localStorage.setItem("role", role);
localStorage.setItem("fullName", "Hifza Kanwal"); //user.displayName || 
localStorage.setItem("email", user.email);
localStorage.setItem("uid", user.uid);

return role;

  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
};

const [errorText, setErrorText] = useState('')
const [showPopup2, setShowPopup2] = useState(false)

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    setIsLoading(true)
    const role = await loginUser(email, password);
    // console.log(role);
    console.log("response",role);

    

    if (role === "admin") {
      navigate("/admin/dashboard");
    } else{
      setErrorText("Need admin credentials to login!")
      setShowPopup2(true)
      setTimeout(() => {
        setShowPopup2(false)
      }, 3000);
    }
  } catch (error) {
    console.error("Login failed:", error);
    setWarnPopup(true)
      setTimeout(() => {
        setWarnPopup(false)
      }, 3000);
  } finally {
    setIsLoading(false)
  }
};



  return (
    <div className='w-full h-screen flex items-center justify-center'>
    {showPopup2 && (
      <DangerPopup text={errorText} />
    )}
        {showPopup && (
          <div className='fixed shadow-xl rounded-lg top-16 right-10 z-50 bg-red-500'>
              <div className='rounded-lg w-[400px] shadow-lg p-5 border border-[#ccc]'>
              <div className='flex items-center gap-4'>
                  <img src={loaderIcon} alt="icon" />
                  <div>
                    <h3 className='roboto font-medium text-[20px] text-[#fff]'>Please fill out the fields!</h3>
                  </div>
              </div>
              </div>
          </div>
          )}
        {warnPopup && (
          <div className='fixed shadow-xl rounded-lg top-16 right-10 z-50 bg-red-500'>
              <div className='rounded-lg w-[400px] shadow-lg p-5 border border-[#ccc]'>
              <div className='flex items-center gap-4'>
                  <img src={loaderwarn} alt="icon" />
                  <div>
                    <h3 className='roboto font-medium text-[16px] w-full text-[#fff]'>Either email or password is incorrect!</h3>
                  </div>
              </div>
              </div>
          </div>
          )}
        <div className='bg-white w-[640px] sm:h-[653px] shadow-[0_8px_24px_0_#1018280D] rounded-2xl flex items-center justify-center'>
          <div className='w-[88%] sm:w-[88%] sm:w-[60%]'>
                <h1 className='inter font-semibold text-[#101828] text-2xl text-center'>Hifah Technologies</h1>
                <h1 className='inter font-semibold text-[#101828] text-[28px] text-center'>Welcome Back</h1>
                <form action="" onSubmit={(e) => {handleSubmit(e); handleSubmit2(e)}}>
                <div className='w-full flex flex-col gap-5 items-center mt-10'>
                    <div className='w-full'>
                      <label htmlFor="email" className='inter text-[#344054] text-sm font-medium'>Email<span className='text-red-500'>*</span></label>
                      <div className='w-full flex justify-between items-center border border-[#D0D5DD] rounded-lg px-4 py-3.25'>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" placeholder='Enter your email' className='border-none autofill-white w-full inter font-regular outline-none text-sm placeholder:text-[#838383]' required />
                        <svg className='cursor-pointer' onClick={() => setEmail('')} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.00065 14.6666C11.6673 14.6666 14.6673 11.6666 14.6673 7.99998C14.6673 4.33331 11.6673 1.33331 8.00065 1.33331C4.33398 1.33331 1.33398 4.33331 1.33398 7.99998C1.33398 11.6666 4.33398 14.6666 8.00065 14.6666Z" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M6.11328 9.88668L9.88661 6.11334" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M9.88661 9.88668L6.11328 6.11334" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <div className='w-full'>
                        <label htmlFor="email" className='inter text-[#344054] text-sm font-medium'>Password<span className='text-red-500'>*</span></label>
                        <div className='w-full flex justify-between items-center border border-[#D0D5DD] rounded-lg px-4 py-3.25'>
                            <input type={showPass === true ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} name="pass" id="pass" placeholder='Enter password' className='border-none autofill-white w-full inter font-regular outline-none text-sm placeholder:text-[#838383]' required />
                            {showPass === true ? <EyeOff onClick={() => setshowPass(false)} className='w-4 h-4 cursor-pointer text-[#292d32]' /> : <Eye onClick={() => setshowPass(true)} className='w-4 h-4 cursor-pointer text-[#292d32]' />}
                            

                        </div>
                    </div>
                    <div className='w-full mt-8'>
                        <button className='bg-[#26adbf] hover:bg-[#189daf] flex justify-center cursor-pointer py-2.75 w-full rounded-lg inter font-regular text-[#fff]'>
                            {isLoading ? (
                                // <div className="w-[30px] h-[30px] flex items-center text-white justify-center">
                                // <Lottie
                                //     animationData={loader}
                                //     style={{ transform: 'scale(2)', transformOrigin: 'center',}} 
                                //     className="scale-120" // scales it 1.5x bigger
                                // />
                                // </div>
                                'Logging...'
                            ) : (
                                'Login'
                            )}
                        </button>
                    </div>
                </div>
                </form>
        </div>
        </div>
    </div>
  )
}

export default Login