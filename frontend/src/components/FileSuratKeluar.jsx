import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { IoMdAddCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaLock, FaUnlock, FaPrint } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from './Pagination';
import TambahSuratKeluar from './TambahSuratKeluar';
import EditSuratKeluar from './EditSuratKeluar';
import HapusSuratKeluar from './HapusSuratKeluar';

const FileSuratKeluar = ({ user }) => {
    const [suratKeluar, setSuratKeluar] = useState([]);
    const [statusDataLoaded, setStatusDataLoaded] = useState(false);
    const [showTambahModal, setShowTambahModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSuratKeluarId, setSelectedSuratKeluarId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/surat_keluar');
                console.log('Surat keluar response:', response.data)
                setSuratKeluar(response.data);
                setStatusDataLoaded(true);
            } catch (error) {
                console.error('Error fetching surat keluar: ', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setStatusDataLoaded(true);
    }, [suratKeluar]);

    const navigate = useNavigate();

    const handleEditSuratKeluar = (suratKeluarId) => {
        setShowEditModal(true);
        setSelectedSuratKeluarId(suratKeluarId);
    };

    const handleDeleteSuratKeluar = (suratKeluarId) => {
        setShowDeleteModal(true);
        setSelectedSuratKeluarId(suratKeluarId);
    };

    const handlePrintSuratKeluar = (suratKeluarId) => {
        const suratKeluar = suratKeluar.find(item => item.uuid === suratKeluarId);
        if (suratKeluar) {
            navigate(`/surat-keluar/${suratKeluarId}`);
        } else {
            console.error(`Surat keluar with id ${suratKeluarId} not found.`);
        }
    };

    const handleLockUnlockSuratKeluar = async (suratKeluarId, newStatus) => {
        try {
            await axios.patch(`http://localhost:5000/surat_keluar/${suratKeluarId}`, { status: newStatus });
            setSuratKeluar(prevSuratKeluar => {
                return prevSuratKeluar.map(surat => {
                    if (surat.uuid === suratKeluarId) {
                        return { ...surat, status: newStatus };
                    }
                    return surat;
                });
            });
        } catch (error) {
            console.error(`Error ${newStatus === 1 ? 'locking' : 'unlocking'} surat keluar: `, error);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const renderActionButtons = (surat) => {
        console.log('Surat keluar status:', surat.status);
    
        if (!statusDataLoaded) return null;
    
        switch (surat.status) {
            case true:
                return (
                    <Fragment>
                        <button className="bg-yellow-400 hover:bg-yellow-500 duration-500 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handlePrintSuratKeluar(surat.uuid)}>
                            <FaPrint className='text-zinc-100' />
                        </button>
                        <button className="bg-green-400 hover:bg-green-500 duration-500 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleLockUnlockSuratKeluar(surat.uuid, false)}>
                            <FaUnlock className='text-zinc-100' />
                        </button>
                    </Fragment>
                );
            case false:
                return (
                    <Fragment>
                        <button className="bg-blue-400 hover:bg-blue-500 duration-500 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditSuratKeluar(surat.uuid)}>
                            <FaEdit className='text-zinc-100' />
                        </button>
                        <button className="bg-red-400 hover:bg-red-500 duration-500 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleDeleteSuratKeluar(surat.uuid)}>
                            <MdDelete className='text-zinc-100' />
                        </button>
                        <button className="bg-yellow-400 hover:bg-yellow-500 duration-500 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handlePrintSuratKeluar(surat.uuid)}>
                            <FaPrint className='text-zinc-100' />
                        </button>
                        <button className="bg-green-400 hover:bg-green-500 duration-500 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleLockUnlockSuratKeluar(surat.uuid, true)}>
                            <FaLock className='text-zinc-100' />
                        </button>
                    </Fragment>
                );
            default:
                return null;
        }
    };

    const filteredSuratKeluar = suratKeluar.filter((surat) => {
        return (
            surat.perihal_surat.toLowerCase().includes(searchTerm.toLowerCase()) ||
            surat.penerima_surat_nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
            surat.tanggal_surat_keluar.toLowerCase().includes(searchTerm.toLowerCase()) ||
            surat.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const indexOfLastEntry = Math.min(currentPage * entriesPerPage, filteredSuratKeluar.length);
    const indexOfFirstEntry = Math.max(0, indexOfLastEntry - entriesPerPage);
    const currentEntries = filteredSuratKeluar.slice(indexOfFirstEntry, indexOfLastEntry);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Fragment>
            <div className='m-8'>
                <div className='text-2xl font-semibold'>
                    <h1>Surat Keluar</h1>
                </div>
                <div className='bg-zinc-100 mt-5 shadow-md rounded h-[75vh] '>
                    <div className='m-3 p-1'>
                        <button
                            className='flex rounded bg-blue-400 hover:bg-blue-500 duration-500 p-2 mt-2 shadow-md'
                            onClick={() => setShowTambahModal(true)}
                        >
                            <IoMdAddCircle className='text-zinc-100 text-xl mt-0.5' />
                            <span className='ml-1 text-zinc-100'>Tambah Surat Keluar</span>
                        </button>
                        <input
                            type='text'
                            placeholder='Search...'
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='p-2 mt-2 border border-gray-300 rounded'
                        />
                        <select
                            className='p-2 ml-2 mt-2 border border-gray-300 rounded'
                            onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
                            value={entriesPerPage}
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        <div className='mt-2'>
                            <table className='table-auto w-full mb-3  border-collapse border border-gray-300'>
                                <thead className='bg-gray-200'>
                                    <tr>
                                        <th className='px-4 py-2'>Actions</th>
                                        <th className='px-4 py-2'>No</th>
                                        <th className='px-4 py-2'>Perihal Surat</th>
                                        <th className='px-4 py-2'>Penerima Surat</th>
                                        <th className='px-4 py-2'>Tanggal Surat Keluar</th>
                                        <th className='px-4 py-2'>Dibuat oleh</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentEntries.map((surat, index) => (
                                        <tr key={surat.uuid} className='hover:bg-gray-100'>
                                            <td className="border border-slate-200 px-4 py-2 flex justify-center">
                                                {renderActionButtons(surat)}
                                            </td>
                                            <td className='border border-slate-200 px-4 py-2'>{indexOfFirstEntry + index + 1}</td>
                                            <td className='border border-slate-200 px-4 py-2'>{surat.perihal_surat}</td>
                                            <td className='border border-slate-200 px-4 py-2'>{surat.penerima_surat_nama}</td>
                                            <td className='border border-slate-200 px-4 py-2'>{formatDate(surat.tanggal_surat_keluar)}</td>
                                            <td className='border border-slate-200 px-4 py-2'>{surat.createdBy}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <Pagination
                                className='mt-3'
                                totalEntries={filteredSuratKeluar.length}
                                entriesPerPage={entriesPerPage}
                                currentPage={currentPage}
                                onPageChange={onPageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <TambahSuratKeluar
                className='duration-500'
                isVisible={showTambahModal}
                onClose={() => setShowTambahModal(false)}
                user={user}
            />
            <EditSuratKeluar
                className='duration-500'
                isVisible={showEditModal}
                onClose={() => setShowEditModal(false)}
                suratKeluarId={selectedSuratKeluarId}
                user={user}
            />
            <HapusSuratKeluar
                className='duration-500'
                isVisible={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                suratKeluarId={selectedSuratKeluarId}
                user={user}
            />
        </Fragment>
    );
};

export default FileSuratKeluar;
