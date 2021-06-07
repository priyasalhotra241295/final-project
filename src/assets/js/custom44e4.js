// Branch selection code---- 

$("#cityselection").val('');
$("#branchselection").val(''); 
var cityval = $("#cityselection").val();
$("#cityselection").val($("#cityselection option:first").val()); 


$(document).ready(function(){
    $("#cityselection").trigger("change"); 
    $("#branchselection").trigger("change");
    
    $(".address_type_changebtn").on('change', function(){ 
        if($("#mobile").val() != ''){
            var url = site_url+"checkout/addressTypeOnChange/"+$("#mobile").val()+"/"+$(this).val(); 
            // POST values in the background the the script URL
            $.ajax({
                type: "POST",
                url: url, 
                success: function (response)
                {
                    var mainArr = $.parseJSON(response); 
                    if(mainArr.success == 1){
                        $("#exampleFormControlTextarea2").val('');
                        $("#exampleFormControlTextarea2").val(mainArr.address_text);
                    } 
                }
            }); 
        } 
    });
})

// location selection code----
$("#cityselection").on('change', function(){
    if($(this).val() != ''){  
        var cityselected = $('#cityselection').val(); 
        var mainArr = $.parseJSON(restmainArr); 
        
        var delivery_area = mainArr[cityselected]['deliveryarea'];  
        if(delivery_area != ''){ 
             var delivery_areaarr = [];
             $.each(delivery_area, function (index, value) { 
                 delivery_areaarr.push(value.name); 
             }); 
             if(delivery_areaarr.length > 1){
                 var locationstr = '<option value="">Enter your location</option>';
             }
             $.each(delivery_area, function (index, value) { 
                  locationstr += '<option value="'+value.name+'" data-id="'+index+'">'+value.name+'</option>'; 
            });   
        } 
    }
    else{  
        var locationstr = '<option value="">Enter your location</option>';  
    }
     
    $(".locationdiv .mdb-select").material_select('destroy'); 
    $(".branchdiv .mdb-select").material_select('destroy');  
    
    var branchstr = '<option value="">Select Branch</option>';    

    $(".locationdiv #locationselection").empty();
    $(".locationdiv #locationselection").append(locationstr); 

    $(".branchdiv #branchselection").empty();
    $(".branchdiv #branchselection").append(branchstr); 
    $(".branchdiv .mdb-select").material_select();  
    
    
    if(delivery_areaarr && delivery_areaarr.length == 2){
        $("#locationselection").val(delivery_areaarr[0]).trigger("change");
    }
    else{
        $("#locationselection").trigger("change");
    }
    
});

$("#locationselection").on('change', function(){ 
    if($(this).val() != ''){
        
        var cityselected = $('#cityselection').val();
        var locationselected = $(this).find(':selected').data("id");
        var mainArr = $.parseJSON(restmainArr); 
        var branch_areaarr = [];
        $.each(mainArr[cityselected]['deliveryarea'][locationselected], function (index, value) { 
            if(value.name !== undefined){ 
                branch_areaarr.push(value.name); 
            }
        }) 
        if(branch_areaarr.length > 1){
            var branchstr = '<option value="">Select Branch</option>'; 
        }  
        $.each(mainArr[cityselected]['deliveryarea'][locationselected], function (index, value) {  
            // if($.isNumeric(index)){
            if(value.name !== undefined){
                branchstr += '<option value="'+value.menu_sharing_code+'" data-id="'+value.id+'">'+value.name+'</option>';
            } 
        });    
         
    }
    else{
        var branchstr = '<option value="">Select Branch</option>';     
    }
    
    $(".branchdiv .mdb-select").material_select('destroy'); 
    $(".branchdiv #branchselection").empty();
    $(".branchdiv #branchselection").append(branchstr);
    $(".branchdiv #branchselection").trigger('change');
    $(".branchdiv .mdb-select").material_select(); 
    $(".Restnamespan").empty("");
    if($("#branchselection option:selected").val() != ''){
        $(".Restnamespan").append($("#branchselection option:selected").text())
    }    
    
    var cityselectedvalmin = $("#cityselection option:selected").val();
    var locationselectedvalmin = $("#locationselection option:selected").data('id');
    var branchselectedvalmin = $("#branchselection option:selected").val();   
    $(".minimunorderspantext").empty();
    
    if(branchselectedvalmin != '' && branchselectedvalmin != undefined){
            if(mainArr[cityselectedvalmin]['deliveryarea'][locationselectedvalmin][branchselectedvalmin]['minimum_order_amount'] > 0){ 
              $(".minimunorderspantext").append("Minimum order amount : "+mainArr[cityselectedvalmin]['deliveryarea'][locationselectedvalmin][branchselectedvalmin]['minimum_order_amount']);
            }   
    }
    
});

