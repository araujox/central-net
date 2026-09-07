/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Star,
  Eye,
  EyeOff,
  Search,
  Sparkles,
  Wifi,
  Save,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { Plano } from '../types';

export default function AdminPlanos() {
  const { data, savePlan, deletePlan, togglePlanStatus, isLoading } = useCMS();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal / Form state
  const [editingPlan, setEditingPlan] = useState<Partial<Plano> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [beneficiosText, setBeneficiosText] = useState('');
  const [pillsText, setPillsText] = useState('');

  // Available categories
  const categories = [
    { id: 'todos', label: 'Todos os Planos' },
    { id: 'residencial', label: 'Residencial' },
    { id: 'gamer', label: 'Gamer' },
    { id: 'casa-conectada', label: 'Casa Conectada' },
    { id: 'radio', label: 'Rádio' },
    { id: 'empresarial', label: 'Empresarial' },
  ];

  // Filtering
  const filteredPlans = data.planos.filter((plano) => {
    const matchesCategory = selectedCategory === 'todos' || plano.categoria === selectedCategory;
    const matchesSearch =
      plano.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plano.velocidade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plano.preco.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenCreate = () => {
    const newId = `plano-${Date.now()}`;
    setEditingPlan({
      id: newId,
      nome: '',
      velocidade: '',
      preco: 'R$ 79,90',
      categoria: selectedCategory !== 'todos' ? (selectedCategory as any) : 'residencial',
      beneficios: [
        '100% Fibra Óptica ultra estável',
        'Roteador Dual Band incluso em comodato',
        'Instalação Gratuita'
      ],
      pills: ['Roteador em comodato', 'Instalação Grátis'],
      bannerPopular: false,
    });
    setBeneficiosText('100% Fibra Óptica ultra estável\nRoteador Dual Band incluso em comodato\nInstalação Gratuita');
    setPillsText('Roteador em comodato\nInstalação Grátis');
    setIsModalOpen(true);
    setSaveFeedback(null);
  };

  const handleOpenEdit = (plano: Plano) => {
    setEditingPlan({ ...plano });
    setBeneficiosText((plano.beneficios || []).join('\n'));
    setPillsText((plano.pills || []).join('\n'));
    setIsModalOpen(true);
    setSaveFeedback(null);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan || !editingPlan.nome || !editingPlan.velocidade || !editingPlan.preco) {
      setSaveFeedback({ type: 'error', message: 'Preencha os campos obrigatórios (Nome, Velocidade e Preço).' });
      return;
    }

    // Process benefits and pills line by line
    const parsedBeneficios = beneficiosText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const parsedPills = pillsText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const planToSave: Plano = {
      id: editingPlan.id || `plano-${Date.now()}`,
      nome: editingPlan.nome,
      velocidade: editingPlan.velocidade,
      preco: editingPlan.preco,
      categoria: editingPlan.categoria || 'residencial',
      beneficios: parsedBeneficios,
      pills: parsedPills.length > 0 ? parsedPills : undefined,
      bannerPopular: !!editingPlan.bannerPopular,
      valorDepois: editingPlan.valorDepois?.trim() || undefined,
      apps: editingPlan.apps || ['watch'],
      appHeading: editingPlan.appHeading,
      appHeadingPremium: editingPlan.appHeadingPremium,
      appRows: editingPlan.appRows,
      appRowsPremium: editingPlan.appRowsPremium,
    };

    const ok = await savePlan(planToSave);
    if (ok) {
      setSaveFeedback({ type: 'success', message: 'Plano salvo com sucesso! As alterações já estão no site público.' });
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1000);
    } else {
      setSaveFeedback({ type: 'error', message: 'Não foi possível salvar o plano. Tente novamente.' });
    }
  };

  const handleDelete = async (id: string, nome: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o plano "${nome}"? Esta ação removerá o plano do site.`)) {
      await deletePlan(id);
    }
  };

  const handleToggleStatus = async (id: string) => {
    await togglePlanStatus(id);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
            Gerenciamento de Planos de Internet
          </h1>
          <p className="text-xs text-slate-500">
            Edite valores, velocidades, benefícios e destaques exibidos na Home e na página Assine.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#004ecc] hover:bg-[#003bb3] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Cadastrar Novo Plano</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#004ecc] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome, velocidade, preço..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc] focus:border-transparent"
          />
        </div>

      </div>

      {/* Plans List Table / Mobile Cards */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-black text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-6">Plano & Velocidade</th>
                <th className="py-3.5 px-6">Categoria</th>
                <th className="py-3.5 px-6">Preço Mensal</th>
                <th className="py-3.5 px-6">Destaque</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {filteredPlans.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Nenhum plano encontrado com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredPlans.map((plano) => {
                  const isInativo = (plano as any).inativo ?? false;
                  return (
                    <tr
                      key={plano.id}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        isInativo ? 'opacity-60 bg-slate-50/30' : ''
                      }`}
                    >
                      {/* Name & Speed */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#004ecc] flex items-center justify-center font-black shrink-0">
                            <Wifi size={16} />
                          </div>
                          <div>
                            <p className="font-black text-slate-900 text-sm font-display">
                              {plano.nome}
                            </p>
                            <p className="text-[11px] font-bold text-[#005CDC]">
                              {plano.velocidade}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6">
                        <span className="capitalize px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-bold">
                          {plano.categoria}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-6">
                        <div>
                          <span className="font-extrabold text-slate-900 text-sm">
                            {plano.preco}
                          </span>
                          {plano.valorDepois && (
                            <span className="block text-[10px] text-slate-400">
                              (depois R$ {plano.valorDepois})
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Highlight */}
                      <td className="py-4 px-6">
                        {plano.bannerPopular ? (
                          <span className="inline-flex items-center gap-1 text-[#f26522] bg-orange-50 px-2.5 py-1 rounded-full text-[10px] font-black uppercase">
                            <Star size={11} className="fill-[#f26522]" />
                            <span>Mais Pedido</span>
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">Padrão</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleToggleStatus(plano.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                            !isInativo
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                          title="Clique para alternar o status"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              !isInativo ? 'bg-emerald-500' : 'bg-slate-400'
                            }`}
                          ></span>
                          <span>{!isInativo ? 'Ativo' : 'Inativo'}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(plano)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="Editar plano"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(plano.id, plano.nome)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Excluir plano"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT / CREATE MODAL */}
      {isModalOpen && editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-scale-up">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h3 className="text-lg font-black text-slate-900 font-display">
                  {editingPlan.id?.startsWith('plano-') && !data.planos.some(p => p.id === editingPlan.id)
                    ? 'Novo Plano de Internet'
                    : `Editar: ${editingPlan.nome || 'Plano'}`}
                </h3>
                <p className="text-xs text-slate-500">
                  Preencha as informações que serão exibidas na vitrine do site.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Feedback Alert */}
            {saveFeedback && (
              <div
                className={`mx-6 mt-4 p-3.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                  saveFeedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {saveFeedback.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
                <span>{saveFeedback.message}</span>
              </div>
            )}

            {/* Modal Form */}
            <form onSubmit={handleSaveModal} className="p-6 space-y-5">
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nome do Plano *
                  </label>
                  <input
                    type="text"
                    value={editingPlan.nome || ''}
                    onChange={(e) => setEditingPlan({ ...editingPlan, nome: e.target.value })}
                    placeholder="Ex: Plano PLUS"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Velocidade *
                  </label>
                  <input
                    type="text"
                    value={editingPlan.velocidade || ''}
                    onChange={(e) => setEditingPlan({ ...editingPlan, velocidade: e.target.value })}
                    placeholder="Ex: 500 Mega"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preço (R$) *
                  </label>
                  <input
                    type="text"
                    value={editingPlan.preco || ''}
                    onChange={(e) => setEditingPlan({ ...editingPlan, preco: e.target.value })}
                    placeholder="Ex: R$ 69,99"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preço após período (opcional)
                  </label>
                  <input
                    type="text"
                    value={editingPlan.valorDepois || ''}
                    onChange={(e) => setEditingPlan({ ...editingPlan, valorDepois: e.target.value })}
                    placeholder="Ex: 74,99"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Categoria *
                  </label>
                  <select
                    value={editingPlan.categoria || 'residencial'}
                    onChange={(e) => setEditingPlan({ ...editingPlan, categoria: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
                  >
                    <option value="residencial">Residencial</option>
                    <option value="gamer">Gamer</option>
                    <option value="casa-conectada">Casa Conectada</option>
                    <option value="radio">Rádio</option>
                    <option value="empresarial">Empresarial</option>
                  </select>
                </div>
              </div>

              {/* Badges / Checkboxes */}
              <div className="flex items-center gap-6 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={!!editingPlan.bannerPopular}
                    onChange={(e) => setEditingPlan({ ...editingPlan, bannerPopular: e.target.checked })}
                    className="rounded border-slate-300 text-[#f26522] focus:ring-[#f26522] w-4 h-4"
                  />
                  <span>Destacar como "Mais Pedido"</span>
                </label>
              </div>

              {/* Benefícios (Textarea - 1 per line) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Lista de Benefícios (1 benefício por linha)
                </label>
                <textarea
                  rows={4}
                  value={beneficiosText}
                  onChange={(e) => setBeneficiosText(e.target.value)}
                  placeholder="100% Fibra Óptica ultra estável&#10;Roteador Premium Dual Band em comodato&#10;Instalação Grátis"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-sans focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
                ></textarea>
                <p className="text-[11px] text-slate-400 mt-1">
                  Estes itens aparecem na lista com ícone de confirmação no card do plano.
                </p>
              </div>

              {/* Pills / Etiquetas rápidas (1 per line) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Etiquetas de Destaque / Pills (1 por linha)
                </label>
                <textarea
                  rows={2}
                  value={pillsText}
                  onChange={(e) => setPillsText(e.target.value)}
                  placeholder="Roteador em comodato 5GHz/2,4GHz&#10;Instalação Grátis"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-sans focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
                ></textarea>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#004ecc] hover:bg-[#003bb3] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Salvando...</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      <span>Salvar Alterações</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
