
function initialize() {
    //Set how many days to go once the page is ready
    daysLeft();
    $('#rsvpModalBody').load('rsvpForm.html');
    registerAllEventHandlers();
}

function registerAllEventHandlers() {
    
    //This function shows the modal with RSVP form 
    $('#rsvpButton').click(function () {
        $('#rsvpModal').modal({
            show: true
        })
    });
    
}


function daysLeft() {
    var wedDate = new Date(2017, 0, 20);
    var today = new Date(Date.now());
    var timeMsc = wedDate.getTime() - today.getTime();
    var dayDiff = Math.round(timeMsc / (1000 * 60 * 60 * 24));
    $("#daysToGo").html(dayDiff);
}

function validateName(el) {
    var input = $(el);
    var re = /^[a-zA-Z ]+$/;
    var is_name = re.test(input.val());
    if (is_name) {
        $('#nameDiv').removeClass("has-error").addClass("has-success");
    } else {
        $('#nameDiv').removeClass("has-success").addClass("has-error");
    }
}

function validateEmail(el) {
    var input = $(el);
    var emailDiv = $('#emailDiv');
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    var is_email = re.test(input.val());
    if (is_email) {
        emailDiv.removeClass("has-error").addClass("has-success");
    } else {
        emailDiv.removeClass("has-success").addClass("has-error");
    }
}

function validatePhone(el) {
    var input = $(el);
    var phoneDiv = $('#phoneDiv');
    var re = /[0-9()-+ ]{10,15}/;
    var is_phone = re.test(input.val());
    if (is_phone) {
        phoneDiv.removeClass("has-error").addClass("has-success");
    } else {
        phoneDiv.removeClass("has-success").addClass("has-error");
    }
}





//Convert from 12-hr format to 24hr format for arrival times
function handleAmPm(el) {
    idPrefix = el.id.substring(0, 11);
    amPmId = "#" + idPrefix + "AmPm";
    hrId = "#" + idPrefix + "Hr";

    val = $(amPmId).val();
    console.log(val)
    currentHr = parseInt($(hrId).val());
    console.log("Hr: " + currentHr);
    newHr = currentHr;
    if (val == "PM") {
        if (currentHr < 12) {
            newHr = currentHr + 12;
        }
    } else if (val == "AM") {
        if (currentHr >= 12) {
            newHr = currentHr - 12;
        }
    }
    $(hrId + ' option:selected').val(newHr);
    console.log($(hrId).val());
};

function handleDepDate(el) {
    clearRadios('guestDropQues');
    if (el.value == '21') {
        $('#guestDropQues').removeClass('hidden');
    } else {
        $('#guestDropQues').addClass('hidden');
        $('#guestKolDropTimeDiv').addClass('hidden');
    }
}

function clearRadios(id) {
    var Radios = document.getElementById(id).getElementsByTagName('input');
    for (var i = 0; i < Radios.length; i++) {
        if (Radios[i].type == 'radio') {
            Radios[i].checked = false;
        }
    }
}

function handleDropOffs(el) {
    if (el.value == "Yes"){
        $('#guestKolDropTimeDiv').removeClass('hidden');
    } else if (el.value == "No") {
        $('#guestKolDropTimeDiv').addClass('hidden');
    }
}

function submitRsvp(ev) {
    frm = $('#rsvpForm');
    $.ajax({
        type: frm.attr('method'),
        url: frm.attr('action'),
        data: frm.serialize(),
        complete: function (data) {
            $('#rsvpForm').addClass('hidden');
            $('#submitSuccess').removeClass('hidden');
        }
    });

    ev.preventDefault();
}