$("#branchselection").on('change', function(){
   if($(this).val() != ''){
       var restotherdataJsonArr = $.parseJSON(restotherdataJson);
       var outlettypearrJsonArr = $.parseJSON(outlettypearrJson);
       var booktableconfigJsonArr = $.parseJSON(booktableconfigJson);

       if(restotherdataJsonArr[$(this).val()] == 0){
           //$('#ordernowbtnadvance').hide();
           $('#ordernowbtnadvance').prop("disabled", true);
       }else{
           //$('#ordernowbtnadvance').show();
           $('#ordernowbtnadvance').prop("disabled", false);
       }
       
       if(outlettypearrJsonArr[$(this).val()] > 0){
           $('#ordernowbtnadvance').hide();
       }else{
           $('#ordernowbtnadvance').show();
       }

       if(booktableconfigJsonArr[$(this).val()]['table_reservation'] == 0){ 
           $('#bookatable').hide();
       }else{
           $('#bookatable').show();
       }
       
        var mainArr = $.parseJSON(restmainArr);  
        var cityselectedvalmin = $("#cityselection option:selected").val();
        var locationselectedvalmin = $("#locationselection option:selected").data('id');
        var branchselectedvalmin = $("#branchselection option:selected").val();  
        var deliveryprefdata = mainArr[cityselectedvalmin]['deliveryarea'][locationselectedvalmin][branchselectedvalmin]['delivery_pref_all']
        var deliveryprefdataarr = deliveryprefdata.split(',');
        var appenddel = '';
        
        // pickup check ----------
        if(jQuery.inArray("2", deliveryprefdataarr) !== -1){
             var strcheck = '';
             if(jQuery.inArray("1", deliveryprefdataarr) !== -1){
                strcheck = 'checked="checked"';
             }
        }else{
            var strcheck = 'disabled';
        }
        appenddel += '<div class="col-md-6 col-sm-6 col-lg-6 col-xs-12 col-xl-6 col-12"><div class=""><div class="custom-control custom-radio addresstyperadio white-bg pick-up"><input name="delivery_pref" value="takeAway" id="pickup" type="radio" class="custom-control-input address_type_changebtn" '+strcheck+'><label class="custom-control-label" for="pickup">Pickup</label></div></div></div>';
        // pickup check ----------
        
        
        // home deliver case ------------------
        if(jQuery.inArray("1", deliveryprefdataarr) !== -1){
            var homecase = 'checked="checked"';
        }else{
             var homecase = 'disabled';
        }
        appenddel += '<div class="col-md-6 col-sm-6 col-lg-6 col-xs-12 col-xl-6 col-12"><div class=""><div class="custom-control custom-radio addresstyperadio white-bg home-delivery"><input name="delivery_pref" value="homeDelivery" id="home_delivery" type="radio" class="custom-control-input address_type_changebtn" '+homecase+'><label class="custom-control-label" for="home_delivery">Home Delivery</label></div></div></div>';
        // home deliver case ------------------
        
        
        $(".deliveryprefdiv").html('');
        $(".deliveryprefdiv").append(appenddel);
   }else{
        $(".deliveryprefdiv").html('');
        $(".deliveryprefdiv").append('<div class="col-md-6 col-sm-6 col-lg-6 col-xs-12 col-xl-6 col-12"><div class=""><div class="custom-control custom-radio addresstyperadio white-bg pick-up"><input name="delivery_pref" value="takeAway" id="pickup" type="radio" class="custom-control-input address_type_changebtn"><label class="custom-control-label" for="pickup">Pickup</label></div></div></div><div class="col-md-6 col-sm-6 col-lg-6 col-xs-12 col-xl-6 col-12"><div class=""><div class="custom-control custom-radio addresstyperadio white-bg home-delivery"><input name="delivery_pref" value="homeDelivery" id="home_delivery" type="radio" class="custom-control-input address_type_changebtn" checked="checked"><label class="custom-control-label" for="home_delivery">Home Delivery</label></div></div></div>');
   }
});

// reset data and redirect to home page
$("#ordernowbtnadvance").on('click', function(){
    var forms = document.getElementsByClassName('landing-formcls');
    var validation = Array.prototype.filter.call(forms, function(form) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
        if(form.checkValidity()){
            var url = site_url+"orders/checkforadvanceorder"; 
            // POST values in the background the the script URL
            $.ajax({
                type: "POST",
                url: url,
                data: $('#landing-form').serialize(),
                success: function (response)
                {
                    $(".advanceorderpopupload").empty();
                    $(".advanceorderpopupload").append(response);
                    $("#advanceorderpopup").modal('show');
                    return false;
                }
            });
        }
    });
}); 


