
import React from 'react';
import { ViewState, UserRole } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  userRole: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, userRole }) => {
  const isAdmin = userRole === 'ADMIN';

  const menuItems = [
    { id: 'DASHBOARD' as ViewState, label: 'Início', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'PERSONNEL' as ViewState, label: 'Relação do Pessoal', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', adminOnly: true },
    { id: 'PROCESSES' as ViewState, label: 'Processos Suite', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
  ].filter(item => !item.adminOnly || isAdmin);

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 hidden lg:flex flex-col">
      <div className="h-20 flex items-center px-6 border-b border-slate-800">
        <div className="h-10 w-10 bg-[#3b823e] rounded-lg mr-3 flex items-center justify-center font-bold text-white shadow-lg text-xs">SPS</div>
        <span className="font-bold text-white text-md tracking-tight uppercase">CEPP ADMIN</span>
      </div>
      
      <nav className="flex-1 py-6">
        <div className="px-4 mb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Menu Principal
        </div>
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  currentView === item.id || (currentView === 'UNIT_DETAIL' && item.id === 'PERSONNEL')
                    ? 'bg-[#3b823e] text-white shadow-lg'
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <svg
                  className={`w-5 h-5 mr-3 transition-colors ${
                    currentView === item.id ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                </svg>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-6 border-t border-slate-800 mt-auto bg-black/10">
        <button 
          onClick={() => alert('Suporte: (85) 3456-7890')}
          className="flex items-center gap-2 text-xs font-bold text-slate-100 hover:text-white transition-all group mb-4"
        >
          <svg className="w-4 h-4 text-[#3b823e] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Central de Suporte
        </button>

        <div className="flex items-center gap-3">
             <button title="Manual do Usuário" className="p-1.5 bg-slate-800 rounded-lg text-slate-400 hover:bg-[#3b823e] hover:text-white transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
             </button>
             <button title="Feedback" className="p-1.5 bg-slate-800 rounded-lg text-slate-400 hover:bg-[#3b823e] hover:text-white transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
             </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
