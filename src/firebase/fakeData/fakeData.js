import { v4 as uuidv4 } from 'uuid';
import { User , userConverter , Property , propertyConverter } from "../firestore";
import { storage , db } from "../firebase";
import { doc , setDoc , withConverter , arrayUnion , updateDoc ,  } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes , uploadString } from "firebase/storage"
import { londonAddresses , sanFranciscoAddresses, losAngelesAddresses , dubaiAddresses , cancunAddresses  , torontoAddresses,
        sanFranciscoDescriptions , londonDescriptions , losAngelesDescriptions , dubaiDescriptions , cancunDescriptions , torontoDescriptions , 
        londonTitles, sanFranciscoTitles , losAngelesTitles , dubaiTitles , cancunTitles , torontoTitles} from "../../assets/staticData/propertyDescriptions"
// import duba from "../../assets/"
export let a = 200;// to activate

  // above users but with UID's assigned to them.

  export let randomUsers = [
    {
      "user": "Tomás Evangelista ",
      "userUid": "d265ad52-0e2c-4112-85e0-cabb4cadeca0"
    },
    {
      "user": "Elisa Mingo ",
      "userUid": "6a98097a-6a7e-4bba-9cd3-cd879c7dc84a"
    },
    {
      "user": "Rémi Moreno ",
      "userUid": "fba69682-376e-409a-9509-3abc48e93016"
    },
    {
      "user": "Annabelle Rosario ",
      "userUid": "1b0c0416-3c86-4e1a-a7f9-c3f73a2dfd19"
    },
    {
      "user": "Amâncio Lopes ",
      "userUid": "c82cb117-beea-4020-a172-254787f9f71f"
    },
    {
      "user": "Everett Parish ",
      "userUid": "6cd0b2cc-a0bf-47cb-b236-eda2f8b7593e"
    },
    {
      "user": "Octavia Bourdillon ",
      "userUid": "f3694549-b647-406a-82e8-615ac2e1cc38"
    },
    {
      "user": "Kurtis Noel ",
      "userUid": "34b40a41-3219-4d24-a1b5-7cb5453734b2"
    },
    {
      "user": "Nannie Snell ",
      "userUid": "ba8c0a80-94a6-4bfd-9309-4f4452ebd339"
    },
    {
      "user": "Hamid Ericson ",
      "userUid": "8ca23a30-02f2-4cb7-a8bc-e11489a4d470"
    },
    {
      "user": "Aline Thomson ",
      "userUid": "5acbda6b-7456-42dd-92c4-5ccbaa8450d9"
    },
    {
      "user": "Tory Garfield ",
      "userUid": "4e7be9ae-17eb-4076-9f6a-5dec4a3fbb46"
    }
  ]

  // image counts
  let dubaiCount = 8;
  let sfCount = 3;
  let londonCount = 7;
  let laCount = 9;
  let cancunCount = 2;
  let torontoCount = 6;

  Math.floor(Math.random() * (dubaiCount)) // 0 and 8 inclusive // just checking the behavior.

//   let needed = [ homeType , maxGuests, title , listingDescription , address , city , state , zipCode , image , pricePerday ]

  // private function
  // creates a single property object of the city you specify.
  export async function createPropertyObj(cityName , randomUsers , cityAddresses , cityTitles , cityDescriptions  , cityImageFile){

      let randomNumber = ( Math.floor(Math.random() * ( cityAddresses.length - 1 )))  // the main random key. // will be used to pick the descriptions , etc ( not user )
      let propertyUid = uuidv4();

      // upload the image to firebase 
      // uploading image and getting storage ref
      let fileRef = ref( storage , `${propertyUid}.jpg`);
      let imageStorageRef = (await uploadBytes(fileRef , cityImageFile )).ref;
      let imageDownloadURL = await getDownloadURL(imageStorageRef);   // the sting to be added to the firestore property object

      // chose a random user ( owner / host )
        let randomUserObj = randomUsers[Math.floor(Math.random() * ( randomUsers.length - 1 ))] // 0 and 8 inclusive
        let hostUid = randomUserObj.userUid;  // the host ( user ) of this property ( not the same as our logged in user )


        let propertyDetails = {
            homeType : ( Math.floor(Math.random() * (2)) > 0 ? "appartment" : "villa" ),
            maxGuests : ( Math.floor(Math.random() * 6)),
            title : cityTitles[randomNumber],
            listingsDescription : cityDescriptions[randomNumber],
            address : cityAddresses[randomNumber],
            city : cityName,
            State : cityName , 
            zipCode : Math.floor(Math.random() * ( 999999 - 100000 + 1) + 100000 ),
            image : imageDownloadURL,
            pricesPerDay : Math.floor(Math.random() * ( 300 - 100 + 1) + 100 ),
        }

        // construct the object and PUSH it to firestore

        let docRef = doc( db , `listings/${propertyUid}` ).withConverter(propertyConverter);
        await setDoc( docRef , new Property(propertyUid , hostUid , propertyDetails ) );
        console.log("single property listing set to firebae yo !!")
  };

