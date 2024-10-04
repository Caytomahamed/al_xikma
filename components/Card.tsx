import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className: string;
}
const Card: React.FC<CardProps> = ({ className, children }) => {
  return (
    <div
      className={`${className} w-[200px] h-[80px] rounded-md shadow-sm border flex items-center px-4 justify-between`}
    >
      {children}
    </div>
  );
};

export default Card;
