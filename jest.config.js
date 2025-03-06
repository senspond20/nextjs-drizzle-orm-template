module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less)$': '<rootDir>/node_modules/tailwindcss',
    },
    // testEnvironment: "jest-environment-jsdom", 브라우저가 아니라 node 환경에서 테스트를 진행해야 db test 가능
    testEnvironment :"node",
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
    },
};