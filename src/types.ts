/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Plano {
  id: string;
  nome: string;
  velocidade: string;
  preco: string;
  beneficios: string[];
  bannerPopular?: boolean;
  categoria: 'residencial' | 'gamer' | 'empresarial' | 'casa-conectada' | 'radio';
  apps?: string[];
}

export interface Cidade {
  id: string;
  nome: string;
  mensagemExtra?: string;
}

export interface PlanoMovel {
  id: string;
  nome: string;
  gigaTotal: string;
  franquiaDetalhe: string;
  preco: string;
  whatsapp: string;
  ligacoes: string;
  sms: string;
  skeelo: boolean;
  bannerPopular?: boolean;
}

export interface Depoimento {
  id: string;
  autor: string;
  cidade: string;
  comentario: string;
  nota: number;
  tipo: 'internet' | 'gps';
}

export interface FAQItem {
  pergunta: string;
  resposta: string;
}

export const CIDADES_CENTRALNET: Cidade[] = [
  { id: 'arcoverde', nome: 'Arcoverde/PE' },
  { id: 'bomjardim', nome: 'Bom Jardim/PE (Umari)' },
  { id: 'casinhas', nome: 'Casinhas/PE' },
  { id: 'freimiguelinho', nome: 'Frei Miguelinho/PE' },
  { id: 'joaoalfredo', nome: 'João Alfredo/PE' },
  { id: 'stamariadocambuca', nome: 'Sta Maria do Cambucá/PE' },
  { id: 'surubim', nome: 'Surubim/PE' },
  { id: 'vertentedolerio', nome: 'Vertente do Lério/PE' },
  { id: 'vertentes', nome: 'Vertentes/PE' },
  { id: 'stacecilia', nome: 'Sta Cecília/PB' },
  { id: 'orobo', nome: 'Orobó - PE' },
  { id: 'limoeiro', nome: 'Limoeiro - PE' },
  { id: 'salgadinho', nome: 'Salgadinho - PE' },
  { id: 'demais', nome: 'Demais Localidades' }
];

export const PLANOS_CNMOVEL: PlanoMovel[] = [
  {
    id: 'movel-gold',
    nome: 'GOLD',
    gigaTotal: '6 GIGA',
    franquiaDetalhe: '3 GB + 2 GB BÔNUS + 1 GB PORTABILIDADE',
    preco: '29,90',
    whatsapp: 'mensagens grátis após franquia',
    ligacoes: '100 MIN de ligações para qualquer operadora',
    sms: '100 SMS',
    skeelo: true
  },
  {
    id: 'movel-rubi',
    nome: 'RUBI',
    gigaTotal: '10 GIGA',
    franquiaDetalhe: '7 GB + 2 GB BÔNUS + 1 GB PORTABILIDADE',
    preco: '34,90',
    whatsapp: 'mensagens grátis após franquia',
    ligacoes: 'LIGAÇÕES ILIMITADAS para qualquer operadora',
    sms: 'SMS ILIMITADOS',
    skeelo: true,
    bannerPopular: true
  },
  {
    id: 'movel-platinum',
    nome: 'PLATINUM',
    gigaTotal: '15 GIGA',
    franquiaDetalhe: '11 GB + 2 GB BÔNUS + 2 GB PORTABILIDADE',
    preco: '39,90',
    whatsapp: 'mensagens grátis após franquia',
    ligacoes: 'LIGAÇÕES ILIMITADAS para qualquer operadora',
    sms: 'SMS ILIMITADOS',
    skeelo: true
  },
  {
    id: 'movel-sapphire',
    nome: 'SAPPHIRE',
    gigaTotal: '30 GIGA',
    franquiaDetalhe: '20 GB + 5 GB BÔNUS + 5 GB PORTABILIDADE',
    preco: '59,90',
    whatsapp: 'mensagens grátis após franquia',
    ligacoes: 'LIGAÇÕES ILIMITADAS para qualquer operadora',
    sms: 'SMS ILIMITADOS',
    skeelo: true
  },
  {
    id: 'movel-diamond',
    nome: 'DIAMOND',
    gigaTotal: '40 GIGA',
    franquiaDetalhe: '22 GB + 10 GB BÔNUS + 8 GB PORTABILIDADE',
    preco: '69,90',
    whatsapp: 'mensagens grátis após franquia',
    ligacoes: 'LIGAÇÕES ILIMITADAS para qualquer operadora',
    sms: 'SMS ILIMITADOS',
    skeelo: true
  },
  {
    id: 'movel-emerald',
    nome: 'EMERALD',
    gigaTotal: '50 GIGA',
    franquiaDetalhe: '25 GB + 20 GB BÔNUS + 5 GB PORTABILIDADE',
    preco: '84,90',
    whatsapp: 'mensagens grátis após franquia',
    ligacoes: 'LIGAÇÕES ILIMITADAS para qualquer operadora',
    sms: 'SMS ILIMITADOS',
    skeelo: true
  }
];

