/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Network, Activity, Calendar, ArrowUpRight } from 'lucide-react';

export default function ParaEmpresas() {
  const SERVICOS_CORP = [
    {
      id: 'dedicado',
      icon: Network,
      titulo: 'Link Dedicado 100% Simétrico',
      descricao: 'Velocidade de Upload igual à de Download. SLA de 99,8% de disponibilidade com garantia total de banda em contrato corporativo.',
      vantagem: 'SLA 99.8% | Suporte Técnico Expresso Giga-SLA 24h'
    },
    {
      id: 'soho',
      icon: ShieldCheck,
      titulo: 'Planos SOHO (Small Office / Home Office)',
      descricao: 'Conexões corporativas dimensionadas para pequenos negócios comerciais locais, proporcionando economia e estabilidade operacional.',
      vantagem: 'Ideal para lojas, restaurantes e consultórios locais'
    },
    {
      id: 'ponto',
      icon: Activity,
      titulo: 'Fibra Ponto-a-Ponto Lan-To-Lan',
      descricao: 'Interligação direta entre matriz, filiais e armazéns com transporte de dados criptografado de baixíssima latência na nossa rede.',
      vantagem: 'Segurança absoluta para transferência interna de dados'
    },
    {
      id: 'temp',
      icon: Calendar,
      titulo: 'Links Temporários de Alta Performance',
      descricao: 'Conexão estável provisionada de emergência para festivais, shows, convenções locais e transmissões esportivas de alto alcance.',
      vantagem: 'Ativação ágil com roteamento sob demanda customizado'
    }
  ];

  return (
    <section id="para-empresas" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intro */}
        <div className="max-w-3xl space-y-4 mb-16">
          <span className="text-xs font-bold tracking-widest text-orange-500 uppercase bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/30">
            Telecom Corporativo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Infraestrutura de alta disponibilidade para impulsionar seu negócio
          </h2>
          <p className="text-base text-slate-300">
            A estabilidade que sua empresa necessita para operar sem pausas. Conectamos sistemas de faturamento, canais de segurança, nuvens de dados e comunicação unificada.
          </p>
        </div>

        {/* Bento/Flexible Responsive Grid layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {SERVICOS_CORP.map((servico) => {
            const IconComp = servico.icon;
            return (
              <div 
                key={servico.id}
                className="bg-slate-800/40 p-8 rounded-3xl border border-white/5 hover:border-orange-500/30 hover:bg-slate-800/60 shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center transition-all group-hover:scale-110">
                      <IconComp size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-white font-display leading-tight">
                      {servico.titulo}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {servico.descricao}
                  </p>
                </div>

                {/* Advantage Footer Tag */}
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-xs text-orange-500 font-bold bg-orange-500/10 px-3 py-1 rounded-lg">
                    {servico.vantagem}
                  </span>
                  
                  <a 
                    href={`https://wa.me/5581995009874?text=Ol%C3%A1%21+Solicito+or%C3%A7amento+empresarial+para+plano+de+${encodeURIComponent(servico.titulo)}.`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-sky-400 font-extrabold hover:text-sky-300 transition-colors"
                  >
                    <span>Cotar com Especialista</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Corporate Trust Badge */}
        <div className="mt-16 bg-gradient-to-r from-blue-600/20 to-orange-500/10 p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white font-display">Sua empresa precisa de projetos especiais de infraestrutura?</h4>
            <p className="text-xs text-slate-300">Oferecemos consultoria consultiva gratuita com engenheiros de telecomunicações para propor a melhor fidelidade.</p>
          </div>
          <a
            href="https://wa.me/5581995009874?text=Ol%C3%A1%21+Preciso+de+um+projeto+de+infraestrutura+especial+de+telecom+para+minha+empresa."
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl text-xs font-bold shadow-md transition-all whitespace-nowrap"
          >
            Falar pelo WhatsApp Empresarial
          </a>
        </div>

      </div>
    </section>
  );
}
