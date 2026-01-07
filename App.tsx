
import React, { useState } from 'react';
import { ViewState, User, Unit, UserRole } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PersonnelRelation from './components/PersonnelRelation';
import SuiteProcesses from './components/SuiteProcesses';
import UnitDetail from './components/UnitDetail';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('AUTH');
  const [user, setUser] = useState<User | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  const handleLogin = (username: string) => {
    // Simulação de login baseada nos usuários autorizados do sistema
    // Apenas 'admin' (case insensitive) mantém privilégios administrativos
    const adminUsernames = ['admin'];
    const role: UserRole = adminUsernames.includes(username.toLowerCase()) ? 'ADMIN' : 'USER';
    setUser({ username, role });
    setView('DASHBOARD');
  };

  const handleLogout = () => {
    setUser(null);
    setView('AUTH');
  };

  const handleRequestAccess = () => {
    setView('ACCESS_CHOICE' as ViewState);
  };

  const navigateTo = (newView: ViewState) => {
    // Proteção de Rota: Impedir acesso a PERSONNEL e UNIT_DETAIL por não-admins
    if ((newView === 'PERSONNEL' || newView === 'UNIT_DETAIL') && user?.role !== 'ADMIN') {
        setView('DASHBOARD');
        return;
    }
    setView(newView);
  };

  const openUnit = (unit: Unit) => {
    if (user?.role !== 'ADMIN') return;
    setSelectedUnit(unit);
    setView('UNIT_DETAIL');
  };

  if (view === 'AUTH') {
    return <Login onLogin={handleLogin} onRequestAccess={handleRequestAccess} />;
  }

  if (['ACCESS_CHOICE', 'ACCESS_REGISTER', 'ACCESS_RECOVER'].includes(view)) {
     return (
       <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#f0f9f1]">
         <h1 className="text-xl font-bold mb-4 text-[#064e3b]">Módulo de Gestão de Credenciais</h1>
         <p className="mb-8 text-slate-600">Esta funcionalidade está consolidada no arquivo index.html principal.</p>
         <button onClick={() => setView('AUTH')} className="bg-[#3b823e] text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-[#064e3b] transition-all uppercase tracking-widest text-xs">Voltar para o Login</button>
       </div>
     );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        currentView={view} 
        onNavigate={navigateTo} 
        userRole={user?.role || 'USER'}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={user} 
          onLogout={handleLogout} 
          onNavigate={navigateTo}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto h-full">
            {view === 'DASHBOARD' && (
              <Dashboard onNavigate={navigateTo} userRole={user?.role} />
            )}
            {view === 'PERSONNEL' && user?.role === 'ADMIN' && (
              <PersonnelRelation onSelectUnit={openUnit} />
            )}
            {view === 'PROCESSES' && (
              <SuiteProcesses userRole={user?.role || 'USER'} />
            )}
            {view === 'UNIT_DETAIL' && selectedUnit && user?.role === 'ADMIN' && (
              <UnitDetail 
                unit={selectedUnit} 
                userRole={user?.role}
                onBack={() => navigateTo('PERSONNEL')} 
              />
            )}
            {/* Fallback de segurança caso tente acessar view restrita */}
            {(view === 'PERSONNEL' || view === 'UNIT_DETAIL') && user?.role !== 'ADMIN' && (
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-red-500 font-bold mb-4 uppercase tracking-widest text-sm">Acesso Restrito ao Administrador</p>
                    <button onClick={() => setView('DASHBOARD')} className="bg-[#3b823e] text-white px-4 py-2 rounded-lg text-xs font-bold">Voltar ao Início</button>
                </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