export const PLANOS_CENTRALNET: Plano[] = [
  // Residencial Plus (Imagem 1)
  {
    id: 'res-300m-gold',
    nome: 'Plano GOLD PLUS',
    velocidade: '300 Mega',
    preco: 'R$ 69,90',
    categoria: 'residencial',
    apps: ['paramount-or-deezer', 'clube-vantagens'],
    beneficios: [
      '100% Fibra Óptica ultra estável',
      'Roteador Premium Dual Band (5GHz/2,4GHz) em comodato',
      'Navegue e assista em HD/4K sem travamento',
      'Apps Inclusos: Paramount+ ou Deezer',
      'Acesso ao Clube de Vantagens Central'
    ]
  },
  {
    id: 'res-350m-sapphire',
    nome: 'Plano SAPPHIRE PLUS',
    velocidade: '350 Mega',
    preco: 'R$ 77,90',
    categoria: 'residencial',
    bannerPopular: true,
    apps: ['paramount-and-deezer', 'clube-vantagens'],
    beneficios: [
      'Velocidade Extra de 350 Mega em Fibra',
      'Roteador Premium Dual Band (5GHz/2,4GHz) em comodato',
      'Perfeito para Smart TVs, uploads e descargas rápidas',
      'Apps Inclusos: Paramount+ e Deezer',
      'Acesso ao Clube de Vantagens Central'
    ]
  },
  {
    id: 'res-500m-platinum',
    nome: 'Plano PLATINUM PLUS',
    velocidade: '500 Mega',
    preco: 'R$ 84,90',
    categoria: 'residencial',
    apps: ['hbo-or-paramount', 'deezer', 'clube-vantagens'],
    beneficios: [
      'Ultra Velocidade de 500 Mega em Fibra',
      'Roteador Premium Dual Band (5GHz/2,4GHz) em comodato',
      'Uso simultâneo de múltiplos dispositivos sem oscilações',
      'Apps Inclusos: HBO Max ou Paramount+ e Deezer',
      'Acesso ao Clube de Vantagens Central'
    ]
  },
  // Gamer (Imagens 2 e 3)
  {
    id: 'gamer-300m-rubi',
    nome: 'Plano Gamer RUBI 300',
    velocidade: '300 Mega Gamer',
    preco: 'R$ 139,90',
    categoria: 'gamer',
    apps: ['hbo-max', 'deezer', 'plus-5-apps', 'clube-vantagens'],
    beneficios: [
      '300 Mb de Download e 240 Mb de Upload',
      '2 Roteadores em comodato (5GHz/2,4GHz e 2.4GHz)',
      'Prioridade de 5h no suporte técnico + IP Público fixado',
      'Cabeamento completo p/ PC de jogos (máximo 60 metros)',
      'Apps Inclusos: HBO Max + Deezer + 5 apps de sua escolha',
      'Acesso ao Clube de Vantagens Central'
    ]
  },
  {
    id: 'gamer-300m-diamond',
    nome: 'Plano Gamer DIAMOND 300',
    velocidade: '300 Mega Gamer MESH',
    preco: 'R$ 169,90',
    categoria: 'gamer',
    apps: ['hbo-max', 'deezer', 'plus-6-apps', 'clube-vantagens'],
    beneficios: [
      '300 Mb de Download e 240 Mb de Upload',
      '3 Roteadores em comodato MESH Dual Band AC',
      'Prioridade de 5h no suporte técnico + IP Público fixado',
      'Cabeamento completo p/ PC de jogos (máximo 70 metros)',
      'Apps Inclusos: HBO Max + Deezer + 6 apps de sua escolha',
      'Acesso ao Clube de Vantagens Central'
    ]
  },
  {
    id: 'gamer-500m-rubi',
    nome: 'Plano Gamer RUBI 500',
    velocidade: '500 Mega Gamer',
    preco: 'R$ 139,90',
    categoria: 'gamer',
    bannerPopular: true,
    apps: ['hbo-max', 'deezer', 'plus-5-apps', 'clube-vantagens'],
    beneficios: [
      '500 Mb de Download e 480 Mb de Upload',
      '2 Roteadores em comodato (5GHz/2,4GHz e 2,4GHz)',
      'Prioridade de 5h no suporte técnico + IP Público fixado',
      'Cabeamento completo p/ PC de jogos (máximo 60 metros)',
      'Apps Inclusos: HBO Max + Deezer + 5 apps de sua escolha',
      'Acesso ao Clube de Vantagens Central'
    ]
  },
  {
    id: 'gamer-500m-diamond',
    nome: 'Plano Gamer DIAMOND 500',
    velocidade: '500 Mega Gamer MESH',
    preco: 'R$ 169,90',
    categoria: 'gamer',
    apps: ['hbo-max', 'deezer', 'plus-6-apps', 'clube-vantagens'],
    beneficios: [
      '500 Mb de Download e 480 Mb de Upload',
      '3 Roteadores em comodato MESH Dual Band AC',
      'Prioridade de 5h no suporte técnico + IP Público fixado',
      'Cabeamento completo p/ PC de jogos (máximo 70 metros)',
      'Apps Inclusos: HBO Max + Deezer + 6 apps de sua escolha',
      'Acesso ao Clube de Vantagens Central'
    ]
  },
  // Casa Conectada (Imagem 4)
  {
    id: 'casa-total-basic',
    nome: 'Wi-Fi Casa Total BASIC',
    velocidade: '600 Mega MESH',
    preco: 'R$ 99,90',
    categoria: 'casa-conectada',
    apps: ['clube-vantagens'],
    beneficios: [
      '600 Mega para múltiplos equipamentos conectados',
      'Roteador MESH de alta escala incluso em comodato',
      'Suporta lâmpadas, TVs 4K, smart locks e automação',
      'Conexão estável em todas as pontas da residência',
      'Acesso ao Clube de Vantagens Central'
    ]
  },
  {
    id: 'casa-total-premium',
    nome: 'Wi-Fi Casa Total PREMIUM',
    velocidade: '600 Mega MESH + Apps',
    preco: 'R$ 109,90',
    categoria: 'casa-conectada',
    bannerPopular: true,
    apps: ['paramount-or-deezer', 'clube-vantagens'],
    beneficios: [
      '600 Mega de alta intensidade com estabilidade MESH',
      'Roteador MESH de alta performance incluso em comodato',
      'Suporta dezenas de Smart devices domésticos sem travar',
      'Apps Inclusos: Paramount+ ou Deezer',
      'Acesso ao Clube de Vantagens Central'
    ]
  },
  {
    id: 'casa-total-super-premium',
    nome: 'Wi-Fi Casa Total SUPER PREMIUM',
    velocidade: '600 Mega MESH Max',
    preco: 'R$ 119,90',
    categoria: 'casa-conectada',
    apps: ['paramount-or-hbo', 'clube-vantagens'],
    beneficios: [
      '600 Mega com foco em blindagem de sinal MESH',
      'Roteadores MESH avançados inclusos em comodato',
      'Ideal para casas grandes e automações complexas',
      'Apps Inclusos: Paramount+ ou HBO Max + Deezer',
      'Acesso ao Clube de Vantagens Central'
    ]
  },
  // Rádio (Imagem 5)
  {
    id: 'radio-rubi',
    nome: 'Internet RÁDIO RUBI',
    velocidade: '15 Mega Rádio',
    preco: 'R$ 59,90',
    categoria: 'radio',
    apps: ['clube-vantagens'],
    beneficios: [
      '15 Mb de Download e 5 Mb de Upload',
      'Uso simultâneo recomendado para até 2 pessoas',
      'Sinal estável via rádio de alto padrão',
      'Excelente opção para áreas rurais e sítios',
      'Acesso ao Clube de Vantagens Central'
    ]
  },
  {
    id: 'radio-platina',
    nome: 'Internet RÁDIO PLATINA',
    velocidade: '25 Mega Rádio',
    preco: 'R$ 69,90',
    categoria: 'radio',
    bannerPopular: true,
    apps: ['paramount', 'noggin', 'clube-vantagens'],
    beneficios: [
      '25 Mb de Download e 8 Mb de Upload',
      'Uso simultâneo recomendado para até 3 pessoas',
      'Sinal estável via rádio de excelente desempenho',
      'Acesso ao clube de descontos CentralNet',
      'Apps Inclusos: Paramount+ + Noggin by Nick Jr.'
    ]
  },
  {
    id: 'radio-diamante',
    nome: 'Internet RÁDIO DIAMANTE',
    velocidade: '35 Mega Rádio',
    preco: 'R$ 79,90',
    categoria: 'radio',
    apps: ['paramount', 'noggin', 'deezer', 'clube-vantagens'],
    beneficios: [
      '35 Mb de Download e 11 Mb de Upload',
      'Uso simultâneo recomendado para até 3 pessoas',
      'Sinal estável via rádio na máxima velocidade',
      'Incluso suporte técnico rural ágil',
      'Apps: Paramount+ + Noggin by Nick Jr. + Deezer'
    ]
  },
  // Empresarial (SOHO Corporativo - Imagem do Usuário)
  {
    id: 'corp-gold-soho',
    nome: 'SOHO GOLD PLUS',
    velocidade: '300 Mega',
    preco: 'R$ 79,90',
    categoria: 'empresarial',
    apps: ['clube-vantagens', 'plus-1-app'],
    beneficios: [
      'Roteador Premium Dual Band (5GHz/2,4GHz) incluso',
      'Prioridade de 8h no atendimento de suporte técnico',
      'Cabeamento completo pronto para computadores (máximo 40 metros)',
      'Ideal para escritórios e microempresas locais',
      'Acesso ao Clube de Vantagens Central'
    ]
  },
  {
    id: 'corp-platinum-soho',
    nome: 'SOHO PLATINUM PLUS',
    velocidade: '600 Mega',
    preco: 'R$ 119,90',
    categoria: 'empresarial',
    bannerPopular: true,
    apps: ['clube-vantagens', 'plus-2-apps'],
    beneficios: [
      'Prioridade de 5h no suporte técnico especializado',
      'IP Público dinâmico/estático focado em servidores',
      'Cabeamento completo com conectores Gigabit (máximo 60 metros)',
      'Indicado para alta circulação de clientes e conexões concorrentes',
      'Acesso ao Clube de Vantagens Central'
    ]
  },
  {
    id: 'corp-rubi-soho',
    nome: 'SOHO RUBI PLUS (Gamer)',
    velocidade: '600 Mega Gamer',
    preco: 'R$ 139,90',
    categoria: 'empresarial',
    apps: ['hbo-max', 'deezer', 'plus-5-apps', 'clube-vantagens'],
    beneficios: [
      '2 Roteadores Premium em comodato de alto alcance',
      'Prioridade de 5h no suporte de emergência corporativo',
      'IP Público gratuito focado em conexões de baixíssimo ping',
      'Cabeamento estruturado completo (máximo 60 metros)',
      'Acesso ao Clube de Vantagens Central'
    ]
  },
  {
    id: 'corp-diamond-soho',
    nome: 'SOHO DIAMOND PLUS (Gamer MESH)',
    velocidade: '700 Mega Gamer MESH',
    preco: 'R$ 169,90',
    categoria: 'empresarial',
    apps: ['hbo-max', 'deezer', 'plus-6-apps', 'clube-vantagens'],
    beneficios: [
      '3 Roteadores em comodato MESH Dual Band AC de altíssima escala',
      'Prioridade de 5h no suporte dedicado para faturamentos',
      'IP Público com roteamento corporativo ultra estável',
      'Cabeamento completo na empresa sob medida (máximo 70 metros)',
      'Acesso ao Clube de Vantagens Central'
    ]
  },
  {
    id: 'corp-link-dedicado',
    nome: 'Link Dedicado Personalizado',
    velocidade: 'Velocidade 1:1 sob Medida',
    preco: 'Sob Consulta',
    categoria: 'empresarial',
    beneficios: [
      'Garantia contratual de 100% de banda simétrica',
      'SLA de disponibilidade extrema de até 99,8%',
      'Canais físicos de transporte de rede redundantes',
      'Monitoramento ativo pelo NOC da operadora 24x7x365',
      'Entrada direta no anel óptico com suporte presencial expresso'
    ]
  }
];

