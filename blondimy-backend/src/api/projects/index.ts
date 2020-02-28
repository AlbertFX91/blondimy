// Core imports
import express from 'express';

const router = express.Router();

router.get('/projects', (req, res) => {
    res.json([
        {
            id: 1,
            name: "Project 1",
        },
        {
            id: 2,
            name: "Project 2",
        }
    ]);
});


export default router;