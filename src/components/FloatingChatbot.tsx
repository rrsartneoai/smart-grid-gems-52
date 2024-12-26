import { useState } from 'react';
import { Chatbot } from './Chatbot';
import { Button } from './ui/button';
import { Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4"
          >
            <Chatbot />
          </motion.div>
        )}
      </AnimatePresence>
      
      <Button
        size="lg"
        className="rounded-full p-4 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Zap className="h-6 w-6 animate-pulse" />
      </Button>
    </div>
  );
}