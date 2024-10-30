import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Camera, Music, Heart, Upload } from 'lucide-react';
import type { FormData } from './types';
import Preview from './components/Preview';

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    message: '',
    youtubeUrl: '',
    photos: [],
    photoCount: 3
  });
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [showQR, setShowQR] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > formData.photoCount) {
      alert(`Por favor, selecione apenas ${formData.photoCount} foto${formData.photoCount > 1 ? 's' : ''}.`);
      return;
    }

    setFormData(prev => ({ ...prev, photos: files }));
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowQR(true);
  };

  const inputClassName = "w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all";
  const buttonClassName = "w-full bg-gradient-to-r from-blue-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-all transform hover:scale-105";

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-10">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-pink-500 inline-block text-transparent bg-clip-text"
          >
            QR Surpresa
          </motion.h1>
          <p className="text-blue-300 mt-2">Crie memórias especiais para compartilhar</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="space-y-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-blue-300 mb-2">Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={inputClassName}
                  required
                />
              </div>

              <div>
                <label className="block text-blue-300 mb-2">Mensagem</label>
                <textarea
                  value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className={`${inputClassName} h-32`}
                  required
                />
              </div>

              <div>
                <label className="block text-blue-300 mb-2">Link do YouTube</label>
                <div className="relative">
                  <input
                    type="url"
                    value={formData.youtubeUrl}
                    onChange={e => setFormData(prev => ({ ...prev, youtubeUrl: e.target.value }))}
                    className={inputClassName}
                    placeholder="https://youtube.com/watch?v=..."
                    required
                  />
                  <Music className="absolute right-3 top-3 text-pink-500" size={20} />
                </div>
              </div>

              <div>
                <label className="block text-blue-300 mb-2">Quantidade de Fotos</label>
                <div className="flex gap-4">
                  {[1, 3].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, photoCount: num as 1 | 3 }))}
                      className={`flex-1 p-3 rounded-lg border ${
                        formData.photoCount === num
                          ? 'border-pink-500 bg-pink-500/20 text-white'
                          : 'border-gray-700 text-gray-400'
                      }`}
                    >
                      {num} foto{num > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-blue-300 mb-2">Upload de Fotos</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoChange}
                    className="hidden"
                    id="photo-upload"
                    required
                  />
                  <label
                    htmlFor="photo-upload"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-pink-500 transition-colors"
                  >
                    <div className="text-center">
                      <Upload className="mx-auto text-pink-500 mb-2" size={24} />
                      <span className="text-sm text-gray-400">
                        Clique para fazer upload ({formData.photoCount} foto{formData.photoCount > 1 ? 's' : ''})
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <button type="submit" className={buttonClassName}>
                Gerar QR Code
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            className="space-y-6"
          >
            {previewUrls.length > 0 && (
              <Preview data={formData} previewUrls={previewUrls} />
            )}

            {showQR && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center space-y-4 bg-gray-800 p-6 rounded-xl"
              >
                <QRCodeSVG
                  value={window.location.href}
                  size={200}
                  level="H"
                  includeMargin
                  imageSettings={{
                    src: "/heart-icon.png",
                    x: undefined,
                    y: undefined,
                    height: 24,
                    width: 24,
                    excavate: true,
                  }}
                />
                <p className="text-sm text-blue-300">Escaneie para compartilhar</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;