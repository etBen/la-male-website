<?php  session_start(); ?>
<?php 
$cookieLaMale = "cookieLaMale";

//var_dump($_SERVER);
$contenu = 'lamale;'.time().';'.$_SERVER['GEOIP_CITY'];

$lat = 48.8563853;
$lng = 2.3579580;

$lat2 = $_SERVER['GEOIP_LATITUDE'];
$lng2 = $_SERVER['GEOIP_LONGITUDE'];

$radius = 6378100; // radius of earth in meters
$latDist = $lat - $lat2;
$lngDist = $lng - $lng2;
$latDistRad = deg2rad($latDist);
$lngDistRad = deg2rad($lngDist);
$sinLatD = sin($latDistRad);
$sinLngD = sin($lngDistRad);
$cosLat1 = cos(deg2rad($lat));
$cosLat2 = cos(deg2rad($lat2));
$a = $sinLatD*$sinLatD + $cosLat1*$cosLat2*$sinLngD*$sinLngD*$sinLngD;
if($a<0) $a = -1*$a;
$c = 2*atan2(sqrt($a), sqrt(1-$a));
$distance = $radius*$c/1000;


// test l'existance d'un cookie apelé "nom_cookie" 
if (isset($_COOKIE[$cookieLaMale])) {
	$contenu = $_COOKIE[$cookieLaMale];
	//echo 'Le cookie existe ' . $contenu . ' !<br />';
}
else {
	setcookie($cookieLaMale, $contenu, time()+36000); 
}

?> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf8" />
    </head>
    <body>
            <?php 
if (isset($_REQUEST['_SESSION'])) die("---");

if (isset($_SERVER['GEOIP_CITY'])) {
	echo 'Bienvenue à toi habitant de '.$_SERVER['GEOIP_CITY'].'<br>';
	echo 'Tu te trouves à '.$distance.' km de la prochaine Malé<br>';
}
else
{ ?>
Tu ne partages pas des coordonnées géographique, petit canaillou.<br>
<?php }


//session_start(); // DEMARRE LA SESSION
// SAUVGARDE LA VARIABLE hits DANS LE FICHIER DE SESSION
//$_SESSION['hits'] = $hits;

$fp=fopen("cpt.txt","r"); //OUVRE LE FICHIER compteur.txt
  $num=fgets($fp,4096); // RECUPERE LE CONTENUE DU COMPTEUR
  fclose($fp); // FERME LE FICHIER
 $hits=$num - -1;  // TRAITEMENT
  $fp=fopen("cpt.txt","w");  // OUVRE DE NOUVEAU LE FICHIER
  fputs($fp,$hits); // MET LA NOUVELLE VALEUR
  fclose($fp);  // FERME LE FICHIER

//echo $hits;

$_SESSION['test'] = 42;
$test = 43;
echo $_SESSION['test'];

//if(empty($hits)){

?>



    </body>
</html>

