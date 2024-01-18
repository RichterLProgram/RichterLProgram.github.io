//Variablen für hamburger Menu
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

//Funktionen für hamburger Menu
hamburger.addEventListener("click", toggleMenu);

menuItems.forEach(
   function (menuItem) {
      menuItem.addEventListener("click", toggleMenu);
   }
)

function toggleMenu() {
   if (menu.classList.contains("showMenu")) {
      menu.classList.remove("showMenu");
      closeIcon.style.display = "none";
      menuIcon.style.display = "block";
   } else {
      menu.classList.add("showMenu");
      closeIcon.style.display = "block";
      menuIcon.style.display = "none";
   }
}

function openNav() {
   document.getElementById("mySidenav").style.width = "250px";
   document.getElementById("main").style.marginLeft = "250px";
   document.getElementById("menu-icon").style.display = "none";
}

function closeNav() {
   document.getElementById("mySidenav").style.width = "0";
   document.getElementById("main").style.marginLeft = "0";
   document.getElementById("menu-icon").style.display = "block";
}

//Weitere Funktionen
function getCurrentDateAndTime() {
   const currentDate = new Date();
   const dateString = currentDate.toDateString();
   const divElementDate = document.getElementById("dateDiv");
   divElementDate.innerHTML = dateString;

   const hours = currentDate.getHours();
   const minutes = currentDate.getMinutes();
   const divElementTime = document.getElementById("timeDiv");
   divElementTime.innerHTML = hours + ":" + minutes + " Uhr";
}

setInterval(getCurrentDateAndTime, 1000); //Das Zeit immer geupdated ist

//Farben invertieren
const darkModeButton = document.getElementById('darkModeButton');
const body = document.body;

darkModeButton.addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
   body.classList.toggle('dark-mode');
}

//Window pixel size
const windowSizeDiv = document.createElement('div');
document.body.appendChild(windowSizeDiv);

function updateWindowSize() {
   const width = window.innerWidth;
   const height = window.innerHeight;
   windowSizeDiv.textContent = `Width: ${width}px, Height: ${height}px`;
}

window.addEventListener('resize', updateWindowSize);
updateWindowSize();

//Tic Tac Toe
const board = document.getElementById('board');
const cells = document.querySelectorAll('#board .cell');
const turnDisplay = document.getElementById('turn');
let currentPlayer = 'X';

const tokensDiv = document.getElementById('tokens');
let token = localStorage.getItem('token') || 2; // Load token value from localStorage or set default value to 2

updateTokens();

function updateTokens() {
   localStorage.setItem('token', token);
   tokensDiv.textContent = `Tokens: ${parseInt(token)}`;
}


cells.forEach(cell => {
   cell.addEventListener('click', () => {
      if (cell.textContent === '') {
         cell.textContent = currentPlayer;
         cell.classList.add(currentPlayer.toLowerCase());
         checkWin();
         switchPlayer();
         setTimeout(robotMove, 1000);
      }
   });
});

function switchPlayer() {
   currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
   turnDisplay.textContent = `Am Zug: ${currentPlayer}`;
}

function checkWin() {
   const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
   ];

   for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
         cells[a].textContent === currentPlayer &&
         cells[b].textContent === currentPlayer &&
         cells[c].textContent === currentPlayer
      ) {
         alert(`Spieler ${currentPlayer} gewinnt!`);
         token += 1; 
         updateTokens();
         resetGame();
         break;
      }
   }

   if (Array.from(cells).every(cell => cell.textContent !== '')) {
      alert('Unentschieden!');
      resetGame();
   }
}

function resetGame() {
   cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('x');
      cell.classList.remove('o');
   });
   currentPlayer = 'X';
   turnDisplay.textContent = `Am Zug: ${currentPlayer}`;
}

function robotMove() {
   const emptyCells = Array.from(cells).filter(cell => cell.textContent === '');
   if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const randomCell = emptyCells[randomIndex];
      randomCell.textContent = currentPlayer;
      randomCell.classList.add(currentPlayer.toLowerCase());
      checkWin();
      switchPlayer();
   }
}

turnDisplay.textContent = `Am Zug: ${currentPlayer}`;

//Button
var listBtn = getCookie("listBtn") || ["Moodle", "Mail", "Cloud", "Intranet"];
var listLinks = getCookie("listLinks") || [
   "https://ulmlernt.de/",
   "https://mail.rbs-ulm.de/",
   "https://cloud.rbs-ulm.de/index.php/login",
   "https://intranet.rbs-ulm.de/",
];

function createButton() {
   if (token < 0) {
      alert("Du hast leider zu wenig Tokens. Spiele Tic Tac Toe, um dir welche zu verdienen.");
      return;
   }
   if (token > 0) {
      //location.reload();
      token -= 1;
      updateTokens();
      const buttonNameInput = document.getElementById("buttonName");
      const buttonLinkInput = document.getElementById("buttonLink");

      const buttonName = buttonNameInput.value.toString();
      const buttonLink = buttonLinkInput.value.toString(); // Convert to string

      // Check if button already exists in cookies
      if (listBtn.includes(buttonName) && listLinks.includes(buttonLink)) {
         alert("Button already exists!");
         return;
      }

      // Add button to listBtn
      listBtn.push(buttonName);

      // Add link to listLinks
      listLinks.push(buttonLink);

      // Save updated lists in cookies

         setCookie("listBtn", JSON.stringify(listBtn));
      
         setCookie("listLinks", JSON.stringify(listLinks));
      

      // Clear input fields
      buttonNameInput.value = "";
      buttonLinkInput.value = "";

      // Update buttons
      printBtn();
   }
}

