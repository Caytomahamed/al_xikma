'use client';

import UserForm from '@/components/UserForm';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async () => {
    const user = await signIn('credentials', {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: '/dashboard',
    });

    if (!user) {
      return null;
    }

    return user;
  };
  return (
    <div className="max-h-screen overflow-y-hidden bg-gradient-to-r from-[#2e4267] to-[#395CA0] flex items-center justify-center">
      <UserForm
        handleSubmit={handleSubmit}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </div>
  );
};

export default SignIn;
