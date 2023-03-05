const mediaQuery = window.matchMedia("(min-width: 768px)");

if (mediaQuery.matches) {
	console.log("Media Query Matched!");
}

function getRank() {
	username = document.getElementById("username").value;
	tag = document.getElementById("tag").value;
	accName = username + "#" + tag;
	fetch(`https://api.henrikdev.xyz/valorant/v1/mmr/eu/${username}/${tag}`)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			text =
				data["data"]["currenttierpatched"] +
				" - " +
				data["data"]["ranking_in_tier"] +
				"rr";
			imgUrl = data["data"]["images"]["large"];
			console.log(text);
			document.getElementById("rank").innerHTML = text;
			document.getElementById("name").innerHTML = accName;
			document.getElementById("username").value = "";
			document.getElementById("tag").value = "";
			document.getElementById("rank-img").src = imgUrl;
		})
		.catch(function (err) {
			console.log("Fetch Error :-S", err);
		});
}

function showMenu() {
	var left = document.getElementById("left");

	if (left.classList.contains("left-dropdown")) {
		left.style.display = "none";
		left.classList.remove("left-dropdown");
		var navbar = document.getElementById("navbar");
		navbar.classList.remove("dropdown");

		var trackerText = document.getElementById("tracker-text");
		trackerText.classList.remove("shift-down");
	} else {
		left.style.display = "grid";
		left.classList.add("left-dropdown");
		var navbar = document.getElementById("navbar");
		navbar.classList.add("dropdown");

		var trackerText = document.getElementById("tracker-text");
		trackerText.classList.add("shift-down");
	}
}

function copyCode(event) {
	const elementId = event.target.id;
	console.log("Clicked element with ID:", elementId);
	var textDiv = event.target.querySelector("#text");
	var crosshairCode = event.target.querySelector("#crosshair-code");
	navigator.clipboard.writeText(crosshairCode.innerText);
	const backup = textDiv.innerText;
	textDiv.innerText = "Crosshair copied!";
	event.target.classList.add("crosshair-copied");
	event.target.disabled = true;
	sleep(3000).then(() => {
		event.target.classList.remove("crosshair-copied");
		textDiv.innerText = backup;
		event.target.disabled = false;
		console.log(textDiv.innerText);
	});
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function cpText() {
	copyrightText =
		"&copy;" +
		new Date().getFullYear() +
		" Eugenio Pignatale - All Rights reserved.";
	document.getElementById("cpt").innerHTML = copyrightText;
	console.log(copyrightText);
}
