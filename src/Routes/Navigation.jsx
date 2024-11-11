import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; // For icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the sidebar menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#1c0a00] text-white p-4 shadow-md  w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or App Name */}
        <Link to="/" className="text-xl font-bold">
          TastyBites
        </Link>

        {/* Hamburger Menu for mobile */}
        <Button
          variant="ghost"
          className="lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>

        {/* Navigation Links for larger screens */}
        <div className="hidden lg:flex lg:items-center lg:space-x-6">
          <Link to="/" className="block px-3 py-2 rounded hover:bg-[#c2bab3] hover:text-black">
            Add Item
          </Link>
          <Link to="/view" className="block px-3 py-2 rounded hover:bg-[#c2bab3] hover:text-black">
            View Items
          </Link>
          <Link to="/total-items" className="block px-3 py-2 rounded hover:bg-[#c2bab3] hover:text-black">
            Total Items
          </Link>
          <Link to="/done-oreder" className="block px-3 py-2 rounded hover:bg-[#c2bab3] hover:text-black">
          Complete Oreder
          </Link>
        </div>
      </div>

      {/* Sliding Sidebar for mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#1c0a00] text-white transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden z-50`}
      >
        {/* Close button inside the sidebar */}
        <div className="flex justify-end p-4">
          <Button variant="ghost" onClick={toggleMenu} aria-label="Close menu">
            <X size={24} />
          </Button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col items-start space-y-6 p-4">
          <Link
            to="/"
            className="block px-3 py-2 rounded hover:bg-[#c2bab3] hover:text-black w-full"
            onClick={toggleMenu}
          >
            Add Item
          </Link>
          <Link
            to="/view"
            className="block px-3 py-2 rounded hover:bg-[#c2bab3] hover:text-black w-full"
            onClick={toggleMenu}
          >
            View Items
          </Link>
          <Link
            to="/total-items"
            className="block px-3 py-2 rounded hover:bg-[#c2bab3] hover:text-black w-full"
            onClick={toggleMenu}
          >
            Total Items
          </Link>
          <Link
            to="/done-oreder"
            className="block px-3 py-2 rounded hover:bg-[#c2bab3] hover:text-black w-full"
            onClick={toggleMenu}
          >
            Complete Oreder
          </Link>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={toggleMenu}
        />
      )}
    </nav>
  );
}
