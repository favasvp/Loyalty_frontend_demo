import React from 'react'
import BarChart from '../BarChart'

const CustomerGrowth = ({customerGrowthData}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-medium text-gray-900">
        Customer Growth
      </h3>
      <select className="text-sm border border-gray-300 rounded-lg px-3 py-2">
        <option>Last 6 Months</option>
        <option>Last Year</option>
      </select>
    </div>
    <div className="h-64">
      <BarChart data={customerGrowthData} />
    </div>
  </div>
  )
}

export default CustomerGrowth
