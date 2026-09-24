import {

Brain

}

from "lucide-react";



export default function AIBox({

title,

value,

description

}){


return(


<div className="ai-box">


<div

style={{

display:"flex",

alignItems:"center",

gap:"10px"

}}

>


<Brain

color="#4caf50"

/>


<h3 className="ai-title">

{title}

</h3>


</div>





<h1 className="ai-value">

{value}

</h1>



<p className="ai-description">

{description}

</p>



</div>


)

}