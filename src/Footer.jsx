import React from 'react'

const Footer = () => {
    return (
        <footer className="w-full p-10 border-neutral-500 border-t mt-8">
            <div className="max-w-7xl mx-auto border-neutral-600">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-center">
                        This 
                        <span className="text-green-400">
                            {" "}
                            Full Stack Invoicing System
                            {" "}
                        </span> 
                        is developed by
                        <a 
                            href="https://rafael-manubay.vercel.app/"
                            className="bg-gradient-to-r from-blue-300 to-blue-600 bg-clip-text text-transparent hover:text-red-400 transition-colors duration-200">
                            {" "}
                            Rafael Marco Manubay
                        </a>
                    </h2>
                </div>
            </div>
        </footer>
    )
}

export default Footer