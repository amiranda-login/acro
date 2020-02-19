  $(document).ready(function(){
    $('.sidenav').sidenav();
    $('.parallax').parallax();
    $('.carousel').carousel();
    $('.tooltipped').tooltip();
    $('.dropdown-trigger').dropdown();

    $("[href^='#sec']").click(function(){
        var id = $(this).attr('href').replace('#','');
         $('html,body').animate({
            scrollTop: $("#" + id).offset().top
        }, 'slow');
        return false;
    })
  });