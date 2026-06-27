import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useSiteData } from "../../DataContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSiteData();

  return (
    <nav className="fixed w-full z-50 bg-stone-950/80 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-widest text-amber-500 uppercase">{data?.website.logo || 'Lime Light'}</span>
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-stone-300 hover:text-amber-500 transition-colors uppercase text-sm tracking-wider">Home</Link>
            <Link to="/about" className="text-stone-300 hover:text-amber-500 transition-colors uppercase text-sm tracking-wider">About</Link>
            <Link to="/menu" className="text-stone-300 hover:text-amber-500 transition-colors uppercase text-sm tracking-wider">Menu</Link>
            <Link to="/gallery" className="text-stone-300 hover:text-amber-500 transition-colors uppercase text-sm tracking-wider">Gallery</Link>
            <Link to="/reservation" className="px-6 py-2 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-stone-950 transition-all uppercase text-sm tracking-wider font-medium">Book a Table</Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-stone-300 hover:text-amber-500">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-stone-900 border-b border-stone-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-stone-300 hover:text-amber-500 uppercase text-sm tracking-wider" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" className="block px-3 py-2 text-stone-300 hover:text-amber-500 uppercase text-sm tracking-wider" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/menu" className="block px-3 py-2 text-stone-300 hover:text-amber-500 uppercase text-sm tracking-wider" onClick={() => setIsOpen(false)}>Menu</Link>
            <Link to="/gallery" className="block px-3 py-2 text-stone-300 hover:text-amber-500 uppercase text-sm tracking-wider" onClick={() => setIsOpen(false)}>Gallery</Link>
            <Link to="/reservation" className="block px-3 py-2 text-amber-500 uppercase text-sm tracking-wider font-bold" onClick={() => setIsOpen(false)}>Reservation</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
