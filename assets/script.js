let gameroad = document.querySelector(".gameroad");
let car = document.querySelector(".car");
let startbtn = document.querySelector(".startbtn");
let container = document.querySelector(".container");
let scoreContainer = document.querySelector(".scoreContainer");
let showScore = document.querySelector(".showScore");
let scorevalue = document.querySelector("#scorevalue");
let highScore = document.querySelector(".highScore");
let fire = document.querySelector(".fire");
let gameCountDown = document.querySelector(".gameCountDown");
let audio = document.getElementById("audio");
let tree = document.querySelector(".tree")
let player = { speed: 5, score: 0 };
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  5: false,
};
let carSpeed = { Cspeed: 15 };
let score = 0;
let carZindex = "";
let autoLeft = "";
let audioElement = new Audio();
let sound = ["assets/sounds/carStart.mp3", "./assets/sounds/car crash.mp3"];
let windowHeight = window.innerHeight;
if (windowHeight < 1080) {
  player.speed -= 0;
} else if (windowHeight < 1440 && windowHeight > 1080) {
  player.speed += 5;
} else if (windowHeight > 1440 && windowHeight < 2160) {
  player.speed += 9;
}

// on click on startbtn run startgame function
startbtn.addEventListener("click", startgame);
// lines function
// we want only 6 lines so we run loop for less than 7 times
// now we create a div and set the class and give style in css
// now every div will started from top so 1st div index 0 and top also 0; but jaise
// index increase hoga ex.1,2,3 vasie hi top se value bhi increase hogi so that overlaping na ho

// create tree
let treeArr = [
  "./assets/images/tree2.png",
  "./assets/images/tree2.png",
  "./assets/images/tree2.png",
];
for (x = 0; x < treeArr.length; x++) {
  function CreateleftHandHome(marginTop) {
    let divtree = document.createElement("div");
    divtree.setAttribute("class", "trees");
    let imgtree = document.createElement("img");
    imgtree.src = treeArr[x];
    divtree.appendChild(imgtree);
    divtree.y = x * marginTop;
    divtree.style.top = divtree.y + "px";
    container.appendChild(divtree);
  }
  if (windowHeight > 1440 && windowHeight < 2160) {
    CreateleftHandHome(650);
  }
  if (windowHeight < 1440) {
    CreateleftHandHome(350);
  }
}
// create right hand side tree
for (x = 0; x < treeArr.length; x++) {
  function createRightHandTree(marginTop) {
    let divRighttree = document.createElement("div");
    divRighttree.setAttribute("class", "treesRight");
    let Rightimgtree = document.createElement("img");
    Rightimgtree.src = treeArr[x];
    divRighttree.appendChild(Rightimgtree);
    divRighttree.y = x * marginTop;
    divRighttree.style.top = divRighttree.y + "px";
    container.appendChild(divRighttree);
  }
  if (windowHeight > 1440 && windowHeight < 2160) {
    createRightHandTree(650);
  }
  if (windowHeight < 1440) {
    createRightHandTree(350);
  }
}

// create home
let homeArr = [
  "./assets/images/home1.png",
  "./assets/images/home2.png",
  "./assets/images/home5.png",
];
for (x = 0; x < homeArr.length; x++) {
  function createLeftHandHome(marginTop) {
    let div = document.createElement("div");
    div.setAttribute("class", "homeDiv");
    let imgHome = document.createElement("img");
    imgHome.src = homeArr[x];
    div.appendChild(imgHome);
    div.y = x * marginTop;
    div.style.top = div.y + "px";
    container.appendChild(div);
  }
  if (windowHeight > 1440 && windowHeight < 2160) {
    createLeftHandHome(650);
  }
  if (windowHeight < 1440) {
    createLeftHandHome(350);
  }
}
let rightHomeArr = [
  "./assets/images/home3.png",
  "./assets/images/home4.png",
  "./assets/images/home6.png",
];
for (x = 0; x < rightHomeArr.length; x++) {
  function createRightHandHome(marginTop) {
    let div = document.createElement("div");
    div.setAttribute("class", "righthomeDiv");
    let imgHome = document.createElement("img");
    imgHome.src = rightHomeArr[x];
    div.appendChild(imgHome);
    div.y = x * marginTop;
    div.style.top = div.y + "px";
    container.appendChild(div);
  }
  if (windowHeight > 1440 && windowHeight < 2160) {
    createRightHandHome(650);
  }
  if (windowHeight < 1440) {
    createRightHandHome(350);
  }
}

