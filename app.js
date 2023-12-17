let ipInput = document.querySelector('.searchinput'),
    ipFlag = document.querySelector('.ipflag'),
    ipLocation = document.querySelector('.location'),
    ipState = document.querySelector('.state'),
    ipIsp = document.querySelector('.isp'),
    ipTimeZone = document.querySelector('.timezone');
const queryResult = document.querySelector('.result');
queryResult.style.display = 'none'
const ipForm = document.querySelector('.inputs');
const btn = document.querySelector('#subbbtn');

ipForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (ipInput.value === '') {
        ipInput.placeholder = 'Cannot be Blank';
    } else {
        getIp(ipInput.value);
    }
});


// input event listener to clear search results when the user starts clearing the IP address
ipInput.addEventListener('input', function () {
    if (ipInput.value === '') {
        clearSearchResults();
        location.reload();
    }
});





//function to get data from api
async function getIp(ip) {
    try {
        const apiUrl = 'https://api.ipgeolocation.io/ipgeo';
        const apiKey = '80a9df5e2df849108c13583f4b06c73b';
        const urlWithApiKey = `${apiUrl}?apiKey=${apiKey}&ip=${ip}`; // Updated the parameter name and URL
        let response = await fetch(urlWithApiKey);
        let data = await response.json();
        ipLocation.textContent = data.country_name;
        ipFlag.src = data.country_flag;
        ipIsp.textContent = data.isp;
        ipState.textContent = data.state_prov;
        ipTimeZone.textContent = data.time_zone.name;
        let ipLat = data.latitude;
        let ipLong = data.longitude;

    
    // Initializing map
    var mymap = L.map('map').setView([ipLat, ipLong], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mymap);

    // marker to the map
    var marker = L.marker([ipLat, ipLong]).addTo(mymap);
            

        queryResult.style.display = 'flex'

        console.log(data);
    } catch (error) {
        alert("Failed to fetch");
    }


    clearSearchResults = () =>{
        queryResult.style.display = '';
        map.style.display = " "
        

    }



}
