import Users from "../models/UserModel.js";
import argon2 from "argon2"

export const getUsers = async(req,res)=>{
    try {
        const response = await Users.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUserById = async(req,res)=>{
    try {
        const response = await Users.findOne({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createUser = async(req,res)=>{
    const {name,email,password,confPassword,role,division} = req.body;
    if(password !== confPassword) return res.status(400).json({msg:"Password tidak cocok"})
    if (password.length < 8 || password.length > 16) {
        return res.status(400).json({ msg: "Password harus memiliki panjang antara 8 dan 16 karakter" });
    }
    const hashPassword = await argon2.hash(password);
try {
    const existingUser = await Users.findOne({ where: { email: email } });
    if (existingUser) {
        return res.status(400).json({ msg: "Email sudah digunakan" });
    }

    await Users.create({
        name:name,
        email:email,
        password:hashPassword,
        role:role,
        division:division
    });
    res.status(201).json({msg:"User berhasil ditambahkan!"})
} catch (error) {
    res.status(400).json({msg: error.message})
}
}

export const updateUser = async(req,res)=>{
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({msg:"User tidak ditemukan!"})
    const {name,email,password,confPassword,role,division} = req.body;
    let hashPassword;
    if(password === ""|| password === null){
        hashPassword = user.password
    } else{
        hashPassword = await argon2.hash(password)
    }
    if(password !== confPassword) return res.status(400).json({msg:"Password tidak cocok"})
    if (password.length < 8 || password.length > 16) {
        return res.status(400).json({ msg: "Password harus memiliki panjang antara 8 dan 16 karakter" });
    }
    try {
        await Users.update({
            name:name,
            email:email,
            password:hashPassword,
            role:role,
            division:divisionId
        },{
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg:"User berhasil diubah!"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const deleteUser = async(req,res)=>{
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({msg:"User tidak ditemukan!"})
    try {
        await Users.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg:"User berhasil dihapus!"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}