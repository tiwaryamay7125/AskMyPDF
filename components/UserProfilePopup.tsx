import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useSession, signOut } from "next-auth/react";
import { CircleUserRound } from "lucide-react"

const UserProfilePopup = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {

    if (!popupRef?.current?.contains(event.target as Node)) {
      handleClose();
    }

  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);

    };
  });

  return (
    <div
      className="relative inline-block">
      <button
        onClick={handleToggle}
        className="bg-transparent hover:bg-transparent rounded"
      >
        {(session?.user?.image && (
          <Image
            src={session.user.image}
            alt="User Image"
            width={40}
            height={40}
            className="rounded-full"
          />
        )) || <CircleUserRound />}
      </button>

      {isOpen && (
        <div
          ref={popupRef}
          className="absolute z-10 w-72 p-4  bg-white rounded-lg shadow-lg mt-2 overflow-hidden"
          style={{
            left: '-270%',
            transform: 'translateX(-50%)',
            top: 'calc(100% + 8px)',
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <div className="flex items-center mb-4">
            {session?.user?.image && (
              <Image
                src={session.user.image}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full mr-2"
              />
            )}
            <div className="flex flex-col overflow-hidden">
              <h2 className="font-bold text-black overflow-ellipsis overflow-hidden whitespace-nowrap">{session?.user?.name}</h2>
              <p className="text-gray-600 text-sm overflow-ellipsis overflow-hidden whitespace-nowrap">{session?.user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfilePopup;