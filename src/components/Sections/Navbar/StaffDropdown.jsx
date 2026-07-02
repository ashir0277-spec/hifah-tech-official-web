import { Link } from 'react-router-dom';

export default function StaffDropDown({ open }) {

  const coreServices = ["hire developers", "Our Team"];

  return (
    <div className={`absolute left-1/3.5 -translate-x-1/3 top-13 mt-3 transition-opacity duration-100 ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}>
      <div className="absolute -top-2 left-[45%] -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-[#33333322]" />

      <div className="w-[650px] mont bg-white shadow-[0_4px_50px_0px_rgba(0,0,0,0.1)] rounded-xl overflow-hidden border border-[#33333322] flex">

        {/* LEFT — only this div changed */}
        <div
          className="border-r border-[#33333322] m-5 pr-7"
          style={{ width: '220px', minWidth: '220px', maxWidth: '220px', flexShrink: 0 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl sm:text-[21px] font-semibold text-black">Staff Augmentation</h3>
          </div>
          <p
            className="text-[#333333dd] font-medium text-sm"
            style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word' }}
          >
            We are committed to delivering highly efficient and exceptional software solutions.
          </p>
        </div>

        {/* RIGHT — YOUR ORIGINAL */}
        <div className="flex-1 m-5">
          <div className="flex flex-col gap-2">
            {coreServices.map((service, index) => (
              <Link
                key={index}
                to={`/${service.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-[#333] text-sm font-medium hover:bg-[#F6F8F8] rounded-md p-1 transition-colors duration-200"
              >
                <span className='text-[#333] text-lg pr-2 ml-2'>•</span>
                <span className='capitalize'>{service}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}