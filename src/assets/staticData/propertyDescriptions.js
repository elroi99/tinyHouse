const { Assignment } = require("@mui/icons-material");
let { v4 } = require("uuid");
// just a few sample property descriptions 



// cancun
let cancunTitlesRaw = `Spacious 2 story beach house
Beachfront suite`;

// San Francisco
let sanFranciscoTitlesRaw = `Downtown and modern San Francisco studio appartment
Single bedroom located in the heart of downtown San Francisco
Modern Appartment steps away from the beach`

// Toronto
let torontoTitlesRaw = `Picturesque 2 Story House - great location 
Bright comfortable room within a 4-bedroom duplex 
Luxury condo suite located in the heart of downtown Toronto
Recently renovated and modern townhouse
Cozy, clean and affordable studio in midtown 
Chic downtown condo` 

// Dubai
let dubaiTitlesRaw = `Confortable studio in the heart of the city 
Gorgeous mediterranean inspired villa
Beautiful condo in the heart of Dubai Marina 
Luxury en suite bedroom condo in Dubai Marina 
Stylish, 2 bedroom, upscale townhouse 
Cozy and fully furnished home 
Penthouse condo suite by Jumeirah beach 
Premium appartment in the luxury Emirates Hills` 

// los angeles
let losAngelesTitlesRaw = `Stunning home in central LA
Luxurious home with private pool 
Beautiful beachfront condo 
Spacious home (3 beds/ 3baths) in Bel Air, Los Angeles
Beverly Hills mansion 
Modern downtown LA condo suite
Stylish an modern 2 bedroom condo 
Cozy guest house 
Luxurious home with private pool` 

// london 
let londonTitlesRaw =  `londonDescipBright furnished home 
Tranquil, spacious, condo appartment
Chic condo in Camden 
Beautiful appartment in central London 
magnificent suburban home in central London 
Charming spacious flat in Kensington 
Beautiful 2 bedroom townhouse` 




// descriptions
// cancun
let cancunDescriptionsRaw = `Spacious 2 story house with extended balcony and magnificent ocean views from every window. Numerous restaurants exist only a walking distance away.
Beautiful beachfront suite located in Cancún hotel. Location consists of a large outdoor pool, parking, hotel convenience store, room service, and parking!
`


// San francisco
let sanFranciscoDescriptionsRaw =`Downtown, modern, fully furnished, and sleek San Fransisco studio apartment.
Furnished and spacious single bedroom location situated minutes away from the nearest Muni train stop. Perfect for the independent traveller.
Beautiful modern apartment located a few minutes away from the beach. The perfect location for a relaxing and comfortable vacation in San Fransisco!
`


// Toronto
let torontoDescriptionsRaw = `Beautiful and picturesque 2 story house located only minutes away from the center of Midtown Toronto. Street level parking available at all times. With four beds and three baths, house accomodates up to 6 guests comfortably.
Bright comfortable room within a 4 bedroom duplex. 10 min drive from local airport. Relax, re-charge your batteries, and enjoy the suburbs of the Greater Toronto Area in this comfortable setting.
Luxury condo suite located in the heart of the city with building pool/gym/sauna available 24/7. Buses, subway, and all other amenities are available close by. Booking comes with 1 available parking spot in building underground.
Recently renovated and furnished townhouse. 3 beds, 2 baths, and parking available at all times. Townhouse located within the complex of a vibrant community. Booked often, so be sure to book as soon as possible!
Cozy, clean, and affordable studio located around midtown. Perfect for a solo traveller on a budget.
2 bed, 2 bathroom cozy apartment in the heart of downtown Toronto and only 5 min away from the CN Tower, Scotiabank Arena, and Rogers Center.
Explore downtown Toronto by staying at this beautiful chic 1 bedroom condo. Access to a lap pool, gym, and sauna at all times.
`

