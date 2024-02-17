import Division from "../models/DivisionModel.js"

export const getDivisions = async (req,res) => {
    try {
        const response = await Division.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getDivisionById = async (req,res)=> {
    try {
        const response = await Division.findOne({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createDivision = async (req,res)=> {
    const {name}= req.body;
    try {
        await Division.create({
            name:name
        })
        res.status(201).json({msg:"Divisi berhasil ditambahkan!"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }}

export const updateDivision = async (req,res)=> {
    const division = await Division.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!division) return res.status(404).json({msg:"Division tidak ditemukan!"})
    const {name}=req.body;
    try {
        await Division.update({
            name:name,
        },{
            where:{
                id: division.id
            }
        });
        res.status(200).json({msg:"User berhasil diubah!"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const deleteDivision = async (req,res)=>{
    const division = await Division.findOne({
        where:{
            uuid:req.params.id
        }
    })
    if (!division) return res.status(404).json({msg:"Divisi tidak ditemukan!"})
    try {
        await Division.destroy({
            where:{
                id: division.id
            }
        });
        res.status(200).json({msg:"Division berhasil dihapus!"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}