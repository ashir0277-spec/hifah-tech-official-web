import React, {useEffect, useState, useMemo ,useRef} from 'react'
import { ChevronDown, Menu, X, CopyIcon, Check } from 'lucide-react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import SuccessPopup from '../../Popups/SuccessPopup';
import DangerPopup from '../../Popups/DanderPopup';
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
import loader from '../../../../assets/loading/loading_white.json'
import search from '../../../../assets/icons/search.svg'
import cross from '../../../../assets/icons/close-circle.svg'
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore"
import { db } from "../../../../firebase";
import Lottie from 'lottie-react';
import JobApplicationsTable from './Table';

const FilterModal = ({ isOpen, onClose, onApply, initialFilters }) => {
  const [localFilters, setLocalFilters] = useState(initialFilters || {});

  // Local state for date range
  const [datePreset, setDatePreset] = useState('all');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  // Example data – replace with your real lists
  const statusOptions = ['pending', 'viewed', 'hired', 'interview scheduled', 'rejected', 'all'];
  const roles = ['web developer', 'app developer', 'backend developer','hr', 'project manager','quality assurance', 'all'];
  const experience = ['1-2 years', '2-4 years', '4-8 years', 'all'];

  useEffect(() => {
    if (!isOpen) return;

    // Reset to initial when modal opens
    setLocalFilters(initialFilters || {});
    setDatePreset('all');
    setCustomStart('');
    setCustomEnd('');
  }, [isOpen, initialFilters]);

  const handleSingleSelect = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [field]: value === 'all' ? '' : value
    }));
  };

 const applyDateFilter = () => {
  let startDate = null;
  let endDate = null;
  const now = new Date();

  if (datePreset === '1day') {
    startDate = new Date(now);
    startDate.setDate(now.getDate() - 1);
    endDate = now;
  } else if (datePreset === '7days') {
    startDate = new Date(now);
    startDate.setDate(now.getDate() - 7);
    endDate = now;
  } else if (datePreset === '30days') {
    startDate = new Date(now);
    startDate.setDate(now.getDate() - 30);
    endDate = now;
  } else if (datePreset === 'custom' && customStart && customEnd) {
    startDate = new Date(customStart);
    endDate = new Date(customEnd);
    endDate.setHours(23, 59, 59, 999); // end of day
  }

  // Return the computed filter
  return {
    createdAtStart: startDate ? startDate.toISOString() : null,
    createdAtEnd: endDate ? endDate.toISOString() : null,
  };
};

// apply all
const handleApply = () => {
  const dateFilters = applyDateFilter(); // compute date filters

  const filtersToApply = {
    ...localFilters,   // keep existing filters (like search, role, etc.)
    ...dateFilters     // overwrite only createdAtStart / createdAtEnd
  };

  setLocalFilters(filtersToApply);  // update local state
  onApply(filtersToApply);          // pass all filters to parent
  onClose();
};

