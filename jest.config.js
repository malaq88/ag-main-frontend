module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    transform: {
      '^.+\\.vue$': 'vue-jest',
      '^.+\\.js$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'json', 'vue'],
    transformIgnorePatterns: ['/node_modules/'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
  };
  