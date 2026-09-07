/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminLogin from './AdminLogin';
import AdminLayout, { AdminTab } from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import AdminPlanos from './AdminPlanos';
import AdminBanners from './AdminBanners';
import AdminConteudo from './AdminConteudo';
import AdminFAQ from './AdminFAQ';
import AdminContato from './AdminContato';
import AdminConfiguracoes from './AdminConfiguracoes';

interface AdminPanelProps {
  onGoToSite: () => void;
}

export default function AdminPanel({ onGoToSite }: AdminPanelProps) {
  const { isAuthenticated } = useAuth();
  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard');

  // If not authenticated, always render login screen with CentralNet branding
  if (!isAuthenticated) {
    return (
      <AdminLogin
        onSuccess={() => setCurrentTab('dashboard')}
        onCancel={onGoToSite}
      />
    );
  }

  return (
    <AdminLayout
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      onGoToSite={onGoToSite}
    >
      {currentTab === 'dashboard' && <AdminDashboard onNavigate={setCurrentTab} />}
      {currentTab === 'planos' && <AdminPlanos />}
      {currentTab === 'banners' && <AdminBanners />}
      {currentTab === 'conteudo' && <AdminConteudo />}
      {currentTab === 'faq' && <AdminFAQ />}
      {currentTab === 'contato' && <AdminContato />}
      {currentTab === 'configuracoes' && <AdminConfiguracoes />}
    </AdminLayout>
  );
}
