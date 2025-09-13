"use client"
import React from 'react'
import UserProfilePopup from './UserProfilePopup';
import Image from 'next/image';


function Navbar() {
    return (
        <div>
            <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
                <div className="flex items-center">
                    <div className=" h-10 mr-2  flex items-center justify-center">
                        <Image
                            src='/logo.png'
                            alt="User Image"
                            width={60}
                            height={60}
                        />
                    </div>
                    <span className="text-xl font-bold">PDF TALK</span>

                </div>

                <div className='flex items-center'>
                    <UserProfilePopup />

                </div>

            </nav>
        </div>
    )
}

export default Navbar