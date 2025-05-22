import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://igroom.ru',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            proxyReq.removeHeader('origin');
            proxyReq.removeHeader('referer');
            
            console.log('Sending Request:', {
              method: req.method,
              url: req.url,
              target: proxyReq.path,
              headers: proxyReq.getHeaders()
            });
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            proxyRes.headers['access-control-allow-origin'] = '*';
            proxyRes.headers['access-control-allow-methods'] = 'GET,HEAD,PUT,PATCH,POST,DELETE';
            proxyRes.headers['access-control-allow-headers'] = '*';
            proxyRes.headers['access-control-allow-credentials'] = 'true';
            
            console.log('Received Response:', {
              statusCode: proxyRes.statusCode,
              url: req.url,
              headers: proxyRes.headers
            });
          });
        }
      }
    }
  }
})
