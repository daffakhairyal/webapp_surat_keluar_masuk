import SuratMasuk from "../models/SuratMasuk.js";

export const getAllSuratMasuk = async (req, res) => {
    try {
        const suratMasuk = await SuratMasuk.findAll();
        res.status(200).json(suratMasuk);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getSuratMasukById = async (req, res) => {
    try {
        const suratMasuk = await SuratMasuk.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!suratMasuk) {
            return res.status(404).json({ msg: 'Surat masuk tidak ditemukan' });
        }
        res.status(200).json(suratMasuk);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createSuratMasuk = async (req, res) => {
    try {
        const newSuratMasuk = await SuratMasuk.create(req.body);
        res.status(201).json({ msg: 'Surat masuk berhasil ditambahkan', data: newSuratMasuk });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const updateSuratMasuk = async (req, res) => {
    try {
        const suratMasuk = await SuratMasuk.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!suratMasuk) {
            return res.status(404).json({ msg: 'Surat masuk tidak ditemukan' });
        }
        await suratMasuk.update(req.body);
        res.status(200).json({ msg: 'Surat masuk berhasil diupdate' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteSuratMasuk = async (req, res) => {
    try {
        const suratMasuk = await SuratMasuk.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!suratMasuk) {
            return res.status(404).json({ msg: 'Surat masuk tidak ditemukan' });
        }
        await suratMasuk.destroy();
        res.status(200).json({ msg: 'Surat masuk berhasil dihapus' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
