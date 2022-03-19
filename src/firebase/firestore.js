import { db } from "./firebase";
import { collection , addDoc , doc , setDoc } from "firebase/firestore";

// it works , just checked
export const a = "activate";

// --------------------------------- learning how to use dataConvertor --------------------------

// the object works just fine.
class City { 
    constructor( name , color){
        this.name = name;
        this.color = { yomama : color }
    }
}

// the dataConverter usually creates the problems ( "cityConverter ....... is not a function")
// city converter object contains two functions ---> 
//              1. to convert a custom js object to a pojo
//              2. to convert the pojo pulled from firebase into the into the og custom object format 
const cityConverter = { 
    toFirestore : (city) => {
        return {
            name : city.name,
            color : city.color, // will give us the object
        };
    },
    fromFirestore : ( snapshot , options ) => {
        const data = snapshot.data(options);
        return new City(data.name , data.color );
    }
};

// ( async () => {
//     try{
//         const ref = doc(db , "cities" , "LA" ).withConverter(cityConverter);
//         await setDoc( ref , new City("Los angeles" , "black"));
//         console.log("set successfully")
//     }
//     catch(error){
//         console.log(error);
//     }
// })();

// -------------------------------------------learning complete -----------------------
// no argument below is optional 

class User{
    constructor( displayName , email ,  userUid , propertiesArr = [] , bookingsArr = []  ){
        this.email = email;
        this.displayName = displayName;
        this.userUid = userUid;
        this.propertiesArr = propertiesArr;
        this.bookingsArr = bookingsArr;
        // some stripe stuff ??
    }
}

let userConverter = {
    toFirestore : (user) => {
        return {
            email : user.email,
            displayName : user.displayName,
            userUid : user.userUid,
            propertiesArr : user.propertiesArr,   
            bookingsArr : user.bookingsArr,
        };
    },
    fromFirestore : ( snapshot , options ) => {
        const data = snapshot.data(options);
        return new Property(data.email , data.displayName , data.userUid , data.propertiesArr , data.bookingsArr );
    },
};

// Bookings live inside the User objects bookingsArr. 
class Booking{
    constructor( userUid , bookingUid , propertyUid , checkInDate , checkOutDate   ){
        this.userUid = userUid;
        this.bookingUid = bookingUid;
        this.propertyUid = propertyUid;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;   // checkOut date is included in the stay ( 12 to 15th means 15th too is included)
    }
}

let bookingConverter = {
    toFirestore : (booking) => {
        return {
            userUid : booking.userUid,
            bookingUid : booking.bookingUid,
            propertyUid : booking.propertyUid,
            checkInDate : booking.checkInDate,
            checkOutDate : booking.checkOutDate,
        };
    },
    fromFirestore : ( snapshot , options ) => {
        const data = snapshot.data(options);
        return new Property( data.userUid , data.bookingUid , data.propertyUid , data.checkInDate , data.checkOutDate );
    }
}

// calling it Property instead ofp Listing
// properties live in their own collection.
class Property{
    constructor( propertyUid ,  userUid , propertyDetails ){
        this.propertyUid = propertyUid;
        this.userUid = userUid;
        // host form fields ie. property details object 
        this.propertyDetails = propertyDetails;
        // the propertyDeials object will contain all the details of the property as entered by the host.
    }
}

// imp. note that propertyDetails is an object ( it contains the state of the hostForm ie. the details filled in by the user)
// BAD PRACTICE -- passing a object literal ( whose schema isnt set in stone is a bad practice) cause any change in the literals schema might create inconsistencies in the schema of the created object. 
// to see the schema, print out the state created onSubmit of a fully filled hostForm. :( 

let propertyConverter =  {
    toFirestore : (property) => {
        return {
            propertyUid : property.propertyUid,
            userUid : property.userUid,
            propertyDetails : property.propertyDetails,

        };
    },
    fromFirestore : ( snapshot , options ) => {
        const data = snapshot.data(options);
        return new Property(data.propertyUid , data.userUid , data.propertyDetails  );
    }
};

export {  User , userConverter , Booking , bookingConverter , Property , propertyConverter };



