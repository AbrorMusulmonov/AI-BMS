import {
    useNavigate
} from "react-router-dom";


import {
    Battery,
    Brain,
    Info
} from "lucide-react";



export default function Home(){


const navigate = useNavigate();



return(


<div className="home-page">



<h1 className="home-title">

AI-BMS

</h1>



<p className="home-subtitle">

Intelligent Battery Management System

</p>





<div className="selection-container">



{/* Li-Ion */}


<div

className="selection-card"

onClick={()=>navigate("/battery")}

>


<Battery

size={65}

color="#4caf50"

/>



<h2>

Li-Ion Battery

</h2>



<p>

16S Battery Pack

</p>


</div>





{/* AI Analysis */}


<div

className="selection-card"

onClick={()=>navigate("/ai")}

>


<Brain

size={65}

color="#4caf50"

/>


<h2>

AI Analysis

</h2>


<p>

Battery Intelligence

</p>


</div>






{/* About */}


<div

className="selection-card"

onClick={()=>navigate("/about")}

>


<Info

size={65}

color="#4caf50"

/>



<h2>

About

</h2>


<p>

AI-BMS Platform

</p>



</div>



</div>



</div>


)

}