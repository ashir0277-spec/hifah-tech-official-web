import { Link } from "react-router-dom";

export default function AboutDropDown({ open }) {
  const coreServices = ["About", "Blog", "Our Team", "Life at Hifah Technologies"];

  return (
    <div className={`absolute left-0 top-8 mt-3 transition-opacity duration-100 z-50 ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}>
      <div className="absolute -top-2 left-6 w-4 h-4 bg-white rotate-45 border-l border-t border-[#33333322]" />

      <div className="w-[550px] mont bg-white shadow-[0_4px_50px_0px_rgba(0,0,0,0.1)] rounded-xl overflow-visible border border-[#33333322] flex">
        
        {/* LEFT */}
        <div className="border-r border-[#33333322] m-5 pr-5" style={{width:'260px', minWidth:'220px', maxWidth:'260px'}}>
          <h3 className="text-[22px] font-semibold text-black mb-3">About Us</h3>
          <p className="text-[#333333dd] font-medium text-sm leading-6" style={{whiteSpace:'normal', wordWrap:'break-word', maxWidth:'200px'}}>
            We are committed to delivering highly efficient and exceptional software solutions.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex-1 m-5">
          <div className="flex flex-col gap-2">
            {coreServices.map((service, index) => (
              <Link
                key={index}
                to={`/${service.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-[#333] text-sm font-medium hover:bg-[#F6F8F8] rounded-md p-1 transition-colors duration-200"
              >
                <span className="text-lg pr-2 ml-2">•</span>
                <span>{service}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}