const divButtons = document.getElementById('containerB');

function printBtn() {
   // Clear existing buttons
   divButtons.innerHTML = "";

   for (var i = 0; i < listBtn.length; i++) {
      var element = document.createElement("div");
      element.setAttribute("class", "elementButton");

      var btn = document.createElement("button");
      btn.setAttribute("id", "btn");
      btn.setAttribute("class", "generatedButton");
      btn.setAttribute("title", "Gehe zu " + listBtn[i]);

      var t = document.createTextNode(listBtn[i]);
      btn.appendChild(t);
      element.appendChild(btn);
      divButtons.appendChild(element);
      btn.setAttribute("onclick", "click" + i + "()");
   }

   // Update CSS class "elementButton"
   var elementButtons = document.querySelectorAll(".elementButton");
   var numLinks = listLinks.length;
   var numButtons = elementButtons.length;

   if (numLinks > 0 && numButtons > 0) {
      var numColumns = Math.ceil(numLinks / numButtons);
      var columnWidth = 100 / numColumns;
      var rowHeight = 100 / Math.ceil(numLinks / numColumns);

      elementButtons.forEach(function (elementButton) {
         elementButton.style.width = columnWidth + "%";
         elementButton.style.height = rowHeight + "%";

         elementButton.addEventListener("mouseover", function () {
            elementButton.style.transform = "scale(1.2)";
            elementButton.style.transition = "transform 0.3s ease";
            showTooltip(elementButton);
         });

         elementButton.addEventListener("mouseout", function () {
            elementButton.style.transform = "scale(1)";
            elementButton.style.transition = "transform 0.3s ease";
            hideTooltip();
         });
      });
   }

   for (let i = 0; i < listLinks.length; i++) {
      window['click' + i] = function () {
         window.open(listLinks[i], '_blank');
      };
   }
}

   setCookie("listBtn", JSON.stringify(["Moodle", "Mail", "Cloud", "Intranet"]));
   setCookie("listLinks", JSON.stringify([
      "https://ulmlernt.de/",
      "https://mail.rbs-ulm.de/",
      "https://cloud.rbs-ulm.de/index.php/login",
      "https://intranet.rbs-ulm.de/",
   ]));

function clearLocalStorage() {
   token = getCookie('token');
   deleteAllCookies();
   setCookie('token', token);
   location.reload();

   //Defaults
   setCookie("listBtn", JSON.stringify(["Moodle", "Mail", "Cloud", "Intranet"]));
   setCookie("listLinks", JSON.stringify([
      "https://ulmlernt.de/",
      "https://mail.rbs-ulm.de/",
      "https://cloud.rbs-ulm.de/index.php/login",
      "https://intranet.rbs-ulm.de/",
   ]));
}

const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', clearLocalStorage);

if (numLinks > 0 && numButtons > 0) {
   var numColumns = Math.ceil(numLinks / numButtons);
   var columnWidth = 100 / numColumns;
   var rowHeight = 100 / Math.ceil(numLinks / numColumns);

   elementButtons.forEach(function (elementButton) {
      elementButton.style.width = columnWidth + "%";
      elementButton.style.height = rowHeight + "%";

      elementButton.addEventListener("mouseover", function () {
         elementButton.style.transform = "scale(1.2)";
         elementButton.style.transition = "transform 0.3s ease";
         showTooltip(elementButton);
      });

      elementButton.addEventListener("mouseout", function () {
         elementButton.style.transform = "scale(1)";
         elementButton.style.transition = "transform 0.3s ease";
         hideTooltip();
      });
   });
}

function showTooltip(elementButton) {
   var tooltip = document.createElement("div");
   tooltip.classList.add("tooltip");
   tooltip.innerHTML = "Kurzinfo";

   elementButton.appendChild(tooltip);
}

function hideTooltip() {
   var tooltips = document.querySelectorAll(".tooltip");
   tooltips.forEach(function (tooltip) {
      tooltip.remove();
   });
}


function getCookie(name) {
   var cookieArr = document.cookie.split(";");

   for (var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");

      if (name === cookiePair[0].trim()) {
         var cookieValue = decodeURIComponent(cookiePair[1]).split(",");
         cookieValue[0] = cookieValue[0].substring(1);
         cookieValue[cookieValue.length - 1] = cookieValue[cookieValue.length - 1].slice(0, -1);
         return cookieValue.map(value => value.replace(/"/g, ''));
      }
   }

   return [];
}

//save cookie
function setCookie(name, value) {
   var cookieString = name + "=" + encodeURIComponent(value) + "; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";
   document.cookie = cookieString;
}


function deleteAllCookies() {
   var cookies = document.cookie.split(";");

   for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
   }
}

// Save data before the browser is closed or refreshed
window.addEventListener('beforeunload', function() {
   // Save token value to localStorage
   localStorage.setItem('token', token);

   // Save listBtn and listLinks to cookies
   setCookie('listBtn', JSON.stringify(listBtn));
   setCookie('listLinks', JSON.stringify(listLinks));
});
