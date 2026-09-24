import {
    Bell
} from "lucide-react";



export default function Navbar(){


return(


<div className="navbar">


<h2 className="nav-title">

Battery Monitoring

</h2>




<div
style={{
display:"flex",
alignItems:"center",
gap:"25px"
}}
>


<Bell
size={22}
color="#555"
/>


<div className="profile">

R

</div>



</div>



</div>


)

}