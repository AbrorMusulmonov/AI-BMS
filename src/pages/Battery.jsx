import {

useEffect,

useState

}

from "react";



import {

ref,

onValue

}

from "firebase/database";



import {

database

}

from "../firebase/config";



import BatteryCard from "../components/BatteryCard";

import CellChart from "../components/CellChart";





export default function Battery(){



const [monitoring,setMonitoring]=useState(null);

const [cells,setCells]=useState(null);





useEffect(()=>{



const monitoringRef = ref(

database,

"batteries/LiIon_16S_001/monitoring"

);



onValue(

monitoringRef,

(snapshot)=>{


setMonitoring(snapshot.val());


}

);





const cellRef = ref(

database,

"batteries/LiIon_16S_001/cells"

);



onValue(

cellRef,

(snapshot)=>{


setCells(snapshot.val());


}

);





},[]);





if(!monitoring || !cells)

return(

<div className="page-container">

<h2>

Loading Battery Data...

</h2>

</div>

);





return(



<div className="page-container">



<h1 className="page-title">

Li-Ion 16S Battery

</h1>



<p className="page-description">

Real-time Battery Monitoring

</p>





<div className="cards-container">



<BatteryCard

title="SOC"

value={monitoring.soc+" %"}

/>


<BatteryCard

title="SOH"

value={monitoring.soh+" %"}

/>


<BatteryCard

title="Voltage"

value={monitoring.voltage+" V"}

/>


<BatteryCard

title="Current"

value={monitoring.current+" A"}

/>


</div>





<div className="cards-container"

style={{
marginTop:"25px"
}}

>



<div className="battery-card">


<p className="battery-label">

Temperature

</p>


<h1 className="battery-value">

{monitoring.temperature}

°C

</h1>


</div>






<div className="battery-card">


<p className="battery-label">

Power

</p>


<h1 className="battery-value">

{monitoring.power}

W

</h1>


</div>



</div>





<CellChart

cells={cells}

/>





</div>


)

}