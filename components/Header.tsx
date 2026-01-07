
import React from 'react';
import { User, ViewState } from '../types';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (view: ViewState) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onNavigate }) => {
  return (
    <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-8 shadow-sm z-10">
      <div className="flex items-center space-gap-4">
        <div className="cursor-pointer" onClick={() => onNavigate('DASHBOARD')}>
            <h1 className="text-lg font-bold text-slate-800 uppercase tracking-tight leading-tight">SISTEMA DE GESTÃO ADMINISTRATIVA</h1>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3 pr-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-[#064e3b] uppercase leading-none">
              {user?.username}
            </p>
            <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${user?.role === 'ADMIN' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
              {user?.role}
            </span>
          </div>
          <div className="h-10 w-10 rounded-full bg-[#3b823e] flex items-center justify-center text-white font-bold border-2 border-[#f0f9f1] shadow-md">
            {user?.username.charAt(0).toUpperCase()}
          </div>
        </div>
        
        <button
          onClick={onLogout}
          className="text-xs font-bold text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 uppercase tracking-widest"
        >
          Sair
        </button>
      </div>
    </header>
  );
};

export default Header;
