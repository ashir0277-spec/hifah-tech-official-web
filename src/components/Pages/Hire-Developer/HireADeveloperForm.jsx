import React, { useState, useRef } from "react";
import grid from '../../../assets/media/grid.svg'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { toast } from "react-toastify";
import { MailOpen, Phone } from "lucide-react";

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="5.5" r="2.5" stroke="#9CA3AF" strokeWidth="1.4" />
    <path d="M2.5 13.5C2.5 11.015 5.015 9 8 9s5.5 2.015 5.5 4.5" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="#9CA3AF" strokeWidth="1.4" />
    <path d="M1.5 5.5l6.5 4 6.5-4" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 2.5h3l1.5 3-1.5 1.5A9 9 0 0 0 9.5 10l1.5-1.5 3 1.5V13A1.5 1.5 0 0 1 12.5 14.5C6.424 14.5 1.5 9.576 1.5 3.5A1.5 1.5 0 0 1 3 2z" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BuildingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="12" height="11" rx="1" stroke="#9CA3AF" strokeWidth="1.4" />
    <path d="M5.5 14V10h5v4" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="5" y="5.5" width="2" height="2" rx="0.4" stroke="#9CA3AF" strokeWidth="1.2" />
    <rect x="9" y="5.5" width="2" height="2" rx="0.4" stroke="#9CA3AF" strokeWidth="1.2" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6l4 4 4-4" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UploadCloudIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.1198 16.5778V15.027C12.1198 10.7445 15.8508 7.27295 20.4531 7.27295C25.0555 7.27295 28.7865 10.7445 28.7865 15.027V16.5778C32.4684 16.5778 35.4531 19.355 35.4531 22.781C35.4531 25.077 34.1125 27.1362 32.1198 28.2088M12.1198 16.5778C8.43789 16.5778 5.45312 19.355 5.45312 22.781C5.45312 25.077 6.79379 27.1362 8.78646 28.2088M12.1198 16.5778C12.8412 16.5778 13.5359 16.6844 14.1866 16.8816M20.4531 19.6794V33.6366M20.4531 19.6794L25.4531 24.3318M20.4531 19.6794L15.4531 24.3318" stroke="#333333" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RadioCircle = ({ checked }) => (
  <span
    className="inline-flex items-center justify-center w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all duration-200"
    style={{ borderColor: checked ? "#53C1CE" : "#33333390" }}
  >
    {checked && <span className="w-2 h-2 rounded-full" style={{ background: "#53C1CE" }} />}
  </span>
);

const SectionHeader = ({ number, title }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold" style={{ background: "#53C1CE" }}>
      {String(number).padStart(2, "0")}
    </span>
    <h2 className="text-lg sm:text-xl font-semibold text-[#333]">{title}</h2>
  </div>
);

