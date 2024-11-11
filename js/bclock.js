const bclock = () => {
  const d = new Date();
  let year = d.getFullYear();
  let month = ('00' + (d.getMonth()+1)).slice(-2);
  let date = ('00' + d.getDate()).slice(-2);
  let day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][d.getDay()];
  let hour = ('00' + d.getHours()).slice(-2);
  let min = ('00' + d.getMinutes()).slice(-2);
  let sec = ('00' + d.getSeconds()).slice(-2);

  let today = `${year}.${month}.${date} ${day}`;
  let time = `${hour}:${min}:${sec}`;

  document.querySelector(".bclock-date").innerText = today;
  document.querySelector(".bclock-time").innerText = time;
}

window.onload = () => {
  console.log("hello onload");
  setInterval(bclock, 1000);
}
