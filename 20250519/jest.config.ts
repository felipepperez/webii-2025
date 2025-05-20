export default {
    moduleFileExtensions: [
      "js",
      "json",
      "ts"
    ],
    rootDir: "src",
    testRegex: ".*\\.spec\\.ts$",
    transform: {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    collectCoverageFrom: [
      "**/*.(t|j)s"
    ],
    coverageDirectory: "../coverage",
    testEnvironment: "node",
    preset: 'ts-jest',
    collectCoverage: true,
    coveragePathIgnorePatterns: [
      '/node_modules/',
      '/dist/',
      '.*\\.module\\.ts$',          // Ignora arquivos *.module.ts
      '.*\\.interface\\.ts$',       // Ignora arquivos *.interface.ts
      '.*\\.dto\\.ts$',             // Ignora arquivos *.dto.ts
      'src/main.ts',                // Ignora o bootstrap do app
      'src/auth.guard.ts',       // Exemplo: ignora um arquivo específico
    ],
  };