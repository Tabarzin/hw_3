import { FormEvent, useState } from 'react';
import { supabase } from '@stores/AuthStore';
import React from 'react';
import Input from '@components/Input';
import Button from '@components/Button';
import styles from './LoginRegisterForm.module.scss';

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
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Error registering:', error.message);
      } else {
        alert('Please check your email to confirm your account.');
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
    <div className={styles.auth_form}>
      <h2>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input value={email} type="email" placeholder="Email" onChange={handleEmailChange} />
        <Input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        <div className={styles.buttons}>
          <Button type="submit">{isLogin ? 'Sign In' : 'Sign Up'}</Button>
        </div>
      </form>
      <Button onClick={toggleMode}>{isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}</Button>
    </div>
  );
};

export default LoginRegisterForm;
