import express, { Request, Response } from 'express';
import { serviceLLM } from '../service/serviceLLM';

const router = express.Router();

router.post('/analyse', async (req: Request, res: Response) => {
    try {
        const { scores_par_thematique, score_global, profil_risque, reponses_a_risque } = req.body;
        const analyse = await serviceLLM(scores_par_thematique, score_global, profil_risque, reponses_a_risque);
        res.json({ analyse });
        console.log("Analyse générée avec succès:", analyse);
    } catch (error) {
        console.error("Erreur dans la route /analyse:", error);
        res.status(500).json({ error: 'Une erreur est survenue lors de l\'analyse.' });
    }
});

export default router;

