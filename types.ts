
export type ViewState = 'AUTH' | 'DASHBOARD' | 'PERSONNEL' | 'PROCESSES' | 'UNIT_DETAIL' | 'ACCESS_CHOICE' | 'ACCESS_REGISTER' | 'ACCESS_RECOVER';

export type UserRole = 'ADMIN' | 'USER';

export interface User {
  username: string;
  role: UserRole;
}

export interface Unit {
  id: string;
  name: string;
  count: number;
}

export interface Process {
  id: string;
  year: string;
  status: string;
  requester: string;
  description: string;
  date: string;
}
