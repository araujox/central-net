/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  Plano,
  PlanoMovel,
  FAQItem,
  Cidade,
  PLANOS_CENTRALNET,
  PLANOS_CNMOVEL,
  FAQ_CENTRALNET,
  CONTATO_CENTRALNET,
  CIDADES_CENTRALNET
} from '../types';

export interface BannerItem {
  id: string;
  image: string;
  alt: string;
  target: 'assine' | 'cnmovel' | 'gps' | 'dedicado' | 'ponto' | 'temporario' | 'contratos' | 'externo';
  tab?: 'residencial' | 'gamer' | 'casa-conectada' | 'radio' | 'empresarial';
  externalUrl?: string;
  titulo?: string;
  subtitulo?: string;
  botaoTexto?: string;
  ativo: boolean;
  ordem: number;
}

export interface DiferencialItem {
  id: string;
  titulo: string;
  descricao: string;
  iconeNome: string;
  ativo: boolean;
  ordem: number;
}

export interface SiteContent {
  heroTag: string;
  heroTitulo: string;
  heroSubtitulo: string;
  heroBotaoTexto: string;

  sobreTitulo: string;
  sobreTexto: string;
  horarioPresencialSemana: string;
  horarioPresencialSabado: string;
  horarioOnline: string;

  coberturaTitulo: string;
  coberturaSubtitulo: string;
  coberturaBotaoTexto: string;

  diferenciais: DiferencialItem[];
}

export interface ContactSettings {
  telefone: string;
  whatsappLimpo: string;
  whatsappUrl: string;
  endereco: string;
  horario: string;
  email: string;
  instagram: string;
  facebook: string;
  googleMapsUrl: string;
  centralAssinanteUrl: string;
  segundaViaUrl: string;
  appGooglePlayUrl: string;
  appAppleStoreUrl: string;
}

export interface GeneralSettings {
  empresaNome: string;
  cnpj: string;
  copyright: string;
  siteEmManutencao: boolean;
  mensagemManutencao: string;
  exibirAvisoPromocional: boolean;
  textoAvisoPromocional: string;
  linkAvisoPromocional: string;
}

export interface CMSData {
  version: number;
  planos: Plano[];
  planosMoveis: PlanoMovel[];
  banners: BannerItem[];
  faqs: (FAQItem & { id: string; ativo: boolean; ordem: number })[];
  cidades: Cidade[];
  siteContent: SiteContent;
  contato: ContactSettings;
  configuracoes: GeneralSettings;
}

const STORAGE_KEY = 'centralnet_cms_data_v1';

const INITIAL_BANNERS: BannerItem[] = [
  {
    id: 'b1',
    image: '/Captura de tela 2026-05-30 102302.png',
    alt: 'Internet acompanha sua rotina',
    target: 'assine',
    tab: 'residencial',
    titulo: 'A internet que acompanha sua rotina',
    subtitulo: 'Fibra óptica com ultra velocidade e estabilidade garantida para toda a sua família.',
    botaoTexto: 'Assine Agora',
    ativo: true,
    ordem: 1,
  },
  {
    id: 'b2',
    image: '/Captura de tela 2026-05-30 102321.png',
    alt: 'A internet mais rápida da região',
    target: 'assine',
    tab: 'gamer',
    titulo: 'A internet gamer mais rápida da região',
    subtitulo: 'Rotas otimizadas com baixíssimo ping para você jogar sem travamentos.',
    botaoTexto: 'Ver Planos Gamer',
    ativo: true,
    ordem: 2,
  },
  {
    id: 'b3',
    image: '/Captura de tela 2026-05-30 102422.png',
    alt: 'Benefícios e Planos CentralNet',
    target: 'cnmovel',
    titulo: 'CN Móvel: Conectividade em todo lugar',
    subtitulo: 'Fale ilimitado, WhatsApp sem descontar da franquia e bônus exclusivo de portabilidade.',
    botaoTexto: 'Conhecer CN Móvel',
    ativo: true,
    ordem: 3,
  },
];

