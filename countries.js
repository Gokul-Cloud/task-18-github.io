// window.addEventListener('DOMContentLoaded',getUserAsync, list);
/***********************************Fetch ***************************************************************************/
async function getUserAsync() 
{
    try{
  const response = await fetch(`https://restcountries.eu/rest/v2/all`);
  const data = await response.json()
  country(data);
  console.log(data);
    }
    catch(error)
    {
        console.error(error);
    }
}
 
getUserAsync();


async function weather(countryLatLng, countryName) {
  let latLngArr = countryLatLng.split(",");
  const lat = latLngArr[0];
  const lng = latLngArr[1];
  try {
    const weatherData = await fetchWeather(lat, lng);
    showModal(weatherData, countryName);
    } catch(err){
      console.error(err);
    }
}

  
async function showModal(weatherData, countryName){
    $("#exampleModalCenter").modal();
    $("#countryName").text(countryName || "---");
    $("#temperature").text(normalizedTemperature(weatherData.main.temp));
    $("#weather").text(weatherData.weather[0].description);
}

async function fetchWeather(lat, lng) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=b8ec07a6968abafc284ed815dcbbf086`;
    try{
        const response = await fetch(url);
        return await response.json();
    } catch(err){
        console.error(err);
    } 
}

function normalizedTemperature(temperature)
{
  return (+temperature - 273).toFixed(1);
}
  //****************************************************modal************************************************ */  
function newmodal()
{
const modal = createElement('div','modal fade','exampleModalCenter');
modal.tabindex='-1';
modal.role='dialog';
     const modaldialog = createElement('div','modal-dialog');
     modaldialog.setAttribute('role','document');
     const content = createElement('div','modal-content')
       const header = createElement('div','modal-header');
         const title = createElement('h5','modal-title','exampl');
         title.innerHTML = "weather details";
           header.append(title);
       const body = createElement('div','modal-body');
       const countryDiv = createElement("div");
       const countryP = createElement("p");
       countryP.innerHTML = "Country: ";
       const countryPName = createElement("p", "", "countryName");
     countryDiv.append(countryP, countryPName);
     const temperatureDiv = createElement("div");
       const temperatureP = createElement("p");
       temperatureP.innerHTML = "Temperature: ";
       const temperaturePValue = createElement( "p","font-weight-bold","temperature");
       const degreeSymbol = createElement( "span", "font-weight-bold degreeCelsius");
       degreeSymbol.innerHTML = " &#8451;";
     temperatureDiv.append(temperatureP, temperaturePValue, degreeSymbol);
     const weatherDiv = createElement("div");
       const weatherP = createElement("p");
       weatherP.innerHTML = "Weather: ";
       const weatherPValue = createElement("p", "font-weight-bold", "weather");
       weatherDiv.append(weatherP, weatherPValue);
       body.append(countryDiv, temperatureDiv, weatherDiv);
       const Footer = createElement("div", "modal-footer");
           const modalCloseButton = createElement("div", "btn btn-primary");
           modalCloseButton.setAttribute("data-dismiss", "modal");
           modalCloseButton.innerHTML = "Close";
          Footer.append(modalCloseButton);
       content.append(header, body, Footer);
       modaldialog.append(content);
       modal.append(modaldialog);
       document.body.append(modal);
   }
    /***********************************DOM HTML ***************************************************************************/
    
function list(country)
  {
      const card = createElement('div','card');
      card.style.width = '20rem';
      card.style.height = '27rem';
      card.style.display = 'inline-block';
      card.style.marginRight='15px';
      card.style.objectFit = 'contain';
      card.style.background='rgb(131,131,131)';
//****************************************************title************************************************ */
      const heading = createElement('h5','card-title');
      heading.innerHTML = country.name;
      heading.style.textAlign = 'center';
//****************************************************Image************************************************ */
      const image = createElement("img", "card-img-top");
      image.src = country.flag;
      image.alt = country.name;
      image.style.marginLeft = '25px';
//****************************************************card body************************************************ */
      const cardBody = createElement('div','cardBody');
      cardBody.style.textAlign='center';
      cardBody.style.top='30px';

//****************************************************capital************************************************ */
      const capital = createElement('p','capital');
      capital.innerHTML = 'Capital:';

      const capitalname = createElement('span');
          if(country.capital === "")
          {
            capitalname.innerHTML = "----"
          }
          else
          {
            capitalname.innerHTML = country.capital;
          }
     capitalname.style.backgroundColor = 'darkgreen';
     capitalname.style.color= 'white';
     capitalname.style.borderRadius='5px'
     capitalname.style.display = 'inline-block';
     capitalname.style.padding = '5px 6px'
     capitalname.style.margin = '1px 2px'
     capital.append(capitalname);

//****************************************************cntry code************************************************ */
    const countrycode = createElement('p');
    countrycode.innerHTML = 'country Code: ';

    const countrycodename = createElement('span');
    countrycodename.innerHTML = country.alpha3Code;
    countrycode.append(countrycodename);


//****************************************************regionname************************************************ */
    const region = createElement('p');
    region.innerHTML = 'Region: ';
    const regionname = createElement('span');
    regionname.innerHTML = country.region;
    region.append(regionname);

//****************************************************button************************************************ */
    const btn = createElement("button", "btn btn-primary", country.alpha3Code);
    btn.innerHTML = "Check for Weather";
    btn.setAttribute( "onclick", `weather('${country.latlng}', '${country.name}')`);
//****************************************************append-card************************************************ */                  
     cardBody.append(capital,countrycode, region, btn);
     card.append(heading, image, cardBody);
    return card
}

function createElement(ele, eleClass = "", eleId = "") {
  const element = document.createElement(ele);
  eleClass !== "" ? element.setAttribute("class", eleClass) : "";
  eleId !== "" ? element.setAttribute("id", eleId) : "";
  return element;
}


//****************************************************container************************************************ */
function country(countries) 
{
  const container = createElement("div", "container-fluid");
     container.style.background='#002A4C';
      const row = createElement("div", "row");
          const column = createElement("div"," col-sm-12 countries");
          const crow = createElement('div', 'row');
          countries.forEach((country) => {
            const cardCol = createElement('div', 'col-lg-4 col-sm-12');
            const card = list(country);
            cardCol.append(card);
            crow.append(cardCol);
          });
          column.append(crow)
        row.append(column); 
    container.append(row);
  document.body.append(container);
  newmodal();
}

