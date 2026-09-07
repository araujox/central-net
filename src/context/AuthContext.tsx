/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthSession {
  username: string;
  expiresAt: number; // Unix timestamp in ms
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updatePassword: (oldPass: string, newPass: string) => Promise<{ success: boolean; error?: string }>;
  sessionRemainingMinutes: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = 'centralnet_admin_session';
const CREDENTIALS_KEY = 'centralnet_admin_credentials';
const SESSION_DURATION_HOURS = 8;

// SHA-256 helper for browser environments
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [sessionRemainingMinutes, setSessionRemainingMinutes] = useState<number>(0);

  // Initialize and check session
  useEffect(() => {
    // Set default credentials if not present
    // Default: user="admin", pass="central123"
    const initCredentials = async () => {
      const storedCreds = localStorage.getItem(CREDENTIALS_KEY);
      if (!storedCreds) {
        const defaultHash = await sha256('central123');
        localStorage.setItem(
          CREDENTIALS_KEY,
          JSON.stringify({
            username: 'admin',
            passwordHash: defaultHash,
          })
        );
      }
    };
    initCredentials();

    // Check active session
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      try {
        const parsed: AuthSession = JSON.parse(saved);
        if (parsed.expiresAt > Date.now()) {
          setSession(parsed);
          setSessionRemainingMinutes(Math.round((parsed.expiresAt - Date.now()) / (1000 * 60)));
        } else {
          localStorage.removeItem(SESSION_KEY);
          setSession(null);
        }
      } catch {
        localStorage.removeItem(SESSION_KEY);
        setSession(null);
      }
    }

    // Periodic heartbeat to verify expiration
    const interval = setInterval(() => {
      const current = localStorage.getItem(SESSION_KEY);
      if (current) {
        try {
          const parsed: AuthSession = JSON.parse(current);
          const remaining = parsed.expiresAt - Date.now();
          if (remaining <= 0) {
            localStorage.removeItem(SESSION_KEY);
            setSession(null);
            setSessionRemainingMinutes(0);
          } else {
            setSessionRemainingMinutes(Math.round(remaining / (1000 * 60)));
          }
        } catch {
          localStorage.removeItem(SESSION_KEY);
          setSession(null);
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const login = async (usernameInput: string, passwordInput: string): Promise<{ success: boolean; error?: string }> => {
    // Artificial small delay to prevent brute-force timing attacks
    await new Promise(r => setTimeout(r, 450));

    try {
      const stored = localStorage.getItem(CREDENTIALS_KEY);
      let validUser = 'admin';
      let validHash = await sha256('central123');

      if (stored) {
        const parsed = JSON.parse(stored);
        validUser = parsed.username;
        validHash = parsed.passwordHash;
      }

      const inputHash = await sha256(passwordInput);

      if (usernameInput.trim().toLowerCase() === validUser.toLowerCase() && inputHash === validHash) {
        const expiresAt = Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000;
        const newSession: AuthSession = {
          username: validUser,
          expiresAt,
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
        setSession(newSession);
        setSessionRemainingMinutes(SESSION_DURATION_HOURS * 60);
        return { success: true };
      }

      return { success: false, error: 'Usuário ou senha incorretos.' };
    } catch {
      return { success: false, error: 'Ocorreu um erro ao verificar as credenciais. Tente novamente.' };
    }
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
    setSessionRemainingMinutes(0);
  };

  const updatePassword = async (oldPass: string, newPass: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const stored = localStorage.getItem(CREDENTIALS_KEY);
      let validUser = 'admin';
      let validHash = await sha256('central123');

      if (stored) {
        const parsed = JSON.parse(stored);
        validUser = parsed.username;
        validHash = parsed.passwordHash;
      }

      const oldInputHash = await sha256(oldPass);
      if (oldInputHash !== validHash) {
        return { success: false, error: 'A senha atual informada está incorreta.' };
      }

      if (newPass.length < 6) {
        return { success: false, error: 'A nova senha deve ter no mínimo 6 caracteres.' };
      }

      const newHash = await sha256(newPass);
      localStorage.setItem(
        CREDENTIALS_KEY,
        JSON.stringify({
          username: validUser,
          passwordHash: newHash,
        })
      );

      return { success: true };
    } catch {
      return { success: false, error: 'Erro ao alterar a senha. Tente novamente.' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!session && session.expiresAt > Date.now(),
        user: session?.username || null,
        login,
        logout,
        updatePassword,
        sessionRemainingMinutes,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
