import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: false,
    setupNodeEvents(on, config) {
      config.env = {
        name: 'adele',
        email: 'adele@example.com',
        password: '123456',
      };
      return config;
    },
  },
});