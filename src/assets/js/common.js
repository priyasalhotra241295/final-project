//all regex variable
var regexValidation = {};
regexValidation.alphaNumeric = { regex: /^[A-Za-z0-9]+$/i, message: globalValidations.Common.alphaNumeric };
regexValidation.alphaNumericWithSpaceHyphen = { regex: /^[A-Za-z0-9 \-]+$/i, message: globalValidations.Common.alphaNumericWithSpaceHyphen };
regexValidation.smallalphaNumericWithUnderscrollHyphen = { regex: /^[a-z0-9_\-]+$/i, message: globalValidations.Common.smallalphaNumericWithUnderscrollHyphen };
regexValidation.alphaNumericWithUnderscrollHyphen = { regex: /^[A-Za-z0-9_\-]+$/i, message: globalValidations.Common.alphaNumericWithUnderscrollHyphen };
regexValidation.alphaNumericWithSpaceUnderscrollHyphenSlash = { regex: /^[a-zA-Z0-9 _\-\\/]+$/i, message: globalValidations.Common.alphaNumericWithSpaceUnderscrollHyphenSlash };


//common field validation
regexValidation.name = { regex: /^[A-Za-z0-9_'-]+$/i, message: globalValidations.Common.name };
regexValidation.password = { regex: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!.@#$\-%^&*_])[a-zA-Z0-9!.@#$\-%^&*_]{8,32}$/i, message: globalValidations.Common.password };
regexValidation.address = { regex: /^[a-zA-Z0-9 _\-\\/,\.]+$/i, message: globalValidations.Common.address };
regexValidation.price = { regex: /^(?:\d{1,13})(?:\.\d{1,2})?$/i, message: globalValidations.Common.price };
regexValidation.credicCard = { regex: /^[X0-9]+$/i, message: globalValidations.Common.creditCard };


//common globla JS variables
var delay;


$(document).ready(function(){
    
    //add regex check method in jquery validate
    $.validator.addMethod("regex", function(value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    }, "Invalid input");
    
    
    
    //delay function
    delay = function() {
        var clock = 0;
        return function(callback, ms) {
            clearTimeout(clock);
            clock = setTimeout(callback, ms);
        }
    }();
   
});

//common ajax error handler
$( document ).ajaxError(function(x,e) {
    if(e.status == "401"){
        alert('################################\n\nOops! It seems that you are not logged in and requested restricted area!\n\n\n\n No worry! Kindly login to access it!\n\n################################');
        window.location.reload();
    }
    else if(e.status == "403") {
        alert('################################\n\nOops! Something really bad happened while processing your request.\n\n\n Please reload page or try again later.\n\n################################');
        window.location.reload();
    }
});



//<editor-fold defaultstate="collapsed" desc="Common loading ovelay">

//open loading dialog
function openLoadingDialog(element, message)
{
    if(typeof message == 'undefined' || message == '') {
        message = '<h1>Please wait...</h1>';
    }
    message = '<img src="'+site_url+'img/loader.gif" alt="loading icon">';
    //message = '<h1>Loading...</h1>';
            
    if(typeof element == 'undefined' || element=='')
    {
        $.blockUI({ 
            baseZ:1050,
            css: { 
                border: 'none', 
                padding: '15px', 
                //backgroundColor: '#000', 
                'border-radius': '10px', 
                width: '15%',
                left: '43%',
                opacity: .5, 
                color: '#fff' 
            },
            message: message,
        });
    }
    else if(element == 'modal')
    {
        $('.modal-dialog').block({ 
            baseZ:1050,
            css: { 
                border: 'none', 
                padding: '15px', 
                //backgroundColor: '#00125F', 
                'border-radius': '10px', 
                opacity: .8,
                color: '#fff' 
            },
            message: message,
        });
    }
    else
    {
        $(element).block({ 
            baseZ:1050,
            css: { 
                border: 'none', 
                padding: '15px', 
                backgroundColor: 'transparent',
                'border-radius': '10px', 
                opacity: .8,
                color: '#fff' 
            },            
            overlayCSS:  {
                opacity: 0.2,
            },
            message: message,
        });
    }
}

//close loading dialog
function closeLoadingDialog(element)
{
    if(typeof element == 'undefined' || element=='') {
        $.unblockUI();
    } else if(element == 'modal') {
        $('.modal-dialog').unblock();
    } else {
        $(element).unblock();
    }
}

//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="Show alert message with given content, type within given element">

function showAlertMessage(msg, type, element)
{
    if(typeof type == 'undefined' || type=='') {
        type = 'warning';
    }
    if(typeof element == 'undefined' || element=='') {
        element = $('.alert');
    }
    
    $(element).removeClass("hidden");
    $(element).removeClass("alert-hide");
    $(element).removeClass("alert-success");
    $(element).removeClass("alert-warning");
    $(element).removeClass("alert-danger");
    $(element).removeClass("alert-info");
    $(element).addClass("alert-" + type);
    $(element).html(msg);
    $("html, body").animate({ scrollTop: 0 }, "slow");
    setTimeout(function(){
        $(element).addClass("hidden");
        $(element).html("");
    }, 5000);
}


function showFloatingAlertMessage(msg, type)
{
    if(typeof msg != 'undefined' && msg != ''
            && typeof type != 'undefined' && type != '')
    {
        
        //change type
        if(type == 'danger') {
            type = 'error';
        }
        
        element = $('.floating_alert_button');
        $(element).attr('data-type', type);
        $(element).attr('data-message', msg);
        $(element).trigger('click');
        return;
    }
    
    alert(globalMessages.Common.failure);
}
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="Form post/reset and input activate functions">
//to reset form, from validation and styles
function resetFormValidation(element)
{
    $.each($(element), function(index) {
        $(this)[0].reset();
    });
    $(element).find('input, textarea').focusout();
    //$(element).validate().resetForm();
    $(element).find('div').removeClass('has-error');
}

function postWithRedirect(path, params, method)
{
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}

//initialize floating label for textbox, radio button and checkbox
function initializeFloatingLabel()
{
    //<editor-fold defaultstate="collapsed" desc="Input type initialize">
    $('.paper-input input').each(function () {
        if($(this).val() != ""){ $(this).closest('.paper-input').addClass("floating-label-completed"); }
        else { $(this).closest('.paper-input').removeClass("floating-label-completed"); }
    });
    $(".paper-input .form-control").focus(function(){
      $(this).closest('.paper-input').addClass("floating-label-active floating-label-completed");
    });
    $(".paper-input .form-control").focusout(function(){
      if($(this).val() === ""){ $(this).closest('.paper-input').removeClass("floating-label-completed"); }
      $(this).closest('.paper-input').removeClass("floating-label-active");
    });

    $('.dc-radio input').after('<span class="dc-radio-label">&nbsp;</span>');
    $('.dc-checkbox input').after('<span class="dc-checkbox-label"></span>');
    //</editor-fold>


    //<editor-fold defaultstate="collapsed" desc="Select 2 Dmaterial initialize">
    var $eventSelect = $(".dc-select");
    $eventSelect.each(function(){
            var selected_value = $(this).val();
            if (selected_value==0 || selected_value=='') {
                    $(this).closest('.paper-input').removeClass("floating-label-completed");
            } else {
                    $(this).closest('.paper-input').addClass("floating-label-completed");
            }
    });

    var $eventSelectTag = $(".dc-tags");
    $eventSelectTag.each(function(){
            var selected_tag = $(this).closest('.paper-input').find('.select2-selection__choice').hasClass('select2-selection__choice');
            if (selected_tag) {
                    $(this).closest('.paper-input').addClass("floating-label-completed");
            } else {
                    $(this).closest('.paper-input').removeClass("floating-label-completed");
            }
    });
    //</editor-fold>
}
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="trim, rtrim, ltrim">

function trim(str, chr) {
    //var rgxtrim = (!chr) ? new RegExp('^\\s+|\\s+$', 'g') : new RegExp('^'+chr+'+|'+chr+'+$', 'g');
    //return str.replace(rgxtrim, '');
    
    while (~chr.indexOf(str[0])) {
        str = str.slice(1);
    }
    while (~chr.indexOf(str[str.length - 1])) {
        str = str.slice(0, -1);
    }
    return str;
}
function rtrim(str, chr) {
  var rgxtrim = (!chr) ? new RegExp('\\s+$') : new RegExp(chr+'+$');
  return str.replace(rgxtrim, '');
}
function ltrim(str, chr) {
  var rgxtrim = (!chr) ? new RegExp('^\\s+') : new RegExp('^'+chr+'+');
  return str.replace(rgxtrim, '');
}

//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="Cookie functions">
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}
//</editor-fold>