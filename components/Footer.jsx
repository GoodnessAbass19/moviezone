import React from "react";

const Footer = () => {
  const today = new Date().getFullYear();
  return (
    <footer className="bg-blue-700 py-4 bottom-0 mt-10">
      <div className="container mx-auto text-center text-white">
        <p className="text-sm">
          &copy; {today} Moviezone. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
