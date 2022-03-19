import {BrowserRouter as Router, Switch ,Route} from "react-router-dom";
import Palette from './palette';
import FrontPage from "./frontPage";
import Listings from "./listings";
import Listing from "./listing"
import HostForm from "./hostForm";
import UserProfile from "./userProfile";
import LearnReactForms from "../learning/forms/learnReactForms";
import ProtectedRoute from "../components/protectedRoute";
import NotFound from "../pages/notFound"
import Experiments from "../pages/experiments"
import FakeDataUploader from "./fakeDataUploader";
import SubtotalModal from "../components/subtotalModal";

const Junction = () => {
    return (
    <> 
        {/* set up router here */}
        <Router>
            <Switch> 
                    <Route exact path="/" component={FrontPage} />   
                    <Route exact path="/listing/:propertyUid" component={Listing} />  
                   <Route exact path="/listings/:cityName" component={Listings} />  
                   <ProtectedRoute exact path="/userProfile/:acknowlegement?" component={UserProfile} />  
                   <Route exact path="/hostForm" component={HostForm} />  
                   


                   {/* learning */}
                   <Route exact path="/learnReactForms" component={ LearnReactForms } />  
                   <Route exact path="/experiments" component={ Experiments } />  



                   {/* demo or developement routes */}
                   <Route exact path="/palette" component={Palette} /> 
                   <Route exact path="/fakeDataUploader" component={ FakeDataUploader} />
                   <Route exact path="/subtotalModal" component={ SubtotalModal} />

                    {/*  make sure that this route is always at the last */}
                   <Route exact path="*" component={ NotFound }/> 
            </Switch>
        </Router> 


    </>  );
}
 
export default Junction;