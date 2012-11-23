jQuery(document).ready(function($) {

$('.galeriePhoto figure a').bind('click', function(){
    scale($(this));
    return false;
    });
})

function scale(element){
  this.element          =  element;
  this.display_h        =  $(window).height();
  this.display_w        =  $(window).width();
  this.Xscale           = 100;
  this.ratio            = 1;
  
  this.newIMG = this.element.find('IMG').attr('src');
  this.newURL = this.newIMG.substring(0, this.newIMG.indexOf('_min'));
  this.extension = this.newIMG.substring(this.newIMG.indexOf('_min.')+4);
  
  this.alpha = $('<div>', {
    className:  'alpha',
    'html':     '&nbsp;', 
  });
  
  
  this.imgMax = $('<img />', {
    alt:        '',
    className:  'imgGrande',
    src:        this.newURL+this.extension   
  });
  
  this.loading = $('<img />', {
    alt:        'Chargement',
    className:  'loading',
    src:        '_img/ajax-loader.gif',
  });
  
  this.alpha.fadeIn('slow').appendTo('body');
  this.loading.fadeIn('slow').appendTo('body');
  
  var cssobj = {
    'top' : this.display_h /2 + 'px',
    'left' : this.display_w /2 + 'px',
  }
  this.loading.css(cssobj);
  
  this.imgMax.bind('load', {_this : this},  function(event){
      _this= event.data._this;
      
      _this.imgMax.fadeIn('slow').appendTo('body'); 
             
      _this.imgMax.h = _this.imgMax.height();
      _this.imgMax.w = _this.imgMax.width();
      
       //on calcule la largeur qu'il faut au maximum ou la longueur
      if ( _this.imgMax.h > _this.display_h || _this.imgMax.w > _this.display_w){
          if (_this.imgMax.w > _this.display_w){
            _this.imgMax.w = _this.display_w - _this.Xscale;
            _this.imgMax.h = _this.imgMax.w * _this.ratio;
        }
        else if(_this.imgMax.h > _this.display_h ){ 
            _this.ratio = _this.imgMax.h/_this.imgMax.w;
            _this.imgMax.w = _this.display_h/_this.ratio - _this.Xscale ;
            _this.imgMax.h = _this.imgMax.w * _this.ratio;
          }
      }
      var cssobj = {
        'top' : (_this.display_h - _this.imgMax.h)/2 + 'px',
        'left' : (_this.display_w - _this.imgMax.w)/2 + 'px',
        'width' : _this.imgMax.w
      }
      _this.imgMax.css(cssobj);   
    });
  
  
  $(document).bind('click keypress', {_this : this},closeImgMax);

   function closeImgMax(event){
      _this= event.data._this; 
      _this.loading.fadeOut('slow').remove();    
      _this.imgMax.fadeOut('slow').queue(function(){
        $(this).remove();});
      _this.alpha.fadeOut('slow').queue(function(){
        $(this).remove();});
  } 
};
