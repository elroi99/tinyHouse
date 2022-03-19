import { useState , useEffect , useRef } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage , db } from "../firebase/firebase";
import { v4 as uuidv4 } from 'uuid';
import {  londonAddresses , sanFranciscoAddresses, losAngelesAddresses , dubaiAddresses , cancunAddresses  , torontoAddresses,
    sanFranciscoDescriptions , londonDescriptions , losAngelesDescriptions , dubaiDescriptions , cancunDescriptions , torontoDescriptions , 
    londonTitles, sanFranciscoTitles , losAngelesTitles , dubaiTitles , cancunTitles , torontoTitles} from "../assets/staticData/propertyDescriptions"
//  import createPropertyObject from "../assets/"
 import { randomUsers , createPropertyObj } from "../firebase/fakeData/fakeData";
 import { createXProperties  } from "../firebase/fakeData/fakeData";
 

const FakeDataUploader = () => {
    // intention is to upload fake data to firebase 
    let imagesRef = useRef();
    let cityRef = useRef();
    let userImagesRef = useRef();

    let [ cityImages , setCityImages ] = useState();

    useEffect(() => {
        console.log(cityImages)
    } , [ cityImages ] )


    // to change the city data being creted and updated, change the arguments passed here. You have to do it one city at a time. 
    async function uploadImages(cityName){ 

        //   createPropertyObj("dubai" , randomUsers , dubaiAddresses , dubaiTitles , dubaiDescriptions , cityImages.dubai[0])
        createXProperties(24 , "london" , randomUsers , londonAddresses , londonTitles , londonDescriptions, cityImages[cityName]  )

    }

    async function uploadUserImage(){

    }


    

    return (<> 
        <input ref={ cityRef } type="text" placeholder="enter the city name"  /> 
        <br/>
        <input ref={ imagesRef } type="file" multiple accept="image/png,image/jpeg" /> 
        <br/>
        <button onClick={ (e) => { setCityImages( { ...cityImages , [cityRef.current.value] : imagesRef.current.files  } )  } }  > Add image files to state </button>

        <button onClick={ () => {  uploadImages(cityRef.current.value) }}> Create fake property listings </button> 
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <input ref={ cityRef } type="text" placeholder="enter userUid"  /> 
        <br/>
        <input ref={ imagesRef } type="file" multiple accept="image/png,image/jpeg" /> 
        <br/>
        <button onClick={ uploadUserImage}> upload user image </button> 




    </>  );
}
 
export default FakeDataUploader;
