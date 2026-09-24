import AIBox from "../components/AIBox";


import {

Brain

}

from "lucide-react";





export default function AIAnalysis(){



return(


<div className="page-container">



<h1 className="page-title">


<Brain

size={35}

/>

AI Battery Intelligence


</h1>




<p className="page-description">

Artificial Intelligence based battery analysis

</p>





<div className="ai-grid">



<AIBox

title="Battery Health"

value="98%"

description="Excellent condition"

/>




<AIBox

title="Remaining Life"

value="842"

description="Predicted cycles"

/>




<AIBox

title="Weak Cell"

value="Cell 7"

description="Voltage imbalance detected"

/>




</div>






<div className="recommendation">



<h2>

AI Recommendation

</h2>




<ul>


<li>

✓ Balance Cell 7

</li>


<li>

✓ Reduce charging current

</li>


<li>

✓ Monitor temperature

</li>


<li>

✓ Perform battery maintenance

</li>


</ul>



</div>





</div>



)


}