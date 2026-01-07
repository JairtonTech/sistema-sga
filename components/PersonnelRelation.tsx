
import React from 'react';
import { Unit } from '../types';

interface PersonnelRelationProps {
  onSelectUnit: (unit: Unit) => void;
}

const UNITS: Unit[] = [
  { id: '1', name: 'CENTRO COMUNITÁRIO Farol', count: 0 },
  { id: '2', name: 'CENTRO COMUNITÁRIO São Vicente', count: 0 },
  { id: '3', name: 'CENTRO COMUNITÁRIO Santa Terezinha', count: 0 },
  { id: '4', name: 'CENTRO COMUNITÁRIO São Francisco', count: 0 },
  { id: '5', name: 'Espaço Viva Gente', count: 0 },
  { id: '6', name: 'ABC Serrinha', count: 0 },
  { id: '7', name: 'ABC Mondubim', count: 0 },
  { id: '8', name: 'ABC Cajueiro Torto', count: 0 },
  { id: '9', name: 'ABC Bom Jardim', count: 0 },
  { id: '10', name: 'ABC Palmeiras', count: 0 },
  { id: '11', name: 'Circo Bom Jardim', count: 0 },
  { id: '12', name: 'Circo Palmeiras', count: 0 },
];

const PersonnelRelation: React.FC<PersonnelRelationProps> = ({ onSelectUnit }) => {
  return (
    <div className="space-y-6 animate-fadeIn relative text-left">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Relação do Pessoal</h1>
          <p className="text-slate-500 mt-1">Selecione uma das 12 unidades operacionais para gerenciar.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-left">
        {UNITS.map((unit) => (
          <div 
            key={unit.id}
            onClick={() => onSelectUnit(unit)}
            className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-green-300 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col p-6"
          >
            <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center text-sps-primary mb-4 group-hover:bg-sps-primary group-hover:text-white transition-colors duration-300 shadow-inner">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="font-bold text-slate-800 text-sm leading-tight mb-4 group-hover:text-sps-primary transition-colors uppercase">
              {unit.name}
            </h3>
            
            <div className="mt-auto flex items-center text-sps-primary text-[10px] font-bold tracking-wider uppercase border-t pt-4 border-slate-50">
              Gerenciar Unidade →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonnelRelation;