// dubai
let dubaiDescriptionsRaw = `Comfortable single bed studio located in the heart of modern day Dubai. Ideal for solo travellers on a budget.
Mediterranean inspired 3 bedroom, 3 bath villa situated in the heart of the Palm Jumeirah. Can accommodate up to 6 guests comfortably within its almost 3000 sq ft interior space.
Beautiful condo suite located within the heart of Dubai Marina. 1 bedroom and 1 bathroom. Perfect for a solo traveller or couples. Designed with high-end furniture and provides a stunning view of the entire marina.
A luxury condo residence for those looking to travel in style. Condo includes but not limited to direct access to private parking, 200 sq ft balcony, 2 bathrooms, and incredible views of the marina.
Freshly painted interiors with marble finished kitchen countertops, this stylish 2 bedroom townhouse serves as the perfect location for a short to medium term trip to Dubai. Located in the outskirts of the city offers a peaceful neighbourhood environment while still being close to the Dubai Metro.
Cosy and fully furnished home, perfect for a happy holiday to Dubai. Convenient access to nearby local transportation, restaurants, hypermarkets, and malls.
Large penthouse suite situated minutes away from Jumeirah beach. Beautifully preserved and recently renovated, enjoy floor to ceiling windows, private elevator, on-suite pool, and access to numerous other condo amenities.
Premium 4 bedroom apartment located within the majestic Emirates Hills. Perfect getaway for your upcoming Dubai vacation. Accommodation includes 4 separate bedrooms, gym/entertainment area and shared luxury pool. Only a few minutes drive from and to the airport.
`

// los angeles 
let losAngelesDescriptionsRaw = `Stunning luxury home with a private garden by the pool, spacious outdoors, and en suite master bedroom. Located in the hub of central Los Angeles.
Set on a private, southwest corner of Hollywood Hills; this large modern home includes high-end furnishings, a wine cellar, private pool, extraordinary views of the greater Los Angeles area.
Beautiful beachfront condo close to Venice beach.
Private modern mansion situated in the heart of Beverly Hills. Property consists of a huge pool, deck, entertainment area, and is suited to accommodate up to 12 guests.
Fully furnished and spacious home situated in the heart of Bel Air, Los Angeles. Perfect accommodation for a group with a large number of guests.
Beautiful, contemporary, and single bedroom guest house with en suite bathroom, private patio, and private entrance. Located in a peaceful neighbourhood about an hour away from financial district.
Modern one bedroom condo located in the downtown LA core. En suite bedroom with spacious washroom and walk in bedroom closet. Located in the heart of the city!
`

// london 
let londonDescriptionsRaw = `Relax in this brightly lit, recently furnished, single bedroom home located in the outskirts of Stratford.
Tranquil, spacious condo apartment with a modern look and feel. Apartment accomodates up to 4 guests with 2 beds and 2 baths.
Chic, cosy condo situated in Camden. Situated in a secluded and private neighbourhood with easy acces to public transit.
Large suburban house in central London. Fully furnished with outdoor patio, heating insulation and two spacious decks. Walking distance to everything you might need in your stay in London!
Beautiful and modern apartment situated in central London and minutes away from the London Underground (railway system).
Spacious, charming flat located close to the center of Kensington. Consists of a large en suite bedroom, atmospheric lighting and beautiful wall paintings across the flat. A truly picturesque accommodation.
Tranquil, spacious condo apartment with a modern look and feel. Apartment accomodates up to 4 guests with 2 beds and 2 baths.
Beautiful and modern apartment situated in central London and minutes away from the London Underground (railway system).
Located on a quiet peaceful residential street, this 2 bedroom townhouse is a perfect accommodation for those wishing to enjoy their stay in London without breaking the bank.
`

// random names 
let randomNamesRaw = `Tomás Evangelista 
Elisa Mingo 
Rémi Moreno 
Annabelle Rosario 
Amâncio Lopes 
Everett Parish 
Octavia Bourdillon 
Kurtis Noel 
Nannie Snell 
Hamid Ericson 
Aline Thomson 
Tory Garfield 
`


// random addresses ( generated using world address generator )

// cancun 2
let cancunAddressesRaw = `100 Punta Nizuc Rd, Cancun
340 Carlos Ave, Cancun 
330 Armando St. Cancun 
420 Palma St. Cancun
`

