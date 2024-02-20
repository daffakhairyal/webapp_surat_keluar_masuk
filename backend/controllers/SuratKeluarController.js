import SuratKeluar from "../models/SuratKeluar.js";

export const getAllSuratKeluar = async (req, res) => {
    try {
        const suratKeluar = await SuratKeluar.findAll();
        res.status(200).json(suratKeluar);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getSuratKeluarById = async (req, res) => {
    try {
        const suratKeluar = await SuratKeluar.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!suratKeluar) {
            return res.status(404).json({ msg: 'Surat keluar tidak ditemukan' });
        }
        res.status(200).json(suratKeluar);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createSuratKeluar = async (req, res) => {
    try {
        const newSuratKeluar = await SuratKeluar.create(req.body);
        res.status(201).json({ msg: 'Surat keluar berhasil ditambahkan', data: newSuratKeluar });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const updateSuratKeluar = async (req, res) => {
    try {
        const suratKeluar = await SuratKeluar.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!suratKeluar) {
            return res.status(404).json({ msg: 'Surat keluar tidak ditemukan' });
        }
        await suratKeluar.update(req.body);
        res.status(200).json({ msg: 'Surat keluar berhasil diupdate' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteSuratKeluar = async (req, res) => {
    try {
        const suratKeluar = await SuratKeluar.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!suratKeluar) {
            return res.status(404).json({ msg: 'Surat keluar tidak ditemukan' });
        }
        await suratKeluar.destroy();
        res.status(200).json({ msg: 'Surat keluar berhasil dihapus' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
