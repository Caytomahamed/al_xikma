'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { FaPowerOff } from 'react-icons/fa';
import Link from 'next/link';
const Header = () => {
  return (
    <header>
      <div className="flex items-center justify-between p-4 ">
        <h2 className="text-base text-slate-700 font-semibold">
          Main Dashboard
        </h2>

        <div className="flex gap-4 items-center">
          <Link
            className="bg-transparent border border-[#5874c7] p-2 text-[#5874c7] text-base font-semibold rounded-md"
            href="/dashboard/invoice/add"
          >
            Add Invoice
          </Link>
          <button onClick={() => signOut({ callbackUrl: '/auth/sign-in' })}>
            <FaPowerOff size={20} className="text-[#5874c7]" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
