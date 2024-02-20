import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const SuratKeluar = db.define('surat_keluar', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    tanggal_surat_keluar: {
        type: DataTypes.DATE,
        allowNull: false
    },
    no_urut_surat_keluar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    no_referensi_surat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    peruntukan_surat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    perihal_surat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pembawa_surat_nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pembawa_surat_keterangan: {
        type: DataTypes.STRING,
        allowNull: true
    },
    penerima_surat_nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    penerima_surat_jabatan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    alamat_arsip_lemari_no: {
        type: DataTypes.STRING,
        allowNull: true
    },
    alamat_arsip_map_no: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tempat_surat_menyurat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdBy:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

export default SuratKeluar;
