import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Other config options...

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/supabase': '/src/services/supabase.ts',
    },
  },

});
