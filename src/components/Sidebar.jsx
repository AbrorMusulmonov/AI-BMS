import {
    Battery,
    Brain,
    Info,
    Settings
} from "lucide-react";


import {
    NavLink
} from "react-router-dom";


export default function Sidebar(){


const menu = [

    {
        name:"Battery View",
        path:"/battery",
        icon:<Battery size={22}/>
    },


    {
        name:"AI Analysis",
        path:"/ai",
        icon:<Brain size={22}/>
    },


    {
        name:"About",
        path:"/about",
        icon:<Info size={22}/>
    },


    {
        name:"Settings",
        path:"#",
        icon:<Settings size={22}/>
    }

];



return(


<div className="sidebar">


<div className="logo">

<h1>
AI-BMS
</h1>

<p>
Intelligent Battery System
</p>

</div>




<div className="menu">


{

menu.map((item)=>(


<NavLink

key={item.name}

to={item.path}

className={({isActive})=>

isActive

?

"menu-item menu-active"

:

"menu-item"

}

>


{item.icon}


<span>

{item.name}

</span>


</NavLink>


))


}


</div>




<div className="sidebar-footer">

© 2026 AI-BMS

</div>



</div>


)

}