import React from "react";

function Header() {
  return (
    <nav className="header fixed rounded-b-2xl w-[101%] h-[55rem]">
      <div className="flex flex-wrap items-center justify-between mx-auto">
        {/* <img src="/home.jpg" className="mx-auto mt-4" alt="Flowbite Logo" /> */}
{/* Show on mobile only */}
<img src="/icewarp.jpg" className="block md:hidden mx-auto w-full" alt="Logo" />

{/* Show on md and larger only */}
<img src="/icewarp2.jpg" className="hidden md:block mx-auto w-full" alt="Logo" />

        {/* <img src="/icewarpCircle.jpg" className="mx-auto " alt="Flowbite Logo" /> */}

        {/* <h1 className="absolute mx-auto mb-4 text-4xl font-extrabold leading-none tracking-tight text-[#fc5e28] md:text-5xl lg:text-6xl">
          Welcome back,
        </h1>

        <h1 className="">ready to explore?</h1> */}
      </div>
    </nav>
  );
}

export default Header;
