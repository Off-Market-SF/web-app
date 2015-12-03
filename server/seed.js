/* ---------------------------------------------------- +/

## Fixtures ##

Fill in the app with dummy data if database is empty.

/+ ---------------------------------------------------- */

// Fixture data 
if (Items.find().count() === 0) {
 
  Items.insert({
    title: "Eridanus",
    body: "Eridanus is a constellation. It is represented as a river; its name is the Ancient Greek name for the Po River."
  });

  Items.insert({
    title: "Cassiopeia",
    body: "Cassiopeia is a constellation in the northern sky, named after the vain queen Cassiopeia in Greek mythology, who boasted about her unrivalled beauty."
  });

  Items.insert({
    title: "Scorpius",
    body: "Scorpius, sometimes known as Scorpio, is one of the constellations of the zodiac."
  });

}

if (Suburbs.find().count() === 0){
  Suburbs.insert({
    region: "San Francisco",
    name: "Mission"
  });
  Suburbs.insert({
    region: "Peninsula",
    name: "Burlingame"
  });
  Suburbs.insert({
    region: "San Francisco",
    name: "Marina"
  });
  Suburbs.insert({
    region: "Peninsula",
    name: "San Mateo"
  });
}

if(Neighborhoods.find().count() === 0){
  var suburb = Suburbs.findOne({name: 'Burlingame'});
  Neighborhoods.insert({
    name: 'Burlingame Hills',
    homeCompGroup: '1',
    sqFtPrice: '800',
    suburbID: suburb._id
  });
  Neighborhoods.insert({
    name: 'Mills Estate',
    homeCompGroup: '1',
    sqFtPrice: '800',
    suburbID: suburb._id
  });
  Neighborhoods.insert({
    name: 'Default',
    homeCompGroup: '0',
    sqFtPrice: '800',
    suburbID: suburb._id
  });
}

if(HomeComps.find().count() === 0){
  HomeComps.insert({
    compGroup: '0',
    compSizeType: '1',
    address: '123 Wistful Ln',
    bedrooms: '3',
    bathrooms: '4',
    sqft: '2150',
    price: '1867000',
    lastSaleDate: 'Sun, 20 Nov 2015 21:47:57 GMT',
    sqFtPrice: '868'
  });
  HomeComps.insert({
    compGroup: '0',
    compSizeType: '1',
    address: '1883 Pretend Pl',
    bedrooms: '5',
    bathrooms: '2',
    sqft: '2880',
    price: '2350000',
    lastSaleDate: 'Sun, 20 Nov 2015 21:47:57 GMT',
    sqFtPrice: '816'
  });
  HomeComps.insert({
    compGroup: '0',
    compSizeType: '1',
    address: '89 Winding St',
    bedrooms: '3',
    bathrooms: '3',
    sqft: '2120',
    price: '2000000',
    lastSaleDate: 'Sun, 20 Nov 2015 21:47:57 GMT',
    sqFtPrice: '943'
  });
  HomeComps.insert({
    compGroup: '0',
    compSizeType: '1',
    address: '777 Sevens Way',
    bedrooms: '5',
    bathrooms: '4',
    sqft: '3030',
    price: '2625000',
    lastSaleDate: 'Sun, 20 Nov 2015 21:47:57 GMT',
    sqFtPrice: '866'
  });
  HomeComps.insert({
    compGroup: '0',
    compSizeType: '2',
    address: '123 Driving Dr',
    bedrooms: '2',
    bathrooms: '2',
    sqft: '1620',
    price: '1500000',
    lastSaleDate: 'Sun, 20 Nov 2015 21:47:57 GMT',
    sqFtPrice: '926'
  });
  HomeComps.insert({
    compGroup: '0',
    compSizeType: '2',
    address: '99-88 Waianae Vly Rd',
    bedrooms: '3',
    bathrooms: '2',
    sqft: '1860',
    price: '1925000',
    lastSaleDate: 'Sun, 20 Nov 2015 21:47:57 GMT',
    sqFtPrice: '1035'
  });
  HomeComps.insert({
    compGroup: '0',
    compSizeType: '2',
    address: '1404 Wonderful Ct',
    bedrooms: '2',
    bathrooms: '1',
    sqft: '1570',
    price: '1610000',
    lastSaleDate: 'Sun, 20 Nov 2015 21:47:57 GMT',
    sqFtPrice: '1025'
  });
  HomeComps.insert({
    compGroup: '0',
    compSizeType: '2',
    address: '98 Home Ln',
    bedrooms: '2',
    bathrooms: '2',
    sqft: '1300',
    price: '1060000',
    lastSaleDate: 'Sun, 20 Nov 2015 21:47:57 GMT',
    sqFtPrice: '815'
  });
}

if(CompCoefs.find().count() === 0){
  CompCoefs.insert({
    name: 'quality',
    category: 'new',
    value: 1.20
  });
  CompCoefs.insert({
    name: 'quality',
    category: 'good',
    value: 1.10
  });
  CompCoefs.insert({
    name: 'quality',
    category: 'average',
    value: 1.00
  });
  CompCoefs.insert({
    name: 'quality',
    category: 'renovation',
    value: 0.90
  });
  CompCoefs.insert({
    name: 'sqft',
    category: '>2500',
    value: 0.90
  });
  CompCoefs.insert({
    name: 'sqft',
    category: '>2000 <2500',
    value: 1.00
  });
  CompCoefs.insert({
    name: 'sqft',
    category: '>1500 <2000',
    value: 1.15
  });
  CompCoefs.insert({
    name: 'sqft',
    category: '<1500',
    value: 1.30
  });
}