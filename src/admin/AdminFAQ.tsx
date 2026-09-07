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
  HelpCircle,
  Save,
  Loader2,
  AlertCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function AdminFAQ() {
  const { data, saveFAQ, deleteFAQ, reorderFAQs, isLoading } = useCMS();

  const [editingFaq, setEditingFaq] = useState<{ id?: string; pergunta: string; resposta: string; ativo?: boolean; ordem?: number } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const faqs = [...data.faqs].sort((a, b) => a.ordem - b.ordem);

  const handleOpenCreate = () => {
    setEditingFaq({
      id: `faq-${Date.now()}`,
      pergunta: '',
      resposta: '',
      ativo: true,
      ordem: faqs.length + 1,
    });
    setIsModalOpen(true);
    setFeedback(null);
  };

  const handleOpenEdit = (faq: typeof faqs[0]) => {
    setEditingFaq({ ...faq });
    setIsModalOpen(true);
    setFeedback(null);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq || !editingFaq.pergunta.trim() || !editingFaq.resposta.trim()) {
      setFeedback({ type: 'error', message: 'Preencha a pergunta e a resposta.' });
      return;
    }

    const ok = await saveFAQ(editingFaq as any);
    if (ok) {
      setFeedback({ type: 'success', message: 'Pergunta salva com sucesso!' });
      setTimeout(() => setIsModalOpen(false), 800);
    } else {
      setFeedback({ type: 'error', message: 'Não foi possível salvar o item.' });
    }
  };

  const handleDelete = async (id: string, pergunta: string) => {
    if (window.confirm(`Tem certeza que deseja remover a pergunta:\n"${pergunta}"?`)) {
      await deleteFAQ(id);
    }
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const newFaqs = [...faqs];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newFaqs.length) return;

    const temp = newFaqs[index];
    newFaqs[index] = newFaqs[targetIndex];
    newFaqs[targetIndex] = temp;

    const updated = newFaqs.map((f, i) => ({ ...f, ordem: i + 1 }));
    await reorderFAQs(updated);
  };

  const handleToggleStatus = async (faq: typeof faqs[0]) => {
    await saveFAQ({ ...faq, ativo: !faq.ativo });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
            Gerenciamento de FAQ (Dúvidas Frequentes)
          </h1>
          <p className="text-xs text-slate-500">
            Adicione, edite e organize a ordem das perguntas exibidas no accordion do site.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#004ecc] hover:bg-[#003bb3] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Nova Pergunta</span>
        </button>
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className={`bg-white rounded-2xl border p-5 transition-all shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              faq.ativo ? 'border-slate-200' : 'border-slate-200/50 opacity-60 bg-slate-50/50'
            }`}
          >
            {/* Question info */}
            <div className="flex items-start gap-3.5 flex-grow">
              <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#004ecc] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {index + 1}
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">
                  {faq.pergunta}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {faq.resposta}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 shrink-0 self-end sm:self-center border-t sm:border-t-0 pt-3 sm:pt-0 w-full sm:w-auto justify-between sm:justify-start">
              {/* Status toggle */}
              <button
                onClick={() => handleToggleStatus(faq)}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                  faq.ativo ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {faq.ativo ? 'Ativa' : 'Oculta'}
              </button>

              {/* Move Order */}
              <div className="flex items-center gap-0.5">
                <button
                  disabled={index === 0}
                  onClick={() => handleMoveOrder(index, 'up')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                  title="Subir prioridade"
                >
                  <ArrowUp size={15} />
                </button>
                <button
                  disabled={index === faqs.length - 1}
                  onClick={() => handleMoveOrder(index, 'down')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                  title="Descer prioridade"
                >
                  <ArrowDown size={15} />
                </button>
              </div>

              {/* Edit and Delete */}
              <button
                onClick={() => handleOpenEdit(faq)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                title="Editar pergunta"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => handleDelete(faq.id, faq.pergunta)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                title="Excluir pergunta"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-scale-up">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="text-lg font-black text-slate-900 font-display">
                {editingFaq.id && !data.faqs.some(f => f.id === editingFaq.id)
                  ? 'Nova Pergunta Frequente'
                  : 'Editar Pergunta do FAQ'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {feedback && (
              <div
                className={`mx-6 mt-4 p-3.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                  feedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {feedback.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
                <span>{feedback.message}</span>
              </div>
            )}

            <form onSubmit={handleSaveModal} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Pergunta *
                </label>
                <input
                  type="text"
                  value={editingFaq.pergunta}
                  onChange={(e) => setEditingFaq({ ...editingFaq, pergunta: e.target.value })}
                  placeholder="Ex: Qual o prazo de instalação da internet fibra óptica?"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Resposta *
                </label>
                <textarea
                  rows={4}
                  value={editingFaq.resposta}
                  onChange={(e) => setEditingFaq({ ...editingFaq, resposta: e.target.value })}
                  placeholder="Texto explicativo claro e amigável..."
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 leading-relaxed font-sans focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
                ></textarea>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={editingFaq.ativo ?? true}
                    onChange={(e) => setEditingFaq({ ...editingFaq, ativo: e.target.checked })}
                    className="rounded border-slate-300 text-[#004ecc] focus:ring-[#004ecc] w-4 h-4"
                  />
                  <span>Pergunta Ativa (exibida no site público)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
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
                      <span>Salvar Pergunta</span>
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
