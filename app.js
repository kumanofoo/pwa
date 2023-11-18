const dice = () => {
  const dice = Math.floor(Math.random() * 6) + 1;
  console.log(dice);

  document.getElementById("number").innerHTML = dice;
}
