// import required packages
import React from 'react'
import DayChart from './Charts/DayChart'
import MonthChart from './Charts/MonthChart'

const Dashboard = () => {
  return (
    <>
      <div className="container">
        <div className="row pt-5">
          <div className="col-lg-6">
            <DayChart />
          </div>
          <div className="col-lg-6">
            <MonthChart />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard