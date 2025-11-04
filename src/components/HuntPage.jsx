import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Riddle data per user with passkeys
const RIDDLES = {
  user1: [
    { text: 'Find the mirror that loves gossip.', key: 'you' },
    { text: 'Where towels die young, and steam hides sins.', key: 'are' },
    { text: 'Where night owls plot and the chessboard sleeps.', key: 'the' },
    { text: 'Ask the senior who never returns your pen.', key: 'chosen' },
    { text: 'Where slippers rest in peace and socks vanish.', key: 'one' },
    { text: 'That one door always locked but never empty.', key: 'safe' },
    { text: 'When hunger roars louder than pride.', key: 'fresher' },
  ],
  user2: [
    { text: 'He never studies but owns the biggest table.', key: 'the' },
    { text: 'Find where noodles and dreams both overcook.', key: 'adventure' },
    { text: 'Shoes never match here — neither do people.', key: 'begins' },
    { text: 'The place where Wi-Fi dies an honorable death.', key: 'with' },
    { text: 'The one who dreams in daylight.', key: 'your' },
    { text: "Beneath Newton’s dusty nose lies your word.", key: 'mind' },
    { text: 'Curry and chaos — the end awaits.', key: 'fresher' },
  ],
  user3: [
    { text: 'Ask the one who fixes everything but his grades.', key: 'unlock' },
    { text: 'Where dreams are loud and socks are louder.', key: 'the' },
    { text: 'Check under the pillow of gossip.', key: 'secrets' },
    { text: 'Behind the notice board, under the oldest poster.', key: 'hidden' },
    { text: 'Spin till you’re dizzy — shirts go here.', key: 'around' },
    { text: 'Where everyone “studies” memes.', key: 'everywhere' },
    { text: 'Smells like dal and destiny.', key: 'fresher' },
  ],
  user4: [
    { text: 'Where the loudest group laughs past midnight.', key: 'seek' },
    { text: 'Hot, noisy, smells like instant regret.', key: 'the' },
    { text: 'A battlefield of blankets and missing socks.', key: 'chaos' },
    { text: 'He wakes the floor with morning music.', key: 'find' },
    { text: 'Secrets vanish with soap here.', key: 'your' },
    { text: 'Silence and dust share this space.', key: 'calm' },
    { text: 'No chaos here, only clatter and curry.', key: 'fresher' },
  ],
  user5: [
    { text: 'Where memes are born and remotes disappear.', key: 'laughter' },
    { text: 'The one who hides from duty — bribe with chai.', key: 'hides' },
    { text: 'Under the slowest spinning fan.', key: 'in' },
    { text: 'The smelliest shoe guards your secret.', key: 'every' },
    { text: 'Behind the snoring chair.', key: 'corner' },
    { text: 'Where wrappers and chips go to die.', key: 'always' },
    { text: 'Where hunger meets humanity.', key: 'fresher' },
  ],
};

const STORAGE_KEY = 'shiva_hunt_progress_v1';

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(obj) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}

const clickSoundB64 =
  'data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQAAABhpbmcgY2xpY2sAAABkAAACAAACcQAAABGhjQAAAGQAAABkAAAAZAAAAGQAAABkAAAATGF2ZjU2LjM1LjEwMAAAAAAAAAAAAAAA//sQZAUAAAAAABWAAAACAAACcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

