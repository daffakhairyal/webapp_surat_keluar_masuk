/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from "axios";

const HapusSuratKeluar = ({ isVisible, onClose, suratKeluarId }) => {
    const [suratKeluar, setSuratKeluar] = useState(null);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        if (isVisible && suratKeluarId) {
            const fetchSuratKeluarData = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/surat_keluar/${suratKeluarId}`);
                    setSuratKeluar(response.data);
                } catch (error) {
                    console.error('Error fetching surat keluar data:', error);
                }
            };

            fetchSuratKeluarData();
        }
    }, [isVisible, suratKeluarId]);

    const deleteSuratKeluar = async () => {
        try {
            await axios.delete(`http://localhost:5000/surat_keluar/${suratKeluarId}`);
            setMsg("Surat keluar berhasil dihapus!");
            window.location.reload();
            // Tambahkan logika penanganan setelah surat keluar dihapus
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    if (!isVisible) return null;

    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Hapus Surat Keluar</h2>
                <div className="mb-4">
                    <p className="text-gray-700 font-medium mb-2">Apakah Anda yakin ingin menghapus surat keluar ini?</p>
                    {msg && <p className="text-green-500 text-sm">{msg}</p>}
                </div>
                <div className="flex justify-end">
                    <button type="button" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" onClick={deleteSuratKeluar}>Hapus</button>
                    <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md ml-2" onClick={() => onClose()}>Batal</button>
                </div>
            </div>
        </div>
    );
};

export default HapusSuratKeluar;
