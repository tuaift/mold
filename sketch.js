let apiURL = "https://nsi-release-ro-statsuite.fao.org/rest/data/FAO,DF_AG_FLS_PCT_1231A,1.1/A...........?startPeriod=2015&endPeriod=2021&dimensionAtObservation=AllDimensions";
let headers = new Headers({
  "Accept": "application/json",
  "Accept-Language": "en", 
});

let requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};

function ParseJson(year) {
  fetch(apiURL, requestOptions)
    .then(response => response.json())
    .then(data => {
      // 'data' now contains the JSON response
      let yearValues = {};
      let DummyYear = 0;

      if (year == 2016){
        DummyYear = 0;
      } else if (year == 2020){
        DummyYear = 1;
      } else if (year == 2021){
        DummyYear = 2;
      } else {
        console.log("Invalid year");
      }

      let geoAreas = data.structure.dimensions.observation[3].values;

      for (let i = 0; i < geoAreas.length; i++) {
        let geoArea = geoAreas[i];
        let geoAreaName = geoArea.name;
        let values = data.dataSets[0].observations[`0:0:0:${i}:0:0:0:0:0:0:0:0:${DummyYear}`][0];
        yearValues[geoAreaName] = values;
      }

      tree_create(yearValues);

      //console.log(data);
      // You can access the data and work with it here
    })
    .catch(error => {
      console.error('Error:', error);
      // Reject the Promise with an empty object
      throw new Error("Error fetching data");
    });
}

// Assuming 'data' is your JSON object

//
// function setup() {
//   createCanvas(400,400);
//   let url = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=e7402cc176aacd446829a856f2723b57&units=metric'
//   loadJSON(url,gotData)
// }
//
// function gotData(data){
//   print(data);
// }
//
// function draw(){
// }
