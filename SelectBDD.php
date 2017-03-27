<?php 
	$taille=$_GET["taille"]; 	

	$dbh = new PDO('mysql:host=localhost;dbname=taquin_js', "root", "");
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

	$res = $dbh->query("SELECT pseudo,temps FROM leaderboard WHERE taille like '".$taille."' order by temps;");
    $data = $res->fetchAll();
    $arr=[];
    foreach($data as $donneeScore){
        array_push($arr, $donneeScore['pseudo']);
        array_push($arr, $donneeScore['temps']);
    }
    $resultat=implode($arr,",");

    echo $resultat;
?>