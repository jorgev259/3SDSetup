var download_msg;

$(document).ready(function(){
    toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "0",
  "hideDuration": "0",
  "timeOut": "0",
  "extendedTimeOut": "0",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
    }
    


    var toastContact = toastr;
    toastContact.options.onclick = function() { window.open(' https://discord.me/Nintenbrew', '_blank'); };
    toastContact["warning"]("If you need support or wanna suggest something, contact Rikumax25 on Discord or go to the Nintenbrew Discord Server (click here to get the invite link)");
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
        var data = {};
        data.steps = step_list;
        download_msg = toastr["warning"]("Once all downloads finish, click 'Download Zip' and extract everything inside the given zip into your SD Card");
        $('html').addClass("bg_change");

        startSetup(data);
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
        start="https://3ds.guide/homebrew-launcher-(soundhax)"
        download_msg = toastr["warning"]("Once all downloads finish, click 'Download Zip' and extract everything inside the given zip into your SD Card");
        startSetup(setupList["soundhaxList"]);
        $('html').addClass("bg_change");
    }else{
        toastr["warning"]("Non-supported homebrew firmware, look for secondary exploits");
    }
}


function cfw114(){
    $("#normal").hide();
    $("#cfw114").show();

    toastr["error"]("Select the firmware of the Target console and extract the files on the Source's console SD Card");
    start="";
}

function fileName(callback){
    callback = callback || function(){};
    
    $.get("https://cors-anywhere.herokuapp.com/http://3sdsetup.net/data/typos.json",function(typos){
        var zip_name = typos[Math.floor(Math.random() * typos.length)];
        callback(zip_name);
    })
}

function torrent(item){
    var toastorrent = toastr;
    torrent_used = true;
    toastorrent.options.onclick = function() { window.open('http://dev.deluge-torrent.org/wiki/Download', '_blank'); };
    toastorrent["warning"]("You need a torrent client like Deluge to download the torrent files, the white button links (Click here to go to Deluge's website)");

    $("#torrent_list").append("<div><a class='btn btn-lg btn-torrent' href='" + item.url + "'>" + item.name + " (" + item.step + ")</a></div>");

}

function checkReq(item){
    if(item === undefined){
        return true;
    }

    var info = consoleinfo();

    switch(item.type){
        case "console":
            if(item.data === info[0].value){
                return true;
            }
            break;

        case "fw":
            var firmware = parseInt(info[1].value + info[2].value +info[3].value);
            switch(item.comparator){
                case "<":
                    if(firmware < item.data){
                        return true
                    }
                    break;

                case "<=":
                    if(firmware <= item.data){
                        return true
                    }
                    break;

                case ">":
                    if(firmware > item.data){
                        return true
                    }
                    break;

                case ">=":
                    if(firmware >= item.data){
                        return true
                    }
                    break;

                case "<>":
                    if(firmware <= item.data1 && firmware >= item.data2){
                        return true
                    }
                    break;
            }
            break;
    }

    return false;
}
