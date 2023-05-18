let dugme = document.getElementById("dugme");
let lista = document.getElementById("lista");
let btnKoordinate = document.getElementById("btn");
let span1 = document.getElementById("span1");
let span2 = document.getElementById("span2");
let selectStation = document.getElementById("selectStation");
// console.log(typeof dugme)
// console.log(typeof lista)
// console.log(typeof btnKoordinate)
// console.log(span1)
// console.log(span2)

let url2 = "http://api.open-notify.org/iss-now.json";
let url = "http://api.open-notify.org/astros.json";

async function fetchData(stationName = "") {
  console.log(stationName.target.value);
  try {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    let zhangLu = data.people.find((e) => e.name === "Zhang Lu");
    let ostatak = data.people.filter((e) => e.name !== "Zhang Lu");
    ostatak.unshift(zhangLu);
    console.log(zhangLu);
    console.log(ostatak);
    let stationListAll = [];
    for (let i = 0; i < data.people.length; i++) {
      stationListAll.push(data.people[i].craft);
    }
    let stationList = [...new Set(stationListAll)];
    console.log(stationList);
    if (stationName.target.value === "") {
      selectStation.innerHTML = "";
      for (let i = 0; i < stationList.length; i++) {
        let option = document.createElement("option");
        option.textContent = stationList[i];
        option.value = stationList[i];
        selectStation.appendChild(option);
      }
    }
    console.log(stationName);
    if (stationName.target.value === "") {
      lista.innerHTML = "";
      for (let i = 0; i < ostatak.length; i++) {
        let novaLista = document.createElement("li");
        novaLista.classList = "list-group-item";
        novaLista.textContent = ostatak[i].name;
        lista.appendChild(novaLista);
      }
    } else {
      let stationCrew = data.people.filter(
        (item) => item.craft === stationName.target.value
      );
      lista.innerHTML = "";
      for (let i = 0; i < stationCrew.length; i++) {
        let novaLista = document.createElement("li");
        novaLista.classList = "list-group-item";
        novaLista.textContent = stationCrew[i].name;
        lista.appendChild(novaLista);
      }

      console.log(stationCrew);
    }
  } catch (error) {
    console.log(error);
  }
}
if (dugme) {
  dugme.addEventListener("click", fetchData);
}
if (selectStation) {
  selectStation.addEventListener("change", (e) => {
    fetchData(e);
  });
}

if (btnKoordinate) {
  btnKoordinate.addEventListener("click", startTimer);
}
//btnKoordinate.addEventListener("click", () => { console.log("HI") });

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
  console.log("HI");
  setInterval(fetchData2, 2000);
}
