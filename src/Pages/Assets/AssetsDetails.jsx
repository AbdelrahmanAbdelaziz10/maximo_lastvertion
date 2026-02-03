import React from 'react'
import { useParams } from 'react-router-dom'
import ExtendNavBarTabs from '../../components/ServesDetailsCom/ExtendNavBarTabs';


const tabs = [
  "Asset",
  "Spare Parts",
  "Safety",
  "Meters",
  "Specifications",
  "RelationShip",
  "Work",
  "Service Address",
  "Map",
];


const AssetsDetails = () => {
    // const {id} = useParams();
  const [activeTab, setActiveTab] = React.useState(0);

  return (
<div className="mb-2">
    {/*=====Extend NavBar For Assets Details Page */}
      <ExtendNavBarTabs
        routePage={"assets"}
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

          {/*=====Extend NavBar For Assets Details Page */}



    </div>
  )
}

export default AssetsDetails
