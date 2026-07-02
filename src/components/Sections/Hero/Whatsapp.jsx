import React, { useState } from 'react';
import whatsapp from '../../..//assets/images/whatsapp.svg';
import { MapPin, PhoneCall, MailOpen } from 'lucide-react';

const SideContactItem = ({ icon, iconSm, hoverText, href, isFirst = false, isLast = false }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className='relative hidden sm:flex items-center cursor-pointer'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ textDecoration: "none", position: "relative", zIndex: 9999 }}
    >
      {/* Icon box — smaller on tablet (sm), full size on desktop (lg) */}
      <div
        className={`
          w-8 h-8 sm:w-8 sm:h-8 lg:w-12 lg:h-12
          flex justify-center items-center flex-shrink-0 z-10 relative
          border-r border-white sm:border-r-transparent
          ${!isFirst ? "sm:border-t border-white" : ""}
          ${isLast ? "border-r-none" : ""}
        `}
        style={{ backgroundColor: "#01B2EE" }}
      >
        {/* Icon — smaller on tablet, normal on desktop */}
        <span className="text-white">
          <span className="block lg:hidden">{iconSm}</span>
          <span className="hidden lg:block">{icon}</span>
        </span>
      </div>

      {/* Sliding text */}
      <div
        className="flex items-center h-8 sm:h-8 lg:h-12 bg-black text-white text-xs lg:text-sm font-semibold whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxWidth: hovered ? "290px" : "0px",
          paddingLeft: hovered ? "12px" : "0px",
          paddingRight: hovered ? "12px" : "0px",
          opacity: hovered ? 1 : 0,
          position: "relative",
          zIndex: 9999,
        }}
      >
        {hoverText}
      </div>
    </a>
  );
};

export default function SideContact() {
  return (
    <div className='flex flex-row sm:flex-col fixed left-0 top-16 sm:top-20 z-10'>
      <SideContactItem
        icon={<PhoneCall className="w-5 h-5" />}
        iconSm={<PhoneCall className="w-3.5 h-3.5" />}
        hoverText={
          <span dir="ltr" style={{ unicodeBidi: "isolate" }}>
            +92 317 7770287
          </span>
        }
        href="https://wa.me/923177770287"
        isFirst={true}
      />
      <SideContactItem
        icon={<MailOpen className="w-5 h-5" strokeWidth={2} />}
        iconSm={<MailOpen className="w-3.5 h-3.5" strokeWidth={2} />}
        hoverText="hifahtechnologiesofficial@gmail.com"
        href="mailto:hifahtechnologiesofficial@gmail.com"
      />
      <SideContactItem
        icon={<MapPin className="w-5 h-5" />}
        iconSm={<MapPin className="w-3.5 h-3.5" />}
        hoverText="Jadoon Plaza Phase 2 Abbotabad"
        href="https://www.google.com/maps/search/?api=1&query=Jadoon Plaza Phase 2 Abbotabad"
        isLast={true}
      />

      {/* WhatsApp floating button — unchanged */}
      <div className="group fixed bottom-[1.5rem] sm:bottom-[2.5rem] right-[1.5rem] sm:right-[2.5rem] z-50">
        <div className="absolute -inset-4 sm:-inset-5 rounded-full bg-[#25D366]/30 animate-pulse-slow pointer-events-none" />
        <div className="absolute -inset-2 sm:-inset-3 rounded-full bg-[#25D366]/20 animate-pulse-slow pointer-events-none animation-delay-500" />
        <a
          href="https://wa.me/923177770287"
          target="_blank"
          rel="noopener noreferrer"
          className="
            relative flex items-center justify-center
            w-[58px] sm:w-[60px] h-[58px] sm:h-[60px]
            rounded-full overflow-hidden
            bg-[#55cf61]
            shadow-[0_8px_16px_rgba(37,213,102,0.35)]
            transition-all duration-300 ease-out
            group-hover:scale-110 group-hover:shadow-[0_12px_24px_rgba(37,213,102,0.5)]
            group-hover:-translate-y-1
            active:scale-95
          "
        >
          <img
            src={whatsapp}
            alt="Chat on WhatsApp"
            className="w-[85%] h-[85%] object-contain transition-transform duration-300 group-hover:rotate-6"
          />
        </a>
      </div>
    </div>
  );
}