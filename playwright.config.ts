import { defineConfig } from '@playwright/test'

export default defineConfig({
    testDir: './e2e',
    webServer: {
        command: 'npm run preview',
        url: 'http://localhost:4321',
        reuseExistingServer: true,
    },
    use: {
        baseURL: 'http://localhost:4321',
    },
})
