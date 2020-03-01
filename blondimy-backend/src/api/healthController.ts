import express from 'express';

const app = express.Router();

app.get('/health', (req, res) => {
    res.json({status: 'UP'}).status(200);
});

export default app;