const InputField = ({ label, required, optional, placeholder, icon: Icon, type = "text", value, onChange, isSelect, selectOptions }) => (
  <div className="mont flex flex-col gap-1.5">
    {label && (
      <label className="text-sm font-medium text-[#344054] roboto">
        {label}
        {required && <span className="text-[#c00] font-normal"> *</span>}
        {optional && <span className="text-[#6B7280] font-normal"></span>}
      </label>
    )}
    <div className="relative">
      {isSelect ? (
        <select
          value={value}
          onChange={onChange}
          className="w-full mt-1.5 border border-[#E5E5E5] bg-white rounded-[6px] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#53C1CE] transition-colors duration-200 appearance-none"
        >
          {selectOptions?.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full mt-1.5 border border-[#E5E5E5] bg-white rounded-[6px] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#53C1CE] transition-colors duration-200 appearance-none"
        />
      )}
      {Icon && <span className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none"><Icon /></span>}
      {isSelect && <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"><ChevronDownIcon /></span>}
    </div>
  </div>
);

// Reusable contact info row used in both sidebar and mobile footer
const ContactRow = ({ href, iconBg, icon, text }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <div className="flex items-start gap-3 mt-4 text-[#344054] font-semibold text-sm">
      <div className="bg-[#4AC3D5] w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md mt-0.5">
        {icon}
      </div>
      <span className="break-all min-w-0">{text}</span>
    </div>
  </a>
);

const HireADeveloperForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    projectType: "",
    developerRequired: "Frontend Developer",
    projectDescription: "",
    commMethod: "Email",
    files: [],
  });
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleFiles = (incoming) => {
    const arr = Array.from(incoming).filter((f) => {
      const ext = f.name.split(".").pop().toLowerCase();
      return ["pdf", "doc", "docx", "jpg", "jpeg", "png"].includes(ext) && f.size <= 10 * 1024 * 1024;
    });
    setForm((f) => ({ ...f, files: [...f.files, ...arr] }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, "hire_developers"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      toast.success("Form submitted successfully!");
      setForm({
        fullName: "", email: "", phone: "", companyName: "",
        projectType: "", developerRequired: "Frontend Developer",
        projectDescription: "", commMethod: "Email", status: "pending", files: [],
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error submitting form.");
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const commOptions = ["Email", "Phone Call", "Google Meet"];
  const developerOptions = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Mobile Developer", "UI/UX Designer"];

  const contactItems = [
    {
      href: "https://maps.google.com/?q=Hifah Technologies+Jadoon+Plaza+Phase+2+Abbottabad",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 9.375C10.2426 9.375 11.25 8.36764 11.25 7.125C11.25 5.88236 10.2426 4.875 9 4.875C7.75736 4.875 6.75 5.88236 6.75 7.125C6.75 8.36764 7.75736 9.375 9 9.375Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 16.5C10.5 13.5 15 11.5637 15 7.5C15 4.18629 12.3137 1.5 9 1.5C5.68629 1.5 3 4.18629 3 7.5C3 11.5637 7.5 13.5 9 16.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      text: "Jadoon Plaza Phase 2, Abbottabad",
    },
    {
      href: "mailto:hr@hifahtechnologies.com",
      icon: <MailOpen className="w-4 h-4 text-white" stroke="#fff" />,
      text: "hr@hifahtechnologies.com",
    },
    {
      href: "http://wa.me/923281223062",
      icon: <Phone className="w-4 h-4 text-white" stroke="#fff" />,
      text: "+923177770287",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-[#F4F4F4] py-12">
        <div className='w-[90%] sm:w-[88%] m-auto'>

          {/*
            Layout:
              mobile      → stacked (flex-col)
              tablet sm–lg → stacked (flex-col) — prevents overlap
              desktop xl+ → side by side (flex-row)
          */}
          <div className='flex flex-col xl:flex-row justify-between items-start gap-8 py-5 xl:py-10'>

            {/* ── Left info panel ── */}
            <div className='w-full xl:w-[35%] xl:sticky xl:top-10 xl:self-start mont'>
              <h1 className='font-semibold leading-tight text-3xl sm:text-4xl xl:text-[44px] relative z-10'>
                Hire a Developer
              </h1>
              <p className='font-semibold text-sm sm:text-base text-[#333333cf] py-2 pb-6 pr-0 xl:pr-10'>
                Tell us about your project and requirements, and Hifah Technologies will
                connect you with the perfect developer to bring your vision to life.
              </p>

              {/* Contact info — visible on all sizes in left panel */}
              <div className='flex flex-col'>
                {contactItems.map((item, i) => (
                  <ContactRow key={i} href={item.href} icon={item.icon} text={item.text} />
                ))}
              </div>
            </div>

            {/* ── Right: Form ── */}
            <form
              onSubmit={handleSubmit}
              className="bg-[#F4F4F4] w-full xl:w-[62%] rounded-[5px] py-8 flex flex-col gap-6 sm:gap-8"
            >
              {/* Section 01 */}
              <div>
                <SectionHeader number={1} title="Basic Client Details" />
                {/* On mobile: 1 col. On sm+: 2 col */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                  <InputField label="Full Name" required placeholder="Enter your full name" value={form.fullName} onChange={set("fullName")} />
                  <InputField label="Email Address" required placeholder="you@example.com" type="email" value={form.email} onChange={set("email")} />
                  <InputField label="Phone Number" required placeholder="+ (555) 000-0000" type="tel" value={form.phone} onChange={set("phone")} />
                  <InputField label="Company Name" optional placeholder="Company Inc." value={form.companyName} onChange={set("companyName")} />
                </div>
              </div>

              <div className="border-t border-[#F3F4F6]" />

              {/* Section 02 */}
              <div>
                <SectionHeader number={2} title="Project Details" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                  <InputField label="Project Type" placeholder="e.g. E-commerce website" value={form.projectType} onChange={set("projectType")} />
                  <InputField label="Developer Required" isSelect selectOptions={developerOptions} value={form.developerRequired} onChange={set("developerRequired")} />
                </div>
                <div className="mt-5">
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">
                    Project Description <span className="text-[#c00] font-normal">*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="We need a mobile app for e-commerce with payment integration"
                    value={form.projectDescription}
                    onChange={set("projectDescription")}
                    className="w-full mt-1.5 resize-none border border-[#E5E5E5] bg-white rounded-[6px] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#53C1CE] transition-colors duration-200 appearance-none"
                  />
                </div>
              </div>

              <div className="border-t border-[#F3F4F6]" />

              {/* Section 03: Files */}
              <div>
                <SectionHeader number={3} title="Attach Files" />
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed rounded-[8px] flex flex-col items-center justify-center py-8 cursor-pointer transition-all duration-200 select-none"
                  style={{
                    borderColor: dragOver ? "#53C1CE" : "#333333B2",
                    background: dragOver ? "#F0FBFC" : "transparent",
                  }}
                >
                  <input ref={fileInputRef} type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
                  <UploadCloudIcon />
                  <p className="mt-3 text-sm sm:text-base font-medium text-[#000000CC] roboto">Click to upload or drag and drop</p>
                  <p className="text-xs sm:text-sm font-medium roboto text-[#666666] mt-1">PDF, DOC, JPG/PNG (Max. 10MB)</p>
                  {form.files.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2 justify-center px-4">
                      {form.files.map((f, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "#EEF0F5", color: "#374151" }}>
                          {f.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-[#F3F4F6]" />

              {/* Section 04: Communication */}
              <div>
                <SectionHeader number={4} title="Communication Method" />
                {/* Stack on mobile, row on sm+ */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {commOptions.map((opt) => {
                    const active = form.commMethod === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, commMethod: opt }))}
                        className="flex w-full sm:w-auto sm:flex-1 items-center justify-start sm:justify-center gap-2.5 py-3 px-3 rounded-lg border transition-all duration-200 text-sm font-medium"
                        style={{
                          borderColor: active ? "#53C1CE" : "#33333390",
                          background: active ? "#F0FBFC" : "transparent",
                          color: "#374151",
                        }}
                      >
                        <RadioCircle checked={active} />
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notice */}
              <div className="rounded-lg py-0 sm:py-3 px-0 sm:px-4 text-[#333] flex items-start sm:items-center gap-1 text-sm sm:text-base font-medium">
                <span className="text-2xl hidden sm:block">•</span>
                We typically responded within 24 hours to schedule consultation.
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full sm:text-base py-3.5 rounded-xl text-white text-sm font-semibold tracking-wide transition-opacity duration-200 hover:opacity-90 active:opacity-80"
                style={{ background: "linear-gradient(90deg, #31BBD0 0%, #A3D183 100%)" }}
              >
                {loading ? "Submitting..." : "Hire Developer"}
              </button>
            </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default HireADeveloperForm;