//move the lines
//first select all the lines and run for each mthond on lines and added a value
//and give the direction that is top and also give condition if y axis se ye 875px
//chla jaye means height 875 ho jaye to isne se -900 kr do taki ye vapis top pr chla jaye
function createLines(xheight, xheight2, xheight3, xheight4) {
  function createLineStructure() {
    let roadlines = document.createElement("roadlines");
    roadlines.setAttribute("class", "lines");
    roadlines.y = x * 150;
    roadlines.style.top = roadlines.y + "px";
    gameroad.appendChild(roadlines);
  }
  if (xheight.matches) {
    for (x = 0; x < 6; x++) {
      createLineStructure();
    }
  } else if (xheight2.matches) {
    for (x = 0; x < 8; x++) {
      let roadlines = document.createElement("roadlines");
      createLineStructure();
    }
  } else if (xheight3.matches) {
    for (x = 0; x < 11; x++) {
      createLineStructure();
    }
  } else if (xheight4.matches) {
    for (x = 0; x < 14; x++) {
      createLineStructure();
    }
  }
}
function movelines(xheight, xheight2, xheight3, xheight4) {
  let gameroadHeight = gameroad.getBoundingClientRect().height;
  let lines = document.querySelectorAll(".lines");
  lines.forEach(function (line) {
    if (line.y >= gameroadHeight) {
      line.y -= gameroadHeight + 270;
    }
    line.y += player.speed;
    line.style.top = line.y + "px";
  });
}
// move tree and home function
function moveTreeHome(item) {
  let gameroadHeight = gameroad.getBoundingClientRect().height;
  item.style.display = "block";
  if (item.y >= gameroadHeight) {
    item.y -= gameroadHeight + 270;
  }
  item.y += player.speed;
  item.style.top = item.y + "px";
}
// move trees
// when we call the function make display block
function movetrees() {
  let trees = document.querySelectorAll(".trees");
  trees.forEach(function (tree) {
    moveTreeHome(tree);
  });
}
function moveRighttrees() {
  let treesRight = document.querySelectorAll(".treesRight");
  treesRight.forEach(function (treeRight) {
    moveTreeHome(treeRight);
  });
}

