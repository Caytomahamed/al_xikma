'use client';
import Link from 'next/link';
import Image from 'next/image';

import { FiHome } from 'react-icons/fi';
import { FaUser, FaMoneyBillAlt, FaFileInvoice } from 'react-icons/fa';
import { SiExpensify } from 'react-icons/si';
import { TbCarCrane, TbReport } from 'react-icons/tb';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import PromotionBanner from './PromotionBanner';

const links = [
  {
    name: 'Dashboard',
    icon: <FiHome size={20} />,
    href: '/dashboard',
  },
  {
    name: 'Employee',
    icon: <FaUser size={20} />,
    href: '/dashboard/employee',
  },
  {
    name: 'Salary',
    icon: <FaMoneyBillAlt size={20} />,
    href: '/dashboard/salary',
  },
  {
    name: 'Crane 25t',
    icon: <TbCarCrane size={23} />,
    href: '/dashboard/crane/1',
  },
  {
    name: 'Crane 50t',
    icon: <TbCarCrane size={23} />,
    href: '/dashboard/crane/2',
  },
  {
    name: 'Crane 160t',
    icon: <TbCarCrane size={23} />,
    href: '/dashboard/crane/3',
  },
  {
    name: 'Total Sales',
    icon: <TbCarCrane size={23} />,
    href: '/dashboard/final',
  },
  {
    name: 'Expenses 1',
    icon: <SiExpensify size={20} />,
    href: '/dashboard/expense',
  },
  {
    name: 'Expenses 2',
    icon: <SiExpensify size={20} />,
    href: '/dashboard/expense1',
  },
  {
    name: 'Month Expenses',
    icon: <SiExpensify size={20} />,
    href: '/dashboard/monthExpenses',
  },
  {
    name: 'Invoices',
    icon: <FaFileInvoice size={20} />,
    href: '/dashboard/invoice',
  },
  {
    name: 'Debts',
    icon: <FaFileInvoice size={20} />,
    href: '/dashboard/debts',
  },
  {
    name: 'Report',
    icon: <TbReport size={20} />,
    href: '/dashboard/report',
  },
];
const Sidebar = () => {
  const currentUrl = usePathname(); // Get the current pathname
  const [isOpen, setIsOpen] = useState(true); // State for sidebar visibility

  // Define the function to check if the link is active
  const isActive = (currentUrl: string, linkHref: string): boolean => {
    return currentUrl === linkHref;
  };

  // toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  console.log('isOpen', isOpen);

  const dividerLinks = ['Crane 25t', 'Total Sales', 'Invoices'];

  return (
    <div
      className={`sticky top-0 left-0 bg-[#161618] ${
        isOpen ? 'w-[260px]' : 'w-[100px]'
      }  h-full text-[#9F9FA1] pb-5`}
    >
      <div>
        <button
          onClick={toggleSidebar}
          className={`focus:outline-none z-50 w-10 h-10 flex items-center justify-center rounded-full absolute right-0 top-12 translate-x-5 transition-transform duration-300 shadow-2xl ${
            isOpen
              ? 'text-red bg-[linear-gradient(180deg,#333335,#1C1C1C)] hover:bg-slate-200 '
              : 'bg-[linear-gradient(180deg,#333335,#1C1C1C)] text-white hover:bg-red-600'
          }  transition-colors duration-300 `}
        >
          {isOpen ? '<<' : '>>'}
        </button>
      </div>
      <div className="flex flex-col gap-8 p-6 ">
        <div className="flex gap-2 items-center">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={70}
            height={70}
            className="object-contain w-14"
          />
          {isOpen ?? <h2 className="text-xl font-semibold">Al-xikma</h2>}
        </div>

        <ul className=" font-semibold flex flex-col space-y-2">
          {/* <span className=" text-sm font-medium">Main</span> */}
          <div className="flex flex-col space-y-2">
            {links.map((link) => (
              <>
                {dividerLinks.includes(link.name) && (
                  <div className="flex items-center">
                    <div className="hidden md:flex flex-grow border-t border-[#333335] my-4"></div>
                    <div className="hidden md:flex flex-grow border-t border-[#333335] my-4"></div>
                  </div>
                )}
                <Link
                  href={link.href}
                  className={`flex items-center gap-2 py-3 pl-3 transition-colors duration-300   ${
                    isActive(currentUrl, link.href)
                      ? 'bg-[linear-gradient(180deg,#333335,#1C1C1C)] shadow-lg text-[#d7d7d7]' // Active styles
                      : 'hover:bg-gray-500 hover:text-white text-gray-500 ' // Hover styles
                  } rounded-lg`}
                  key={link.name}
                >
                  {link.icon}
                  {isOpen && link.name}
                </Link>
              </>
            ))}
          </div>
        </ul>

        <div>
          <div
            className={`flex items-center bg-[linear-gradient(180deg,#333335,#1C1C1C)] shadow-lg ${
              isOpen ? 'pl-3' : 'pl-[.4rem]'
            } py-2`}
          >
            <Image
              src="/images/tt.jpg"
              alt="Company Logo"
              width={30}
              height={30}
              className=" h-auto mr-2"
            />
            <div className="flex flex-col">
              {isOpen && (
                <h2 className="text-[10px] font-bold">
                  Empower Target Technology{' '}
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
