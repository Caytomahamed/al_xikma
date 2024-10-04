import Image from 'next/image';

const PromotionBanner = () => {
  return (
    <div className="flex items-center bg-[linear-gradient(180deg,#333335,#1C1C1C)] shadow-lg pl-3 py-2 ">
      <Image
        src="/images/tt.jpg"
        alt="Company Logo"
        width={30}
        height={30}
        className=" h-auto mr-2"
      />
      <div className="flex flex-col">
        <h2 className="text-[10px] font-bold">Empower Target Technology </h2>
      </div>
    </div>
  );
};

export default PromotionBanner;
