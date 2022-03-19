
let arr = [ 22 , 33 , 44 , 55];
let tempArr = [];
arr.forEach( (element  , index) => { tempArr[arr.length - index - 1] = element } );
console.log(tempArr);


    // ascending or descending according to the perDayPrice
    function sortListings(arr , order){
        // order can be "ascending" or "descending"

        // private function ( sorts according to ascending )
        function dumbaFunction(a , b){
            if(a.propertyDetails.pricePerDay < b.propertyDetails.pricePerDay ){
                // ascending order // sort a before b
                return 1;
            }
            else{
                // descending order // sort b before a
                return -1;
            }
        }

        let tempArr = []; // an empty arr ( will contain the answer eventually)
        if(order === "ascending"){
            tempArr = arr;  // copy the input arr into tempArr. 
            tempArr.sort(dumbaFunction);  // sort arr in ascending order
        }else if(order === "descending"){
            arr.sort(dumbaFunction);  // in place sort. arr will now be sorted in ascending order. 
            arr.forEach( (element ,index) => { tempArr[arr.length - index - 1] = element } )    // populating the temp arr. by the end, temp will be the revese of the arr sorted arr it will be descending. 
        }

        console.log("sorted array");
        console.log(tempArr);

        return tempArr;
    }

    let dinosaur = [
        { propertyDetails : { pricePerDay : 500} },
        { propertyDetails : { pricePerDay : 400} },
        { propertyDetails : { pricePerDay : 600} },
        { propertyDetails : { pricePerDay : 200} },
        { propertyDetails : { pricePerDay : 300} },
    ]

    let realDataFromFirebase = [
        {
          "userUid": "LdF0H7tVQJhF122OvE61bsvt43s1",
          "propertyDetails": {
            "homeType": "villa",
            "maxValues": 40,
            "address": "dhobi talao",
            "title": "yomam so fat",
            "zipCode": "333",
            "pricePerDay": "44",
            "state": "qqqqqqqqqq",
            "city": "dddssssssss",
            "maxGuests": "22",
            "listingDescription": "fat fat fat",
            "image": "https://firebasestorage.googleapis.com/v0/b/tiny-house-73864.appspot.com/o/d4438e06-75a8-479c-b858-2eb21f9bf39d.jpg?alt=media&token=7c4dafb1-959f-4198-8396-8ae60e936877"
          },
          "propertyUid": "d4438e06-75a8-479c-b858-2eb21f9bf39d"
        },
        {
          "userUid": "LdF0H7tVQJhF122OvE61bsvt43s1",
          "propertyDetails": {
            "zipCode": "400068",
            "image": "https://firebasestorage.googleapis.com/v0/b/tiny-house-73864.appspot.com/o/3dfc58ea-4813-4911-a077-bc483a5977c9.jpg?alt=media&token=3a700909-6391-41c2-9434-82e5438c294f",
            "maxValues": 40,
            "listingDescription": "Tall building with multiple podium floors and an integrated Shopping mall",
            "city": "Mumbai",
            "address": "Bhandup ",
            "title": "Neona -- K Hemani",
            "homeType": "appartment",
            "pricePerDay": "400",
            "maxGuests": "4",
            "state": "Maharashtra -- Jai Maharashtra"
          },
          "propertyUid": "3dfc58ea-4813-4911-a077-bc483a5977c9"
        },
        {
          "propertyUid": "4883e626-0b23-4fb4-b839-bd2b45afa702",
          "propertyDetails": {
            "title": "Neun",
            "state": "maharashtra",
            "address": "mulund yo !! heart of mumbai",
            "homeType": "appartment",
            "image": "https://firebasestorage.googleapis.com/v0/b/tiny-house-73864.appspot.com/o/4883e626-0b23-4fb4-b839-bd2b45afa702.jpg?alt=media&token=4a0ab63a-756a-45d2-a826-55df9468416a",
            "pricePerDay": "333",
            "listingDescription": "a neun",
            "maxValues": 40,
            "zipCode": "3000",
            "city": "mumbai",
            "maxGuests": "5"
          },
          "userUid": "LdF0H7tVQJhF122OvE61bsvt43s1"
        },
        {
          "propertyDetails": {
            "zipCode": "33334",
            "homeType": "appartment",
            "title": "crud app",
            "maxGuests": "33",
            "image": "https://firebasestorage.googleapis.com/v0/b/tiny-house-73864.appspot.com/o/a9aff931-136e-46ef-8ee3-40885b95798b.jpg?alt=media&token=4f22331f-f329-4aa4-abc4-49b2c351a8c8",
            "state": "boring state , boring province",
            "listingDescription": "random descriptions",
            "maxValues": 40,
            "address": "bharat bazaar",
            "pricePerDay": "300",
            "city": "i am bored"
          },
          "propertyUid": "a9aff931-136e-46ef-8ee3-40885b95798b",
          "userUid": "LdF0H7tVQJhF122OvE61bsvt43s1"
        },
        {
          "propertyUid": "e9f0153f-b472-4343-8468-ac0a692f3669",
          "userUid": "LdF0H7tVQJhF122OvE61bsvt43s1",
          "propertyDetails": {
            "address": "Ursa major",
            "title": "Black house",
            "pricePerDay": "300",
            "zipCode": "333",
            "maxValues": 40,
            "homeType": "villa",
            "city": "Milky way",
            "listingDescription": "a black house. you cant see shit in the dark",
            "image": "https://firebasestorage.googleapis.com/v0/b/tiny-house-73864.appspot.com/o/e9f0153f-b472-4343-8468-ac0a692f3669.jpg?alt=media&token=7f7643e9-8e74-4f46-a6a5-423aaaa951a5",
            "maxGuests": "4",
            "state": "Universt"
          }
        }
      ]

    // console.log(dinosaur);
    // let ass = sortListings( dinosaur , "ascending");
    // let des = sortListings( dinosaur , "descending");
    // console.log(ass);
    // console.log(des);


    // //WORKS ASCENDING
    // function dumbaFunction(a , b){
    //     if(a.propertyDetails.pricePerDay < b.propertyDetails.pricePerDay ){
    //         // ascending order // sort a before b
    //         return 1;
    //     }
    //     else{
    //         // descending order // sort b before a
    //         return -1;
    //     }
    // }

    // dinosaur.sort(dumbaFunction);
    // console.log(dinosaur);




    // ---------------------------------------- learning how to use call --------------------------------------

    // let a = [ 1 , 2 , 3 , 4 , 5]
    // function sliceIt(){
    //     let arr = this;
    //     return arr.slice(1 , 2);
    // console.log(this);
    // }

    // console.log(sliceIt.call(a));

    function newSorter(arr , order){
        // order can be "ascending" or "descending"

        // private function ( sorts according to ascending )
        function dumbaFunction(a , b){
            if( parseInt(a.propertyDetails.pricePerDay) < parseInt(b.propertyDetails.pricePerDay) ){
                // ascending order // sort a before b
                return 1;
            }
            else{
                // descending order // sort b before a
                return -1;
            }
        }

        let tempArr = []; // an empty arr ( will contain the answer eventually)
        if(order === "ascending"){
            tempArr = arr;  // copy the input arr into tempArr. 
            tempArr.sort(dumbaFunction);  // sort arr in ascending order0[;]
        }else if(order === "descending"){
            arr.sort(dumbaFunction);  // in place sort. arr will now be sorted in ascending order. 
            arr.forEach( (element ,index) => { tempArr[arr.length - index - 1] = element } )    // populating the temp arr. by the end, temp will be the revese of the arr sorted arr it will be descending. 
        }

        // console.log("sorted array");
        // console.log(tempArr);
        console.log("printing the prices in sorted order");
        tempArr.forEach( (item) => { console.log(item.propertyDetails.pricePerDay)});

        return tempArr;
    }

    // console.log(dinosaur);
    // let ass = newSorter( dinosaur , "ascending");
    // let des = newSorter( dinosaur , "descending");
    // console.log(ass);
    // console.log(des);

    // console.log(dinosaur);
    // let ass = newSorter( realDataFromFirebase , "ascending");
    // let des = newSorter( realDataFromFirebase , "descending");

    let numString = "aaa";
    console.log(parseInt(numString));