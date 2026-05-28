/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HelpCircle, DollarSign, Wifi, Grid, Tv, BarChart2 } from 'lucide-react';

export default function CentralAssinanteSection() {
  return (
    <section id="central-assinante" className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE: Custom 2.5D CSS Smartphone Mockups to match the user's photo */}
          <div className="lg:col-span-6 flex justify-center items-center py-6 sm:py-10">
            <div className="relative flex items-center justify-center w-[290px] h-[360px] sm:w-[350px] sm:h-[440px]">
              
              {/* Decorative accent background blob */}
              <div className="absolute inset-0 bg-orange-100/50 rounded-full filter blur-3xl -z-10 transform scale-90"></div>
              
              {/* Smartphone 1 (Left, standing in front) */}
              <div className="absolute left-1 sm:left-4 z-20 w-[155px] h-[310px] sm:w-[190px] sm:h-[380px] bg-[#f85c1c] rounded-[2.5rem] p-2 border-4 border-slate-900 shadow-2xl transition-all duration-300 hover:translate-y-[-8px]">
                {/* Notch/Speaker */}
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-14 h-3.5 bg-slate-900 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800 ml-auto mr-2"></div>
                </div>

                {/* Simulated Screen */}
                <div className="w-full h-full bg-[#f85c1c] rounded-[2rem] overflow-hidden flex flex-col justify-between p-2.5 pt-4.5 relative">
                  
                  {/* Fluid ambient background circles */}
                  <div className="absolute -left-6 -bottom-6 w-20 h-20 bg-blue-600/40 rounded-full filter blur-md"></div>
                  <div className="absolute -right-6 top-8 w-16 h-16 bg-white/10 rounded-full filter blur-xs"></div>
                  
                  {/* App Header */}
                  <div className="relative z-10 flex justify-between items-center px-1">
                    <div className="flex flex-col gap-0.5">
                      <div className="w-3.5 h-0.5 bg-white"></div>
                      <div className="w-3.5 h-0.5 bg-white"></div>
                      <div className="w-2.5 h-0.5 bg-white"></div>
                    </div>
                    <span className="text-white text-[11px] sm:text-[13px] font-black tracking-tight">Central</span>
                    <div className="w-3 h-3 rounded-full border border-white/40 flex items-center justify-center text-[7px] text-white">i</div>
                  </div>

                  {/* App Buttons List (Mocking the photo) */}
                  <div className="relative z-10 space-y-1.5 sm:space-y-2.5 my-auto">
                    {[
                      { icon: HelpCircle, text: 'Suporte' },
                      { icon: DollarSign, text: 'Financeiro' },
                      { icon: Wifi, text: 'Meu Roteador' },
                      { icon: Grid, text: 'Apps' },
                      { icon: Tv, text: 'TV' },
                      { icon: BarChart2, text: 'Extrato de uso' },
                    ].map((btn, k) => {
                      const Icon = btn.icon;
                      return (
                        <div key={k} className="bg-white hover:bg-slate-50 border border-slate-100 py-1.5 px-2.5 rounded-lg flex items-center gap-2 shadow-xs cursor-pointer transition-all">
                          <div className="bg-orange-50 text-[#f85c1c] p-0.5 sm:p-1 rounded-md shrink-0">
                            <Icon size={10} className="stroke-[2.5]" />
                          </div>
                          <span className="text-[8px] sm:text-[10px] font-black text-slate-700 leading-none">{btn.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* App Bottom placeholder */}
                  <div className="relative z-10 text-center text-white/50 text-[6px] tracking-widest uppercase">
                    CentralNet App
                  </div>
                </div>
              </div>

              {/* Smartphone 2 (Right, standing slightly behind) */}
              <div className="absolute right-1 sm:right-4 z-10 w-[155px] h-[310px] sm:w-[190px] sm:h-[380px] bg-[#f85c1c] rounded-[2.5rem] p-2 border-4 border-slate-900 shadow-xl opacity-95 transition-all duration-300 hover:translate-y-[-8px]">
                {/* Notch/Speaker */}
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-14 h-3.5 bg-slate-900 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800 ml-auto mr-2"></div>
                </div>

                {/* Simulated Screen */}
                <div className="w-full h-full bg-[#f85c1c] rounded-[2rem] overflow-hidden flex flex-col justify-between p-3 pt-5 relative">
                  
                  {/* Fluid background circles matching the app's style */}
                  <div className="absolute -left-10 -bottom-10 w-28 h-28 bg-sky-500/30 rounded-full filter blur-lg"></div>
                  <div className="absolute -right-4 top-1/3 w-20 h-20 bg-blue-600/40 rounded-full filter blur-md"></div>
                  
                  {/* Screen Header Grid */}
                  <div className="relative z-10 flex justify-between items-center text-[7px] text-white/70 font-bold px-0.5">
                    <span>18:36 🌐</span>
                    <span>🔋 96%</span>
                  </div>

                  {/* Logo / Brand container */}
                  <div className="relative z-10 my-auto text-center space-y-3">
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center mx-auto shadow-md border-2 border-[#1e40af]/10 p-0.5">
                      {/* Logo image replacing the vector shape mockup */}
                      <img 
                        src="/Captura_de_tela_2026-05-28_204446-removebg-preview.png" 
                        alt="Logo CentralNet" 
                        className="w-full h-full object-contain rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="text-white text-md sm:text-lg font-black tracking-tight leading-none">Central</h4>
                      <p className="text-[7px] sm:text-[9px] text-white/80 font-bold tracking-wider uppercase mt-1">Surubim Telecom</p>
                    </div>

                    {/* CPF Form Field */}
                    <div className="bg-white/90 backdrop-blur-xs py-1.5 px-3 rounded-lg border border-white/20">
                      <span className="text-[7px] sm:text-[9px] text-slate-400 font-bold block">CPF / CNPJ</span>
                    </div>

                    {/* Entrar Button */}
                    <button className="w-full bg-[#00a8cc] hover:bg-[#0090b0] py-1.5 sm:py-2 text-white text-[8px] sm:text-[10px] font-extrabold rounded-lg shadow-md uppercase tracking-wider block transition-colors">
                      Entrar
                    </button>
                  </div>

                  {/* Bottom bar indicator */}
                  <div className="w-12 h-1 bg-white/70 mx-auto rounded-full"></div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE: Customized design following the picture precisely */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-slate-800">
            
            <div className="space-y-2">
              {/* Header Label matched to the screenshot style */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-0.5 bg-[#00a8cc] rounded"></div>
                <span className="text-xs font-black tracking-widest text-[#00a8cc] uppercase">
                  CENTRAL DO
                </span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1e1e24] tracking-tight leading-none mt-1 font-display">
                Assinante
              </h2>
            </div>

            {/* Main paragraph copied from the image */}
            <p className="text-[13px] sm:text-base text-slate-600 leading-relaxed font-semibold">
              Agora nossos clientes poderão ter os detalhes da sua internet na palma da mão! Acesse nossa central do assinante e veja os serviços tais como:
            </p>

            {/* List customized to have consistent branding, orange bullet dashes */}
            <ul className="space-y-2.5 mt-2 text-[13px] sm:text-[15px] font-bold text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-[#f85c1c] text-lg leading-none select-none shrink-0">–</span>
                <span>Visualização e 2ª via de boletos;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#f85c1c] text-lg leading-none select-none shrink-0">–</span>
                <span>Visualização de faturas;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#f85c1c] text-lg leading-none select-none shrink-0">–</span>
                <span>Abrir suporte e verificação de consumo;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#f85c1c] text-lg leading-none select-none shrink-0">–</span>
                <span>Solicitação de desbloqueio por confiança;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#f85c1c] text-lg leading-none select-none shrink-0">–</span>
                <span>Teste de velocidade.</span>
              </li>
            </ul>

            {/* Sub-paragraph copied from the image */}
            <p className="text-[13px] sm:text-base text-slate-600 leading-relaxed font-semibold">
              Facilite pagamentos, evite filas e ligações. Com nossa Central, você consegue mais tempo!
            </p>

            {/* Download Badges (Play Store & App Store direct links requested by the user) */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              
              {/* Play Store Download link button */}
              <a
                href="https://play.google.com/store/apps/details?id=com.imagindev.isp.centralnet&hl=pt_BR"
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition-all active:scale-95 hover:scale-102 flex hover:shadow-lg rounded-lg overflow-hidden shrink-0"
              >
                <svg className="w-[145px] h-[48px] sm:w-[160px] sm:h-[53px]" viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer black design capsule */}
                  <rect width="135" height="40" rx="6" fill="black"/>
                  <rect x="0.5" y="0.5" width="134" height="39" rx="5.5" stroke="#A6A6A6" strokeOpacity="0.2"/>
                  {/* Google Play logo vector */}
                  <path d="M12.913 8.35c-.173.18-.27.447-.27.766v21.768c0 .32.097.586.27.767l.073.065 12.115-12.115v-.288L12.986 8.285l-.073.065z" fill="url(#gp_a)" />
                  <path d="M29.23 21.436l-4.13-4.13v-.289l4.133-4.13.09.05 4.898 2.784c1.4.795 1.4 2.1 0 2.895L29.32 21.385l-.09.05z" fill="url(#gp_b)" />
                  <path d="M25.183 17.158L12.913 29.428c.453.477 1.196.537 2.035.06l14.365-8.163-4.13-4.167z" fill="url(#gp_c)" />
                  <path d="M25.183 17.158l4.13-4.13-14.365-8.164c-.84-.477-1.583-.416-2.035.06l12.27 12.234z" fill="url(#gp_d)" />
                  {/* Google Play typography */}
                  <text x="39" y="16" fill="white" fontSize="6.5" fontWeight="bold" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.2">DISPONÍVEL NO</text>
                  <text x="39" y="29" fill="white" fontSize="11" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.4">Google Play</text>
                  <defs>
                    <linearGradient id="gp_a" x1="22.181" y1="11.234" x2="11.528" y2="21.887" gradientUnits="userSpaceOnUse"><stop stopColor="#00A0E9"/><stop offset="1" stopColor="#0089D0"/></linearGradient>
                    <linearGradient id="gp_b" x1="32.84" y1="17.158" x2="21.325" y2="17.158" gradientUnits="userSpaceOnUse"><stop stopColor="#FFBB00"/><stop offset="1" stopColor="#FF9000"/></linearGradient>
                    <linearGradient id="gp_c" x1="22.684" y1="19.341" x2="13.2" y2="28.825" gradientUnits="userSpaceOnUse"><stop stopColor="#E4002B"/><stop offset="1" stopColor="#D2001D"/></linearGradient>
                    <linearGradient id="gp_d" x1="16.516" y1="10.825" x2="25.545" y2="19.854" gradientUnits="userSpaceOnUse"><stop stopColor="#00F276"/><stop offset="1" stopColor="#00D756"/></linearGradient>
                  </defs>
                </svg>
              </a>

              {/* App Store Download link button */}
              <a
                href="https://apps.apple.com/br/app/minha-centralnet/id1475042490"
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition-all active:scale-95 hover:scale-102 flex hover:shadow-lg rounded-lg overflow-hidden shrink-0"
              >
                <svg className="w-[145px] h-[48px] sm:w-[160px] sm:h-[53px]" viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer black design capsule */}
                  <rect width="135" height="40" rx="6" fill="black"/>
                  <rect x="0.5" y="0.5" width="134" height="39" rx="5.5" stroke="#A6A6A6" strokeOpacity="0.2"/>
                  {/* Apple Logo vector */}
                  <path d="M21.243 14.86c-.035-2.228 1.82-3.3 1.908-3.352-1.042-1.524-2.666-1.731-3.238-1.77-1.372-.141-2.68.807-3.376.807-.697 0-1.785-.807-2.95-.785-1.53.023-2.943.894-3.73 2.259-1.59 2.757-.406 6.837 1.135 9.06 1.05 1.514 1.9 2.924 3.033 2.879 1.11-.044 1.52-.717 2.859-.717 1.33 0 1.708.717 2.874.693 1.18-.02 1.944-1.272 2.662-2.32 1.05-1.52 1.31-2.771 1.35-2.857-.035-.015-2.486-.952-2.527-3.897zM18.995 8.161c.614-.746 1.03-1.78.917-2.812-.888.035-1.966.591-2.603 1.336-.554.64-.1.085-1.034 1.743.812-.1 1.106.963 1.71 2.38.74l-.04-.648z" fill="white"/>
                  {/* App Store typography */}
                  <text x="39" y="16" fill="white" fontSize="6.5" fontWeight="bold" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.2">Baixar na</text>
                  <text x="39" y="30" fill="white" fontSize="12.5" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.4">App Store</text>
                </svg>
              </a>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
