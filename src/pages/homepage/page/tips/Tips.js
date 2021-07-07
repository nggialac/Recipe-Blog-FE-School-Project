import React from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import TipsMain from './TipsMain'

export default function Tips() {
    return (
        <div>
        {" "}
        <Navbar isActive={true} />
        <TipsMain />
        <Footer />
      </div>
    )
}
