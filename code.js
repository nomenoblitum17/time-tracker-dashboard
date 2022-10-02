"use strict";

const gridContainer = document.querySelector(".grid-container"),
dailyButton = document.getElementById("daily"),
weeklyButton = document.getElementById("weekly"),
monthlyButton = document.getElementById("monthly"),
bgs = ["hsl(15, 100%, 70%)","hsl(195, 74%, 62%)","hsl(348, 100%, 68%)","hsl(145, 58%, 55%)","hsl(264, 64%, 52%)","hsl(43, 84%, 65%)"];

const createStat = (last,bgColor,image,name,currentState,previousState) =>{
	const stats = document.createElement("div"),
	bgImg = document.createElement("img"),
	statsCard = document.createElement("div"),
	options = document.createElement("div"),
	statsContainer = document.createElement("div"),
	action = document.createElement("p"),
	button = document.createElement("button"),
	buttonImg = document.createElement("img"),
	current = document.createElement("h4"),
	previous = document.createElement("h5");

	stats.classList.add("stats");
	bgImg.classList.add("bg-img");
	statsCard.classList.add("stats-card");
	options.classList.add("options");
	statsContainer.classList.add("stats-container");
	action.classList.add("action");
	button.classList.add("options-2");
	current.classList.add("current");
	previous.classList.add("previous");

	button.appendChild(buttonImg);
	options.appendChild(action);
	options.appendChild(button);

	statsContainer.appendChild(current);
	statsContainer.appendChild(previous);

	statsCard.appendChild(options);
	statsCard.appendChild(statsContainer);

	stats.appendChild(bgImg);
	stats.appendChild(statsCard);

	buttonImg.setAttribute("src","images/icon-ellipsis.svg");
	bgImg.setAttribute("src",image);
	stats.style.backgroundColor = bgColor;

	action.textContent = name;
	current.textContent = `${currentState}hrs`;
	previous.textContent = `${last} - ${previousState}hrs`;

	stats.style.animation = "toShow 1s forwards";

	return stats;
},createError = ()=>{
	const error = document.createElement("div"),
	message = document.createElement("h3"),
	face = document.createElement("p");

	error.classList.add("error")

	message.textContent = "error, server needed";
	face.textContent = ":(";

	error.appendChild(message);
	error.appendChild(face)

	return error;
},
getData = async Frame => {
	let request = await fetch("data.json");
	if (request.ok) {
		let result = await request.json();
		let fragment = document.createDocumentFragment();
		for (let i = 0; i < result.length; i++) {
			if (Frame == "daily") fragment.appendChild(createStat("Yesterday",bgs[i],`images/icon-${i + 1}.svg`,result[i].title,result[i].timeframes.daily.current,result[i].timeframes.daily.previous));
			else if(Frame == "weekly") fragment.appendChild(createStat("Last week",bgs[i],`images/icon-${i + 1}.svg`,result[i].title,result[i].timeframes.weekly.current,result[i].timeframes.weekly.previous));
			else if(Frame == "monthly") fragment.appendChild(createStat("Last month",bgs[i],`images/icon-${i + 1}.svg`,result[i].title,result[i].timeframes.monthly.current,result[i].timeframes.monthly.previous));
		}
		gridContainer.appendChild(fragment);
	}else gridContainer.appendChild(createError())
}

getData("daily");

let replace = () =>{
	let firstChild = gridContainer.firstElementChild;
	gridContainer.innerHTML = "";
	gridContainer.appendChild(firstChild)

}

dailyButton.addEventListener("click",()=>{
	if (gridContainer.children.length > 1) {
		replace();
		getData("daily")		
	} else getData("daily")
})
weeklyButton.addEventListener("click",()=>{
	if (gridContainer.children.length > 1) {
		replace()
		getData("weekly")	
	}else getData("weekly")
})
monthlyButton.addEventListener("click",()=>{
	if (gridContainer.children.length > 1) {
		replace();		
		getData("monthly")		
	}else getData("monthly")
})