// LANCEMENT D'UNE NOUVELLE PARTIE
	var isPlaying = false;

	function newGame(){
		stopChrono();
		isPlaying = false;

		var barre = document.getElementById("changementTaille");
		var taille = barre.options[barre.selectedIndex].value;
		document.getElementById("image_apercu").src="ressources/gameImage.jpg";
		
		initTab(taille);

		compte=setTimeout('swap()',2000);
		clearTimeout(swap);
	}

	function swap(){
		var barre = document.getElementById("changementTaille");
		var taille = barre.options[barre.selectedIndex].value;

		do{
			var emplacementCaseVide = taille*taille;
			var caseChange = 0;

			for(var i=0; i<55*taille;i++){	
				var deplacementAlea = Math.floor(Math.random() * 4);
				// Déplacement un cran à gauche
				if(deplacementAlea==0){
					if(emplacementCaseVide%taille!=1){
						caseChange = Number(emplacementCaseVide)-1;
						echangerANDblank(document.getElementById("carre"+caseChange.toString()), 
											document.getElementById("carre"+emplacementCaseVide.toString()))
						emplacementCaseVide=caseChange;
					}
				}
				// Déplacement un cran à droite
				else if(deplacementAlea==1){			
					if(emplacementCaseVide%taille!=0){
						caseChange = Number(emplacementCaseVide)+1;
						echangerANDblank(document.getElementById("carre"+caseChange.toString()), 
											document.getElementById("carre"+emplacementCaseVide.toString()))
						emplacementCaseVide=caseChange;
					}
				}
				// Déplacement un cran en bas
				else if(deplacementAlea==2){
					if(emplacementCaseVide<=(taille-1)*taille){
						caseChange = Number(emplacementCaseVide)+Number(taille);
						echangerANDblank(document.getElementById("carre"+caseChange.toString()), 
											document.getElementById("carre"+emplacementCaseVide.toString()))
						emplacementCaseVide=caseChange;
					}
				}
				// Déplacement un cran en haut
				else if(deplacementAlea==3){
					if(emplacementCaseVide>taille){
						caseChange = Number(emplacementCaseVide)-Number(taille);
						echangerANDblank(document.getElementById("carre"+caseChange.toString()), 
											document.getElementById("carre"+emplacementCaseVide.toString()))
						emplacementCaseVide=caseChange;
					}
				}
			}
		}while(checkWin());
	}

	function initTab(taille){
		document.getElementById("divImg").style.display             ="none";
		document.getElementById("divMeilleursScores").style.display ="none";
		document.getElementById("divRegles").style.display          ="none";
		document.getElementById("divCredits").style.display         ="none";

		var tableau = document.getElementById("table");

		var currentIndex = 0;
		tableau.innerHTML = "";
		for(var i=0; i<taille; i++){
			var row = tableau.insertRow(i);
			for(var j=0; j<taille; j++){
				currentIndex++
				var cell = row.insertCell(j);
				
				if(currentIndex==taille*taille){
					cell.innerHTML = '<img src="ressources/InGame/blankSquare.png"'+
										'onclick="clicImage('+currentIndex.toString()+')" '+
										'style="cursor:pointer;" '+
										'width="100%" height="100%" '+
										'value="0" '+
										'id="carre'+currentIndex.toString()+'"/>';
				}
				else{
					cell.innerHTML = '<img src="ressources/InGame/'+taille+'x'+taille+'/'+currentIndex.toString()+'Square.png" '+
									'onclick="clicImage('+currentIndex.toString()+')" '+
									'style="cursor:pointer;" '+
									'width="100%" height="100%" '+
									'id="carre'+currentIndex.toString()+'"/>';
				}
			}	
		}
		for(var i=1; i<(taille*taille); i++){
			document.getElementById("carre"+i.toString()).value = i.toString();
		}
	}

// MUSIQUE
	var volume = 1;
	function playMusic(){
		var player = document.getElementById('audioPlayer');
		player.addEventListener('ended', function() {
							    this.currentTime = 0;
							    this.play();
							}, false);
		player.play();
	}

	function stopMusic(){
		var player = document.getElementById('audioPlayer');
		player.pause();
	}

	function changerSon(){
		var but = document.getElementById("boutonSon");
		var player = document.getElementById('audioPlayer');
		if(volume==0.25)
			volume=0.5;
		else if(volume==0.5)
			volume=0.75;
		else if(volume==0.75)
			volume=1;
		else if(volume==1)
			volume=0.25;
		player.volume=volume;
		but.value="Volume: "+volume*100+"%";
	}

