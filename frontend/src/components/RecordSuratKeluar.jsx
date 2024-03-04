import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { RiFileExcel2Fill } from "react-icons/ri";
import Pagination from "./Pagination";
import TambahSuratKeluar from "./TambahSuratKeluar";
import EditSuratKeluar from "./EditSuratKeluar";
import HapusSuratKeluar from "./HapusSuratKeluar";
import * as XLSX from 'xlsx';

const RecordSuratKeluar = ({ user }) => {
    const userRole = user && user.role;

    if (!user || !userRole) {
        return <div>Loading...</div>;
    }

    const [suratKeluar, setSuratKeluar] = useState([]);
    const [showTambahModal, setShowTambahModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSuratKeluarId, setSelectedSuratKeluarId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [exportData, setExportData] = useState([]);

    useEffect(() => {
        getSuratKeluar();
    }, [currentPage, entriesPerPage]);

    const navigate = useNavigate();

    const getSuratKeluar = async () => {
        try {
            const response = await axios.get("http://localhost:5000/surat_keluar");
            setSuratKeluar(response.data);
            setExportData(response.data);
        } catch (error) {
            console.error("Error fetching surat keluar: ", error);
        }
    };

    const exportToExcel = () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = 'surat_keluar_export';

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName + fileExtension;
        a.click();
    };

    const handleEditSuratKeluar = (suratKeluarId) => {
        setShowEditModal(true);
        setSelectedSuratKeluarId(suratKeluarId);
    };

    const handleDeleteSuratKeluar = (suratKeluarId) => {
        setShowDeleteModal(true);
        setSelectedSuratKeluarId(suratKeluarId);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        return formattedDate;
    };

    const filteredSuratKeluar = suratKeluar.filter(surat => {
        return surat.perihal_surat.toLowerCase().includes(searchTerm.toLowerCase()) ||
                surat.penerima_surat_nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                surat.tanggal_surat_keluar.toLowerCase().includes(searchTerm.toLowerCase()) ||
                surat.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const indexOfLastEntry = Math.min(currentPage * entriesPerPage, filteredSuratKeluar.length);
    const indexOfFirstEntry = Math.max(0, indexOfLastEntry - entriesPerPage);
    const currentEntries = filteredSuratKeluar.slice(indexOfFirstEntry, indexOfLastEntry);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <Fragment>
            <div className='m-8'>
                <div className='text-2xl font-semibold'>
                    <h1>Surat Keluar</h1>
                </div>
                <div className='bg-zinc-100 mt-5 shadow-md rounded h-[75vh] '>
                    <div className='m-3 p-1'>
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-2 mt-2 border border-gray-300 rounded"
                        />
                        <select
                            className="p-2 ml-2 mt-2 border border-gray-300 rounded"
                            onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
                            value={entriesPerPage}
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        <button
                            onClick={exportToExcel}
                            className="p-2 ml-2 mt-2 flex bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            <RiFileExcel2Fill className='text-zinc-100 text-xl mt-0.5' />
                            <span className='ml-1 text-zinc-100'>Export to Excel</span>
                        </button>
                        <div className='mt-2'>
                            <table className="table-auto w-full mb-3  border-collapse border border-gray-300">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="px-4 py-2">No</th>
                                        <th className="px-4 py-2">Perihal Surat</th>
                                        <th className="px-4 py-2">Penerima Surat</th>
                                        <th className="px-4 py-2">Tanggal Surat Keluar</th>
                                        <th className="px-4 py-2">Dibuat oleh</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentEntries.map((surat, index) => (
                                        <tr key={surat.uuid} className="hover:bg-gray-100">
                                            <td className="border border-slate-200 px-4 py-2">{indexOfFirstEntry + index + 1}</td>
                                            <td className="border border-slate-200 px-4 py-2">{surat.perihal_surat}</td>
                                            <td className="border border-slate-200 px-4 py-2">{surat.penerima_surat_nama}</td>
                                            <td className="border border-slate-200 px-4 py-2">{formatDate(surat.tanggal_surat_keluar)}</td>
                                            <td className="border border-slate-200 px-4 py-2">{surat.createdBy}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <Pagination className='mt-3'
                                totalEntries={filteredSuratKeluar.length}
                                entriesPerPage={entriesPerPage}
                                currentPage={currentPage}
                                onPageChange={onPageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <TambahSuratKeluar isVisible={showTambahModal} onClose={() => setShowTambahModal(false)} user={user} />
            <EditSuratKeluar isVisible={showEditModal} onClose={() => setShowEditModal(false)} suratKeluarId={selectedSuratKeluarId} user={user} />
            <HapusSuratKeluar isVisible={showDeleteModal} onClose={() => setShowDeleteModal(false)} suratKeluarId={selectedSuratKeluarId} user={user} />
        </Fragment>
    );
}

export default RecordSuratKeluar;
