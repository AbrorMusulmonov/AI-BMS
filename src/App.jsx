import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";


import Home from "./pages/Home";
import Battery from "./pages/Battery";
import AIAnalysis from "./pages/AIAnalysis";
import About from "./pages/About";
import { LanguageProvider } from "./i18n/LanguageContext";



function Layout({children}) {


return (

<div className="app-layout">


<Sidebar />


<div className="main-content">


<Navbar />


{children}


</div>


</div>

)

}




export default function App(){


return (

<LanguageProvider>
<BrowserRouter>


<Routes>


<Route 
path="/"
element={<Home/>}
/>



<Route

path="/battery"

element={

<Layout>

<Battery/>

</Layout>

}

/>



<Route

path="/ai"

element={

<Layout>

<AIAnalysis/>

</Layout>

}

/>



<Route

path="/about"

element={

<Layout>

<About/>

</Layout>

}

/>



</Routes>


</BrowserRouter>
</LanguageProvider>


)

}