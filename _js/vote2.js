function buildVoteList(){

		if(typeof(_listScore)=="undefined"){
			_listScore 	= [{name:"Le sous Bock",score:1,id:7},{name:"Les Abeilles",score:2,id:1},{name:"Les Petits Oigons",score:1,id:2}];
			_totalVote 		= 12;
		}
		
		
		//sort Array
		_listScore.sort(function(a,b){return (b.score - a.score)});
		// ATTENTION en prod mettre userConnected = 0 ... codage de merde
		if(typeof(_idUserConnected)=="undefined"){
			var userConnected 		= 0;//change 1 ou 0 pour test locales
			var userVoteIndex 		= 2; 
			
		}else{
			var userConnected 		= 1;
			//$('.courriel span').html(_idUserConnected);
					
			var uName = _idUserConnected.split('@')[0]; 
			
			$('.courriel span').html(uName);
			if(typeof(_userVoteIndex)=="undefined"){
				var userVoteIndex 	= -1;
			}else{
				var userVoteIndex 	= _userVoteIndex;
			}
		}
		
		if(userConnected == 1){
		    $("#how_add").css({'display':'inherit'});//inherit
			$("#how_vote").css({'display':'none'});
			$("#vote_log").css({'display':'none'});
			$("#user_logged").css({'display':'inherit'});//inherit
			$(".user_add").css({'display':'none'});
		}else{
			$("#how_add").css({'display':'none'});
			$("#how_vote").css({'display':'inherit'});//inherit
			$("#vote_log").css({'display':'inherit'});//inherit
			$("#user_logged").css({'display':'none'});
			$(".user_add").css({'display':'none'});
		}
			
		$('#addPlace').toggle(	function() {
								$("#how_add").css({'display':'none'});
								$(".user_add").show('fast');
							},
							function() {
							    $("#how_add").css({'display':'inherit'});
								$(".user_add").hide('fast');
							});

			
		writeListScore(0);
		
	}
	
	function writeListScore(val){
		
		$("#vote_list").remove();

		var strAppend = '<ul id="vote_list">';
		for (var i=0 ; i<_listScore.length ; i++){
			strAppend += '<li class="vote_line" id="voteList_'+_listScore[i].id+'" id_data="'+_listScore[i].id+'">'+'<span class="voteText" >'+_listScore[i].name+'</span><span class="voteNote" >'+_listScore[i].score+'/'+_totalVote;+'</span></li>';
		}			
		strAppend += '</ul>';
		$("#vote_container").prepend(strAppend);    
	
		
		$('.vote_line').bind('click', function(){
			$('.vote_line').removeClass('selected');
			if(typeof (armSelection) != "undefined")armSelection.remove();
			updateScoreList($(this));		
			});	
		
		if(val==1)return;
		
		//selection / position du bras de selection
		if(typeof(_userVoteIdSite)!="undefined"){	
			if(_userVoteIdSite!=0){//0 <=> le user n'as pas encore voté
				for (var i=0 ; i<_listScore.length ; i++){
					if(_listScore[i].id==_userVoteIdSite)$('#voteList_'+_userVoteIdSite).click();
				}
			}
			
		}
		$('.vote_line').bind('mouseenter', function(){
       showInfoLieu($(this));
		});
		$('.vote_line').bind('mouseleave', function(){  
       $(layerInfo).hide();
		});                
}  

	
	function showInfoLieu(target){  
    var address = "";
		var idTarget = target.attr('id_data');
		
		var aRegisterPseudo = [{mail:"ggautreault",pseudo:"pik"},
		{mail:"stephanie.loubet",pseudo:"steph"},
		{mail:"laurent.gabarre",pseudo:"laurent"},
		{mail:"alexandredavid22",pseudo:"cheval"},
		{mail:"ngutowski",pseudo:"nicolo"},
		{mail:"margerie.guilliot",pseudo:"margo"},
		{mail:"dg.david.gautier",pseudo:"david"},
		{mail:"michael.delmonte",pseudo:"michael"},
		{mail:"alexoualexou",pseudo:"alexou"},
		{mail:"mortierjo",pseudo:"djmojo"}
		];
		
		for (var i=0 ; i<_listScore.length ; i++){
			if(_listScore[i].id==idTarget){
				address = _listScore[i].address;
				var aUserVote = _listScore[i].voted_by.split(',');
				var pseudoVote = "Qui : ";
				for (var j=0 ; j<aUserVote.length ; j++){
					var pseudo 	= aUserVote[j].split('@')[0];
					var done 	= false;
					for (var k=0; k<aRegisterPseudo.length ; k++){
						if(aRegisterPseudo[k].mail==pseudo){
							pseudoVote+= aRegisterPseudo[k].pseudo;
							done = true;
						}
					}
					if(!done)pseudoVote+= pseudo;
					if(j!=aUserVote.length-1)pseudoVote+=", "
				}
			}
		}        
	  $(layerInfo).html("Où : "+address+"<br/>"+pseudoVote);		
		var heightLayer = parseInt($(layerInfo).css('height').substring(0, $(layerInfo).css('height').indexOf('px')));
		 $(layerInfo).css({
      'position':   'absolute',
      'top':        target.offset().top - (heightLayer + 25),
      'left':       target.offset().left
    }).appendTo('body').fadeIn('fast'); 
	}
	
	function updateScoreList(target){
	
		var idTarget = target.attr('id_data');
	
		//alert("idTarget is " + idTarget);
	
		if(typeof(_userVoteIdSite)!="undefined"){	
			if(_userVoteIdSite==0){//si jamais voter de sa life
				_totalVote++;
			}
			if(idTarget==_userVoteIdSite){
				//alert('id idem ignore');
			}else{
				for (var i=0 ; i<_listScore.length ; i++){
					if(_listScore[i].id==idTarget)_listScore[i].score++;
					if(_listScore[i].id==_userVoteIdSite)_listScore[i].score--;
				}
				_userVoteIdSite = idTarget;
				writeListScore(1);
				$.ajax({  url: "vote/vote_update.php?id="+idTarget  });
			}

		}
		

		positionArmSelection(target);
		
	}
	
	function positionArmSelection(target){
		
		$('#user_logged').removeClass('defaut');
		
		$("#"+target.attr('id')).addClass('selected');
		
		var heightList = $('#user_logged').offset().top - $("#"+target.attr('id')).offset().top; 
		armSelection = $('<div>', { 
		}).css({
			'background' : 'url("_img/arm_vote_select_top.png") no-repeat left top,url("../_img/corps_bras.png") repeat-y scroll left top',
			'display' : 'block',
			'position' : 'absolute',
			'width' : '159px',
			'left': '-7.8em',
			'bottom' : '83px',
			'height' : heightList
		});
		$('#user_logged').prepend(armSelection);		
	}
	
	function checkMandatoryFields(){
		if ($('#courrielInput').val() != "" && $('#passwordInput').val() != "") {
			
			if (check_email_address($('#courrielInput').val()) == true)
			{
				return true;
			}
			else
			{
				showError("Le format de l'email n'est pas correct.");
				return false;
			}
		}
		else
		{
	        showError("Les champs email et password sont obligatoires.");
			return false;
		}
	}
	
	/*function check_email_address($email) {
  // First, we check that there's one @ symbol, 
  // and that the lengths are right.
  if (!ereg("^[^@]{1,64}@[^@]{1,255}$", $email)) {
    // Email invalid because wrong number of characters 
    // in one section or wrong number of @ symbols.
    return false;
  }
  // Split it into sections to make life easier
  $email_array = explode("@", $email);
  $local_array = explode(".", $email_array[0]);
  for ($i = 0; $i < sizeof($local_array); $i++) {
    if	(!ereg("^(([A-Za-z0-9!#$%&'*+/=?^_`{|}~-][A-Za-z0-9!#$%&↪'*+/=?^_`{|}~\.-]{0,63})|(\"[^(\\|\")]{0,62}\"))$",$local_array[$i])) {
      return false;
    }
  }
  // Check if domain is IP. If not, 
  // it should be valid domain name
  if (!ereg("^\[?[0-9\.]+\]?$", $email_array[1])) {
    $domain_array = explode(".", $email_array[1]);
    if (sizeof($domain_array) < 2) {
        return false; // Not enough parts to domain
    }
    for ($i = 0; $i < sizeof($domain_array); $i++) {
      if (!ereg("^(([A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9])|↪([A-Za-z0-9]+))$",$domain_array[$i])) {
        return false;
      }
    }
  }
  return true;
}*/

