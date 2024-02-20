import express from 'express';
import {
    getAllSuratMasuk,
    getSuratMasukById,
    createSuratMasuk,
    updateSuratMasuk,
    deleteSuratMasuk
} from '../controllers/SuratMasukController.js';

const router = express.Router();

router.get('/surat_masuk', getAllSuratMasuk);
router.get('/surat_masuk/:id', getSuratMasukById);
router.post('/surat_masuk/', createSuratMasuk);
router.patch('/surat_masuk/:id', updateSuratMasuk);
router.delete('/surat_masuk/:id', deleteSuratMasuk);

export default router;
