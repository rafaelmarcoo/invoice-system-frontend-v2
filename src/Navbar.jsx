import { Link } from "react-router-dom"
import { navItems } from "./constants"
import { useState } from "react";
import { X, Menu } from "lucide-react";

const Navbar = () => {
    const [menuBar, setMenuBar] = useState(false);
    const toggleMenuBar = () => {
        setMenuBar(!menuBar);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-700 py-3 bg-neutral-900">
            <div className="flex justify-between items-center mx-5 p-3">
                <h2 
                    className="text-lg lg:text-xl hover:scale-105 hover:text-blue-500 transition-all"
                >
                    InvoicePro
                </h2>
                <div className="hidden lg:flex space-x-4">
                    {navItems.map((item, index) => (
                        <Link 
                            key={index} 
                            to={item.href}
                            className="hover:text-blue-300 transition-colors duration-200"
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>
                <div className="lg:hidden p-1 rounded-md hover:bg-neutral-800 transition-colors">
                    <button onClick={toggleMenuBar}>
                        {menuBar ? <X /> : <Menu />}
                    </button>
                </div>
                {menuBar && (
                    <div className="fixed top-[88px] left-0 right-0 lg:hidden w-full p-12 flex flex-col justify-center items-center bg-neutral-900 space-y-6">
                        {navItems.map((item, index) => (
                        <Link 
                            key={index} 
                            to={item.href}
                            className="border bg-gray-600 rounded-lg p-1 hover:scale-105 hover:bg-blue-300 duration-200 transition-all"
                            onClick={toggleMenuBar}
                        >
                            {item.title}
                        </Link>
                    ))}
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar