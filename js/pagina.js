var input = document.querySelector("#phone");
window.intlTelInput(input,({
    initialCountry:"cr",
    separateDialCode:true
}));


  $(document).ready(function(){
    $('.sidenav').sidenav();
    $('.parallax').parallax();
    $('.tooltipped').tooltip();
    $('.dropdown-trigger').dropdown();
    $("#message").characterCounter();
    $('select').formSelect();

    $("[href^='#sec']").click(function(){
        var id = $(this).attr('href').replace('#','');
         $('html,body').animate({
            scrollTop: $("#" + id).offset().top
        }, 'slow');
        return false;
    });

    $(".project").click(function(){
        $(".project-det").addClass('hide');
        var num = $(this).attr('num');
        $("[num="+num+"]").removeClass('hide');
        $('.carousel').carousel();
    });

    $("#snmail").click(function(){
        if( !$("#first_name").val().trim().length ){
            M.toast({html: 'Nombre es Requerido', classes: 'rounded red'});
            $("#first_name").focus();
            return false;
        }

        if( !$("#email").val().trim().length ){
            M.toast({html: 'Correo Electronico es Requerido', classes: 'rounded red'});
            $("#email").focus();
            return false;
        }

        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($("#email").val()))
        {
            M.toast({html: 'Correo Electronico no es Valido', classes: 'rounded red'});
            $("#email").focus().select();
            return (true)
        }

        if( !$("#phone").val().trim().length ){
            M.toast({html: 'Telefono es Requerido', classes: 'rounded red'});
            $("#phone").focus();
            return false;
        }

        if( !$("#message").val().trim().length ){
            M.toast({html: 'Mensaje es Requerido', classes: 'rounded red'});
            $("#message").focus();
            return false;
        }
        var fecha = new Date();
        fecha = (("0"+fecha.getDate()).slice(-2)+'-'+("0"+(fecha.getMonth()+1)).slice(-2)+'-'+fecha.getFullYear()+' '+fecha.getHours()+':'+fecha.getMinutes());
        var msj = $("#first_name").val()+', desea contactar con ACRO. <br><b>Numero de Telefono:</b> '+$(".iti__selected-dial-code").html()+" "+$("#phone").val()+'<br><b>Correo:</b> '+$("#email").val()+"<br>";
        if($("#company").val().trim().length)
            msj += "<b>Empresa:</b> "+$("#company").val()+"<br>";
        msj += "<b>Fecha y Hora: </b>"+fecha+" <br> <b>Mensaje:</b> "+$("#message").val();
        if($("[name=group1]:checked").val() != undefined)
            msj += '<br><b>Medio:</b> '+$("[name=group1]:checked").next('span').html()
        if($("[name=group2]:checked").val() != undefined){
            var comunica = '<b>Forma de Comunicacion:</b> ';
            $("[name=group2]:checked").next('span').each(function(a,b)
                {if($(this).html() != undefined) comunica += $(this).html()+", " })
            msj += '<br>'+comunica
        }

        enviarCorreo(1,'info@acrosi.com','Mensaje Desde el Sitio Web',msj,'');

        msj = 'Estimado(a) '+$("#first_name").val()+', se a dejado el mensaje "'+$("#message").val()+'" hacia la empresa ACRO.<br><b>Fecha y Hora: </b>'+fecha;
        enviarCorreo(1,$("#email").val(),'ACRO Informa',msj,'');

        M.toast({html: 'Gracias por Contactarnos, en Breve nos Pondremos en Contacto', classes: 'rounded green'});

        $("#message").val('')
        $("#phone").val('')
        $("#email").val('')
        $("#company").val('')
        $("#first_name").val('')
        $("[name=group2]").prop('checked',false)
        $("[name=group1]").prop('checked',false)
    })
  });

  function enviarCorreo(vaccion,vto,vsubject,vbody,vadjunto) {

   $.ajax({
        url: './correoAjax.php',
        type: 'POST',
        data: {accion: vaccion,to : vto, subject : vsubject, body : vbody, adjunto : vadjunto}
    })
   .done(function(data) {
        console.log(data);
        
        if($("#smail").is(':visible')){
            Materialize.toast('Correo Enviado &nbsp;&nbsp; <i class="mdi mdi-check"></i>',4000,"green");
            $("#smail").html('')
        }else{
             $(".expect_mail").html("<i class='mdi mdi-24px mdi-check green-text'></i>");
        }
        
        try{
            postSendmail();
        }catch(e){
        } 
    })
   .fail(function(x) {
        console.log("ERROR de Correo: "+x)
        Materialize.toast( "Error Enviando Correo",4000,'red');
    });
}