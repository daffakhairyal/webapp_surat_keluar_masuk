/* eslint-disable no-unused-vars */
import React from 'react'
import Sidebar from './sidebar'

const Layout = ({children}) => {
  return (
    <React.Fragment>
      <div className='flex'>
        <div><Sidebar/></div>
        <div>
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Layout