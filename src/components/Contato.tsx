/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, Instagram, Facebook } from 'lucide-react';
import { CONTATO_CENTRALNET } from '../types';

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: '',
    cidade: 'surubim'
  });
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate successful form submit safely without reloading
    setIsSubmitSuccess(true);
    setTimeout(() => {
      setIsSubmitSuccess(false);
      setFormData({ nome: '', email: '', telefone: '', mensagem: '', cidade: 'surubim' });
    }, 4000);
  };

  return (
    <section id="contato" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold tracking-widest text-orange-500 uppercase bg-orange-50 border border-orange-100/60 px-3.5 py-1.5 rounded-full">
            Fale Conosco
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Estamos prontos para te ouvir e conectar
          </h2>
          <p className="text-base text-slate-600">
            Dúvidas comerciais, contratação, parcerias corporativas ou suporte técnico? Mande sua mensagem ou visite nossa sede em Surubim.
          </p>
        </div>

        {/* Info & Form container */}
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Contact Details - 5 cols */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="text-xl font-bold text-slate-900 font-display">Canais de Atendimento</h3>
            <p className="text-xs text-slate-500 leading-normal">
              Escolha seu canal de preferência ou envie uma mensagem no formulário ao lado de forma instantânea. Oferecemos atendimento qualificado local.
            </p>

            <div className="space-y-6">
              {/* Telefone e WhatsApp */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Telefone & WhatsApp</p>
                  <a 
                    href={CONTATO_CENTRALNET.whatsappUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-slate-800 hover:text-orange-500 transition-colors block"
                  >
                    {CONTATO_CENTRALNET.telefone} (Segunda a Sábado)
                  </a>
                  <p className="text-[11px] text-emerald-600 font-bold">✔ Suporte via WhatsApp ativo até as 22h todos os dias</p>
                </div>
              </div>

              {/* Endereço */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-blue-600 flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Escritório Central</p>
                  <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                    {CONTATO_CENTRALNET.endereco}
                  </p>
                  <p className="text-[11px] text-slate-400 block pt-0.5">Visite nossa central para solicitar faturas presenciais de comodato.</p>
                </div>
              </div>

              {/* Horário */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Clock size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Horário Comercial</p>
                  <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                    {CONTATO_CENTRALNET.horario}
                  </p>
                </div>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Acompanhe-nos nas Redes Sociais</p>
              <div className="flex gap-2">
                <a 
                  href={CONTATO_CENTRALNET.redesSociais.instagram}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-orange-500 hover:text-white text-slate-700 flex items-center justify-center transition-all shadow-sm"
                  aria-label="Acesse nosso Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href={CONTATO_CENTRALNET.redesSociais.facebook}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 flex items-center justify-center transition-all shadow-sm"
                  aria-label="Acesse nosso Facebook"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>

          </div>

          {/* Form - 7 cols */}
          <div className="lg:col-span-7 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-sm relative">
            <h3 className="text-xl font-bold text-slate-900 mb-6 font-display">Mande uma Mensagem Direta</h3>

            {isSubmitSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={28} />
                </div>
                <div className="space-y-1Unique">
                  <h4 className="text-base font-bold text-slate-900">Mensagem Enviada com Sucesso!</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Agradecemos o contato. Nossa equipe analisará os detalhes do formulário e retornará para o email ou telefone listado em breve!
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Nome */}
                  <div className="space-y-1.5">
                    <label htmlFor="ct-nome" className="text-xs font-bold text-slate-600 uppercase">Seu Nome</label>
                    <input 
                      id="ct-nome"
                      type="text" 
                      required
                      placeholder="Nome completo"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-550"
                    />
                  </div>

                  {/* Telefone */}
                  <div className="space-y-1.5">
                    <label htmlFor="ct-telefone" className="text-xs font-bold text-slate-600 uppercase">Seu WhatsApp</label>
                    <input 
                      id="ct-telefone"
                      type="tel" 
                      required
                      placeholder="(81) 99999-9999"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-550"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="ct-email" className="text-xs font-bold text-slate-600 uppercase">Seu E-mail</label>
                    <input 
                      id="ct-email"
                      type="email" 
                      required
                      placeholder="email@exemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-550"
                    />
                  </div>

                  {/* Cidade */}
                  <div className="space-y-1.5">
                    <label htmlFor="ct-cidade" className="text-xs font-bold text-slate-600 uppercase">Cidade de Interesse</label>
                    <select 
                      id="ct-cidade"
                      value={formData.cidade}
                      onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                      className="w-full bg-white border border-slate-200 px-4 py-3.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 border-r-8 border-r-transparent"
                    >
                      <option value="surubim">Surubim - PE</option>
                      <option value="bomjardim">Bom Jardim - PE</option>
                      <option value="joaoalfredo">João Alfredo - PE</option>
                      <option value="orobo">Orobó - PE</option>
                      <option value="casinhas">Casinhas - PE</option>
                      <option value="vertentes">Vertentes - PE</option>
                      <option value="limoeiro">Limoeiro - PE</option>
                      <option value="salgadinho">Salgadinho - PE</option>
                    </select>
                  </div>
                </div>

                {/* Mensagem */}
                <div className="space-y-1.5">
                  <label htmlFor="ct-mensagem" className="text-xs font-bold text-slate-600 uppercase">Sua Mensagem / Dúvida comercial</label>
                  <textarea 
                    id="ct-mensagem"
                    rows={4}
                    required
                    placeholder="Descreva brevemente sua solicitação ou plano de interesse..."
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-550 resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
                >
                  <Send size={14} />
                  <span>Enviar Formulário de Atendimento</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Informacoes de rodapé do Contrato e Regulamentos */}
        <div id="contratos" className="mt-16 bg-slate-50/50 p-6 rounded-3xl border border-slate-100 text-center">
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
            Nossos contratos de prestação de serviços de SCM, termos de fidelidade contratual residencial/empresarial e as políticas de privacidade de dados estão em total conformidade com as resoluções vigentes da ANATEL e a LGPD. 
            Você pode consultar e assinar os arquivos de forma digital segura na sua área correspondente.
          </p>
        </div>

      </div>
    </section>
  );
}
