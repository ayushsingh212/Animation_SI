let h1 = document.getElementsByClassName("ayushAnimation")[0];
let ball = document.getElementsByClassName("ball")[0];
let section = document.getElementsByClassName("myAnimationArea")[0];
let namePlacee = document.querySelector(".nameContainer")

const items = document.querySelectorAll(".ball li");
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

  position += 2;

  if(position >= screenWidth-ballSize)
  {
    position = 0;
  }

  if (position % ballSize == 0 && nameIndex < myName.length) {
    const div = document.createElement("div");
    div.classList.add("nameBall");
    div.innerText = `${myName[nameIndex]}`
    div.style.position = 'absolute'
   namePlacee.appendChild(div)

 
    nameIndex++; 
  }

 


  ball.style.transform = `translateX(${position}px) rotate3d(0,0,1,${position}deg)`;

  requestAnimationFrame(moveBallWithRotation);
};

requestAnimationFrame(moveBallWithRotation);
