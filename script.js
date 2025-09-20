let h1 = document.getElementsByClassName("ayushAnimation")[0];
let h2 = document.getElementsByTagName("h2")[0];
let scoreA = document.getElementsByTagName("span")[0];
let ball = document.getElementsByClassName("ball")[0];
let section = document.getElementsByClassName("myAnimationArea")[0];
let namePlacee = document.querySelector(".nameContainer")
let startButton = document.getElementsByTagName("button")[0];

const items = document.querySelectorAll(".ball li");

 

let gameA = document.getElementsByClassName("gameArea")[0];
let playerA = document.getElementsByClassName("player")[0];





const audio = new Audio("./resources/tank-sound.mp3");



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
    
function target() {
      const target = document.createElement("div");
      target.classList.add("target");
   
      const maxS = gameA.clientWidth - 40;
      const ranX = Math.floor(Math.random() * maxS);

      target.style.left = ranX + "px";
      target.style.top = "0px";

      gameA.appendChild(target);

       moveTarget(target)

   
    }

    let score = 0;
    
const bullet =() =>{


      const bullet = document.createElement("div");
      bullet.classList.add("bullet");

      const gunInf = playerA.getBoundingClientRect();
      const gameInf = gameA.getBoundingClientRect();

       console.log("I am here gunn and game info",gunInf,gameInf)

      const bulletXPos = gunInf.left - gameInf.left + gunInf.width / 2 - 10;
      const bulletYPos = gunInf.top - gameInf.top;

      bullet.style.left = bulletXPos + "px";
      bullet.style.top = bulletYPos + "px";

      gameA.appendChild(bullet);

      let bulletInterval = setInterval(() => {
        let y = parseInt(bullet.style.top);

        if (y < 0) {
          bullet.remove();
       

          
          clearInterval(bulletInterval);


        } else {

        console.log(" I am working")
          bullet.style.top = (y - 7) + "px";


           
          const bulletI = bullet.getBoundingClientRect();
          const targets = document.querySelectorAll(".target");

          targets.forEach(target => {
            const targetI = target.getBoundingClientRect();

            if (
              bulletI.left < targetI.right &&
              bulletI.right > targetI.left &&
              bulletI.top < targetI.bottom &&
              bulletI.bottom > targetI.top
            ) {
              target.remove();
              bullet.remove();
              score++;
                 scoreA.innerHTML  = `${score}  Points `

              clearInterval(bulletInterval);
            }
          });
        }
      }, 20);
    }

   function moveTarget(target) {

      console.log(" i movetarget working")
      let targetInterval = setInterval(() => {
        let y =   parseInt(target.style.top);
        if (y > gameA.clientHeight - 30) {
          target.remove();
          clearInterval(targetInterval);
        } else {
          target.style.top = (y + 5) + "px";
        }
      }, 30);
    }





 let isPlaying = false;

//  gameA.style.display = "none"

// gameA.innerText = `PLEASE START THE GAME `


startButton.addEventListener("click",()=>{

  if(!isPlaying){
    // gameA.innerText = `THE GAME HAS BEEN STARTED`
    isPlaying = true;
    audio.loop = true;
    audio.play()  
   h2.innerText =`The game has been started`

    startButton.style.display = "none";
    moveThePlayer();
    setInterval(target, 2000);
     document.addEventListener("keydown",(e)=>{
  
  if(e.key === " ")
 {

bullet()
 }



 })
  }
})