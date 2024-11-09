// First install required packages:
// npm install ton ton-core ton-crypto express dotenv

// config.js
const { Address } = require('ton-core');

const config = {
    // Replace with your test network endpoint
    endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
    apiKey: process.env.TON_API_KEY,
    // Contract deployment configuration
    workchain: 0 
};

module.exports = config;
