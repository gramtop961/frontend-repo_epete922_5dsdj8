import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const STORAGE_KEY = 'shiva_hunt_progress_v1';

const USERS = ['user1', 'user2', 'user3', 'user4', 'user5'];
const TOTALS = {
  user1: 7,
  user2: 7,
  user3: 7,
  user4: 7,
  user5: 7,
};

export default function AdminPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({});

  const currentUser = localStorage.getItem('shiva_current_user') || '';
  useEffect(() => {
    if (currentUser !== 'admin') navigate('/#/login');
  }, [currentUser, navigate]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setProgress(raw ? JSON.parse(raw) : {});
    } catch {
      setProgress({});
    }
  }, []);

  const items = useMemo(() => {
    return USERS.map((u) => {
      const p = progress[u] || { idx: 0, done: [] };
      const solved = Math.min(p.done?.length || 0, TOTALS[u] || 7);
      const total = TOTALS[u] || 7;
      const done = solved >= total;
      return { user: u, solved, total, done };
    });
  }, [progress]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between" style={{ fontFamily: '"Special Elite", "Courier New", Courier, monospace' }}>
        <div className="text-sm opacity-80">Admin Dashboard</div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              localStorage.clear();
              window.location.hash = '#/login';
              window.location.reload();
            }}
            className="rounded border border-[#a36c3a] bg-[#c47f3e] px-3 py-1 text-sm font-semibold text-[#2b1d13]"
          >
            Reset All Progress
          </button>
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
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((it) => (
          <motion.div
            key={it.user}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded border border-[#a36c3a]/60 bg-[#fff9e9] p-4 shadow"
          >
            <div className="flex items-center justify-between">
              <div className="font-semibold" style={{ fontFamily: '"Special Elite", "Courier New", Courier, monospace' }}>
                {it.user}
              </div>
              <div className="text-sm">
                {it.solved}/{it.total} riddles solved
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className={`text-sm ${it.done ? 'text-green-700' : 'text-yellow-700'}`}>
                {it.done ? '🟢 Completed' : '🟡 In Progress'}
              </div>
              <div className="h-2 w-1/2 rounded bg-[#e9dfc0]">
                <div
                  className="h-2 rounded bg-[#c47f3e]"
                  style={{ width: `${Math.round((it.solved / it.total) * 100)}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
