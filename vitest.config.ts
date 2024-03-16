import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    testTimeout: 20000,
    coverage: {
      enabled: false,
      reportOnFailure: true,
      provider: 'v8',
      clean: true,
      reporter: ['text', 'html'],
      include: ['src/**/*.(t|j)s'],
      exclude: [...(configDefaults.coverage.exclude ?? []), 'node_modules/'],
      thresholds: {
        perFile: true,
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
    exclude: [...configDefaults.exclude],
    include: ['**/*.spec.ts'],
  },
});