const INITIAL_DIFERENCIAIS: DiferencialItem[] = [
  {
    id: 'dif1',
    titulo: '100% Fibra Óptica',
    descricao: 'Internet de verdade, com fibra óptica do início ao fim, garantindo mais velocidade, estabilidade e qualidade no seu dia a dia.',
    iconeNome: 'TrendingUp',
    ativo: true,
    ordem: 1,
  },
  {
    id: 'dif2',
    titulo: 'Conexão Ilimitada',
    descricao: 'Use à vontade, sem limite de dados e sem surpresas. Navegue, jogue, assista e trabalhe sem se preocupar.',
    iconeNome: 'LifeBuoy',
    ativo: true,
    ordem: 2,
  },
  {
    id: 'dif3',
    titulo: 'Planos Acessíveis',
    descricao: 'Planos que cabem no seu bolso, com ótimo custo-benefício e a velocidade que você realmente precisa.',
    iconeNome: 'Sparkles',
    ativo: true,
    ordem: 3,
  },
  {
    id: 'dif4',
    titulo: 'Indique e Ganhe',
    descricao: 'Indique um amigo, ele contrata nossa internet e você ganha um Pix. Simples assim: indicou, ganhou.',
    iconeNome: 'Wallet',
    ativo: true,
    ordem: 4,
  },
  {
    id: 'dif5',
    titulo: 'Suporte Especializado',
    descricao: 'Atendimento rápido e humano, com uma equipe pronta para resolver e cuidar da sua conexão sempre que precisar.',
    iconeNome: 'Settings',
    ativo: true,
    ordem: 5,
  },
];

const INITIAL_SITE_CONTENT: SiteContent = {
  heroTag: 'Fibra Óptica',
  heroTitulo: 'Internet Rápida 100% Fibra Óptica',
  heroSubtitulo: 'Encontre a velocidade perfeita para a sua necessidade',
  heroBotaoTexto: 'Consultar Cobertura',

  sobreTitulo: 'Sobre a CentralNet',
  sobreTexto:
    'A CentralNet é uma empresa dedicada a fornecer acesso à internet com qualidade e eficiência, conectando nossos clientes às informações disponíveis em todo o mundo. Nosso compromisso é facilitar o acesso ao conhecimento, ampliar oportunidades e garantir uma comunicação rápida e segura, aproximando pessoas em qualquer lugar.',
  horarioPresencialSemana: 'Segunda à Sexta: 8h às 18h',
  horarioPresencialSabado: 'Sábado: 8h às 17h',
  horarioOnline: 'Domingo e Feriados: 8h às 16h',

  coberturaTitulo: 'Escolha sua cidade e encontre o plano ideal para você.',
  coberturaSubtitulo:
    'Selecione sua localidade para verificar a viabilidade imediata de internet 100% fibra óptica com ativação expressa no seu endereço.',
  coberturaBotaoTexto: 'Ver planos disponíveis',

  diferenciais: INITIAL_DIFERENCIAIS,
};

const INITIAL_CONTATO: ContactSettings = {
  telefone: CONTATO_CENTRALNET.telefone,
  whatsappLimpo: CONTATO_CENTRALNET.whatsappLimpo,
  whatsappUrl: CONTATO_CENTRALNET.whatsappUrl,
  endereco: CONTATO_CENTRALNET.endereco,
  horario: CONTATO_CENTRALNET.horario,
  email: 'contato@centralnetsurubim.com.br',
  instagram: CONTATO_CENTRALNET.redesSociais.instagram,
  facebook: CONTATO_CENTRALNET.redesSociais.facebook,
  googleMapsUrl: 'https://maps.google.com/?q=Av.+São+Sebastião,+613,+Surubim+-+PE',
  centralAssinanteUrl: 'https://sgp.centralnetsurubim.com.br/accounts/central/login',
  segundaViaUrl: 'https://sgp.centralnetsurubim.com.br/accounts/central/login',
  appGooglePlayUrl: 'https://sgp.centralnetsurubim.com.br/accounts/central/login',
  appAppleStoreUrl: 'https://sgp.centralnetsurubim.com.br/accounts/central/login',
};

const INITIAL_CONFIGURACOES: GeneralSettings = {
  empresaNome: 'CentralNet Provedor de Internet',
  cnpj: '12.345.678/0001-90',
  copyright: 'CentralNet - Todos os direitos reservados. Conectando pessoas e negócios com velocidade e estabilidade.',
  siteEmManutencao: false,
  mensagemManutencao: 'Estamos realizando melhorias técnicas em nossos servidores. O site estará disponível em breve.',
  exibirAvisoPromocional: false,
  textoAvisoPromocional: '⚡ Super Promoção de Fibra Óptica: Instalação grátis e Wi-Fi DualBand de brinde!',
  linkAvisoPromocional: '#planos-residencias',
};

const buildDefaultCMSData = (): CMSData => {
  return {
    version: 1,
    planos: PLANOS_CENTRALNET,
    planosMoveis: PLANOS_CNMOVEL,
    banners: INITIAL_BANNERS,
    faqs: FAQ_CENTRALNET.map((f, i) => ({
      ...f,
      id: `faq-${i + 1}`,
      ativo: true,
      ordem: i + 1,
    })),
    cidades: CIDADES_CENTRALNET,
    siteContent: INITIAL_SITE_CONTENT,
    contato: INITIAL_CONTATO,
    configuracoes: INITIAL_CONFIGURACOES,
  };
};

