
import React from 'react';
import { Unit, UserRole } from '../types';

interface UnitDetailProps {
  unit: Unit;
  userRole: UserRole;
  onBack: () => void;
}

const UnitDetail: React.FC<UnitDetailProps> = ({ unit, userRole, onBack }) => {
  return (
    <div className="space-y-6 animate-fadeIn text-left">
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-200 rounded-full transition-colors"
        >
          <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">{unit.name}</h1>
          <p className="text-slate-500 text-sm">Gestão operacional de pessoal e infraestrutura</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-10 rounded-xl border border-slate-200 shadow-sm col-span-2 flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-16 h-16 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-slate-400 uppercase text-xs tracking-widest">Base de Dados de Pessoal Zerada</h3>
          <p className="text-slate-400 text-[10px] mt-2 text-center uppercase leading-relaxed max-w-xs">
            Nenhum colaborador alocado nesta unidade.<br/>Utilize o sistema administrativo para novas integrações.
          </p>
          <button className="mt-8 bg-sps-primary text-white px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-md hover:bg-sps-dark transition-all">
            + Adicionar Colaborador
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-[#064e3b] p-6 rounded-xl text-white shadow-lg">
            <h3 className="font-bold mb-6 flex items-center gap-2 uppercase text-xs tracking-wider">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Resumo Administrativo
            </h3>
            <div className="space-y-4 text-[11px] uppercase tracking-tighter font-medium">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="opacity-60">Status de Rede:</span>
                <span className="font-bold">OPERACIONAL</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="opacity-60">Equipe Atual:</span>
                <span className="font-bold">0</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="opacity-60">Cota de Vagas:</span>
                <span className="font-bold text-amber-400">AGUARDANDO BASE</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="opacity-60 italic text-[9px]">Sincronizado via Suite 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitDetail;
