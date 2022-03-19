import "./css files/formInput.css";
import { useState } from "react";

// learning how to build full fleged forms end to end yo !!
// from Lama dev react forms without library yt video !!

const LearnReactForms = () => {
    const [ username , setUsername ] = useState("");
    return (
    <>
    <form>
        <FormInput placeholder="Username" setUsername={ setUsername } />
        <FormInput placeholder="Email"/>
        <FormInput placeholder="Full Name"/>
        <FormInput placeholder="Sth else"/>
    </form> 
    
    </>  );
}
 
export default LearnReactForms;

// ----------------- components ----------------------------

const FormInput = ({props}) => {
    return (
    <>
        <div className="formInput">
            <label>Username</label>
            <input placeholder={ props.placeholder } onChange={ e => props.setUsername(e.target.value) } /> 
        </div>
    </>  );
}
 
