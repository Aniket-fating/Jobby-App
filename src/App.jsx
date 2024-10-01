import { Route, Routes } from "react-router-dom";
import JobsDetailedView from "./detailedView";
import Home from "./Home";
import Jobs from "./jobs";
import Login from "./login";
import NotFound from "./notFound";
import ProtectedRoute from "./protectedRoute";



const App = () => {

  return(

            <Routes> 



                    <Route path="/" element = {<ProtectedRoute Component = {Home}/>}></Route>

                    <Route path="/login" element = {<Login/>}></Route>

                    <Route path="/jobs" element = {<ProtectedRoute Component = {Jobs}/>}></Route>

                    <Route path="/jobs/:id" element = {<ProtectedRoute Component = {JobsDetailedView}/>}></Route>

                    <Route path="/*" element = {<NotFound/>}></Route>

            </Routes>


        )





}





export default App;