<?php include 'vote/session.php'; ?>
<!DOCTYPE html>
<html lang="fr"> 
<head> 
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Web 9.0 : l'heure du vote. La Malédiction du Mardi</title> 
	<link rel="icon" type="image/png" href="/_img/tete-poulet.png" /> 
	<link 	type="text/css" rel="stylesheet" media="screen" href="_css/style.css"/>
  <script type="text/javascript" rel="javascript" media="screen" src="_js/jquery-1.4.3.min.js" ></script>   
	<script type="text/javascript" rel="javascript"  src="_js/swfobject.js" ></script>  
	<script type="text/javascript" rel="javascript"  src="_js/jquery.easyRotate.js" ></script>
	<script type="text/javascript" rel="javascript"  src="_js/date-fr-FR.js" ></script>
	<script type="text/javascript" rel="javascript"  src="_js/barometer.js" ></script>
	<script type="text/javascript" rel="javascript"  src="_js/vote2.js" ></script>
	<?php include 'vote/vote.php'; ?>
  <!--[if IE]>
    <script src="_js/html5.js"></script>
  <![endif]--> 
</head> 

<body> 
  <div id="wrapper"> 
    <div id="fond"></div> 
  	<header> 
    	<h1> 
			<a href="/"> 
				<img id="poulet" alt="" src="_img/poulet.png"> 
				<img src="_img/logo.gif" alt="La Malé"> 
				<span>La Malédiction du Mardi</span> 
        	</a> 
       </h1> 
    		<nav> 
          <ul>	
            <li><a href="/">Accueil</a></li>		
			<li><em>Le web 9.0</em></li>	
            <li><a href="what.html">Le concept</a></li> 
            <li><a href="where.html">Les lieux</a></li> 
            <li><a href="com.html">Les stars</a></li>
          </ul> 
        </nav> 
  	</header> 
	
	<div id="twitter_app"> 
	</div> 
	
   <section id="voteContent" role="main"> 
		<h2 class="croco">Le web 9.0 : l'heure du vote</h2>	
        <div id="vote_container">
            <form id="vote_log" method="post" action="vote/inscription.php" class="modUser" onsubmit="return checkMandatoryFields()">
                <fieldset class="courriel">
                    <label for="courrielInput">courriel :</label> <input type="text" name="courriel" id="courrielInput" />
                </fieldset>
                <fieldset class="password">
                    <label for="passwordInput">password :</label> <input type="password" name="password" id="passwordInput" />
                    <button type="submit" name="loginSubmit">
                        ok
                    </button>
                </fieldset>
            </form>
			
            <div id="user_logged" class="modUser defaut">
                <div class="courriel">
                    <a href="#" id="addPlace">+</a>
                    <span></span>                
                </div>                
            </div>
			<div class="info_vote" id="how_vote">
				Votez pour la prochaine Malé ! Indiquez ci-dessus votre courriel et choisissez un mot de passe.
			</div>
			<div class="info_vote" id="how_add">
				Devenez acteur de la Malé en sélectionant un lieu,<br/>
				changez votre vote en en choisissant un autre,<br/>
				ou proposez un lieu en cliquant sur le "+" !
			</div>
			<form class="user_add" method="post" action="vote/nextMale.php">
				<div>
					<fieldset>
						<label for="placeInput">Lieux : </label>
						<input type="text" name="lieu" id="placeInput" />
					</fieldset>    
					<fieldset>
						<label for="adresseInput">Adresse :</label>
						<input type="text" name="adresse" id="adresseInput" />
					</fieldset>                        
				</div>
				<fieldset>
						<label for="commentairesInput">Commentaires : </label>
						<textarea rows="5" cols="20" name="description" id="commentairesInput" ></textarea>
					</fieldset>                    
				<button type="submit" name="placeSubmit" class="placeSubmit">
					Ajouter ce lieu
				</button>
			</form>
        </div>
		
    </section>
</div> 

<div id="baro">
	<div id="blueNeedle">
		<img alt="" src="_img/aiguille-horloge.png">
    </div>
	<span id="day_male"></span>
	<span id="day_today">J-</span>
	<img alt="" src="_img/dateMale.gif" class="dateMale" />
    <img alt="" src="_img/cadran-aiguille.gif" class="cadran" />
    <div id="poiscaille"></div>
    <img alt="" src="_img/pied-horloge.gif" class="piedHorloge" />
</div>


<script type="text/javascript">    
	$(window).load(function(){
		var bm = new Barometer();
		bm.start();
		buildVoteList();
		if(typeof _error != 'undefined')
		  showError(_error);
	});    	

  var flashvars = {};
  var params = {wmode:"transparent",scale:"noScale",salign:"tl"};
  var attributes = {};
  swfobject.embedSWF("_swf/TwitterLaMale.swf", "twitter_app", 250,400, "9.0.0", "swf/expressInstall.swf", flashvars, params, attributes);

  var flashvars = {};
  var params = {wmode:"transparent",scale:"noScale",salign:"tl"};
  var attributes = {};
  swfobject.embedSWF("_swf/anime_poiscaille.swf", "poiscaille", 152,107, "9.0.0", "swf/expressInstall.swf", flashvars, params, attributes);

</script> 
</body> 

</html> 