// san fransicso 2
let sanFranciscoAddressesRaw = `4177 Locust Court, San Francisco
3298 Heavens Way, San Francisco
`

// toronto 7
let torontoAddressesRaw =  `922 Formula Lane, Toronto
161 Charla Lane, Toronto
1737 Whitetail Lane, Toronto
1181 Illinois Avenue, Toronto
3174 Deercove Drive, Toronto
4869 Swick Hill Street, Toronto
4954 Hood Avenue, Toronto
`

// los angeles 7
let losAngelesAddressesRaw = `2340 Kerry Way, Los Angeles
4177 Locust Court, Los Angeles
3298 Heavens Way, Los Angeles
1321 Woodstock Drive, Los Angeles
795 Norman Street, Los Angeles
713 Zimmerman Lane, Los Angeles
398 Rainbow Road, Los Angeles
`

// dubai 8
let dubaiAddressesRaw = `19 Araa Street, Dubai
100 Palm Jumeirah St, Dubai 
100 Marina Ave , Dubai
19 Meadows , Dubai
219 Crescent Rd, Dubai
55 Emirates Hills Rd , Dubai
923 Phoenix Pass, Dubai
97 Doherty Crest, Dubai
`

// london 9
let londonAddressesRaw = `103 Everette Alley, London
3089 Green Hill Road, London
2669 Scott Street, London
1646 North Bend River Road, London
319 Old House Drive, London
795 Norman Street, London
713 Zimmerman Lane, London
3174 Deercove Drive, London
4869 Swick Hill Street, London`

//==============================================================================================================
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//================================================================================================================
//-----------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------
// -----------Refined data arrays ( converted the above strings into arrays of strings------------------------------
//??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
//***********&&***************&*************************************************************************************
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//##################################################################################################################
//$###################################################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// titles
export let cancunTitles = [ 'Spacious 2 story beach house', 'Beachfront suite' ];
export let sanFranciscoTitles = [
    'Downtown and modern San Francisco studio appartment',
    'Single bedroom located in the heart of downtown San Francisco',
    'Modern Appartment steps away from the beach'
  ]
export let dubaiTitles = [
    'Confortable studio in the heart of the city ',
    'Gorgeous mediterranean inspired villa',
    'Beautiful condo in the heart of Dubai Marina ',
    'Luxury en suite bedroom condo in Dubai Marina ',
    'Stylish, 2 bedroom, upscale townhouse ',
    'Cozy and fully furnished home ',
    'Penthouse condo suite by Jumeirah beach ',
    'Premium appartment in the luxury Emirates Hills'
  ]
export let losAngelesTitles = [
    'Stunning home in central LA',
    'Luxurious home with private pool ',
    'Beautiful beachfront condo ',
    'Spacious home (3 beds/ 3baths) in Bel Air, Los Angeles',
    'Beverly Hills mansion ',
    'Modern downtown LA condo suite',
    'Stylish an modern 2 bedroom condo ',
    'Cozy guest house ',
    'Luxurious home with private pool'
  ]
  export let londonTitles = [
    'londonDescipBright furnished home ',
    'Tranquil, spacious, condo appartment',
    'Chic condo in Camden ',
    'Beautiful appartment in central London ',
    'magnificent suburban home in central London ',
    'Charming spacious flat in Kensington ',
    'Beautiful 2 bedroom townhouse'
  ]
  export let torontoTitles = [
  'Picturesque 2 Story House - great location ',
  'Bright comfortable room within a 4-bedroom duplex ',
  'Luxury condo suite located in the heart of downtown Toronto',
  'Recently renovated and modern townhouse',
  'Cozy, clean and affordable studio in midtown ',
  'Chic downtown condo'
]


