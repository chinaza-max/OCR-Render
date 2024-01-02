const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');

const app = express();
const port = 3000; // Choose a port

// Multer Configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API Endpoint for Image Upload
app.post('/upload', upload.single('image'), (req, res) => {
    console.log('start')
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Process Image using Tesseract.js
  const imageBuffer = req.file.buffer;

  Tesseract.recognize(imageBuffer)
    .then(({ data: { text } }) => {
      res.json({ text });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error processing image' });
    });
});

// Start the Express Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