// move homes
function leftHomeMove() {
  let homeDiv = document.querySelectorAll(".homeDiv");
  homeDiv.forEach(function (letfHome) {
    moveTreeHome(letfHome);
  });
}
function RightHomeTree() {
  let righthometree = document.querySelectorAll(".righthomeDiv");
  righthometree.forEach(function (righthome) {
    moveTreeHome(righthome);
  });
}
// create cars
let enemyCarArr = [
  "./assets/images/car1.png",
  "./assets/images/car3.png",
  "./assets/images/car4.png",
  "./assets/images/truck.png",
  "./assets/images/bike1.png",
  "./assets/images/car5.png",
];
function createCars(xheight, xheight2, xheight3, xheight4) {
  function createCarsStructure(num) {
    let div = document.createElement("div");
    div.setAttribute("class", "enemyCars");
    let img = document.createElement("img");
    img.src = enemyCarArr[x];
    div.appendChild(img);
    div.y = x * num;
    div.style.top = div.y + "px";
    gameroad.appendChild(div);
  }
  if (xheight.matches) {
    for (x = 0; x < 3; x++) {
      createCarsStructure(190);
    }
  } else if (xheight2.matches) {
    for (x = 0; x < 4; x++) {
      createCarsStructure(220);
    }
  } else if (xheight3.matches) {
    for (x = 0; x < 5; x++) {
      createCarsStructure(250);
    }
  } else if (xheight4.matches) {
    for (x = 0; x < 5; x++) {
      createCarsStructure(320);
    }
  }
}
// move the enemyCars
// same as line move yha pr hr baar alg alg postion ke liye math functon ke use krenge
function moveCars(car, xheight, xheight2, xheight3, xheight4) {
  let enemyCars = document.querySelectorAll(".enemyCars");
  enemyCars.forEach(function (enemyCar) {
    let gameroadHeight = gameroad.getBoundingClientRect().height;
    if (iscollide(car, enemyCar)) {
      audio.pause();
      audioElement.src = sound[1];
      audioElement.muted = true;
      audioElement.play();
      audioElement.muted = false;
      player.start = false;
      showScore.innerHTML = `you loose <br> your score is ${score + 1}`;
      scorevalue.value = score + 1;
      fire.style.display = "block";
      setScore();
      showScore.classList.add("show");
      window.removeEventListener("keydown", keyfunction);
      showScore.addEventListener("click", () => {
        window.location.reload();
      });
    }
    if (enemyCar.y >= gameroadHeight) {
      enemyCar.y -= gameroadHeight + 270;
      if (windowHeight > 1440) {
        enemyCar.style.left = Math.ceil(Math.random() * 270) * 3 + "px";
      }
      if (windowHeight < 1440) {
        enemyCar.style.left = Math.ceil(Math.random() * 130) * 3 + "px";
      }
    }
    enemyCar.y += player.speed;
    enemyCar.style.top = enemyCar.y + "px";
  });
}

// collision detection
function iscollide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();
  return (
    aRect.top < bRect.bottom &&
    aRect.bottom > bRect.top &&
    aRect.right > bRect.left &&
    aRect.left < bRect.right &&
    carZindex == 1
  );
}
//keys
// firstof all we have to know that ki user window pe konsi ki press kr rha ho or konsi release kr rha hai
// we add event lisetener for down the key and specify the that if particular key is pressed then what happen
// keycode 38 for toparrow and it can find by console e .keycode

function keyfunction(e) {
  let gameroadHeight = gameroad.getBoundingClientRect().height;
  let gameroadWidth = gameroad.getBoundingClientRect().width;
  let carheight = parseInt(getComputedStyle(car).getPropertyValue("height"));
  let carWidth = parseInt(getComputedStyle(car).getPropertyValue("width"));
  e.preventDefault();
  keys[e.key] = true;
  let carposition = car.getBoundingClientRect();
  function IncZindexOfCar() {
    car.style.zIndex = 4;
    carZindex = car.style.zIndex;
    car.style.marginLeft = -32 + "px";
  }
  function DecZindexOfCar() {
    car.style.zIndex = 1;
    car.style.marginLeft = -18 + "px";
    carZindex = car.style.zIndex;
  }
  if (keys[5]) {
    let carWidth = parseInt(getComputedStyle(car).getPropertyValue("width"));
    if (windowHeight < 1440) {
      // first of all here carWidth's value came only once at when we call fun keyup and it's 61 so write cond
      // but here to decrease size of car i don't have value of current size of car becoz width take value at once
      // so i have to assign value of current size of car to variable that is (IncreaseCarSize current value=81) and
      // after 1000s run the fun. that make car same size as before in this i can use only IncreaseCarSize not carWidth
      if (carWidth < 81) {
        console.log("statement run  " + carWidth);
        car.style.width = 81 + "px";
        IncZindexOfCar()
        IncreaseCarSize = parseInt(car.style.width);
      }

      setTimeout(() => {
        console.log("setTimeout function run");
        if (IncreaseCarSize == 81) {
          car.style.width = 61 + "px";
          DecZindexOfCar();
        }
      }, 1000);
    } else {
      if (carWidth < 155) {
        car.style.width = 155 + "px";
        IncZindexOfCar();
        NextIncreaseCarSize = parseInt(car.style.width);
      }

      setTimeout(() => {
        if (NextIncreaseCarSize == 155) {
          car.style.width = 135 + "px";
          DecZindexOfCar();
        }
      }, 1000);
    }
  }
  if (keys.ArrowUp) {
    let carBottom = parseInt(getComputedStyle(car).getPropertyValue("bottom"));
    if (carBottom < gameroadHeight - carheight - 40) {
      car.style.bottom = carBottom + carSpeed.Cspeed + "px";
    }
  }
  if (keys.ArrowDown) {
    let carBottom = parseInt(getComputedStyle(car).getPropertyValue("bottom"));
    console.log(carBottom);
    if (carBottom > 48) {
      car.style.bottom = carBottom - carSpeed.Cspeed + "px";
    }
  }
  if (keys.ArrowRight) {
    let carleft = parseInt(getComputedStyle(car).getPropertyValue("left"));
    if (carleft < gameroadWidth - carWidth - 20) {
      car.style.left = carleft + carSpeed.Cspeed + "px";
    }
  }
  if (keys.ArrowLeft) {
    let carleft = parseInt(getComputedStyle(car).getPropertyValue("left"));
    if (carleft > 0) {
      car.style.left = carleft - carSpeed.Cspeed + "px";
    }
  }
}