// CHRONOMETRE
	var cent = 0;
	var sc   = 0;

	function chrono() {
		cent++;
		if (cent>90){
			cent=0;
			sc++
		}

		var display   = document.getElementById("l_enhanced");
		display.value = "Votre temps: "+sc+"."+cent+"s";
		compte=setTimeout('chrono()',10);	
	}

	function stopChrono(){
		if (typeof compte != "undefined") {
			clearTimeout(compte);
		}
		cent =0;
		sc   =0;
		var display   = document.getElementById("l_enhanced");
		display.value = "Votre temps: 0.00s (se lancera lors du premier clic)";
	}

// ZONE DE JEU
	// DEBUT DE LA PARTIE
	function launchGame(){
		isPlaying = true;
		chrono();
	}

	function checkWin() {
		var puzzleSolved = true;
		var barre = document.getElementById("changementTaille");
		var taille = barre.options[barre.selectedIndex].value;

		var indice = 0;
		for(var i=1; i<(taille*taille);i++){
			if(document.getElementById("carre"+i.toString()).value!=i.toString()){
				puzzleSolved=false;
			}
			indice=i;
		}

		if (puzzleSolved) {
			clearTimeout(compte);
			for(var i=1; i<=(taille*taille);i++){
				//document.getElementById("carre"+i.toString()).src="ressources/gifalt.gif";
				document.getElementById("carre"+i.toString()).disable="disable";
				puzzleSolved=false;
			}
			document.getElementById("image_apercu").src="ressources/gifalt.gif";
			envoieScores();
			newGame();
		}
	}

	function echangerANDblank(img2, img1) {
		img1.src   = img2.src;
		img1.value = img2.value;
		makeBlank(img2);
	}

	function makeBlank(image) {
		image.value ="blank";
		image.src   ="ressources/InGame/blankSquare.png";
	}

// DEPLACEMENTS
	function clicImage(numImage) {	
		if(!isPlaying){
			launchGame();
		}
		
		var imageManipulee = document.getElementById("carre"+numImage.toString());
		var barre = document.getElementById("changementTaille");
		var taille = barre.options[barre.selectedIndex].value;
		var dimension = taille*taille;
		// On cherche si la case vide est dans la:
		// case précédente
		if(numImage-1>0 && document.getElementById("carre"+Number(numImage-1)).value=="blank" && (numImage-1)%taille!=0){ 
			echangerANDblank(imageManipulee, document.getElementById("carre"+Number(numImage-1)));
		}
		// case suivante
		else if(numImage+1<=dimension && document.getElementById("carre"+Number(numImage+1)).value=="blank" && (numImage+1)%taille!=1){ 
			echangerANDblank(imageManipulee, document.getElementById("carre"+Number(numImage+1)));	
		}	
		// case du haut
		else if(numImage-taille>0 && document.getElementById("carre"+Number(numImage-taille)).value=="blank"){ 
			echangerANDblank(imageManipulee, document.getElementById("carre"+Number(numImage-taille)));
		}
		// case du bas
		else if(Number(Number(numImage)+Number(taille))<=dimension && document.getElementById("carre"+Number(Number(numImage)+Number(taille))).value=="blank"){ 
			echangerANDblank(imageManipulee, document.getElementById("carre"+Number(Number(numImage)+Number(taille))));
		}

		checkWin();
	}

	document.onkeydown = checkKey;
	function checkKey(e) {
	    e = e || window.event;

	    var barre = document.getElementById("changementTaille");
		var taille = barre.options[barre.selectedIndex].value;
		var dimension = taille*taille;

	    if(!isPlaying){
			launchGame(dimension);
		}

	    if (e.keyCode == '38') {
	    	var indiceCaseVide = searchVoid();
			var caseVide = document.getElementById("carre"+indiceCaseVide.toString());
	    	// touche haut
	    	if(indiceCaseVide>taille){
	    		echangerANDblank(document.getElementById("carre"+(indiceCaseVide-taille).toString()),caseVide);
	    		indiceCaseVide = searchVoid();
	    	}
	    }
	    else if (e.keyCode == '40') {
	    	var indiceCaseVide = searchVoid();
			var caseVide = document.getElementById("carre"+indiceCaseVide.toString());
	    	// touche bas
	    	if(Number(Number(indiceCaseVide)+Number(taille))<=dimension){
	    		echangerANDblank(document.getElementById("carre"+Number(Number(indiceCaseVide)+Number(taille)).toString()),caseVide);
	    		indiceCaseVide = searchVoid();
			}	    	
	    }
	    else if (e.keyCode == '37') {
	    	var indiceCaseVide = searchVoid();
			var caseVide = document.getElementById("carre"+indiceCaseVide.toString());
			// touche gauche
			if(indiceCaseVide-1>0 && (indiceCaseVide-1)%taille!=0){ 
	    		echangerANDblank(document.getElementById("carre"+Number(Number(indiceCaseVide)-1).toString()),caseVide);
	    		indiceCaseVide = searchVoid();
			}
	    }
	    else if (e.keyCode == '39') {
	    	var indiceCaseVide = searchVoid();
			var caseVide = document.getElementById("carre"+indiceCaseVide.toString());
	    	// touche droite 
			if(indiceCaseVide+1<=dimension && (indiceCaseVide+1)%taille!=1){
				echangerANDblank(document.getElementById("carre"+Number(Number(indiceCaseVide)+1).toString()),caseVide);
	    		indiceCaseVide = searchVoid();
			}
	    }
	    checkWin();
	}

	function searchVoid(){
	 	var imgCourante;

	 	var barre = document.getElementById("changementTaille");
	 	var taille = barre.options[barre.selectedIndex].value;
		var dim = taille*taille;

	 	for(var i=1; i<=dim; i++){
	 		if(document.getElementById("carre"+i.toString()).value=="blank"){
	 			return i;
	 		}
	 	}
	 	return 0;
	 }

