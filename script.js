let h1 = document.getElementsByClassName("ayushAnimation")[0];
let ball = document.getElementsByClassName("ball")[0];
let section = document.getElementsByClassName("myAnimationArea")[0];
let namePlacee = document.querySelector(".nameContainer")

const items = document.querySelectorAll(".ball li");



let gameA = document.getElementsByClassName("gameArea")[0];
let playerA = document.getElementsByClassName("player")[0];
console.log(playerA)
const angleValue = 360 / items.length;

items.forEach((item, index) => {
  const angle = angleValue * index;
  item.style.transform = `rotate(${angle}deg)`;
});

let position = 0;

let name = prompt("Dear user, give your Name");
const myName = name.split(""); 
let nameIndex = 0;

const hexCode = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
};

const changeHeadingColor = (hexCode) => {
  h1.style.color = hexCode();
};
setInterval(() => changeHeadingColor(hexCode), 1000);

const moveBallWithRotation = () => {
  const ballSize = ball.offsetWidth;
  const screenWidth = window.innerWidth;

  position += 10;
  // console.log("It is the pos",position);
  // console.log("It is the ball size",ballSize)

  if(position >= screenWidth-ballSize)
  {
    position = 0;
  }

  if (position % ballSize == 0 && nameIndex < myName.length) {
     
  
    const div = document.createElement("div");
    div.classList.add("nameBall");
    div.innerText = `${myName[nameIndex]}`
    div.style.position = 'absolute'
    div.style.left = `${position}px`
   section.appendChild(div)

 
    nameIndex++; 
  }

 


  ball.style.transform = `translateX(${position}px) rotate3d(0,0,1,${position}deg)`;

   let ballAnimation = requestAnimationFrame(moveBallWithRotation);
  if(nameIndex === myName.length)
{ 
  console.log(nameIndex,myName.length)
  cancelAnimationFrame(ballAnimation)
}
};

   requestAnimationFrame(moveBallWithRotation);
  









const moveThePlayer = () => {
  let playerPos = 0; 

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") playerPos -= 50;  
    if (e.key === "ArrowRight") playerPos += 50; 

    if (playerPos < 0) playerPos = 0;
    if (playerPos + playerA.clientWidth > gameA.clientWidth) {
      playerPos = gameA.clientWidth - playerA.clientWidth;
    }

    playerA.style.left = playerPos + "px";
  });
};





moveThePlayer()





