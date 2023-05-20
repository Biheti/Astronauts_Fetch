let dugme = document.getElementById("dugme");
let lista = document.getElementById("lista");
let btnKoordinate = document.getElementById("btn");
let span1 = document.getElementById("span1");
let span2 = document.getElementById("span2");
let selectStation = document.getElementById("selectStation");
let onCoordinates = document.getElementById("onCoordinates");
let offCoordinates = document.getElementById("offCoordinates");
let intervalID;

let url2 = "http://api.open-notify.org/iss-now.json";
let url = "http://api.open-notify.org/astros.json";

async function fetchData(stationName = "") {
  try {
    let response = await fetch(url);
    let data = await response.json();
    let zhangLu = data.people.find((e) => e.name === "Zhang Lu");
    let ostatak = data.people.filter((e) => e.name !== "Zhang Lu");
    ostatak.unshift(zhangLu);
    let stationListAll = [];
    for (let i = 0; i < data.people.length; i++) {
      stationListAll.push(data.people[i].craft);
    }
    let stationList = [...new Set(stationListAll)];

    if (stationName.target.value === "") {
      renderStationCrew(stationList, selectStation, "option");
    }
    if (stationName.target.value === "") {
      renderStationCrew(ostatak, lista, "li");
    } else {
      let stationCrew = data.people.filter(
        (item) => item.craft === stationName.target.value
      );
      renderStationCrew(stationCrew, lista, "li");
    }
  } catch (error) {
    console.log(error);
  }
}
if (onCoordinates) {
  onCoordinates.addEventListener("change", (e) => {
    if (e.target.checked === true) {
      startTimer();
    }
  });
}

if (offCoordinates) {
  offCoordinates.addEventListener("change", (e) => {
    if (e.target.checked) {
      clearInterval(intervalID);
    }
  });
}

if (dugme) {
  dugme.addEventListener("click", fetchData);
}
if (selectStation) {
  selectStation.addEventListener("change", (e) => {
    fetchData(e);
  });
}
// if (btnKoordinate) {
//   btnKoordinate.addEventListener("click", startTimer);
// }

async function fetchData2() {
  try {
    let response = await fetch(url2);
    let data = await response.json();
    console.log(data);

    span1.innerText = data.iss_position.latitude;
    span2.innerText = data.iss_position.longitude;
  } catch (error) {
    console.log(error);
  }
}

function startTimer() {
  intervalID = setInterval(fetchData2, 2000);
}

function renderStationCrew(crew, renderList, elementType) {
  renderList.innerHTML = "";

  for (let i = 0; i < crew.length; i++) {
    let novaLista = document.createElement(elementType);
    novaLista.classList = "list-group-item";
    novaLista.textContent = crew[i].name ? crew[i].name : crew[i];
    renderList.appendChild(novaLista);
  }
}
