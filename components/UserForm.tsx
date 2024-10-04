import React from 'react';

interface UserProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: (email: string, password: string) => void;
}
const UserForm: React.FC<UserProps> = ({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  return (
    <div className="h-screen mt-4 p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="backdrop-blur-sm  bg-white/80 rounded-md shadow-md flex flex-col items-center px-10  h-[450px] w-[450px] justify-center space-y-4"
      >
        <h2 className="text-slate-600 text-xl font-semibold leading-1">
          Admin Panel
        </h2>
        <p className="text-sm text-slate-600 font-light leading-1">
          please login to continue.
        </p>
        <div className="flex w-full flex-col space-y-2">
          <label className="text-black font-regular" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter Your Email..."
            className=" bg-transparent  h-[57px] border border-gray-400 outline-none px-3 text-sm focus:border-[#2e4267]"
            value={email as string}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col space-y-2">
          <label className="text-black  font-regular" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password..."
            className="bg-transparent  h-[57px] border border-gray-400 outline-none px-3 text-sm focus:border-[#2e4267]"
            value={password as string}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={() => handleSubmit(email, password)}
          type="button"
          className="bg-[#395CA0] p-3 w-full  rounded-md text-white text-base"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