export const DEPOIMENTOS_CENTRALNET: Depoimento[] = [
  {
    id: 'd1',
    autor: 'José Carlos Albuquerque',
    cidade: 'Surubim - PE',
    comentario: 'Assinei o plano de 400 Mega para minha casa e a estabilidade é impressionante. Meus filhos jogam online enquanto eu assisto séries em 4K e a conexão continua perfeita!',
    nota: 5,
    tipo: 'internet'
  },
  {
    id: 'd2',
    autor: 'Mariana Silva Souza',
    cidade: 'João Alfredo - PE',
    comentario: 'O suporte humano deles faz toda a diferença. Precisei de ajuda num domingo à tarde para reinstalar o Wi-Fi após pintar o quarto, e em poucos minutos resolveram pelo WhatsApp!',
    nota: 5,
    tipo: 'internet'
  },
  {
    id: 'd3',
    autor: 'Roberto Lima e Silva',
    cidade: 'Orobó - PE',
    comentario: 'Instalei o rastreador da CN GPS no meu carro e na moto. O aplicativo nos dá total controle, avisa se ligarem a chave e a localização em tempo real é cirúrgica. Sinto-me muito mais seguro.',
    nota: 5,
    tipo: 'gps'
  },
  {
    id: 'd4',
    autor: 'Clínica Pró-Vida',
    cidade: 'Surubim - PE',
    comentario: 'Utilizamos o Link Dedicado da CentralNet na nossa clínica empresarial. Transmissão imediata de exames pesados e prontuário em nuvem sem qualquer interrupção. Excelente serviço cooperativo!',
    nota: 5,
    tipo: 'internet'
  }
];

