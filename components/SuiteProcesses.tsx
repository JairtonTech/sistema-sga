
import React, { useState } from 'react';
import { UserRole } from '../types';

interface SuiteProcessesProps {
  userRole: UserRole;
}

interface ProcessItem {
    data: string;
    nup: string;
    descricao: string;
}

// BASE DE DADOS LIMPA
const INITIAL_PROCESSES: ProcessItem[] = [];

const SuiteProcesses: React.FC<SuiteProcessesProps> = ({ userRole }) => {
  const isAdmin = userRole === 'ADMIN';
  const [processes, setProcesses] = useState<ProcessItem[]>(INITIAL_PROCESSES);
  const [search, setSearch] = useState('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [newData, setNewData] = useState('');
  const [newNup, setNewNup] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const parseDate = (dateStr: string) => {
    if(!dateStr) return 0;
    const [d, m, y] = dateStr.split('/');
    return new Date(parseInt(y), parseInt(m) - 1, parseInt(d)).getTime();
  };

  const filtered = processes
    .filter(p => p.nup.toLowerCase().includes(search.toLowerCase()) || p.descricao.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
        const timeA = parseDate(a.data);
        const timeB = parseDate(b.data);
        return sortDir === 'asc' ? timeA - timeB : timeB - timeA;
    });

  const handleStartRegister = () => {
    setEditingIndex(null);
    setNewData(getTodayFormatted());
    setNewNup('47001.');
    setNewDesc('');
    setShowModal(true);
  };

  const getTodayFormatted = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const handleStartEdit = (idx: number) => {
    const proc = processes[idx];
    setEditingIndex(idx);
    setNewData(proc.data);
    setNewNup(proc.nup);
    setNewDesc(proc.descricao);
    setShowModal(true);
  };

  const handleDelete = (idx: number) => {
    if (window.confirm('Tem certeza que deseja excluir este processo?')) {
        const updated = [...processes];
        updated.splice(idx, 1);
        setProcesses(updated);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = { data: newData, nup: newNup, descricao: newDesc };
    
    if (editingIndex !== null) {
        const updated = [...processes];
        updated[editingIndex] = newItem;
        setProcesses(updated);
    } else {
        setProcesses([newItem, ...processes]);
    }
    
    setShowModal(false);
    setNewData('');
    setNewNup('');
    setNewDesc('');
    setEditingIndex(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn text-left">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Processos Suite</h1>
        <div className="flex items-center gap-3">
            <input 
                type="text" 
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-sps-primary w-64 shadow-sm"
            />
            {isAdmin && (
                <button onClick={handleStartRegister} className="bg-sps-primary text-white px-6 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-lg active:scale-95">Cadastrar</button>
            )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto max-h-[600px]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-tight border-b-2 border-slate-100">
              <tr>
                <th className="px-6 py-5 w-32 cursor-pointer" onClick={() => setSortDir(sortDir === 'asc' ? 'desc' : 'asc')}>DATA {sortDir === 'asc' ? '↑' : '↓'}</th>
                <th className="px-6 py-5 w-64 border-l">NUP</th>
                <th className="px-6 py-5 border-l">DESCRIÇÃO</th>
                {isAdmin && <th className="px-6 py-5 border-l w-24 text-center">AÇÕES</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-[11px]">
              {filtered.length > 0 ? filtered.map((proc, idx) => (
                <tr key={idx} className="hover:bg-sps-light transition-colors">
                  <td className="px-6 py-4 text-slate-500">{proc.data}</td>
                  <td className="px-6 py-4 font-mono text-sps-dark font-bold">{proc.nup || '---'}</td>
                  <td className="px-6 py-4 text-slate-800 uppercase leading-tight font-medium">{proc.descricao}</td>
                  {isAdmin && (
                      <td className="px-6 py-4 text-center border-l space-x-2">
                          <button onClick={() => handleStartEdit(idx)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                          </button>
                          <button onClick={() => handleDelete(idx)} className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                      </td>
                  )}
                </tr>
              )) : (
                <tr>
                    <td colSpan={isAdmin ? 4 : 3} className="px-6 py-20 text-center text-slate-300 italic text-xs uppercase font-bold tracking-widest">Nenhum processo cadastrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 fade-in">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeInScale">
                  <div className="bg-sps-primary p-6 text-white text-center"><h3 className="font-bold uppercase tracking-widest text-sm">{editingIndex !== null ? 'Editar Registro Suite' : 'Novo Registro Suite'}</h3></div>
                  <form onSubmit={handleRegister} className="p-8 space-y-4">
                      <input type="text" required value={newData} onChange={e => setNewData(e.target.value)} className="w-full p-3 border rounded-xl text-xs outline-none focus:ring-2 focus:ring-sps-primary" placeholder="Data (DD/MM/AAAA)" />
                      <input type="text" value={newNup} onChange={e => setNewNup(e.target.value)} className="w-full p-3 border rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-sps-primary" placeholder="NUP" />
                      <textarea required value={newDesc} onChange={e => setNewDesc(e.target.value)} rows={4} className="w-full p-3 border rounded-xl text-xs uppercase outline-none focus:ring-2 focus:ring-sps-primary" placeholder="Descrição"></textarea>
                      <div className="flex gap-3 pt-6">
                          <button type="button" onClick={() => { setShowModal(false); setEditingIndex(null); }} className="flex-1 py-4 border rounded-xl font-bold text-[10px] uppercase text-slate-400">Cancelar</button>
                          <button type="submit" className="flex-1 py-4 bg-sps-primary text-white rounded-xl font-bold text-[10px] uppercase shadow-lg">Salvar</button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};

export default SuiteProcesses;
