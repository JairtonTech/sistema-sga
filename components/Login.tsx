
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (username: string) => void;
  onRequestAccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onRequestAccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      onLogin(username);
    } else {
      setError('Por favor, insira suas credenciais institucionais.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f9f1] p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-[#3b823e] p-10 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[160px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
          <h1 className="text-xl font-bold text-white uppercase tracking-tight leading-tight relative z-10 px-4">
            SISTEMA DE GESTÃO ADMINISTRATIVA CEPP
          </h1>
        </div>
        
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm font-medium">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-bold text-[#064e3b] mb-2 uppercase tracking-wide">
              Usuário
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#3b823e] focus:border-transparent outline-none transition-all"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#064e3b] mb-2 uppercase tracking-wide">
              Senha
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#3b823e] focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3b823e] hover:bg-[#064e3b] text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] uppercase tracking-widest text-sm"
          >
            ACESSAR PAINEL
          </button>
          
          <div className="text-center pt-4 flex flex-col items-center">
            <button 
              type="button" 
              onClick={onRequestAccess}
              className="text-sm font-bold text-[#3b823e] hover:text-[#064e3b] hover:underline transition-all py-2 text-center"
            >
              Clique aqui para solicitação ou recuperação de credencial
            </button>
            <p className="text-[10px] font-semibold text-slate-400 tracking-widest mt-6 uppercase">
              Desenvolvido por Jairton Filho
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
