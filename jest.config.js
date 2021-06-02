module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'development',
  },
  restoreMocks: true,
  modulePathIgnorePatterns: [
    '__tests__/fixtures/*',
    '__tests__/utils/*',
  ],
  coveragePathIgnorePatterns: [
    'node_modules',
    'config',
    'models',
    'app.js',
    'tests',
    'routes',
    'public',
    'utils',
    'controllers/errorController.js',
    'controllers/handlerFactory.js',
    'controllers/departmentController.js',
    'controllers/personController.js',
    'controllers/offerController.js',
    'controllers/skillController.js',
  ],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
};
