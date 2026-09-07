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
  Image as ImageIcon,
  Save,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  Upload,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { useCMS, BannerItem } from '../context/CMSContext';

export default function AdminBanners() {
  const { data, saveBanner, deleteBanner, reorderBanners, isLoading } = useCMS();

  const [editingBanner, setEditingBanner] = useState<Partial<BannerItem> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const banners = [...data.banners].sort((a, b) => a.ordem - b.ordem);

  const handleOpenCreate = () => {
    const newId = `banner-${Date.now()}`;
    const newOrder = banners.length + 1;
    setEditingBanner({
      id: newId,
      image: '/Captura de tela 2026-05-30 102302.png',
      alt: 'Novo Banner CentralNet',
      target: 'assine',
      tab: 'residencial',
      titulo: '',
      subtitulo: '',
      botaoTexto: 'Assine Agora',
      ativo: true,
      ordem: newOrder,
    });
    setImagePreview('/Captura de tela 2026-05-30 102302.png');
    setIsModalOpen(true);
    setSaveFeedback(null);
  };

  const handleOpenEdit = (banner: BannerItem) => {
    setEditingBanner({ ...banner });
    setImagePreview(banner.image);
    setIsModalOpen(true);
    setSaveFeedback(null);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('A imagem é muito grande. Escolha um arquivo de até 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImagePreview(result);
        if (editingBanner) {
          setEditingBanner({ ...editingBanner, image: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBanner || !editingBanner.image || !editingBanner.alt) {
      setSaveFeedback({ type: 'error', message: 'Preencha a imagem e a descrição do banner.' });
      return;
    }

    const bannerToSave: BannerItem = {
      id: editingBanner.id || `banner-${Date.now()}`,
      image: editingBanner.image,
      alt: editingBanner.alt,
      target: editingBanner.target || 'assine',
      tab: editingBanner.tab,
      externalUrl: editingBanner.externalUrl,
      titulo: editingBanner.titulo,
      subtitulo: editingBanner.subtitulo,
      botaoTexto: editingBanner.botaoTexto,
      ativo: editingBanner.ativo ?? true,
      ordem: editingBanner.ordem ?? 1,
    };

    const ok = await saveBanner(bannerToSave);
    if (ok) {
      setSaveFeedback({ type: 'success', message: 'Banner salvo com sucesso! Já atualizado na página inicial.' });
      setTimeout(() => setIsModalOpen(false), 1000);
    } else {
      setSaveFeedback({ type: 'error', message: 'Não foi possível salvar o banner.' });
    }
  };

  const handleDelete = async (id: string, alt: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o banner "${alt}"?`)) {
      await deleteBanner(id);
    }
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const newBanners = [...banners];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newBanners.length) return;

    const temp = newBanners[index];
    newBanners[index] = newBanners[targetIndex];
    newBanners[targetIndex] = temp;

    // Reassign sequential orders
    const updated = newBanners.map((b, i) => ({ ...b, ordem: i + 1 }));
    await reorderBanners(updated);
  };

  const handleToggleStatus = async (banner: BannerItem) => {
    await saveBanner({ ...banner, ativo: !banner.ativo });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
            Gerenciamento de Banners (Hero)
          </h1>
          <p className="text-xs text-slate-500">
            Controle os slides do carrossel principal exibidos no topo da página inicial.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#f26522] hover:bg-[#d95213] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Novo Banner</span>
        </button>
      </div>

      {/* Banners Grid/List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`bg-white rounded-3xl border overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
              banner.ativo ? 'border-slate-200' : 'border-slate-200/50 opacity-60 bg-slate-50/50'
            }`}
          >
            {/* Banner Image Preview Container */}
            <div className="relative aspect-[16/8] bg-slate-900 overflow-hidden group">
              <img
                src={banner.image}
                alt={banner.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Overlay Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="bg-black/70 backdrop-blur-xs text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                  Slide #{banner.ordem}
                </span>
                {banner.tab && (
                  <span className="bg-blue-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full capitalize">
                    {banner.tab}
                  </span>
                )}
              </div>

              {/* Status pill on image */}
              <button
                onClick={() => handleToggleStatus(banner)}
                className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs cursor-pointer ${
                  banner.ativo
                    ? 'bg-emerald-500/90 text-white hover:bg-emerald-600'
                    : 'bg-slate-700/90 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {banner.ativo ? 'Ativo' : 'Pausado'}
              </button>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-grow space-y-2">
              <h3 className="font-bold text-slate-900 text-sm line-clamp-1">
                {banner.alt}
              </h3>
              {banner.subtitulo && (
                <p className="text-xs text-slate-500 line-clamp-2">
                  {banner.subtitulo}
                </p>
              )}
              <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-2">
                <span className="font-semibold text-slate-600">Ação de clique:</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-mono">
                  {banner.target === 'externo' ? banner.externalUrl : `/${banner.target}`}
                </span>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
              {/* Move Order Buttons */}
              <div className="flex items-center gap-1">
                <button
                  disabled={index === 0}
                  onClick={() => handleMoveOrder(index, 'up')}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  title="Mover para a esquerda/cima"
                >
                  <ArrowUp size={15} />
                </button>
                <button
                  disabled={index === banners.length - 1}
                  onClick={() => handleMoveOrder(index, 'down')}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  title="Mover para a direita/baixo"
                >
                  <ArrowDown size={15} />
                </button>
              </div>

              {/* Edit and Delete */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(banner)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                  title="Editar banner"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(banner.id, banner.alt)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Excluir banner"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* MODAL EDIT / CREATE */}
      {isModalOpen && editingBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-scale-up">
            
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="text-lg font-black text-slate-900 font-display">
                Configurar Banner do Hero
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

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

            <form onSubmit={handleSaveModal} className="p-6 space-y-4">
              
              {/* Live Image Preview */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Pré-visualização da Imagem
                </label>
                <div className="aspect-[2.4/1] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 relative group">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                      Nenhuma imagem selecionada
                    </div>
                  )}
                </div>
              </div>

              {/* Upload file or URL */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Carregar Imagem do seu Computador
                </label>
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition-colors border border-slate-200">
                    <Upload size={15} />
                    <span>Escolher arquivo...</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[11px] text-slate-400">
                    PNG, JPG ou WebP (máx. 5MB)
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Ou digite o caminho / URL da imagem:
                  </label>
                  <input
                    type="text"
                    value={editingBanner.image || ''}
                    onChange={(e) => {
                      setEditingBanner({ ...editingBanner, image: e.target.value });
                      setImagePreview(e.target.value);
                    }}
                    placeholder="/Captura de tela 2026-05-30 102302.png"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
                  />
                </div>
              </div>

              {/* Alt description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Título / Descrição do Banner *
                </label>
                <input
                  type="text"
                  value={editingBanner.alt || ''}
                  onChange={(e) => setEditingBanner({ ...editingBanner, alt: e.target.value })}
                  placeholder="Ex: A internet que acompanha sua rotina"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
                />
              </div>

              {/* Target on click */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Destino ao Clicar
                  </label>
                  <select
                    value={editingBanner.target || 'assine'}
                    onChange={(e) => setEditingBanner({ ...editingBanner, target: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
                  >
                    <option value="assine">Página de Assinatura (Fibra)</option>
                    <option value="cnmovel">Página CN Móvel</option>
                    <option value="gps">Página Rastreamento GPS</option>
                    <option value="dedicado">Página Link Dedicado</option>
                    <option value="externo">Link Externo / WhatsApp</option>
                  </select>
                </div>

                {editingBanner.target === 'assine' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Aba da Assinatura
                    </label>
                    <select
                      value={editingBanner.tab || 'residencial'}
                      onChange={(e) => setEditingBanner({ ...editingBanner, tab: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
                    >
                      <option value="residencial">Residencial</option>
                      <option value="gamer">Gamer</option>
                      <option value="casa-conectada">Casa Conectada</option>
                      <option value="radio">Rádio</option>
                      <option value="empresarial">Empresarial</option>
                    </select>
                  </div>
                )}

                {editingBanner.target === 'externo' && (
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      URL Externa
                    </label>
                    <input
                      type="url"
                      value={editingBanner.externalUrl || ''}
                      onChange={(e) => setEditingBanner({ ...editingBanner, externalUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004ecc]"
                    />
                  </div>
                )}
              </div>

              {/* Status checkbox */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={editingBanner.ativo ?? true}
                    onChange={(e) => setEditingBanner({ ...editingBanner, ativo: e.target.checked })}
                    className="rounded border-slate-300 text-[#004ecc] focus:ring-[#004ecc] w-4 h-4"
                  />
                  <span>Banner Ativo (exibido no site)</span>
                </label>
              </div>

              {/* Modal footer */}
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
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#f26522] hover:bg-[#d95213] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Salvando...</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      <span>Salvar Banner</span>
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
