/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react'
import Layout from '../components/layout'
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {getMe} from "../features/authSlice"
import Division from '../components/Division'

const DivisionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state)=> state.auth)

  useEffect(()=> {
    dispatch(getMe());
  },[dispatch]);

  useEffect(()=>{
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate])

  return (
    <Layout>
      <Division/>
    </Layout>
  )
}

export default DivisionPage