interface CMSContextType {
  data: CMSData;
  isLoading: boolean;
  // Planos actions
  savePlan: (plano: Plano) => Promise<boolean>;
  deletePlan: (id: string) => Promise<boolean>;
  togglePlanStatus: (id: string) => Promise<boolean>;
  // CN Movel actions
  savePlanMovel: (plano: PlanoMovel) => Promise<boolean>;
  deletePlanMovel: (id: string) => Promise<boolean>;
  // Banners actions
  saveBanner: (banner: BannerItem) => Promise<boolean>;
  deleteBanner: (id: string) => Promise<boolean>;
  reorderBanners: (banners: BannerItem[]) => Promise<boolean>;
  // FAQ actions
  saveFAQ: (faq: FAQItem & { id?: string; ativo?: boolean; ordem?: number }) => Promise<boolean>;
  deleteFAQ: (id: string) => Promise<boolean>;
  reorderFAQs: (faqs: (FAQItem & { id: string; ativo: boolean; ordem: number })[]) => Promise<boolean>;
  // Site Content actions
  saveSiteContent: (content: SiteContent) => Promise<boolean>;
  // Contact actions
  saveContactSettings: (contato: ContactSettings) => Promise<boolean>;
  // General settings actions
  saveGeneralSettings: (config: GeneralSettings) => Promise<boolean>;
  // Global Reset
  resetToDefault: () => Promise<boolean>;
  // Quick helper to build WhatsApp URL from clean phone
  formatWhatsappLink: (message: string) => string;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CMSData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.version) {
          // Merge with initial defaults to ensure newly added properties exist
          const defaults = buildDefaultCMSData();
          return {
            ...defaults,
            ...parsed,
            siteContent: { ...defaults.siteContent, ...(parsed.siteContent || {}) },
            contato: { ...defaults.contato, ...(parsed.contato || {}) },
            configuracoes: { ...defaults.configuracoes, ...(parsed.configuracoes || {}) },
          };
        }
      }
    } catch (e) {
      console.error('Error loading CMS data from storage:', e);
    }
    return buildDefaultCMSData();
  });

  const [isLoading, setIsLoading] = useState(false);

  // Initial fetch from Supabase if configured
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    const fetchFromSupabase = async () => {
      try {
        const { data: dbData, error } = await supabase
          .from('centralnet_cms')
          .select('data')
          .eq('id', 'current_data')
          .single();

        if (dbData && dbData.data && !error) {
          const defaults = buildDefaultCMSData();
          const merged: CMSData = {
            ...defaults,
            ...dbData.data,
            siteContent: { ...defaults.siteContent, ...(dbData.data.siteContent || {}) },
            contato: { ...defaults.contato, ...(dbData.data.contato || {}) },
            configuracoes: { ...defaults.configuracoes, ...(dbData.data.configuracoes || {}) },
          };
          setData(merged);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        } else if (error && error.code === 'PGRST116') {
          // No row found yet: initialize with current data
          const currentDefaults = buildDefaultCMSData();
          await supabase.from('centralnet_cms').upsert({
            id: 'current_data',
            data: currentDefaults,
            updated_at: new Date().toISOString(),
          });
        }
      } catch (err) {
        console.warn('Supabase fetch error, fallback to local storage:', err);
      }
    };

    fetchFromSupabase();
  }, []);

  // Sync across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setData(parsed);
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const persistData = async (newData: CMSData): Promise<boolean> => {
    try {
      // 1. Always update local storage & state for instant UI response
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      setData(newData);

      // 2. Persist to Supabase if configured
      if (isSupabaseConfigured && supabase) {
        try {
          const { error } = await supabase.from('centralnet_cms').upsert({
            id: 'current_data',
            data: newData,
            updated_at: new Date().toISOString(),
          });
          if (error) {
            console.error('Supabase upsert error:', error);
          }
        } catch (dbErr) {
          console.error('Failed to sync to Supabase database:', dbErr);
        }
      }

      return true;
    } catch (e) {
      console.error('Failed to save data:', e);
      return false;
    }
  };

  const savePlan = async (plano: Plano): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 200));
    try {
      const exists = data.planos.some(p => p.id === plano.id);
      let updatedPlanos: Plano[];
      if (exists) {
        updatedPlanos = data.planos.map(p => (p.id === plano.id ? plano : p));
      } else {
        updatedPlanos = [...data.planos, plano];
      }
      const success = persistData({ ...data, planos: updatedPlanos });
      setIsLoading(false);
      return success;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const deletePlan = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 200));
    try {
      const updatedPlanos = data.planos.filter(p => p.id !== id);
      const success = persistData({ ...data, planos: updatedPlanos });
      setIsLoading(false);
      return success;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const togglePlanStatus = async (id: string): Promise<boolean> => {
    // We can use a custom property in Plano like `inativo?: boolean`
    setIsLoading(true);
    try {
      const updatedPlanos = data.planos.map(p => {
        if (p.id === id) {
          const currentInactive = (p as any).inativo ?? false;
          return { ...p, inativo: !currentInactive };
        }
        return p;
      });
      const success = persistData({ ...data, planos: updatedPlanos });
      setIsLoading(false);
      return success;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const savePlanMovel = async (plano: PlanoMovel): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 200));
    try {
      const exists = data.planosMoveis.some(p => p.id === plano.id);
      let updated = exists
        ? data.planosMoveis.map(p => (p.id === plano.id ? plano : p))
        : [...data.planosMoveis, plano];
      const success = persistData({ ...data, planosMoveis: updated });
      setIsLoading(false);
      return success;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const deletePlanMovel = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const updated = data.planosMoveis.filter(p => p.id !== id);
      const success = persistData({ ...data, planosMoveis: updated });
      setIsLoading(false);
      return success;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const saveBanner = async (banner: BannerItem): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 200));
    try {
      const exists = data.banners.some(b => b.id === banner.id);
      let updated = exists
        ? data.banners.map(b => (b.id === banner.id ? banner : b))
        : [...data.banners, banner];
      const success = persistData({ ...data, banners: updated });
      setIsLoading(false);
      return success;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const deleteBanner = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const updated = data.banners.filter(b => b.id !== id);
      const success = persistData({ ...data, banners: updated });
      setIsLoading(false);
      return success;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const reorderBanners = async (banners: BannerItem[]): Promise<boolean> => {
    setIsLoading(true);
    try {
      const success = persistData({ ...data, banners });
      setIsLoading(false);
      return success;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const saveFAQ = async (faqInput: FAQItem & { id?: string; ativo?: boolean; ordem?: number }): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 200));
    try {
      const id = faqInput.id || `faq-${Date.now()}`;
      const ativo = faqInput.ativo ?? true;
      const ordem = faqInput.ordem ?? data.faqs.length + 1;
      const newFaq = { ...faqInput, id, ativo, ordem };

      const exists = data.faqs.some(f => f.id === id);
      let updated = exists ? data.faqs.map(f => (f.id === id ? newFaq : f)) : [...data.faqs, newFaq];
      const success = persistData({ ...data, faqs: updated });
      setIsLoading(false);
      return success;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const deleteFAQ = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const updated = data.faqs.filter(f => f.id !== id);
      const success = persistData({ ...data, faqs: updated });
      setIsLoading(false);
      return success;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const reorderFAQs = async (faqs: (FAQItem & { id: string; ativo: boolean; ordem: number })[]): Promise<boolean> => {
    setIsLoading(true);
    try {
      const success = persistData({ ...data, faqs });
      setIsLoading(false);
      return success;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const saveSiteContent = async (content: SiteContent): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 200));
    try {
      const success = persistData({ ...data, siteContent: content });
      setIsLoading(false);
      return success;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const saveContactSettings = async (contato: ContactSettings): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 200));
    try {
      // Keep whatsappUrl updated if whatsappLimpo changes
      const digitsOnly = contato.whatsappLimpo.replace(/\D/g, '');
      const fullNumber = digitsOnly.startsWith('55') ? digitsOnly : `55${digitsOnly}`;
      const updatedWhatsappUrl = contato.whatsappUrl || `https://wa.me/${fullNumber}`;

      const updatedContato = {
        ...contato,
        whatsappUrl: updatedWhatsappUrl,
      };

      const success = persistData({ ...data, contato: updatedContato });
      setIsLoading(false);
      return success;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const saveGeneralSettings = async (config: GeneralSettings): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 200));
    try {
      const success = persistData({ ...data, configuracoes: config });
      setIsLoading(false);
      return success;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const resetToDefault = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const defaults = buildDefaultCMSData();
      const success = await persistData(defaults);
      setIsLoading(false);
      return success;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const formatWhatsappLink = (message: string): string => {
    const rawNumber = data.contato.whatsappLimpo.replace(/\D/g, '');
    const fullNumber = rawNumber.startsWith('55') ? rawNumber : `55${rawNumber}`;
    return `https://wa.me/${fullNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        isLoading,
        savePlan,
        deletePlan,
        togglePlanStatus,
        savePlanMovel,
        deletePlanMovel,
        saveBanner,
        deleteBanner,
        reorderBanners,
        saveFAQ,
        deleteFAQ,
        reorderFAQs,
        saveSiteContent,
        saveContactSettings,
        saveGeneralSettings,
        resetToDefault,
        formatWhatsappLink,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