export const FAQ_CENTRALNET: FAQItem[] = [
  {
    pergunta: 'Qual o prazo de instalação da internet fibra óptica?',
    resposta: 'O prazo de instalação padrão é de até 48 horas úteis após a confirmação e aprovação do plano contratado. Nossa equipe de campo agenda o melhor horário direto com você.'
  },
  {
    pergunta: 'Como funciona a ativação do meu plano de internet?',
    resposta: 'O roteador Wi-Fi de alta performance Dual-Band é cedido no regime de comodato (gratuito) durante a permanência da assinatura. A nossa instalação é limpa, profissional e rápida.'
  },
  {
    pergunta: 'Como emito a segunda via do boleto ou fatura?',
    resposta: 'Você pode emitir sua fatura instantaneamente clicando na "Central do Assinante" no cabeçalho do site ou usando o nosso menu rápido de suporte. Lá você tem acesso ao código de barras, código PIX copia e cola e faturas liquidadas.'
  },
  {
    pergunta: 'O suporte técnico funciona aos finais de semana e feriados?',
    resposta: 'Sim! Valorizamos a parceria com nossos assinantes por isso dispomos de suporte humanizado aos sábados, domingos e feriados, das 08h às 22h, garantindo que você nunca fique sem conexão.'
  },
  {
    pergunta: 'Quais cidades contam com cobertura da CentralNet?',
    resposta: 'Atendemos com fibra óptica premium as cidades de Surubim, Bom Jardim, João Alfredo, Orobó, Casinhas, Vertentes, Limoeiro, Salgadinho e regiões adjacentes em Pernambuco.'
  },
  {
    pergunta: 'Como assinar um plano de Rastreamento Veicular CN GPS?',
    resposta: 'Basta preencher o curto cadastro clicando no link do Rastreamento GPS do nosso menu ou entrando em contato por WhatsApp. Instalamos um dispositivo vedado, de baixo consumo e discreto que conecta-se instantaneamente com nossa central.'
  }
];

export const CONTATO_CENTRALNET = {
  telefone: '(81) 3634-2659',
  whatsappUrl: 'https://wa.me/5581995009874?text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+os+planos+de+internet+da+CentralNet.',
  whatsappLimpo: '(81) 99500-9874',
  endereco: 'Av. São Sebastião, 613 - São Sebastiao, Surubim - PE, 55750-000',
  horario: 'Segunda a Sexta: 08h às 18h | Sábado: 08h às 12h | Suporte Técnico: Todos os dias até as 22h',
  redesSociais: {
    instagram: 'https://www.instagram.com/centralnett.official/',
    facebook: 'https://facebook.com/centralnetsurubim'
  }
};