function keyUpfunction(e) {
  e.preventDefault();
  keys[e.key] = false;
}

// if player is true then start the animations
function gameplay() {
  let gameroadPositon = gameroad.getBoundingClientRect();
  scoreContainer.classList.add("show");
  highScore.classList.add("show");
  if (player.start) {
    moveCars(car);
    movetrees();
    moveRighttrees();
    movelines(xheight, xheight2, xheight3, xheight4);
    leftHomeMove();
    RightHomeTree();
    requestAnimationFrame(gameplay);
    score++;
    scoreContainer.innerHTML = `your score : ${score}`;
  }
}

// startgame game fun will run only if player is true and call the function game play
// cif collisio then player will be false so don't call the game play fun
// do this to avoid uncaught promises of audio ===>
// audioElement.muted = true;
// audioElement.src = sound[0];
// audioElement.play();
// audioElement.muted=false

// NOTE : i want to play accelerator sound until the car is collide so i have to loop the accelerator audio
// so i have created audio element in html and loop this and when collsion occur i paused the audio of accelerator
function startgame() {
  gameCountDown.classList.add("show");
  // tree.classList.add("show")
  player.start = true;
  car.style.zIndex = 1;
  audioElement.muted = true;
  audioElement.src = sound[0];
  audioElement.play();
  audioElement.muted = false;
  carZindex = car.style.zIndex;
  gameroad.classList.add("show");
  startbtn.classList.add("hide");
  container.classList.add("blackBackGround");
  setScore();

  setTimeout(() => {
    window.addEventListener("keydown", keyfunction);
    audioElement.muted = false;
    audioElement.src = sound[1];
    audioElement.play();
    audioElement.muted = true;

    audio.play();
    window.requestAnimationFrame(gameplay);
  }, 3000);
}
//set score
// score is golbal variable so can be access and call the function at the time of colllson
// and when game start

function setScore() {
  let scoreinputval = scorevalue.value;
  let score_arr = [];
  let getScoreValue = localStorage.getItem("setscore");
  if (getScoreValue != undefined) {
    score_arr = JSON.parse(getScoreValue);
  }
  score_arr.push(scoreinputval);
  localStorage.setItem("setscore", JSON.stringify(score_arr));
  let acsarr = score_arr.sort(function (a, b) {
    return a - b;
  });
  let highScoreValue = "";
  highScoreValue = acsarr.pop();
  highScore.innerHTML = `high score : ${highScoreValue}`;
}
// describe max width "responsive"
var xheight = window.matchMedia("(max-height: 720px)");
var xheight2 = window.matchMedia("(max-height: 1080px)");
var xheight3 = window.matchMedia("(max-height: 1440px)");
var xheight4 = window.matchMedia("(max-height: 2160px)");

createLines(xheight, xheight2, xheight3, xheight4);
createCars(xheight, xheight2, xheight3, xheight4);
window.addEventListener("keyup", keyUpfunction);
