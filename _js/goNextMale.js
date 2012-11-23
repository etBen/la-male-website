var latitude;
 	var longitude;
    var accuracy;  
	var myOptions;
	var map;
	var maPosition;
	var directionDisplay;
	var end = "14, rue de Charonne, 75011 Paris";
 
	function updateStatus(message) {
		document.getElementById("statut").innerHTML = message;
	}
	
	//fonction errorCallBack appelée en cas d'erreurs rendues par la requete getCurrentPosition
	function handleError(error) {
		switch (error.code) {
		case 0:
			updateStatus("There was an error while retrieving your location: "
					+ error.message);
			break;
		case 1:
			updateStatus("The user prevented this page from retrieving a location.");
			break;
		case 2:
			updateStatus("The browser was unable to determine your location: "
					+ error.message);
			break;
		case 3:
			updateStatus("The browser timed out before retrieving the location.");
			break;
		}
	}
	
	//initialise la carte googleMaps
	function initialize() {
		var myLatlng = new google.maps.LatLng(0, 0);
		myOptions = {
			zoom : 1,
			center : myLatlng,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById("mapCanvas"),
				myOptions);
	}
 
	//fonction successCallBack appelé par la requete getCurrentPosition
	function findPosition(position) {
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		accuracy = position.coords.accuracy;
        findOnGoogleMaps();
	}
	
	//repère la position de l'utilisateur sur la carte
	function findOnGoogleMaps() {
		maPosition = new google.maps.LatLng(latitude, longitude);
		map.setZoom(15);
		map.setCenter(maPosition);
		var marker = new google.maps.Marker({
			position : maPosition,
			map : map,
			title : "Me!"
		});
		document.getElementById('chemin').style.visibility='visible';
	}
	
	//trace le chemin pour aller à la prochaine malé à partir de la position courante
	function findDirection() {
		var directionsService = new google.maps.DirectionsService();
		var start = maPosition;
		
		var request = {
			origin : start,
			destination : end,
			travelMode : google.maps.DirectionsTravelMode.WALKING
		};
		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			}
		});
		directionsDisplay = new google.maps.DirectionsRenderer();
		directionsDisplay.setMap(map);
	}
	
	//trouve la position courante de l'utilisateur
	function startGeolocation() {		
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(findPosition, handleError);
		} else {
			updateStatus("HTML5 Geolocation is not supported in your browser.");
		}		
	}