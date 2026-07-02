import React, {useState, useEffect} from 'react'
// import { collection, getDocs, deleteDoc, doc, getDoc, addDoc, serverTimestamp, updateDoc } from "firebase/firestore"
// import { db, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ChevronDown, MailOpen, Phone, PhoneCall, UploadCloud } from 'lucide-react';
import grid from '../../../assets/media/grid.svg'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase';
import { toast } from 'react-toastify';


const JoinasDeveloper = () => {

      const [fname, setFname] = useState('')
      const [lname, setLname] = useState('')

      const [fullName, setFullName] = useState('');
      const [role, setRole] = useState('')
      const [phone, setPhone] = useState('');
      const [email, setEmail] = useState('');
      const [linked, setLinked] = useState('')
      const [portfolio, setPortfolio] = useState('')
      const [skills, setSkills] = useState('')
      const [experience, setExperience] = useState('')

      const [photo, setPhoto] = useState(null)
      const [error, setError] = useState(false)
      const [success, setSuccess] = useState(false)

    const [uploading, setUploading] = useState(false);

      useEffect(() => {
    if (fname.trim() || lname.trim()) {
      setFullName(`${fname.trim()} ${lname.trim()}`.trim());
    } else {
      setFullName('');
    }
  }, [fname, lname]);

       const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      // Optional: add size/type validation
    //   if (file.size > 2 * 1024) { // 2MB limit
    //     setError('File size should be less than 2MB');
    //     return;
    //   }
      setter(file);
    }
  };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setUploading(true);
      setError('');
      setSuccess(false);
  
      try {
        // 1. Upload all files first
        // const resume = await uploadFile(photo, `resume/resume/${Date.now()}_${photo.name}`);
        // const coverLetter = await uploadFile(cnicFront, `resume/cover-letter/${Date.now()}_${cnicFront?.name}`);
  
        // 2. Prepare data for Firestore
        const normalizedSkills = skills
          .trim()
          .toLowerCase()
          .split(/\s+/); // split by one or more spaces

        const formData = {
          fullName,
          role: role.trim(),
          linkedin: linked.trim(),
          phone: phone.trim(),
          experience: experience.trim(),
          skills: normalizedSkills,
          portfolio: portfolio.trim(),
          email: email.trim().toLowerCase(),

          // resume,
          // coverLetter,
  
          createdAt: serverTimestamp(),
          status: 'pending',
        };
  
        // 3. Save to Firestore
        await addDoc(collection(db, 'join_as_developer'), formData);
        
        toast.success('Application submitted successfully!');
        
        // Optional: reset form
        setFname(''); setLname(''); setRole(''); setPhone(''); setEmail(''); setLinked(''); setPortfolio(''); setSkills(''); setExperience(''); setPhoto(null);
  
      } catch (err) {
        console.error(err);
        alert(err.message || 'Failed to submit application. Please try again.');
      } finally {
        // setShowPopup(true)
        setUploading(false);
      }
    };

  return (
    <div className='roboto bg-[#F4F4F4]'>
      
              {/* <img src={grid} className='absolute right-0 top-14 w-full' alt="" /> */}
        <div className='mt-16'>
            <div className='w-[88%] m-auto flex flex-col sm:flex-row justify-between items-start py-5 sm:py-20'>
                <div className='w-full sm:w-[40%] sm:sticky top-10 self-start mont'>
                    <h1 className='font-semibold leading-7 sm:leading-15 text-2xl sm:text-[44px] relative z-10'>Join Our  <br/> Development Team</h1>
                    <p className='font-semibold text-sm: text-base text-[#333333cf] py-2 pb-6 pr-10'>Apply now and discover your future with <br/>Hifah Technologies.</p>
                    <div className='hidden sm:block'>
                      <a href="https://maps.google.com/?q=Hifah Technologies+Jadoon+Plaza+Phase+2+Abbottabad" target="_blank" rel="noopener noreferrer">
                    <div className='hidden sm:flex items-center text-sm sm:text-base gap-3 mt-4 text-[#344054] font-semibold'>
                      
                      <div className='bg-[#4AC3D5] w-8 h-8 flex items-center justify-center rounded-md'>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 9.375C10.2426 9.375 11.25 8.36764 11.25 7.125C11.25 5.88236 10.2426 4.875 9 4.875C7.75736 4.875 6.75 5.88236 6.75 7.125C6.75 8.36764 7.75736 9.375 9 9.375Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 16.5C10.5 13.5 15 11.5637 15 7.5C15 4.18629 12.3137 1.5 9 1.5C5.68629 1.5 3 4.18629 3 7.5C3 11.5637 7.5 13.5 9 16.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                      Jadoon Plaza Phase 2, Abbottabad
                    </div>
                      </a>
                      <a href="mailto:hr@hifahtechnologies.com" target="_blank" rel="noopener noreferrer">
                    <div className='hidden sm:flex items-center text-sm sm:text-base gap-3 mt-4 text-[#344054] font-semibold'>
                      
                      <div className='bg-[#4AC3D5] w-8 h-8 flex items-center justify-center rounded-md'>
                      <MailOpen className='w-4 h-4 text-white' stroke='#fff' />

                      </div>
                    hr@hifahtechnologies.com
                    </div>
                      </a>
                       <a href="http://wa.me/923281223062" target="_blank" rel="noopener noreferrer">
                    <div className='hidden sm:flex items-center text-sm sm:text-base gap-3 mt-4 text-[#344054] font-semibold'>
                      
                      <div className='bg-[#4AC3D5] w-8 h-8 flex items-center justify-center rounded-md'>
                      <Phone className='w-4 h-4 text-white' stroke='#fff' />

                      </div>
                     +923177770287
                    </div>
                      </a>

                    </div>
                </div>
                <div className='w-full sm:w-[60%] mt-5 poppins'>
                    <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                            {/* Personal Information*/}
                            <h2 className='font-semibold text-xl text-[#333] relative z-10 mont mb-2'>Basic Details</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                First Name <span className='text-red-500'></span>
                                </label>
                                <input
                                type="text"
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                                required placeholder='Enter first name' 
                                className="w-full  mt-1.5 border border-[#E5E5E5] bg-white rounded-md px-4 py-3  text-sm text-[#374151] focus:outline-none focus:right-2 focus:border-[#53C1CE] transition-colors duration-200 appearance-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name <span className='text-red-500'></span>
                                </label>
                                <input
                                type="text"
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                                required placeholder='Enter last name'
                                className="w-full  mt-1.5 border border-[#E5E5E5] bg-white rounded-md px-4 py-3  text-sm text-[#374151] focus:outline-none focus:right-2 focus:border-[#53C1CE] transition-colors duration-200 appearance-none"
                                />
                            </div>
                            </div>
                    
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Email <span className='text-red-500'></span>
                                </label>
                                <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required placeholder='Enter email address'
                                  className="w-full  mt-1.5 border border-[#E5E5E5] bg-white rounded-md px-4 py-3  text-sm text-[#374151] focus:outline-none focus:right-2 focus:border-[#53C1CE] transition-colors duration-200 appearance-none"
                                />
                              </div>
                           <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Phone Number <span className='text-red-500'></span>
                                </label>
                                <input
                                  type="tel"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  required placeholder='+92 000-0000000'
                                  className="w-full  mt-1.5 border border-[#E5E5E5] bg-white rounded-md px-4 py-3  text-sm text-[#374151] focus:outline-none focus:right-2 focus:border-[#53C1CE] transition-colors duration-200 appearance-none"
                                />
                              </div>
                            </div>
                    
                            {/* Contact & Address*/}
                            <div  className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Current Role <span className='text-red-500'></span>
                                </label>
                                
                                <div className='flex items-center gap-1 text-sm text-[#374151] mb-1 relative'>

                                <select value={role} onChange={(e) => setRole(e.target.value)} 
                                 className={`w-full mt-1.5 bg-white border border-[#E5E5E5] rounded-md px-4 py-3 appearance-none text-sm focus:outline-none focus:border-[#53C1CE] transition-colors duration-200 ${
                                    role === "" ? "text-[#9a9fa8]" : "text-[#374151]"
                                  }`}>
                                    <option value="" disabled>Current Role</option>
                                    <option value="web developer">Web Developer</option>
                                    <option value="app developer">App Developer</option>
                                    <option value="backend developer">Backend Developer</option>
                                    <option value="hr">HR</option>
                                    <option value="quality assurance">Quality Assurance</option>
                                    <option value="project manager">Project Manager</option>
                                    {/* <option value=""></option> */}
                                </select>
                                <ChevronDown className='w-5 h-5 text-[#63666B] absolute right-3 pointer-events-none' />
                                </div>
                              </div>
                    
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Expert Skills <span className='text-red-500'></span>
                                </label>
                                <input
                                  type="text"
                                  value={skills}
                                  onChange={(e) => setSkills(e.target.value)}
                                  required placeholder='e.g. flutter, react etc.'
                                  className="w-full  mt-1.5 border border-[#E5E5E5] bg-white rounded-md px-4 py-3  text-sm text-[#374151] focus:outline-none focus:right-2 focus:border-[#53C1CE] transition-colors duration-200 appearance-none"
                                />
                              </div>
                            </div>
                            <h2 className='font-semibold text-xl text-[#333] mont pt-3 mb-2'>Current Work Experience</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Experience
                                </label>
                                <div className='flex items-center gap-1 text-sm text-[#374151] mb-1 relative'>
                                <select value={experience} onChange={(e) => setExperience(e.target.value)} 
                                className={`w-full mt-1.5 bg-white border border-[#E5E5E5] rounded-md px-4 py-3 appearance-none text-sm focus:outline-none focus:border-[#53C1CE] transition-colors duration-200 ${
                                    experience === "" ? "text-[#9a9fa8]" : "text-[#374151]"
                                  }`}
                                >
                                    <option value="" disabled>Select your Total Experience</option>
                                    <option value="1">1 year</option>
                                    <option value="2">2 years</option>
                                    <option value="3">3 years</option>
                                    <option value="4">4 years</option>
                                    <option value="5">5 years</option>
                                    <option value="6">6 years</option>
                                    <option value="7">7 years</option>
                                    <option value="8">8 years</option>
                                    <option value="9">9 years</option>
                                    <option value="10+">10+ years</option>
                                </select>
                                <ChevronDown className='w-5 h-5 text-[#63666B] absolute right-3 pointer-events-none' />

                                </div>
                              </div>
                    
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Linkedin profile Link <span className='text-red-500'></span>
                                </label>
                                <input
                                  type="text"
                                  value={linked}
                                  onChange={(e) => setLinked(e.target.value)}
                                  required placeholder='https://linkedin.com/'
                                  className="w-full  mt-1.5 border border-[#E5E5E5] bg-white rounded-md px-4 py-3  text-sm text-[#374151] focus:outline-none focus:right-2 focus:border-[#53C1CE] transition-colors duration-200 appearance-none"
                                />
                              </div>
                            </div>
                    
                            <div  className="grid grid-cols-1 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Portfolio Link <span className='text-red-500'></span>
                                </label>
                                <input
                                // ref={startDateRef}
                                  type="text"
                                  value={portfolio}
                                  onChange={(e) => setPortfolio(e.target.value)}
                                  placeholder='https://'
                                  className="w-full  mt-1.5 border border-[#E5E5E5] bg-white rounded-md px-4 py-3  text-sm text-[#374151] focus:outline-none focus:right-2 focus:border-[#53C1CE] transition-colors duration-200 appearance-none"
                                />
                              </div>
                    
                            </div>
                            
                            {/* Documents*/}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                  
                              <div>
                              <label
                                htmlFor="covreletter"
                                className="block text-sm font-medium text-gray-700 mb-5"
                              >
                                Upload Your Resume (jpg, pdf, doc) <span className='text-red-500'></span>
                              </label>

                              {/* Hidden input */}
                              <input
                                type="file"
                                accept="image/*,.pdf,.doc,.docx"
                                onChange={(e) => handleFileChange(e, setPhoto)}
                                className="hidden"
                                id="covreletter"
                                name="covreletter"
                              />

                              {/* Clickable UI */}
                              <label
                                htmlFor="covreletter"
                                className="flex items-center gap-3 cursor-pointer w-fit mt-2"
                              >
                                <div className="flex items-center gap-2 text-sm font-semibold text-[#fff] bg-[#4AC3D5] px-4 py-2 rounded-lg">
                                  <UploadCloud className="w-5 h-5 text-[#fff]" />
                                  <span>Choose File</span>
                                </div>

                                {/* File name inline */}
                                <span className="text-sm text-gray-500">
                                  {photo ? photo.name : "No file chosen"}
                                </span>
                              </label>
                            </div>
                              {/* cover letter */}
                               <div>
                                <label
                                  htmlFor="covreletter"
                                  className="block text-sm font-medium text-gray-700 mb-5"
                                >
                                  Cover Letter (Optional) (jpg, pdf, doc)
                                </label>

                                {/* Hidden input */}
                                <input
                                  type="file"
                                  accept="image/*,.pdf,.doc,.docx"
                                  onChange={(e) => handleFileChange(e, setPhoto)}
                                  className="hidden"
                                  id="covreletter"
                                  name="covreletter"
                                />

                                {/* Clickable UI */}
                                <label
                                  htmlFor="covreletter"
                                  className="flex items-center gap-3 cursor-pointer w-fit mt-2"
                                >
                                  <div className="flex items-center gap-2 text-sm font-semibold text-[#4AC3D5] bg-[#4AC3D514] px-4 py-2 rounded-lg">
                                    <UploadCloud className="w-5 h-5 text-[#4AC3D5]" />
                                    <span>Choose File</span>
                                  </div>

                                  {/* File name inline */}
                                  <span className="text-sm text-gray-500">
                                    {photo ? photo.name : "No file chosen"}
                                  </span>
                                </label>
                              </div>
                            </div>
                    
                            <div className="pt-4">
                              <button
                                type="submit"
                                disabled={uploading}
                                style={{
                                  background: "linear-gradient(90deg, #31BBD0 0%, #A3D183 100%)",
                                }}
                                className={`w-full py-3 px-4 rounded-lg text-white font-medium
                                  ${uploading 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-[#1e9994] hover:bg-[#0a7975] focus:ring-4 focus:ring-blue-300'}`}
                              >
                                {uploading ? 'Submitting...' : 'Submit Application'}
                              </button>
                            </div>
                          </form>
                </div>
                <div className='block sm:hidden my-8'>
                      <a href="https://maps.google.com/?q=Hifah Technologies+Jadoon+Plaza+Phase+2+Abbottabad" target="_blank" rel="noopener noreferrer">
                    <div className='flex items-center text-sm sm:text-base gap-3 mt-4 text-[#344054] font-semibold'>
                      
                      <div className='bg-[#4AC3D5] w-8 h-8 flex items-center justify-center rounded-md'>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 9.375C10.2426 9.375 11.25 8.36764 11.25 7.125C11.25 5.88236 10.2426 4.875 9 4.875C7.75736 4.875 6.75 5.88236 6.75 7.125C6.75 8.36764 7.75736 9.375 9 9.375Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 16.5C10.5 13.5 15 11.5637 15 7.5C15 4.18629 12.3137 1.5 9 1.5C5.68629 1.5 3 4.18629 3 7.5C3 11.5637 7.5 13.5 9 16.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                      Jadoon Plaza Phase 2, Abbottabad
                    </div>
                      </a>
                      <a href="mailto:hifahtechnologiesofficial@gmail.com" target="_blank" rel="noopener noreferrer">
                    <div className='flex items-center text-sm sm:text-base gap-3 mt-4 text-[#344054] font-semibold'>
                      
                      <div className='bg-[#4AC3D5] w-8 h-8 flex items-center justify-center rounded-md'>
                      <MailOpen className='w-4 h-4 text-white' stroke='#fff' />

                      </div>
                      hifahtechnologiesofficial@gmail.com
                    </div>
                      </a>
                       <a href="http://wa.me/923281223062" target="_blank" rel="noopener noreferrer">
                    <div className='flex items-center text-sm sm:text-base gap-3 mt-4 text-[#344054] font-semibold'>
                      
                      <div className='bg-[#4AC3D5] w-8 h-8 flex items-center justify-center rounded-md'>
                      <Phone className='w-4 h-4 text-white' stroke='#fff' />

                      </div>
                      +92 328 1223062
                    </div>
                      </a>

                    </div>
            </div>
        </div>
    </div>
  )
}

export default JoinasDeveloper