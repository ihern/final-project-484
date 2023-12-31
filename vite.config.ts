import { defineConfig } from 'vite';
import { fileURLToPath, URL } from "node:url";
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/supabase': '/src/services/supabase.ts',
      '@supabase/supabase-js': '/node_modules/@supabase/supabase-js',
      "@": fileURLToPath(new URL("./src", import.meta.url)),

    },
  },
});