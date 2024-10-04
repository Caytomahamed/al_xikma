'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaDownload } from 'react-icons/fa';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { RiWhatsappFill } from 'react-icons/ri';
import { MdOutlineMail } from 'react-icons/md';
import { getInVoice } from '@/lib/actions/invoice.actions';

const InvoiceDownload = ({ params }: any) => {
  const [invoice, setInvoice] = useState<any>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fetchInvoice = async (id: string) => {
      const resp: any = await getInVoice(id);

      setInvoice(resp);
    };

    fetchInvoice(params.id);
  }, [params.id]);

  const formateDate = (date: Date) => {
    const dateOptions: any = {
      year: 'numeric',
      month: 'long', // or 'short' or 'numeric'
      day: 'numeric',
    };

    return date?.toLocaleDateString(dateOptions);
  };

  const handleDownload = async () => {
    const data = contentRef.current;
    if (!data) return;

    const canvas = await html2canvas(data);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('invoice.pdf');
  };
  return (
    <>
      <div className="flex items-center justify-end w-[600px] mx-auto">
        <Button className=" w-[90px] rounded-md">
          <FaDownload size={18} onClick={handleDownload} />
        </Button>
      </div>

      <div
        ref={contentRef}
        className="max-h-screen bg-white shadow-md w-[600px] mx-auto p-6"
      >
        <div className="flex items-center justify-between mb-6 border-b border-black py-2">
          <h1 className="text-3xl text-slate-800 font-bold">Invoice</h1>

          <Image
            src="/images/logo.png"
            className="object-contain w-16"
            alt="logo"
            width={80}
            height={80}
          />
        </div>

        {/* Invoice Info */}

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[#222] text-xl font-semibold">Invoice To:</h2>
            <h3 className="text-base text-slate-700 font-medium">
              {invoice?.customer}
            </h3>
          </div>
          <div className="flex  flex-col">
            <div className="flex gap-4">
              <h3 className="text-slate-700 text-base font-semibold mr-4">
                Invoice#
              </h3>
              <p className="text-gray-400 text-[15px] font-normal">
                {invoice?.receipt_no}
              </p>
            </div>
            <div className="flex  gap-4">
              <h3 className="text-slate-700 text-base font-semibold">Date:</h3>
              <p className="text-gray-400 text-[15px] font-normal">
                {formateDate(invoice?.createdAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          {/* Invoice Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description:</TableHead>
                <TableHead>Price:</TableHead>
                <TableHead>Total:</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>{invoice?.description}</TableCell>
                <TableCell>${invoice?.price}</TableCell>
                <TableCell>${invoice?.price}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base text-slate-700 font-semibold">
            Thank You For Your Business
          </h2>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-6 border-b border-black pb-2">
              <div className="flex flex-col gap-2">
                <p className="text-slate-800 text-[15px] font-semibold">
                  Sub Total:
                </p>
                <p className="text-slate-800 text-[15px] font-semibold">Tax:</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-medium">${invoice?.price}</span>
                <span className="font-medium">0.00%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-slate-800 text-[15px] font-semibold">Total:</p>
              <span className="font-medium text-base">${invoice?.price}</span>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="flex  gap-6">
          <div>
            <h3 className="text-slate-700 font-semibold">
              Hargeisa,Somaliland
            </h3>
            <div className="flex flex-col mt-2 space-y-2">
              <p className="flex items-center gap-1 text-slate-700 font-medium">
                <BsFillTelephoneFill size={20} className="text-green-400" />
                063-4888182
              </p>
              <p className="flex items-center gap-1 text-slate-700 font-medium">
                <BsFillTelephoneFill size={20} className="text-green-400" />
                065-4888182
              </p>
              <p className="flex items-center gap-1 text-slate-700 font-medium">
                <RiWhatsappFill size={23} className="text-green-400" />
                063-4888182
              </p>
            </div>

            <p className="flex items-center gap-1 mt-2 text-slate-700 font-medium">
              <MdOutlineMail size={23} className="text-green-400" />
              alxikmacraneservice@gmail.com
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-slate-700 font-semibold">Dubai,UAE</h3>
            <div className="flex flex-col space-y-4 mt-2">
              <p className="flex items-center gap-1 text-slate-700 font-medium">
                <BsFillTelephoneFill size={20} className="text-green-400" />
                971559864477
              </p>
              <p className="flex items-center gap-1 text-slate-700 font-medium">
                <BsFillTelephoneFill size={20} className="text-green-400" />
                971555611267
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceDownload;
