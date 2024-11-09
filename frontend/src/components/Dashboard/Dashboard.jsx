import React from 'react'
import Appointments from './AllAppointments'
import Layout from '../../pages/Layout'

function Dashboard() {
  return (
    <div>
      <Layout>

        <Appointments/>
      </Layout>
    </div>
  )
}

export default Dashboard