// descriptions
export let cancunDescriptions = [
    'Spacious 2 story house with extended balcony and magnificent ocean views from every window. Numerous restaurants exist only a walking distance away.',
    'Beautiful beachfront suite located in Cancún hotel. Location consists of a large outdoor pool, parking, hotel convenience store, room service, and parking!',
  ]

  export let londonDescriptions = [
    'Relax in this brightly lit, recently furnished, single bedroom home located in the outskirts of Stratford.',
    'Tranquil, spacious condo apartment with a modern look and feel. Apartment accomodates up to 4 guests with 2 beds and 2 baths.',
    'Chic, cosy condo situated in Camden. Situated in a secluded and private neighbourhood with easy acces to public transit.',
    'Large suburban house in central London. Fully furnished with outdoor patio, heating insulation and two spacious decks. Walking distance to everything you might need in your stay in London!',
    'Beautiful and modern apartment situated in central London and minutes away from the London Underground (railway system).',
    'Spacious, charming flat located close to the center of Kensington. Consists of a large en suite bedroom, atmospheric lighting and beautiful wall paintings across the flat. A truly picturesque accommodation.',
    'Tranquil, spacious condo apartment with a modern look and feel. Apartment accomodates up to 4 guests with 2 beds and 2 baths.',
  ]

  export let dubaiDescriptions = [
    'Comfortable single bed studio located in the heart of modern day Dubai. Ideal for solo travellers on a budget.',
    'Mediterranean inspired 3 bedroom, 3 bath villa situated in the heart of the Palm Jumeirah. Can accommodate up to 6 guests comfortably within its almost 3000 sq ft interior space.',
    'Beautiful condo suite located within the heart of Dubai Marina. 1 bedroom and 1 bathroom. Perfect for a solo traveller or couples. Designed with high-end furniture and provides a stunning view of the entire marina.',
    'A luxury condo residence for those looking to travel in style. Condo includes but not limited to direct access to private parking, 200 sq ft balcony, 2 bathrooms, and incredible views of the marina.',
    'Freshly painted interiors with marble finished kitchen countertops, this stylish 2 bedroom townhouse serves as the perfect location for a short to medium term trip to Dubai. Located in the outskirts of the city offers a peaceful neighbourhood environment while still being close to the Dubai Metro.',
    'Cosy and fully furnished home, perfect for a happy holiday to Dubai. Convenient access to nearby local transportation, restaurants, hypermarkets, and malls.',
    'Large penthouse suite situated minutes away from Jumeirah beach. Beautifully preserved and recently renovated, enjoy floor to ceiling windows, private elevator, on-suite pool, and access to numerous other condo amenities.',
    'Premium 4 bedroom apartment located within the majestic Emirates Hills. Perfect getaway for your upcoming Dubai vacation. Accommodation includes 4 separate bedrooms, gym/entertainment area and shared luxury pool. Only a few minutes drive from and to the airport.',
  ]

  export let sanFranciscoDescriptions = [
  'Downtown, modern, fully furnished, and sleek San Fransisco studio apartment.',
  'Furnished and spacious single bedroom location situated minutes away from the nearest Muni train stop. Perfect for the independent traveller.',
  'Beautiful modern apartment located a few minutes away from the beach. The perfect location for a relaxing and comfortable vacation in San Fransisco!',
]