export default function HuntPage() {
  const navigate = useNavigate();
  const [wrong, setWrong] = useState('');
  const [input, setInput] = useState('');
  const [flipped, setFlipped] = useState(false);
  const audioRef = useRef(null);

  const currentUser = localStorage.getItem('shiva_current_user') || '';

  useEffect(() => {
    if (!currentUser || currentUser === 'admin') {
      navigate('/#/login');
    }
  }, [currentUser, navigate]);

  const progress = useMemo(() => loadProgress(), []);
  const userProgress = progress[currentUser] || { idx: 0, done: [] };
  const riddles = RIDDLES[currentUser] || [];

  const total = riddles.length;
  const idx = Math.min(userProgress.idx || 0, total);
  const solved = Math.min(userProgress.done?.length || 0, total);

  const onSubmit = (e) => {
    e.preventDefault();
    setWrong('');
    const pass = input.trim().toLowerCase();
    const expected = riddles[idx]?.key?.toLowerCase();
    if (pass === expected) {
      setFlipped(true);
      audioRef.current?.play().catch(() => {});
      const nextIdx = Math.min(idx + 1, total);
      const next = {
        ...progress,
        [currentUser]: {
          idx: nextIdx,
          done: Array.from(new Set([...(userProgress.done || []), idx])),
        },
      };
      saveProgress(next);
      setTimeout(() => {
        setInput('');
        setFlipped(false);
      }, 500);
    } else {
      setWrong('Wrong key, rookie.');
      setTimeout(() => setWrong(''), 1300);
    }
  };

  if (!riddles.length) return null;

  const finished = idx >= total;
  const progressPct = total ? Math.round(((solved) / total) * 100) : 0;

  return (
    <div>
      <audio ref={audioRef} src={clickSoundB64} preload="auto" />
      <div className="mb-4 flex items-center justify-between" style={{ fontFamily: '"Special Elite", "Courier New", Courier, monospace' }}>
        <div className="text-sm opacity-80">Agent: {currentUser}</div>
        <button
          onClick={() => {
            localStorage.removeItem('shiva_current_user');
            navigate('/#/login');
          }}
          className="rounded border border-[#a36c3a] bg-[#f3e7c2] px-3 py-1 text-sm hover:bg-[#efdba7]"
        >
          Logout
        </button>
      </div>

      <div className="mb-4">
        <div className="h-3 w-full rounded bg-[#e9dfc0]">
          <div
            className="h-3 rounded bg-[#c47f3e]"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="mt-1 text-sm opacity-70" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
          {solved}/{total} riddles solved
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={idx}
            initial={{ rotateY: 180, opacity: 0 }}
            animate={{ rotateY: flipped ? 180 : 0, opacity: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.45 }}
            className="relative origin-center [transform-style:preserve-3d]"
          >
            <div className="rounded-lg border border-[#a36c3a] bg-[#fff9e9] p-6 shadow-md">
              <div className="text-sm uppercase tracking-wider opacity-70" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
                Riddle {idx + 1} of {total}
              </div>
              <p className="mt-2 text-lg" style={{ fontFamily: '"Special Elite", "Courier New", Courier, monospace' }}>
                “{riddles[idx].text}”
              </p>
              <form onSubmit={onSubmit} className="mt-4">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full rounded border border-[#a36c3a] bg-[#f8f0d9] px-3 py-2 outline-none focus:ring-2 focus:ring-[#c47f3e]"
                  placeholder="Enter passkey"
                />
                <button
                  type="submit"
                  className="mt-3 rounded bg-[#c47f3e] px-4 py-2 font-semibold text-[#2b1d13] shadow hover:brightness-110"
                >
                  Unlock Next
                </button>
              </form>
              <div className="min-h-[24px] pt-2">
                <AnimatePresence>
                  {wrong && (
                    <motion.div
                      key="wrong"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-red-700"
                      style={{ fontFamily: '"Courier New", Courier, monospace' }}
                    >
                      {wrong}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="end"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg border-2 border-[#a36c3a] bg-[#fff1c7] p-8 text-center shadow-[0_20px_45px_rgba(163,108,58,0.35)]"
          >
            <motion.h3
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl font-black"
              style={{ fontFamily: '"Special Elite", "Courier New", Courier, monospace' }}
            >
              CONGRATULATIONS
            </motion.h3>
            <p className="mx-auto mt-3 max-w-2xl" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
              You’ve cracked every clue, every corner of the hostel whispered your name. Welcome, Hunter — you’ve conquered SHIVA HUNT 2025.
            </p>
            <p className="mt-4 text-sm opacity-80" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
              Final rendezvous: The Mess.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
