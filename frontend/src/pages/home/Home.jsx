import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import MessageContainer from '../../components/messages/MessageContainer.jsx'

const Home = () => {
  return (
    <div className="flex h-screen">
      <div className="mx-auto my-12 max-w-7xl flex-grow flex">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  )
}

export default Home
