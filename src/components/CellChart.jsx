import {

BarChart,

Bar,

XAxis,

YAxis,

Tooltip,

ResponsiveContainer

}

from "recharts";





export default function CellChart({

cells

}){



const data = Object.keys(cells).map(

(cell)=>(

{

name:"Cell "+cell,

voltage:cells[cell]

}

)

);





return(


<div className="chart-container">


<h2 className="chart-title">

Cell Voltage (16S)

</h2>




<ResponsiveContainer

width="100%"

height={350}

>


<BarChart

data={data}

>



<XAxis

dataKey="name"

/>



<YAxis

domain={[3,4.2]}

/>




<Tooltip/>




<Bar

dataKey="voltage"

fill="#4caf50"

/>



</BarChart>


</ResponsiveContainer>



</div>


)


}