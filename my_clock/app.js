setInterval(setClock, 1000);
let handSecond = document.querySelector(".hand.second");
function setClock() {
  const currentDate = new Date();
  let second = currentDate.getSeconds() / 60;
  let minute = currentDate.getMinutes() / 60;
  let hour = currentDate.getHours() / 12;
  handSecond.style.setProperty("--rotation",360 * second);
}
