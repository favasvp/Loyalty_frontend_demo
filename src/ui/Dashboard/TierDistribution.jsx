import React from 'react'
import DoughnutChart from '../DoughnutChart'

const TierDistribution = ({tierDistributionData}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-lg font-medium text-gray-900 mb-6">
      Tier Distribution
    </h3>
    <div className="h-64">
      <DoughnutChart data={tierDistributionData} />
    </div>
  </div>
  )
}

export default TierDistribution