export let losAngelesDescriptions = [
    'Stunning luxury home with a private garden by the pool, spacious outdoors, and en suite master bedroom. Located in the hub of central Los Angeles.',
    'Set on a private, southwest corner of Hollywood Hills; this large modern home includes high-end furnishings, a wine cellar, private pool, extraordinary views of the greater Los Angeles area.',
    'Beautiful beachfront condo close to Venice beach.',
    'Private modern mansion situated in the heart of Beverly Hills. Property consists of a huge pool, deck, entertainment area, and is suited to accommodate up to 12 guests.',
    'Fully furnished and spacious home situated in the heart of Bel Air, Los Angeles. Perfect accommodation for a group with a large number of guests.',
    'Beautiful, contemporary, and single bedroom guest house with en suite bathroom, private patio, and private entrance. Located in a peaceful neighbourhood about an hour away from financial district.',
    'Modern one bedroom condo located in the downtown LA core. En suite bedroom with spacious washroom and walk in bedroom closet. Located in the heart of the city!',
    'Relax in this brightly lit, recently furnished, single bedroom home located in the outskirts of Stratford.',
    'Tranquil, spacious condo apartment with a modern look and feel. Apartment accomodates up to 4 guests with 2 beds and 2 baths.',
  ]

  export let torontoDescriptions = [
    'Beautiful and picturesque 2 story house located only minutes away from the center of Midtown Toronto. Street level parking available at all times. With four beds and three baths, house accomodates up to 6 guests comfortably.',
    'Bright comfortable room within a 4 bedroom duplex. 10 min drive from local airport. Relax, re-charge your batteries, and enjoy the suburbs of the Greater Toronto Area in this comfortable setting.',
    'Luxury condo suite located in the heart of the city with building pool/gym/sauna available 24/7. Buses, subway, and all other amenities are available close by. Booking comes with 1 available parking spot in building underground.',
    'Recently renovated and furnished townhouse. 3 beds, 2 baths, and parking available at all times. Townhouse located within the complex of a vibrant community. Booked often, so be sure to book as soon as possible!',
    'Cozy, clean, and affordable studio located around midtown. Perfect for a solo traveller on a budget.',
    '2 bed, 2 bathroom cozy apartment in the heart of downtown Toronto and only 5 min away from the CN Tower, Scotiabank Arena, and Rogers Center.',
  ]

// ---------------------------------------------- addresses 


export let torontoAddresses = [
  '922 Formula Lane, Toronto',
  '161 Charla Lane, Toronto',
  '1737 Whitetail Lane, Toronto',
  '1181 Illinois Avenue, Toronto',
  '3174 Deercove Drive, Toronto',
  '4869 Swick Hill Street, Toronto',

]
export let dubaiAddresses = [
    '19 Araa Street, Dubai',
    '100 Palm Jumeirah St, Dubai ',
    '100 Marina Ave , Dubai',
    '19 Meadows , Dubai',
    '219 Crescent Rd, Dubai',
    '55 Emirates Hills Rd , Dubai',
    '923 Phoenix Pass, Dubai',
    '97 Doherty Crest, Dubai',
  ]
  export let sanFranciscoAddresses = [
  '4177 Locust Court, San Francisco',
  '3298 Heavens Way, San Francisco',
  '398 Rainbow Road, San Francisco',

]
export let losAngelesAddresses = [
  '2340 Kerry Way, Los Angeles',
  '4177 Locust Court, Los Angeles',
  '3298 Heavens Way, Los Angeles',
  '1321 Woodstock Drive, Los Angeles',
  '795 Norman Street, Los Angeles',
  '713 Zimmerman Lane, Los Angeles',
  '398 Rainbow Road, Los Angeles',
  '3174 Deercove Drive, Los Angeles',
  '4869 Swick Hill Street, Los Angeles',
]
export let cancunAddresses = [
  '100 Punta Nizuc Rd, Cancun',
  '340 Carlos Ave, Cancun ',

]
export let londonAddresses = [
  '103 Everette Alley, London',
  '3089 Green Hill Road, London',
  '2669 Scott Street, London',
  '1646 North Bend River Road, London',
  '319 Old House Drive, London',
  '795 Norman Street, London',
  '713 Zimmerman Lane, London',
]

// ----------------------------------------------names ------------------------------

export let randomNames = [
  'Tomás Evangelista ',
  'Elisa Mingo ',
  'Rémi Moreno ',
  'Annabelle Rosario ',
  'Amâncio Lopes ',
  'Everett Parish ',
  'Octavia Bourdillon ',
  'Kurtis Noel ',
  'Nannie Snell ',
  'Hamid Ericson ',
  'Aline Thomson ',
  'Tory Garfield ',
]

// console.log(v4())
function assignUids(namesArr){
    namesArr.map((name) => [
        { user : name , userUid : v4() }
    ])
}

console.log(assignUids(randomNames));



/// ------------------------------------------------ end of refined data ---------------------------

// takes in arrays of each + imageFolder and spits out an array of objects ( listing objects )
// function createCityData(titles , descriptions , addresses , imageFolder){

// }










