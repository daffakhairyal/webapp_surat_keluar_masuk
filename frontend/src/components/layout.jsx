/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import Sidebar from './sidebar'

const Layout = ({children}) => {
  return (
    <React.Fragment>
      <div className='flex h-screen'>
        <div><Sidebar className='shadow:lg'/></div>
        
        <div className='bg-slate-100 h-screen w-screen flex flex-col relative'>
          <main style={{ paddingBottom: '50px', flex: 1 }}>{children}</main>
          <footer className='bg-slate-200 text-slate-600 text-right text-m pb-4 pt-5 pr-5 bottom-0 right-0 w-full'>Created by Daffa Khairy Almayrizq</footer>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Layout
