import { onAuthStateChanged } from "firebase/auth";
import { react , useState , useEffect , createContext } from "react"
import { auth } from "../firebase/firebase";


// the auth context
export const authContext = createContext();


const AuthContextComponent = (props) => {
    let [ loading , setLoading ] = useState(true);
    let [ user , setUser ] = useState();


    useEffect( () => {
        let unsub = onAuthStateChanged(auth , async(userDetails) => {
            if(userDetails){
                let { displayName , email , uid : userUid , photoURL} = userDetails;
                setUser( { displayName, email , userUid , photoURL});
                
            }
            else if(userDetails === null ){
                setUser( null );
            }

            // notice how is set to false regardless of if the user logs in our not. ( children will be rendered BUT userData will not be passed down)
            setLoading(false);
        })

        return () => {
            unsub();
        }
    } , [] )


    return (
        <authContext.Provider value= { user } >
            { !loading && props.children }
        </authContext.Provider> 
    );
}
 
export default AuthContextComponent;