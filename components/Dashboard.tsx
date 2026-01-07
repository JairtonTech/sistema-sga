
import React from 'react';
import { ViewState, UserRole } from '../types';

interface DashboardProps {
  onNavigate: (view: ViewState) => void;
  userRole?: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, userRole }) => {
  const isAdmin = userRole === 'ADMIN';

  return (
    <div className="h-full w-full flex flex-col items-center justify-center -mt-10 animate-fadeIn text-center">
      <div className="max-w-4xl w-full space-y-10 px-4">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 uppercase tracking-tighter leading-none">
            Painel de Controle
          </h1>
          <h2 className="text-xl md:text-2xl text-slate-600 font-bold uppercase tracking-tight">
            Bem-vindo ao Sistema de Gestão Administrativa
          </h2>
          <p className="text-sm text-slate-400 font-medium uppercase tracking-widest">
            Escolha uma das opções abaixo para prosseguir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {isAdmin && (
            <button 
              onClick={() => onNavigate('PERSONNEL')}
              className="bg-white p-10 rounded-3xl border border-slate-200 text-left flex flex-col justify-between hover:shadow-2xl hover:border-sps-primary transition-all group h-64"
            >
              <div className="w-16 h-16 bg-sps-light text-sps-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-sps-primary group-hover:text-white transition-all">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-black text-sps-dark uppercase tracking-tight mb-2">Relação do Pessoal</h3>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Gestão das 12 unidades operacionais</p>
              </div>
            </button>
          )}

          <button 
            onClick={() => onNavigate('PROCESSES')}
            className="bg-white p-10 rounded-3xl border border-slate-200 text-left flex flex-col justify-between hover:shadow-2xl hover:border-amber-500 transition-all group h-64"
          >
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-all">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-2">Processos Suite</h3>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Acompanhamento de fluxos e NUPS</p>
            </div>
          </button>
        </div>

        <div className="pt-12 flex justify-center">
          <div className="w-32 h-2 bg-sps-primary rounded-full shadow-sm opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
