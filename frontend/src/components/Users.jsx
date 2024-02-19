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

const Users = () => {
    const [users, setUsers] = useState([]);
    const [showTambahModal, setShowTambahModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getUsers();
    }, [currentPage, entriesPerPage]);

    const getUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users: ", error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/users/${userId}`);
            getUsers();
        } catch (error) {
            console.error("Error deleting user: ", error);
        }
    };

    const handleEditUser = (userId) => {
        setShowEditModal(true);
        setSelectedUserId(userId);
    };

    const handleDeleteUser = (userId) => {
        setShowDeleteModal(true);
        setSelectedUserId(userId);
    };

    // Filter users based on search term
    const filteredUsers = users.filter(user => {
        return user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
               user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
               user.division.toLowerCase().includes(searchTerm.toLowerCase());
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
                                        <th className="px-4 py-2">Email</th>
                                        <th className="px-4 py-2">Role</th>
                                        <th className="px-4 py-2">Division</th>
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentEntries.map((user, index) => (
                                        <tr key={user.uuid} className="hover:bg-gray-100">
                                            <td className="border border-slate-200 px-4 py-2">{indexOfFirstEntry + index + 1}</td>
                                            <td className="border border-slate-200 px-4 py-2">{user.name}</td>
                                            <td className="border border-slate-200 px-4 py-2">{user.email}</td>
                                            <td className="border border-slate-200 px-4 py-2">{user.role}</td>
                                            <td className="border border-slate-200 px-4 py-2">{user.division}</td>
                                            <td className="border border-slate-200 px-4 py-2 flex justify-center">
                                                <button className="bg-blue-400 hover:bg-blue-500 duration-500 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditUser(user.uuid)}>
                                                    <FaEdit className='text-zinc-100' />
                                                </button>
                                                <button className="bg-red-400 hover:bg-red-500 duration-500 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleDeleteUser(user.uuid)}>
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
                    <Pagination 
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
            <EditPegawai className='duration-500' isVisible={showEditModal} onClose={() => setShowEditModal(false)} userId={selectedUserId} />
            <HapusPegawai className='duration-500' isVisible={showDeleteModal} onClose={() => setShowDeleteModal(false)} userId={selectedUserId} />
        </Fragment>
    );
}

export default Users;
