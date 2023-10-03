import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue()
  ],

  test: {
    globals: true,
    environment: 'jsdom',
    //reporters: 'junit',
    //outputFile: './coverage/junit-result.xml',
    coverage: {
      provider: 'istanbul',
      reporter: ['cobertura', 'html'],
    },
  }
})
