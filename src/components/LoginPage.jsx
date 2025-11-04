import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

const USERS = [
  { u: 'user1', p: 'pass1', title: 'You are the chosen one, fresher.' },
  { u: 'user2', p: 'pass2', title: 'The adventure begins with your mind, fresher.' },
  { u: 'user3', p: 'pass3', title: 'Unlock the secrets hidden around, fresher.' },
  { u: 'user4', p: 'pass4', title: 'Seek the chaos, find your calm, fresher.' },
  { u: 'user5', p: 'pass5', title: 'Laughter hides in every corner, fresher.' },
];

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const current = localStorage.getItem('shiva_current_user');
    if (current) {
      navigate('/#/hunt');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (username === 'admin' && password === 'shiva2025') {
      localStorage.setItem('shiva_current_user', 'admin');
      onLogin?.('admin');
      navigate('/#/admin');
      return;
    }

    const found = USERS.find((u) => u.u === username && u.p === password);
    if (!found) {
      setError('Wrong credentials. Type carefully, rookie.');
      return;
    }
    localStorage.setItem('shiva_current_user', username);
    onLogin?.(username);
    navigate('/#/hunt');
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 h-[52vh] w-full">
        <Spline scene="https://prod.spline.design/OIGfFUmCnZ3VD8gH/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-[#0b0b0b]/30 to-[#f8f0d9]" />
      </div>

      <div className="relative z-10 pt-40 pb-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center text-[#f8f0d9]"
        >
          <h2 className="text-4xl font-black drop-shadow-md" style={{ fontFamily: '"Special Elite", "Courier New", Courier, monospace' }}>
            🕵️‍♂️ SHIVA HUNT 2025!!
          </h2>
          <p className="mt-2 opacity-90" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
            A retro treasure hunt across the hostel. Crack clues, collect passkeys, conquer the hunt.
          </p>
        </motion.div>

        <div className="mx-auto mt-8 max-w-md">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20, rotateX: -8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="rounded-lg border border-[#a36c3a] bg-[#fff9e9] p-6 shadow-[0_10px_25px_rgba(163,108,58,0.25)]"
            style={{ fontFamily: '"Special Elite", "Courier New", Courier, monospace' }}
          >
            <div className="mb-4">
              <label className="mb-1 block text-sm">Codename</label>
              <input
                className="w-full rounded border border-[#a36c3a] bg-[#f8f0d9] px-3 py-2 outline-none focus:ring-2 focus:ring-[#c47f3e]"
                placeholder="user1 | admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="mb-1 block text-sm">Passphrase</label>
              <input
                type="password"
                className="w-full rounded border border-[#a36c3a] bg-[#f8f0d9] px-3 py-2 outline-none focus:ring-2 focus:ring-[#c47f3e]"
                placeholder="pass1 | shiva2025"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-sm text-red-700"
                style={{
                  fontFamily: '"Courier New", Courier, monospace',
                  whiteSpace: 'pre',
                }}
              >
                {error}
              </motion.p>
            )}
            <button
              type="submit"
              className="mt-4 w-full rounded bg-[#c47f3e] px-4 py-2 font-semibold text-[#2b1d13] shadow hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#a36c3a]"
            >
              Enter the Hunt
            </button>
            <p className="mt-3 text-center text-xs opacity-80">
              Logins: user1..user5/pass1..pass5 • Admin: admin/shiva2025
            </p>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
