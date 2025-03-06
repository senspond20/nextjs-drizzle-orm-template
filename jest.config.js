module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less)$': '<rootDir>/node_modules/tailwindcss',
    },
    testEnvironment: "jest-environment-jsdom",
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
    },
};