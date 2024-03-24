import React from "react";



const Layout = ({ children }) => {
  return (
    <>
      <main
        className="grow"
      >
        <div
        className="mt:[66px] pl-0 pr-0"
          style={{  minWidth: " -webkit-fill-available" }}
        >
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
