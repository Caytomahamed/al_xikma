'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-h-screen bg-gradient-to-r from-[#2e4267] to-[#395CA0] h-screen overflow-y-hidden">
      <h2 className="text-2xl text-white font-semibold uppercase text-center mt-10">
        AlXikma Finance App
      </h2>
      <div className="flex gap-10 py-10 items-center justify-center h-screen">
        <div className="flex flex-col gap-4 w-[450px]">
          <h2 className="text-2xl text-white font-semibold">
            Continue With Admin Panel.
          </h2>
          <Link
            className="w-full bg-transparent border border-white px-6 py-2 rounded-sm text-white text-center font-medium"
            href="/auth/sign-in"
          >
            Sign In
          </Link>
        </div>
        <Image
          src="/assets/financial.svg"
          alt="Banner"
          width={450}
          height={350}
        />
      </div>
    </div>
  );
}
