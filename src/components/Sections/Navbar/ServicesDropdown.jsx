import { Link } from 'react-router-dom';

export default function ServicesDropdown({ open }) {

  const coreServices = ["App Development","Web Development","UI UX Designing", "Digital Marketing", "Video Editing", "AI Solutions"];
  
  // IT Services commented out for now — uncomment when ready
  // const itServices = [ 
  //   "Specilized Solution & Advisrry",
  //   "Proactive Support & Service Desk",
  //   "Security, Compliance & Lifecycle",
  //   "Infrastructure, Virtualization & Cloud",
  // ];
  
  return (
    <div className={`absolute left-2/5 -translate-x-1/3 z-50 top-13 mt-3 transition-opacity duration-100 ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}>
      {/* Arrow pointer */}
      <div className="absolute -top-2 left-[39%] w-4 h-4 bg-[#fff] rotate-45 border-l border-t border-[#ffffff64]" />

      <div className="w-[720px] mont bg-[#fff] shadow-[0_4px_50px_0px_rgba(0,0,0,0.1)] rounded-xl overflow-hidden border border-[#33333322] flex">
        
        {/* LEFT — wider description section */}
        <div
          className="border-r border-[#3333333b] m-5 pr-7"
          style={{ width: '280px', minWidth: '280px', maxWidth: '280px', flexShrink: 0 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl sm:text-[24px] font-semibold text-black">Our Services</h3>
          </div>
          <p
            className="text-[#000000dd] font-medium text-sm"
            style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word' }}
          >
            Explore our comprehensive range of services designed to meet your business needs.
          </p>
        </div>

        {/* MIDDLE — Core Services, now takes full remaining width, no right border */}
        <div className="flex flex-col flex-1 m-5 pr-5">
          <h4 className="text-lg font-semibold text-black mb-5">Core Services</h4>
          <div className="grid grid-cols-2 gap-3">
            {coreServices.map((service, index) => (
              <Link
                key={index}
                to={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-[#333] text-sm font-medium hover:bg-[#F6F8F8] rounded-md p-1 transition-colors duration-200"
              >
                <span className="text-lg pr-2 pl-2">•</span>
                <span>{service}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* IT Services — commented out, restore this block when needed */}
        {/* <div className="flex flex-col w-fit p-5 group border-l border-[#3333333b]">
          <h4 className="text-lg font-semibold text-black mb-5">IT Services</h4>
          <div className="flex flex-col gap-2">
            {itServices.map((service, index) => (
              <Link
                key={index}
                to={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-[#333] text-sm font-medium hover:bg-[#F6F8F8] rounded-md p-1 transition-colors duration-200"
              >
                <span className="text-lg pr-2 ml-3">•</span>
                <span className="pr-3">{service}</span>
              </Link>
            ))}
          </div>
        </div> */}

      </div>
    </div>
  );
}