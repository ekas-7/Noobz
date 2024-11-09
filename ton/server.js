
// imageShare.js
const { Contract, ContractProvider, Sender } = require('ton-core');

class ImageShare extends Contract {
    static createForDeploy(doctor, patient) {
        return new ImageShare({
            code: Cell.fromBoc(Buffer.from(contractCode, 'base64')), // Your contract code here
            data: beginCell()
                .storeAddress(doctor)
                .storeAddress(patient)
                .storeString("")
                .endCell()
        });
    }

    async sendShareUrl(provider, via, url) {
        await provider.internal(via, {
            value: toNano('0.01'),
            bounce: false,
            body: beginCell()
                .storeUint(0, 32) // op code for ShareUrl
                .storeString(url)
                .endCell()
        });
    }

    async getUrl(provider) {
        const result = await provider.get('getUrl');
        return result.stack.readString();
    }
}

// server.js
const express = require('express');
const { TonClient, WalletContractV4 } = require('ton');
const { mnemonicToPrivateKey } = require('ton-crypto');
const config = require('./config');

const app = express();
app.use(express.json());

// Initialize TON client
const client = new TonClient({
    endpoint: config.endpoint,
    apiKey: config.apiKey
});

let contract;

async function initializeContract(doctorAddress, patientAddress) {
    // Load your wallet credentials (from environment variables or secure storage)
    const mnemonic = process.env.WALLET_MNEMONIC.split(' ');
    const key = await mnemonicToPrivateKey(mnemonic);
    
    // Initialize wallet
    const wallet = WalletContractV4.create({
        publicKey: key.publicKey,
        workchain: config.workchain
    });
    
    // Create contract instance
    contract = ImageShare.createForDeploy(
        Address.parse(doctorAddress),
        Address.parse(patientAddress)
    );
    
    // Deploy contract
    const deployResult = await client.deploy({
        wallet,
        contract
    });
    
    console.log('Contract deployed at:', deployResult.address.toString());
    return deployResult.address.toString();
}

// API Endpoints
app.post('/deploy', async (req, res) => {
    try {
        const { doctorAddress, patientAddress } = req.body;
        const contractAddress = await initializeContract(doctorAddress, patientAddress);
        res.json({ success: true, contractAddress });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/shareUrl', async (req, res) => {
    try {
        const { url } = req.body;
        await contract.sendShareUrl(client.provider(), {
            value: toNano('0.01')
        }, url);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/getUrl', async (req, res) => {
    try {
        const url = await contract.getUrl(client.provider());
        res.json({ success: true, url });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});