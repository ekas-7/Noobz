import multer from 'multer';
import express from 'express';
import axios from 'axios';
import fs from 'fs/promises';

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/'); // Specify the upload directory
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    },
});

const upload = multer({ storage });

// Route to handle file upload and Pinata upload
router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    try {
        // Read the uploaded file into a buffer
        const fileBuffer = await fs.readFile(req.file.path);

        // Prepare FormData with file buffer
        const formData = new FormData();
        formData.append('file', fileBuffer, req.file.originalname);

        // Upload file to Pinata
        const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            headers: {
                ...formData.getHeaders(),
                pinata_api_key: process.env.PINATA_API_KEY,
                pinata_secret_api_key: process.env.PINATA_API_SECRET,
            },
        });

        res.json({ ipfsHash: response.data.IpfsHash });
    } catch (error) {
        console.error('Error uploading to Pinata:', error);
        res.status(500).send('An error occurred while uploading to Pinata');
    }
});

export default router;
