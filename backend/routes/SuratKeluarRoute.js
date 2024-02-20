import express from 'express';
import {
    getAllSuratKeluar,
    getSuratKeluarById,
    createSuratKeluar,
    updateSuratKeluar,
    deleteSuratKeluar
} from '../controllers/SuratKeluarController.js';

const router = express.Router();

router.get('/surat_keluar', getAllSuratKeluar);
router.get('/surat_keluar/:id', getSuratKeluarById);
router.post('/surat_keluar', createSuratKeluar);
router.patch('/surat_keluar/:id', updateSuratKeluar);
router.delete('/surat_keluar/:id', deleteSuratKeluar);

export default router;
