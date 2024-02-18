/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { IoMdAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import TambahPegawai from "./TambahPegawai";
import EditPegawai from "./EditPegawai";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [showTambahModal, setShowTambahModal] = useState(false); // Ubah nama menjadi showTambahModal
    const [showEditModal, setShowEditModal] = useState(false); // Ubah nama menjadi showEditModal
    const [selectedUserId, setSelectedUserId] = useState(null); // Menyimpan ID pengguna yang dipilih untuk diedit

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get("http://localhost:5000/users");
        setUsers(response.data);
    };

    const deleteUser = async (userId) => {
        await axios.delete(`http://localhost:5000/users/${userId}`);
        getUsers();
    };

    const handleEditUser = (userId) => {
        setShowEditModal(true); // Menampilkan komponen EditPegawai
        setSelectedUserId(userId); // Menyimpan ID pengguna yang dipilih
    };

    return (
        <Fragment>
            <div className='m-8'>
                <div className='text-2xl font-semibold' >
                    <h1>Users</h1>
                </div>
                <div className='bg-zinc-100 mt-5 shadow-md rounded'>
                    <div className='m-3 p-1'>
                        <button className='flex rounded bg-blue-400 hover:bg-blue-500 duration-500 p-2 mt-2 shadow-md' onClick={() => setShowTambahModal(true)}>
                            <IoMdAddCircle className='text-zinc-100 text-xl mt-0.5' />
                            <span className='ml-1 text-zinc-100 '>Tambah User</span>
                        </button>
                        <div className='mt-2'>
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
                                    {users.map((user, index) => (
                                        <tr key={user.uuid} className="hover:bg-gray-100">
                                            <td className="border border-slate-200 px-4 py-2">{index + 1}</td>
                                            <td className="border border-slate-200 px-4 py-2">{user.name}</td>
                                            <td className="border border-slate-200 px-4 py-2">{user.email}</td>
                                            <td className="border border-slate-200 px-4 py-2">{user.role}</td>
                                            <td className="border border-slate-200 px-4 py-2">{user.division}</td>
                                            <td className="border border-slate-200 px-4 py-2 flex justify-center  ">
                                                <button className="bg-blue-400 hover:bg-blue-500 duration-500 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditUser(user.uuid)}>
                                                    <FaEdit className='text-zinc-100' />
                                                </button>
                                                <button className="bg-red-400 hover:bg-red-500 duration-500 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => deleteUser(user.uuid)}>
                                                    <MdDelete className='text-zinc-100' />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <TambahPegawai className='duration-500' isVisible={showTambahModal} onClose={() => setShowTambahModal(false)} />
            <EditPegawai className='duration-500' isVisible={showEditModal} onClose={() => setShowEditModal(false)} userId={selectedUserId} />
        </Fragment>
    );
}

export default Users;
