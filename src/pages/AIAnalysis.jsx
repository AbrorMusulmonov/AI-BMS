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

Battery Intelligence


</h1>




<p className="page-description">

API ulanishidan oldingi lokal diagnostika natijalari

</p>





<div className="ai-grid">



<AIBox

title="Battery Health"

value="98%"

description="Excellent condition"

/>




<AIBox

title="Remaining Life"

value="0.7 V"

description="Maximum cell voltage delta"

/>




<AIBox

title="Weak Cell"

value="Cell 13"

description="Lowest voltage: 3.5 V"

/>




</div>






<div className="recommendation">



<h2>

AI Recommendation

</h2>




<ul>


<li>

✓ Balance Cell 13

</li>


<li>

✓ Inspect Cell 13 and Cell 15

</li>


<li>

✓ Temperature is in normal range

</li>


<li>

✓ Recheck pack after balancing

</li>


</ul>



</div>





</div>



)


}