$("#bookatable").on('click', function(){
    var branch = $("#branchselection").val();
    if(branch != ''){
        var booktableconfigJsonArr = $.parseJSON(booktableconfigJson);
        window.open(table_reservation_url+"reservation/"+booktableconfigJsonArr[branch]['table_reservation_code'], '_blank');
    }
});
/*$("#branchselection").on('change', function(){ 
    if($(this).val() != ''){
        var mainArr = $.parseJSON(restmainArr);  
        var cityselectedvalmin = $("#cityselection option:selected").val();
        var locationselectedvalmin = $("#locationselection option:selected").data('id');
        var branchselectedvalmin = $("#branchselection option:selected").val();  
        var deliveryprefdata = mainArr[cityselectedvalmin]['deliveryarea'][locationselectedvalmin][branchselectedvalmin]['delivery_pref_all']
        var deliveryprefdataarr = deliveryprefdata.split(',');
        var appenddel = '<div class="col-12 mt-3">';
        var is_home_option = 0;
        if(jQuery.inArray("1", deliveryprefdataarr) !== -1){
             is_home_option = 1;
             appenddel += '<div class="custom-control custom-radio custom-control-inline"><input type="radio" required class="custom-control-input" id="defaultInline1" name="delivery_pref" value="homeDelivery" checked="checked"><label class="custom-control-label" for="defaultInline1">Home Delivery</label></div>';
        }
        if(jQuery.inArray("2", deliveryprefdataarr) !== -1){
             var strcheck = '';
             if(is_home_option == 0){
                strcheck = 'checked="checked"';
             }
             appenddel += '<div class="custom-control custom-radio custom-control-inline"><input type="radio" required class="custom-control-input" id="defaultInline2" name="delivery_pref" value="takeAway" '+strcheck+'><label class="custom-control-label" for="defaultInline2">Pickup Form Restaurant</label></div>';
        } 
        appenddel += '</div>';
        $(".deliveryprefdiv").html('');
        $(".deliveryprefdiv").append(appenddel);
    }
    else{
         $(".deliveryprefdiv").html('');
    }
});*/
 
 

$("#ordernowbtn").on('click', function(){
    $(".groceryslotalert").hide();
    // click on order now button----------------
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('landing-formcls');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated'); 

      if(form.checkValidity()){
          var url = site_url+"orders/process"; 
          // POST values in the background the the script URL
          $.ajax({
              type: "POST",
              url: url,
              data: $('#landing-form').serialize(),
              success: function (response)
              { 
                  if(response == 1){
                     window.location.href = site_url+"orders/menu";
                  } 
                  
                  if(response == 2){
                      $(".groceryslotalert").show();
                  }

              }
          });
      } 
    }, false);
    });
});

// reset data and redirect to home page
$(".logolink").on('click', function(){
    var controller_url= $(location).attr('pathname').substring(1).split("/");
    if(controller_url != undefined && controller_url[0] == 'home') {
        window.location.href = site_url+"orders/menu";
    } else {
        if($(".countercartdiv").html() == '') {
            redirect_dashboard();
        } else {
            $("#logoclickpoup").modal('show');
        }
    }
});

// reset data and redirect to home page
$(".menuqrlogolink").on('click', function(){
    window.location.href = site_url+"menu";
});

$(".confirm_yes").on('click', function() {
    redirect_dashboard();
});

$(".confirm_no").on('click', function() {
    $("#logoclickpoup").modal('hide');
});

/**
 * Redirect to home page
 * @returns {undefined}
 */
function redirect_dashboard() {
    var url = site_url+"orders/resetData";  
    $.ajax({
        type: "POST",
        url: url,
        success: function (response){
            window.location.href = site_url;
        }
    });
}

/*$("#change_res_branch_header").on('change', function(){
    if($(this).val() != '') {
        var data = $(this).val().split('_');
        var url = site_url+"orders/process";
        $.ajax({
            type: "POST",
            url: url,
            data: {'city':data[0],'branch':data[1],'location':data[2]},
            success: function (response) {
                if(response == 1){
                   window.location.href = site_url+"orders/menu";
                } 
            }
        });
    }
});*/

$("#change_res_branch_header li").on('click', function(){
    console.log($(this).data('valuename') );
    if($(this).data('valuename') != '') {
        var data = $(this).data('valuename').split('_');
        var url = site_url+"orders/process";
        $.ajax({
            type: "POST",
            url: url,
            data: {'city':data[0],'branch':data[1],'location':data[2]},
            success: function (response) {
                if(response == 1){
                   window.location.href = site_url+"orders/menu";
                } 
            }
        });
    }
});