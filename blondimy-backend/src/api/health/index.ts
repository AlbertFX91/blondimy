import express from 'express';

const router = express.Router();

router.get('/health', (req, res) => {
    res.json({status: 'UP'}).status(200);
});

export default router;