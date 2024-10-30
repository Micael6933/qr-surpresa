import React from 'react';
import { motion } from 'framer-motion';
import YouTube from 'react-youtube';
import { PreviewProps } from '../types';
import { Heart } from 'lucide-react';

const Preview: React.FC<PreviewProps> = ({ data, previewUrls }) => {
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : '';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-lg mx-auto bg-gray-900 rounded-xl shadow-2xl overflow-hidden"
    >
      <div className="p-6">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-pink-500 mb-2">{data.name}</h2>
            <p className="text-blue-300 italic">{data.message}</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {previewUrls.map((url, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="relative rounded-lg overflow-hidden"
              >
                <img
                  src={url}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
              </motion.div>
            ))}
          </div>

          {data.youtubeUrl && (
            <div className="aspect-video rounded-lg overflow-hidden">
              <YouTube
                videoId={getYouTubeId(data.youtubeUrl)}
                opts={{
                  width: '100%',
                  height: '100%',
                  playerVars: {
                    autoplay: 0,
                  },
                }}
                className="w-full"
              />
            </div>
          )}

          <div className="flex justify-center">
            <Heart className="text-pink-500 animate-pulse" size={24} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preview;