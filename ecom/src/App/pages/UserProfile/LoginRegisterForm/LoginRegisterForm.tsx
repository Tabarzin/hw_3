import { ChangeEvent, FormEvent, useState } from 'react';
import { supabase } from '@stores/AuthStore';
import React from 'react';
import Input from '@components/Input';
import Button from '@components/Button';

interface LoginRegisterFormProps {
  onLogin: () => void;
  onRegister: () => void;
}

const LoginRegisterForm = ({ onLogin, onRegister }: LoginRegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLogin) {
      // Login logic
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Error logging in:', error.message);
      } else {
        onLogin();
      }
    } else {
      // Registration logic
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Error registering:', error.message);
      } else {
        onRegister();
      }
    }
  };
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input value={email} type="email" placeholder="Email" onChange={handleEmailChange} />
        <Input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />

        <Button type="submit">{isLogin ? 'Sign In' : 'Sign Up'} </Button>
      </form>
      <Button onClick={toggleMode}>{isLogin ? 'Sign Up' : 'Sign In'} </Button>
    </div>
  );
};

export default LoginRegisterForm;
