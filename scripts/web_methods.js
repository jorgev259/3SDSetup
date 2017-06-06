var auto_list;
var download_msg;

$(document).ready(function(){
    toastr["warning"]("If you have a non-working browser, select '0' on the last firmware number");
    available = false;
})

function progress(step,message){
    if(document.getElementById(step) !== null){
        document.getElementById(step).innerHTML = message;
    }else{
        $("#progress").append("<div id='" + step + "'>" + message + "</div>");
    }
}

function soundhaxURL(){
    var req_data = consoleinfo();

    var console = req_data["0"].value;
    var region = req_data["5"].value;

    switch (console)
    {
        case "OLD":
            console = "o3ds";
            break;
            case "NEW":
            console = "n3ds";
            break;
    }

    switch (region)
    {
        case "E":
            region = "eur";
            break;
        case "U":
            region = "usa";
            break;
        case "J":
            region = "jpn";
            break;
        case "K":
            region = "kor";
            break;
    }

    return "https://raw.githubusercontent.com/nedwill/soundhax/master/soundhax-" + region + "-" + console + ".m4a";
}

function consoleinfo(){
    return $("#data_ver").serializeArray();
}

function startup_CFW(){
    var step_list = set_step_list();
    console.log(step_list);
    if(step_list){

        download_msg = toastr["warning"]("Once all downloads finish, click 'Download Zip' and extract everything inside the given zip into your SD Card");
        $('html').addClass("bg_change");

        startSetup(step_list);
    }
}

function startup(){
    var ver_data = [];
    var form_data = consoleinfo();
    var i;
    for (i = 0; i <= 5; i++) {
        ver_data[i] = form_data[i].value;
    };

    var vers = Number(ver_data[1] + ver_data[2] + ver_data[3]);

    if(vers > 900 && vers < 1140){
        toastr.clear();
        startSetup();
        $('html').addClass("bg_change");
        soundhax_hb();
        available = true;
    }else{
        toastr["warning"]("Non-supported homebrew firmware, look for secondary exploits");
    }
}


function cfw114(){
    $("#normal").hide();
    $("#cfw114").show();
}
