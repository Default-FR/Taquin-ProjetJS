<?php
	$servername = "localhost";
	$username   = "root";
	$password   = "";
	$dbname     = "taquin_js";

	

	// PDO
		$dbh = new PDO('mysql:host=localhost;dbname=taquin_js', "root", "");
		$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

	// Données
		$temps  = $_GET["temps"];
		$taille = $_GET["taille"];
		$pseudo = $_GET["pseudo"];

		$res = $dbh->query("SELECT id,pseudo,temps FROM leaderboard WHERE taille like '".$taille."' ORDER BY temps;");
    	$data = $res->fetchAll();

	// Insert Base
    	$insert = [];
    	$cmpt = 0;
    	$ids = 1;
    	if($taille==4)
    		$ids = 4;
    	else if($taille==5)
    		$ids = 7;

    	// initialisation
    	foreach($data as $donneeScore){
    		$insertion= "(".$ids.",'".$donneeScore["pseudo"]."',".$donneeScore["temps"].",".$taille.")";
    		array_push($insert, $insertion);
    		$cmpt++; $ids++;
    	}

    	// traitement
	    	$cmpt = 0;
	    	$ids = 1;
	    	if($taille==4)
	    		$ids = 4;
	    	else if($taille==5)
	    		$ids = 7;

	    	foreach($data as $donneeScore){
	    		if($donneeScore["temps"]>$temps){
	    			switch ($cmpt) {
						case 0:
							$insert[2] = "(".($ids+2).substr($insert[1],2);
							$insert[1] = "(".($ids+1).substr($insert[0],2);
							$insert[0] = "(".$ids.",'".$pseudo."',".$temps.",".$taille.")";
							break;
						case 1:
							$insert[2] = "(".($ids+1).substr($insert[1],2);
							$insert[1] = "(".$ids.",'".$pseudo."',".$temps.",".$taille.")";
							break;		    						
						default:
							$insert[2] = "(".$ids.",'".$pseudo."',".$temps.",".$taille.")";
							break;
					}
					break;
	    		}
	    		$cmpt++; $ids++;
	    	}

		// Ajouts
			// Suppr anciennes val
				$ids = 1;
		    	if($taille==4)
		    		$ids = 4;
		    	else if($taille==5)
		    		$ids = 7;
		    	$requete='DELETE FROM leaderboard WHERE id='.$ids.' or id='.($ids+1).' or id='.($ids+2).';';
				$dbh->exec($requete);

			// Add nouvelles val
			$requete='INSERT INTO leaderboard(id, pseudo, temps, taille) 
						VALUES '.$insert[0].','.$insert[1].','.$insert[2].';';
			$dbh->exec($requete);
?>