import {

Battery,

Heart,

Zap,

Gauge

} from "lucide-react";



export default function BatteryCard({

title,

value,

type

}){


const icons={


SOC:
<Battery size={35}/>,


SOH:
<Heart size={35}/>,


Voltage:
<Zap size={35}/>,


Current:
<Gauge size={35}/>


};





return(


<div className="battery-card">



<div className="battery-icon">

{

icons[type]

}

</div>



<p className="battery-label">

{title}

</p>



<h1 className="battery-value">

{value}

</h1>



</div>


)


}