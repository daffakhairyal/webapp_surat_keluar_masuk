/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { IoMdAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import TambahPegawai from "./TambahPegawai";
import EditPegawai from "./EditPegawai";
import HapusPegawai from "./HapusPegawai";
import Pagination from "./Pagination";

const Division = () => {
    const [divisions, setDivisions] = useState([]);
    const [showTambahModal, setShowTambahModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDivisionId, setSelectedDivisionId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getDivisions();
    }, [currentPage, entriesPerPage]);

    const getDivisions = async () => {
        try {
            const response = await axios.get("http://localhost:5000/divisions");
            setDivisions(response.data);
        } catch (error) {
            console.error("Error fetching users: ", error);
        }
    };

    const deleteUser = async (divisionId) => {
        try {
            await axios.delete(`http://localhost:5000/users/${divisionId}`);
            getDivisions();
        } catch (error) {
            console.error("Error deleting user: ", error);
        }
    };

    const handleEditUser = (divisionId) => {
        setShowEditModal(true);
        setSelectedDivisionId(divisionId);
    };

    const handleDeleteUser = (divisionId) => {
        setShowDeleteModal(true);
        setSelectedDivisionId(divisionId);
    };

    // Filter users based on search term
    const filteredUsers = divisions.filter(division => {
        return division.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                division.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                division.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                division.division.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Display limited number of entries per page
    const indexOfLastEntry = Math.min(currentPage * entriesPerPage, filteredUsers.length);
    const indexOfFirstEntry = Math.max(0, indexOfLastEntry - entriesPerPage);
    const currentEntries = filteredUsers.slice(indexOfFirstEntry, indexOfLastEntry);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <Fragment>
            <div className='m-8'>
                <div className='text-2xl font-semibold'>
                    <h1>Users</h1>
                </div>
                <div className='bg-zinc-100 mt-5 shadow-md rounded h-[75vh] '>
                    <div className='m-3 p-1'>
                        <button className='flex rounded bg-blue-400 hover:bg-blue-500 duration-500 p-2 mt-2 shadow-md' onClick={() => setShowTambahModal(true)}>
                            <IoMdAddCircle className='text-zinc-100 text-xl mt-0.5' />
                            <span className='ml-1 text-zinc-100'>Tambah User</span>
                        </button>
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
                        <div className='mt-2'>
                            <div>
                            <table className="table-auto w-full mb-3  border-collapse border border-gray-300">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="px-4 py-2">No</th>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentEntries.map((division, index) => (
                                        <tr key={division.uuid} className="hover:bg-gray-100">
                                            <td className="border border-slate-200 px-4 py-2">{indexOfFirstEntry + index + 1}</td>
                                            <td className="border border-slate-200 px-4 py-2">{division.name}</td>
                                            <td className="border border-slate-200 px-4 py-2 flex justify-center">
                                                <button className="bg-blue-400 hover:bg-blue-500 duration-500 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditUser(division.uuid)}>
                                                    <FaEdit className='text-zinc-100' />
                                                </button>
                                                <button className="bg-red-400 hover:bg-red-500 duration-500 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleDeleteUser(division.uuid)}>
                                                    <MdDelete className='text-zinc-100' />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                    <div>
                    <Pagination  className='mt-3'
                            totalEntries={filteredUsers.length}
                            entriesPerPage={entriesPerPage}
                            currentPage={currentPage}
                            onPageChange={onPageChange}
                        />
                    </div> 
                    </div>
                    
                </div>
                
            </div>
            <TambahPegawai className='duration-500' isVisible={showTambahModal} onClose={() => setShowTambahModal(false)} />
            <EditPegawai className='duration-500' isVisible={showEditModal} onClose={() => setShowEditModal(false)} divisionId={selectedDivisionId} />
            <HapusPegawai className='duration-500' isVisible={showDeleteModal} onClose={() => setShowDeleteModal(false)} divisionId={selectedDivisionId} />
        </Fragment>
    );
}

export default Division;