// BLOCS CACHES
	var image_ouvert    = false;
	var ms_ouvert       = false;
	var regles_ouvert   = false;
	var credits_ouverts = false;

	function formImage(){
		if(!image_ouvert){
			document.getElementById("divImg").style.display="block";
			image_ouvert    = true;

			ms_ouvert       = false;
			document.getElementById("divMeilleursScores").style.display="none";
			regles_ouvert   = false;
			document.getElementById("divRegles").style.display="none";
			credits_ouverts = false;
			document.getElementById("divCredits").style.display="none";
		}
		else {
			document.getElementById("divImg").style.display="none";
			image_ouvert = false;
		}
	}

	function showMeilleursScores(){
		if(!ms_ouvert){

			// recup scores
			xmlhttp=new XMLHttpRequest(); 
			xmlhttp.onreadystatechange=function(){   
				if (xmlhttp.readyState==4 && xmlhttp.status==200)
					var tab = [];
					tab = xmlhttp.responseText.split(",");
					var add = "";
					if(tab.length%2==0){
						for(var i=0; i<tab.length; i+=2){
							add += tab[i]+" a fait un score de: "+tab[i+1]+"sc<br/>";
					}
					document.getElementById("divMeilleursScores").innerHTML = add;
				}
			}
			var barre = document.getElementById("changementTaille");
			var taille = barre.options[barre.selectedIndex].value;
			xmlhttp.open("GET","SelectBDD.php?taille="+taille,true); 
			xmlhttp.send(); 

			// affichage section score
			document.getElementById("divMeilleursScores").style.display="block";
			ms_ouvert = true;

			image_ouvert    = false;
			document.getElementById("divImg").style.display="none";
			regles_ouvert   = false;
			document.getElementById("divRegles").style.display="none";
			credits_ouverts = false;
			document.getElementById("divCredits").style.display="none";
		}
		else {
			document.getElementById("divMeilleursScores").style.display="none";
			ms_ouvert = false;
		}
	}

	function showRegles(){
		if(!regles_ouvert){
			document.getElementById("divRegles").style.display="block";
			regles_ouvert = true;

			image_ouvert    = false;
			document.getElementById("divImg").style.display="none";
			ms_ouvert       = false;
			document.getElementById("divMeilleursScores").style.display="none";
			credits_ouverts = false;
			document.getElementById("divCredits").style.display="none";
		}
		else {
			document.getElementById("divRegles").style.display="none";
			regles_ouvert = false;
		}
	}

	function showCredits(){
		if(!credits_ouverts){
			document.getElementById("divCredits").style.display="block";
			credits_ouverts = true;

			image_ouvert    = false;
			document.getElementById("divImg").style.display="none";
			ms_ouvert       = false;
			document.getElementById("divMeilleursScores").style.display="none";
			regles_ouvert   = false;
			document.getElementById("divRegles").style.display="none";
		}
		else {
			document.getElementById("divCredits").style.display="none";
			credits_ouverts = false;
		}
	}

// REQUETES
	function envoieScores()	{
		// ex -> temps=0&taille=3&pseudo=test
		
		var pseudosAlea = ["Mario","Sonic","Zelda","Rick","Corvo","Shepard"];

		var temps = sc;
		var pseudo = prompt("Quel est votre pseudo? (Aléatoire si vide)", "");

		if (pseudo == undefined || pseudo == null || pseudo === "") {
			pseudo = pseudosAlea[Math.random() *pseudosAlea.length];
		}

		var barre = document.getElementById("changementTaille");
		var taille = barre.options[barre.selectedIndex].value;

		var sentContent = "";
		sentContent     += "temps="+temps;
		sentContent     += "&taille="+taille;
		sentContent     += "&pseudo="+pseudo;

		// console.log(sentContent);
		
		req = new XMLHttpRequest(); 
		req.open("GET","dataBaseHandler.php?temps="+temps+"&taille="+taille+"&pseudo="+pseudo,true); 
		req.send(); 
	}