function check_email_address(email) {
	
	validMailFirstStep = "^[^@]{1,64}@[^@]{1,255}$";
	if (email.search(validMailFirstStep) == -1) {
		return false;	
	}
	else {
		//return true;
		email_array = email.split("@");
		local_array = email_array[0].split(".");
		
		validMailSecondStep = "^(([A-Za-z0-9!#$%&'*+/=?^_`{|}~-][A-Za-z0-9!#$%&↪'*+/=?^_`{|}~\.-]{0,63})|(\"[^(\\|\")]{0,62}\"))$";
		for (i=0; i < local_array.length; i++){
			if (local_array[i].search(validMailSecondStep) == -1) {
				return false;
			}
		}
		// Contiuner à traduire la version en php plus haut.
		return true;
	}
}

function showError(message) {
        centerThis($(layerInfo));
	      $(layerInfo).css({
          'position': 'absolute',           
        }).appendTo('body').html(message).fadeIn('slow').delay(2000).fadeOut('slow');
}

function centerThis(element) {
	    var windowHeight = $(window).height();
	    var windowWidth = $(window).width();
	    var elementHeight = $(element).height();
	    var elementWidth = $(element).width();
	 
	    var elementTop, elementLeft;
	 
	    if (windowHeight <= elementHeight) {
	        elementTop = $(window).scrollTop();
	    } else {
	        elementTop = ((windowHeight - elementHeight) / 2) + $(window).scrollTop();
	    }
	 
	    if (windowWidth <= elementWidth) {
	        elementLeft = $(window).scrollLeft();
	    } else {
	        elementLeft = ((windowWidth - elementWidth) / 2) + $(window).scrollLeft();
	    }
	 
	    $(element).css({
	        'top': elementTop,
	        'left': elementLeft
	    });
	}
  
  layerInfo = $('<div>', {
    className:  'layerInfo',     
  }); 
