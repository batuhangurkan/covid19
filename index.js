window.onload = function(){
  getCovidStats();
}

//add commas to numbers and return as string
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getCovidStats(){
  fetch('https://corona.lmao.ninja/v2/all')
  .then(function(resp){
    if (!resp.ok) throw new Error(`Status Code Error: ${resp.status}`);
    return resp.json() 
  })
  .then(function(data){
    let totalCases = numberWithCommas(data.cases);
    let totalDeaths = numberWithCommas(data.deaths);
    let totalRecovered = numberWithCommas(data.recovered);

    document.querySelector('.total-cases .card-body').textContent = totalCases.toString();
    document.querySelector('.total-deaths .card-body').textContent = totalDeaths.toString();
    document.querySelector('.total-recovered .card-body').textContent = totalRecovered.toString();
    document.querySelector('.infographics-title-2 h1').textContent= totalCases.toString();
    //document.querySelector('.total-cases .card-body').textContent = 'asdf';
  })
  .catch(function(err){
    console.log(err);
  })

  fetch('https://disease.sh/v2/countries?sort=cases')
  .then(function(resp){
    if (!resp.ok) throw new Error(`all countries Status code Error: ${resp.status}`);
    return resp.json();
  })
  .then(function(data){
    for (let i=0; i<10; i++){
      let country = numberWithCommas(data[i].country);
      let cases = numberWithCommas(data[i].cases);
      let recovered = numberWithCommas(data[i].recovered);
      let deaths = numberWithCommas(data[i].deaths);
      let flagURL = data[i].countryInfo.flag;
      //console.log(country,cases,recovered,deaths);

      const tr = document.createElement('tr')
      tr.innerHTML = `<td class = "country-name"><img class = "flag-img" src="${flagURL}" alt=""> ${country}</td><td>${cases}</td><td>${recovered}</td><td>${deaths}</td>`
      i%2===0 ? tr.classList.add('even-table') : tr.classList.add('odd-table');
      const tbody = document.querySelector('tbody');
      tbody.appendChild(tr);
    }
  })
  .catch(function(err){
    console.log(err);
  })
}

function getCountryStats(country){
  fetch(`https://disease.sh/v2/countries/${country}`)
    .then((resp)=>{
      if (!resp.ok) throw new Error(`Status Code Error: ${resp.status}`);
        return resp.json();
    })
    .then((data)=>{

      const totalCases = data.cases;
      const totalRecovered = data.recovered;
      const totalDeaths = data.deaths;
      const tests = data.tests;
      const todayCases = data.todayCases;
      const todayDeaths = data.todayDeaths;
      const countryName = data.country

    //   const deaths = data.deaths;
    //   const p = document.createElement('p');
    // p.innerText = `Total Cases: ${totalCases} , Deaths : ${deaths}`;
    // const searchSection = document.querySelector('#country-search .container');
    // searchSection.appendChild(p);

    document.querySelector('#country-search h3').textContent=`${countryName} Overview`;

    document.querySelector('.country-total-cases .card-body').textContent = numberWithCommas(totalCases);
    document.querySelector('.country-total-recovered .card-body').textContent = numberWithCommas(totalRecovered);
    document.querySelector('.country-total-deaths .card-body').textContent = numberWithCommas(totalDeaths);
    document.querySelector('.country-total-tests .card-body').textContent = numberWithCommas(tests);
    document.querySelector('.country-cases-today .card-body').textContent = numberWithCommas(todayCases);
    document.querySelector('.country-deaths-today .card-body').textContent = numberWithCommas(todayDeaths);

    document.querySelector('.search-results-div').classList.remove('hidden');
    document.querySelector('.search-catch').classList.add('hidden');
      console.log(data);
    })
    .catch((err)=>{
      document.querySelector('.search-catch').classList.remove('hidden');
      document.querySelector('.search-results-div').classList.add('hidden');
      console.log(err);
    })
    
}
document.querySelector('.search-bar').textContent = '';

const searchButton = document.querySelector('.search-btn');
searchButton.addEventListener('click', ()=>{
  getCountryStats(document.querySelector('.search-bar').value);
})

const searchBox = document.querySelector('#search-input');
searchBox.addEventListener("keydown",(event)=>{
  if (event.key === 'Enter'){
    getCountryStats(document.querySelector('.search-bar').value);
  }
})

// const node = document.getElementsByClassName(".input")[0];
// node.addEventListener("keyup", function(event) {
//     if (event.key === "Enter") {
//         // Do work
//     }
// });

//lighter blue : e0fcff
//light blue: 90f2ff