// const handleApply = () => { applyDateFilter(); // make sure date is included
//  onApply(localFilters); onClose(); };

  if (!isOpen) return null;


  return (
   <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all">

    {/* Header */}
    <div className="sticky top-0 bg-white border-b px-6 py-5 flex items-center justify-between z-10 rounded-t-2xl">
      <h2 className="text-xl font-semibold text-gray-900">
        Filter Recruitment Forms
      </h2>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-800 text-2xl leading-none focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
      >
        ×
      </button>
    </div>

    {/* Body */}
    <div className="px-6 py-6 space-y-6">

      {/* Status */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          value={localFilters.status || 'all'}
          onChange={e => handleSingleSelect('status', e.target.value)}
          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors"
        >
          {statusOptions.map(opt => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
      </div>
      {/* role */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          value={localFilters.role || 'all'}
          onChange={e => handleSingleSelect('role', e.target.value)}
          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors"
        >
          {roles.map(opt => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
      </div>
      {/* experience */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Expeience</label>
        <select
          value={localFilters.experience || 'all'}
          onChange={e => handleSingleSelect('experience', e.target.value)}
          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors"
        >
          {experience.map(opt => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Date Filters */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Created Date</label>
        <select
          value={datePreset}
          onChange={e => setDatePreset(e.target.value)}
          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors"
        >
          <option value="all">All Time</option>
          <option value="1day">Last 1 Day</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="custom">Custom Range</option>
        </select>

        {datePreset === 'custom' && (
          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            <div className="flex-1">
              <input
                type="date"
                value={customStart}
                onChange={e => setCustomStart(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors"
              />
            </div>
            <div className="flex items-center justify-center text-gray-500">to</div>
            <div className="flex-1">
              <input
                type="date"
                value={customEnd}
                onChange={e => setCustomEnd(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors"
              />
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Footer */}
    <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-3 rounded-b-2xl">
      <button
        onClick={onClose}
        className="px-5 py-2.5 text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={handleApply}
        className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors shadow-sm"
      >
        Apply Filters
      </button>
    </div>

  </div>
</div>
  );
};

const Dashboard = () => {

  const { toggleSidebar, sidebarOpen } = useOutletContext();
  const statuses = ['pending', 'viewed','interview scheduled','hired','rejected'];

    // sending on whatsapp
  const [email, setEmail] = useState('')
  const [showEmails, setShowEmails] = useState(false)
  const [number, setNumber] = useState('')
  const [username, setUsername] = useState('')
  const [allMessages, setAllMessages] = useState([])
  const [showTexts, setShowTexts] = useState(false)

const [showFilterModal, setShowFilterModal] = useState(false)

  const [deletePopup, setDeletePopup] = useState('')
  const [allForms, setAllForms] = useState([])

  // generate link
  const [copied, setCopied] = useState(false);
  const [copyId, setCopyId] = useState('')
  
   const handleCopyEmail = async (email, phone) => {
  try {
    const combinedText = `Email: ${email}\nPhone: ${phone}`;
    await navigator.clipboard.writeText(combinedText);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  } catch (err) {
    console.error("Copy failed", err);
  }
};

  const [searchTerm, setSearchTerm] = useState('')

  // const navItems = ["contact us", "meetings"];
  const [status, setStatus] = useState(false)
  const [statusId, setStatusId] = useState('')

  // popups
  const [showPopup, setShowPopup] = useState(false)
    const [warnPopup, setWarnPopup] = useState(false)
    const [errorText, setErrorText] = useState('')

  // Close filters when clicking outside
  const filterRef = useRef(null);
    useEffect(() => {
      function handleClickOutside(event) {
        if (filterRef.current && !filterRef.current.contains(event.target)) {
          setStatus(false);
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

const [forms, setForms] = useState([])
const [isLoading, setisLoading] = useState(false)

const fetchForms = async () => {
  try {
    setisLoading(true);

    let constraints = [];
        constraints.push(orderBy("createdAt", "desc"));
    

    const q = query(collection(db, "join_as_developer"), ...constraints);
    const admissionsSnap = await getDocs(q);

    const docs = admissionsSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    setForms(docs);
    setAllForms(docs)



  } catch (error) {
    console.log(error);
  } finally {
    setisLoading(false);
  }
};

const [filters, setFilters] = useState({});

// Call with filters
useEffect(() => {
  fetchForms();
}, []);


const clearAllFilters = () => {
  setFilters({});
  setSearchTerm('');
  setForms(allForms)
};

const [delId, setdelId] = useState('')
const [delLoading, setDelLoading] = useState(false)


  const deleteResponse = async (id) => {
  try {
    setDelLoading(true)
    // Delete from Firestore
    await deleteDoc(doc(db, "resume", id));

    // Update local state
    setForms(prev => prev.filter(form => form.id !== id));

    setErrorText('User deleted successfully.')
        setShowPopup(true)
        setTimeout(() => setShowPopup(false), 3000);

  } catch (error) {
    console.error("Error deleting document: ", error);
  } finally {
    setdelId('')
    setDelLoading(false)
    setDeletePopup(false)
  }
};


  // search
   const searchedRequests = useMemo(() => {
      const term = searchTerm.toLowerCase();

      return forms.filter(request =>
        (request.fullName || '').toLowerCase().includes(term) ||
        // (request.skills || '').toLowerCase().includes(term) ||
        (request.experience || '').toLowerCase().includes(term) ||
        (request.role || '').toLowerCase().includes(term) ||
        (request.phone || '').toLowerCase().includes(term) ||
        (request.email || '').toLowerCase().includes(term) 
      );
    }, [forms, searchTerm]);

  const [updateLoading, setUpdateLoading] = useState(false)

    const updateStatusById = async (id, status) => {
      try {
        setUpdateLoading(true)
        await updateDoc(doc(db, "join_as_developer", id), {
          status,
        });
      
        setForms((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status } : item
          )
        );
        
      } catch (error) {
        console.log(error);
      } finally {
        setStatus(false)
        setUpdateLoading(false)
      }
    };
  
      // Apply filters from modal
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);

    // fetchFormsFilter(newFilters, forms);
  };


      useEffect(() => {
      let data = [...allForms];
    
      // ─── Filters ─────────────────────────────
    
      if (filters.status)
        data = data.filter(d => d.status === filters.status);
    
        // ─── Role Filter (match inside skills text) ─
      if (filters.role && filters.role !== 'all') {
        data = data.filter(d =>
          (d.role || '').includes(filters.role.toLowerCase())
        );
      }

      // ─── Experience Filter ─────────────────────
      if (filters.experience && filters.experience !== 'all') {
        const [min, max] = filters.experience.split(' ')[0].split('-').map(Number);

        data = data.filter(d => {
          const exp = Number(d.experience);
          return exp >= min && exp <= max;
        });
      }
      if (filters.createdAtStart) {
        const start = new Date(filters.createdAtStart);
        data = data.filter(d => {
          const date = d.submittedAt?.toDate?.() || new Date(d.createdAt);
          return date >= start;
        });
      }
    
      if (filters.createdAtEnd) {
        const end = new Date(filters.createdAtEnd);
        data = data.filter(d => {
          const date = d.submittedAt?.toDate?.() || new Date(d.createdAt);
          return date <= end;
        });
      }
    
      // ─── Search ──────────────────────────────
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
    
        data = data.filter(request => {
          const coursesString = Array.isArray(request.courses)
            ? request.courses.join(' ').toLowerCase()
            : '';
    
          return (
            (request.fullName || '').toLowerCase().includes(term) ||
            // (request.skills || '').toLowerCase().includes(term) ||
            coursesString.includes(term) ||
            (request.experience || '').toLowerCase().includes(term) ||
            // (request.phone || '').toLowerCase().includes(term) ||
            (request.role || '').toLowerCase().includes(term) ||
            (request.status || '').toLowerCase().includes(term) ||
            (request.email || '').toLowerCase().includes(term)
          );
        });
      }
    
      setForms(data);
    
    }, [allForms, filters, searchTerm]);

     const [copiedEmail, setCopiedEmail] = useState(false)
     const [copyPh, setCopyPh] = useState(false)
    
      const handleCopyAllEmail = () => {
      // extract emails from searchedRequests
      const emails = searchedRequests
        .map(item => item.email)   
        .filter(Boolean)
        .join(', ');
    
      // copy to clipboard
      navigator.clipboard.writeText(emails)
        .then(() => setCopiedEmail(true))
        .catch(err => console.error('Failed to copy emails:', err));
    
      // reset copied state after 2 seconds
      setTimeout(() => setCopiedEmail(false), 2000);
    };
    
      const handleCopyAllPhone = () => {
      // extract emails from searchedRequests
      const emails = searchedRequests
        .map(item => item.phone)   // get email field
        .filter(Boolean)           // remove null/undefined
        .join(', ');               // comma separated
    
      // copy to clipboard
      navigator.clipboard.writeText(emails)
        .then(() => setCopyPh(true))
        .catch(err => console.error('Failed to copy emails:', err));
    
      // reset copied state after 2 seconds
      setTimeout(() => setCopyPh(false), 2000);
    };

     const messagesFetched = useRef(false);
    
         const fetchMessages = async () => {
          if (messagesFetched.current) return;   // already fetched — do nothing
          try {
            const snap = await getDocs(collection(db, "messages"));
            const msgs = snap.docs.map(doc => ({
              id:   doc.id,
              text: doc.data().text || doc.data().message || "",
            }));
            setAllMessages(msgs);
            messagesFetched.current = true;      // mark as fetched
          } catch (err) {
            console.error(err);
          }
        };

         const formatPhoneNumber = (phone) => {
    if (!phone) return "";

    // Remove all spaces and non-digit characters except +
    let cleaned = phone.replace(/[^\d+]/g, "").replace(/\s+/g, "");

    // If starts with +, remove it
    if (cleaned.startsWith("+")) {
      cleaned = cleaned.slice(1);
    }

    // If starts with 0 → replace with 92
    if (cleaned.startsWith("0")) {
      cleaned = "92" + cleaned.slice(1);
    }

    // If already starts with 92 → keep as is
    return cleaned;
  };

  return (
    <>
    <div className={`bg-white w-full sm:h-[96vh] relative poppins sm:fixed overflow-auto md:w-[72%] ${sidebarOpen ? 'lg:w-full' : 'lg:w-[82%]'} p-4 sm:p-8 rounded-[0px_0_0_0px] md:rounded-[40px_0_0_40px]`}>
      {showPopup && (
        <SuccessPopup text={errorText} /> 
      )}
      {warnPopup && (
        <DangerPopup text={errorText} /> 
      )}
        <div className=''>
      <div className='w-full block sm:flex items-center justify-between bg-white'>
      <div>
        <div className='flex text-[#1E9994] gap-2 items-center mb-1'>
            <Menu onClick={toggleSidebar} className='w-6 h-6 cursor-pointer' />
            <h1 className='text-xl sm:text-3xl font-medium inter text-color mb-1'>Join as Developer</h1>
            </div>
      <p className='text-xs sm:text-sm font-medium inter text-[#333333B2] mb-4'>Stay on top of your applications with smart organization.</p>
      </div>
    {/* <button onClick={() => {setLinkPopup(true)}} className=' cursor-pointer bg-[#0873db] text-white text-xs sm:text-sm font-semibold inter px-4 py-2.5 rounded-[38px] shadow-[0_1px_2px_0_#1018280D]'>
      <LucideLink2 className='inline-block w-4 h-4 mr-2 -rotate-60' />
                Generate Link
      </button> */}
      </div>
      </div>
        <div className='flex justify-between items-center mb-4'>
        <div className='flex w-[40%]'>
        <div className='w-full'>
          <div className='flex items-center justify-between border-b border-[#D0D5DD] px-4 py-2'>
            <div className='flex gap-2 w-full'>
              <img src={search} alt="search" />
              <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search by user name" className='border-none outline-none w-full text-sm font-medium' id="" />
            </div>
            <img src={cross} onClick={() => setSearchTerm('')} className='cursor-pointer' alt="cross" />
          </div>
          </div>
        </div>
      <div className="controls">
        <button 
          className="filter-btn cursor-pointer"
          onClick={() => setShowFilterModal(true)}
        >
          Filters {Object.keys(filters).length > 0 && `(${Object.keys(filters).length})`}
        </button>
        <button 
          className="filter-btn text-red-500 pl-3 cursor-pointer"
          onClick={() => clearAllFilters()}
        >
          Clear All 
        </button>
      </div>

    <FilterModal
      isOpen={showFilterModal}
      onClose={() => setShowFilterModal(false)}
      onApply={handleApplyFilters}
      initialFilters={filters}
    />
        </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="overflow-auto">
          
          <JobApplicationsTable
            searchedRequests={searchedRequests}
            isLoading={isLoading}
            copiedEmail={copiedEmail}
            copyPh={copyPh}
            copied={copied}
            copyId={copyId}
            fetchMessages={fetchMessages}
            handleCopyAllEmail={handleCopyAllEmail}
            handleCopyAllPhone={handleCopyAllPhone}
            handleCopyEmail={handleCopyEmail}
            setCopyId={setCopyId}
            setShowEmails={setShowEmails}
            setShowTexts={setShowTexts}
            setUsername={setUsername}
            setEmail={setEmail}
            setNumber={setNumber}
            formatPhoneNumber={formatPhoneNumber}
            status={status}
            setStatus={setStatus}
            statusId={statusId}
            setStatusId={setStatusId}
            filterRef={filterRef}
            statuses={statuses}
            updateStatusById={updateStatusById}
            updateLoading={updateLoading}
            loader={loader}
            Lottie={Lottie}
            Skeleton={Skeleton}
            setDeletePopup={setDeletePopup}
            setdelId={setdelId}
          />
        </div>
        
      </div>
     
    </div>
    {/* del contact us */}
 {deletePopup && (
    <div className="fixed inset-0  bg-[#00000040] bg-opacity-40 flex items-center justify-center" style={{zIndex: '9999'}}>
      <div className=" bg-white p-7 rounded-lg w-full sm:max-w-[561px] shadow-xl">
        <h2 className="font-medium text-xl mb-3">Are you sure you want to delete?</h2>
        <p className="font-medium text-[12px] text-[#000000B0] mb-6">
        Once deleted, all associated data will be permanently removed.
        </p>

        <div className="flex justify-end gap-9">
          <button
            onClick={() => setDeletePopup(false)}
            className="text-[#333333E5] px-4 py-2 rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => deleteResponse(delId)}
            className="w-2/6 bg-[#FF383C] text-white pr-[32px] pl-[32px] py-3 rounded cursor-pointer"
          >
            {delLoading ? 'Deleting...' : 'Delete'}
            
          </button>
        </div>
      </div>
    </div>
  )}
   {showTexts && (
        <div className="fixed inset-0  bg-[#00000040] bg-opacity-40 flex items-center justify-center" style={{zIndex: '9999'}}>
        <div className=" bg-white p-7 rounded-lg w-full sm:max-w-[561px] shadow-xl">
          <div className='flex justify-between'>
        <h2 className="font-medium text-xl mb-3">Message Templates</h2>
        <X onClick={() => setShowTexts(false)} className='w-5 h-5 cursor-pointer' />
          </div>
        <p className="font-medium text-[12px] text-[#000000B0] mb-6">
        Select a message template 
        </p>
        {allMessages.map((msg) => {
          const formattedText = msg.text.replace(/@username/g, username);

          return (
            <a
              key={msg.id}
              href={`https://wa.me/${number}?text=${encodeURIComponent(formattedText)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                onClick={() => setShowTexts(false)}
                className="bg-white mb-3 cursor-pointer rounded-xl border border-gray-200 p-5 hover:border-gray-300 hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 whitespace-pre-wrap text-gray-800">
                    {formattedText}
                  </div>
                </div>
              </div>
            </a>
          );
        })}
        </div>
        </div>
      )}
      {showEmails && (
        <div className="fixed inset-0  bg-[#00000040] bg-opacity-40 flex items-center justify-center" style={{zIndex: '9999'}}>
        <div className=" bg-white p-7 rounded-lg w-full sm:max-w-[561px] shadow-xl">
          <div className='flex justify-between'>
        <h2 className="font-medium text-xl mb-3">Message Templates</h2>
        <X onClick={() => setShowEmails(false)} className='w-5 h-5 cursor-pointer' />
          </div>
        <p className="font-medium text-[12px] text-[#000000B0] mb-6">
          Select a message template 
        </p>
        {allMessages.map((msg) => {
          const formattedText = msg.text.replace(/@username/g, username);

          return (
            <a
              key={msg.id}
              href={`mailto:${email}?subject=${encodeURIComponent("Hifah Technologies Recruitments")}&body=${encodeURIComponent(formattedText)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                onClick={() => setShowEmails(false)}
                className="bg-white mb-3 cursor-pointer rounded-xl border border-gray-200 p-5 hover:border-gray-300 hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 whitespace-pre-wrap text-gray-800">
                    {formattedText}
                  </div>
                </div>
              </div>
            </a>
          );
        })}
        </div>
        </div>
      )}
    </>
  )
}

export default Dashboard