// to test if an object is created successfully.
// createPropertyObj( "dubai" , randomUsers , dubaiAddresses , dubaiTitles , dubaiDescriptions );


  // will create x number of Listings of a particular city. 
  export function createXProperties(x , cityName , randomUsers , cityAddresses , cityTitles , cityDescriptions , cityImagesArr){
      for(let i = 0 ; i < x ; i++){

        console.log(cityImagesArr)
        let randomImage = cityImagesArr[Math.floor(Math.random() * ( cityImagesArr.length - 1 ))];  // a random city image yo ! 
        console.log(randomImage);
        // will create and set the property objects to Firebase. // will also add its image online. 
        createPropertyObj(cityName , randomUsers , cityAddresses , cityTitles , cityDescriptions , randomImage );
      }
      console.log("work done !!")
  };






  // let yomama = {
  //   "propertyUid": "f117014b-4576-4765-8376-085c640f5133",
  //   "userUid": "6a98097a-6a7e-4bba-9cd3-cd879c7dc84a",
  //   "propertyDetails": {
  //     "homeType": "villa",
  //     "maxGuests": 1,
  //     "title": "Stylish, 2 bedroom, upscale townhouse ",
  //     "listingsDescription": "Freshly painted interiors with marble finished kitchen countertops, this stylish 2 bedroom townhouse serves as the perfect location for a short to medium term trip to Dubai. Located in the outskirts of the city offers a peaceful neighbourhood environment while still being close to the Dubai Metro.",
  //     "address": "219 Crescent Rd, Dubai",
  //     "city": "dubai",
  //     "State": "dubai",
  //     "zipCode": 272425,
  //     "image": "randomImage",
  //     "pricesPerDay": 131
  //   }
  // };


  // just trying boisss !!
  // ( async() => {
  //   try{
  //     let fileRef = ref( storage , `yomama.jpg`);
  //     let imageFile = new File(`../../assets/images/dubai/0.jpg` , "animage.jpg");
  //     console.log(imageFile)
  //     // let imageStorageRef = (await uploadBytes(fileRef , `../../assets/images/dubai/0.jpg`)).ref;
  //     // let imageDownloadURL = await getDownloadURL(imageStorageRef);
  //     // console.log("image set successfully !!!!!!!!! AAAAMMMMAAAZZZZZZZIIIIIIIIINNNNNNNNNGGGGG")
  //   }
  //   catch(error){
  //     console.log(error);
  //   }
  // })(); 
  

// export let getImage = ( imageName) => {
//   import(`../../assets/images/dubai/${imageName}.jpg`).then((moduleObj) => {
//     console.log(moduleObj.default); // seems to be a jpg file.
    
//     console.log(imageFile);
  
//   })
// }

// getImage( 0); // the call.


// export async function uploadUserAvatars(randomUsers , userImages){
//     randomUsers.forEach( (user , index) => {
//       let imagesCounter = 0;

//       if([0 , 2 , 4 , 7 , 9 , ].includes(index)){
//         // the current user is a male
//         let fileRef = ref( storage , `${element.userUid}.jpg`);
//         let imageStorageRef = (await uploadBytes(fileRef , userImages[imagesCounter] )).ref;
//         let imageDownloadURL = await getDownloadURL(imageStorageRef);   // the sting to be added to the firestore property object
//         imagesCounter++;
//       }

//     })
// }




