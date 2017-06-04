var auto_list;
var download_msg;

$(document).ready(function(){
    toastr["warning"]("If you have a non-working browser, select '0' on the last firmware number");
    toastr["warning"]("3SDSetup is now working with bootstrap9!");
    available = false;    
})

function startup_CFW(){
    var step_list = set_step_list();
    console.log(step_list);
    if(step_list){
        
        download_msg = toastr["warning"]("Once all downloads finish, click 'Download Zip' and extract everything inside the given zip into your SD Card");
        $('html').addClass("bg_change");
        
        $("#inner1").hide();
        $("#inner2").show();
        

        step_list.forEach(function(step){
            switch(step){
                case "soundhax":
                    soundhax_hb();
                    break;
                    
                case "bootstrap9_hb":
                    bootstrap9_hb();
                    break;
                    
                case "bootstrap9_browser":
                    bootstrap9_browser();
                    break;
                    
                case "bootstrap9_mset":
                    safectr_mset();
                    break;
                    
                case "9.2_ctr":
                    ctr_9_2();
                    break;
                    
                case "install":
                    install();
                    break;
                    
                default:
                    break;
            }
        });
        
        
        
    }
}

function startup(){
    var ver_data = [];
    var form_data = $("#data_ver").serializeArray();
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

function soundhax_hb(){
    var req_data = $("#data_ver").serializeArray();
    
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
            default:
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
        default:
            break;
    }
    
    getFileBuffer_url(updatePayload(),"Otherapp Payload");
    addFile("Otherapp Payload","","otherapp.bin","list");
    
    getFileBuffer_url("https://raw.githubusercontent.com/nedwill/soundhax/master/soundhax-" + region + "-" + console + ".m4a", "Soundhax " + region);
    addFile("Soundhax " + region,"","soundhax-" + region + "-" + console + ".m4a","list");
    
    getFileBuffer_url("https://smealum.github.io/ninjhax2/starter.zip","Starter Homebrew Kit");
    extractZip("Starter Homebrew Kit","","starter");
}

function bootstrap9_browser(){
    getFileBuffer_url("https://smealum.github.io/ninjhax2/starter.zip","Starter Homebrew Kit");
    extractZip("Starter Homebrew Kit","","starter");
    
    getLatestRelease("SciresM","boot9strap","boot9strap-1.0.zip", "boot9strap");
    extractZip("boot9strap","boot9strap","");
    
    getLatestRelease("d0k3","SafeB9SInstaller",".zip", "SafeB9SInstaller");
    getFileBuffer_zip("SafeB9SInstaller","SafeB9SInstaller.bin","safehaxpayload.bin","");
}

function bootstrap9_hb(){
    getLatestRelease("SciresM","boot9strap","boot9strap-1.0.zip", "boot9strap");
    extractZip("boot9strap","boot9strap","");
    
    getLatestRelease("d0k3","SafeB9SInstaller",".zip", "SafeB9SInstaller");
    getFileBuffer_zip("SafeB9SInstaller","SafeB9SInstaller.bin","safehaxpayload.bin","");
    
    var ver_data = [];
     var form_data = $("#data_ver").serializeArray();
    var i;
    for (i = 0; i <= 5; i++) {
        ver_data[i] = form_data[i].value;
    };
    
    var vers = Number(ver_data[1] + ver_data[2] + ver_data[3]);
    
    if(vers < 1130){                          
        getRelease("TiniVi","safehax","3dsx", "r19", "Safehax");
    }else{
        getLatestRelease("TiniVi","safehax","3dsx", "Safehax");
        
    }
    addFile("Safehax","3ds","safehax.3dsx","list");
    
    
    getLatestRelease("smealum","udsploit","3dsx", "udsploit");
    addFile("udsploit","3ds","udsploit.3dsx","list");   
    
}

function safectr_mset(){
    toastr["warning"]("Copy the files inside the 'flashcart files' folder to your flashcart's SD card");
    toastr["warning"]("You'll need a ds flashcart for this method or doing a cart update (check 3ds.guide for more info)");
    
    getFileBuffer_url("https://smealum.github.io/ninjhax2/starter.zip","Starter Homebrew Kit");
    extractZip("Starter Homebrew Kit","","starter");
    
    getLatestRelease("SciresM","boot9strap","boot9strap-1.0.zip", "boot9strap");
    extractZip("boot9strap","boot9strap","");
    
    getLatestRelease("d0k3","SafeB9SInstaller",".zip", "SafeB9SInstaller");
    getFileBuffer_zip("SafeB9SInstaller","SafeB9SInstaller.dat","","");
    getFileBuffer_zip("SafeB9SInstaller","SafeB9SInstaller.nds","SafeB9SInstaller.nds","flashcart files");   
}

function install(){
    var ver_data = [];
    var form_data = $("#data_ver").serializeArray();
    
    for (var i = 0; i <= 5; i++) {
        ver_data[i] = form_data[i].value;
    };
    
    var vers = Number(ver_data[1] + ver_data[2] + ver_data[3]);
    
    if(vers >= 300 && vers <= 450){                          
        getFileBuffer_url("https://cors-anywhere.herokuapp.com/http://nus.cdn.c.shop.nintendowifi.net/ccs/download/0004013800000002/00000056", "Firmware file");
        addFile("Firmware file","luma","firmware.bin","list");
        
        getFileBuffer_url("https://cors-anywhere.herokuapp.com/http://nus.cdn.c.shop.nintendowifi.net/ccs/download/0004013800000002/00000056", "cetk file");
        addFile("cetk file","luma","cetk","list")
    }
    
    cfw_files(false,ver_data[5],ver_data[0]);
}

function cfw_files(change_start,region,console){
    var ver_data = [];
    $("#inner1").hide();
    $("#inner2").show();
    
    if(change_start){
        download_msg = toastr["warning"]("Once all downloads finish, click 'Download Zip' and extract everything inside the given zip into your SD Card");
        start = "installing-arm9loaderhax#section-iii---configuring-luma3ds";
        var form_data = $("#data_ver").serializeArray();

        for (var i = 0; i <= 5; i++) {
            ver_data[i] = form_data[i].value;
        };
        region = ver_data[5];
        console = ver_data[0]; 
    }
    
    if(console == "OLD"){
        folder("hblauncherloader");
        
        global_version = $.parseJSON('{"0":"OLD","1":"11","2":"2","3":"0","4":"0","5":"' + region + '"}');
        getFileBuffer_url(updatePayload(),"Otherapp Payload (11.2)");
        var payloadName = "OLD-11-4-0-37-";
        switch(region){
            case "E":
                payloadName += "EUR";
                break;
            case "U":
                payloadName += "USA";
                break;
            case "J":
                payloadName += "JPN";
                break;
            case "K":
                payloadName += "KOR";
                break;
        }
        addFile("Otherapp Payload (11.2)","hblauncherloader",payloadName + ".bin","list");
    } 

    
    getLatestRelease("yellows8", "hblauncher_loader",".zip","HBL Loader");
    getFileBuffer_zip("HBL Loader", "hblauncher_loader.cia","hblauncher_loader.cia","cias");
    
    getLatestRelease("Hamcha", "lumaupdate",".cia","Luma Updater");
    addFile("Luma Updater","cias","lumaupdater.cia","list");
  
    getLatestRelease("Steveice10", "FBI",".zip","FBI");
    getFileBuffer_zip("FBI", "3ds-arm/FBI.cia","FBI.cia","cias");
    
    getLatestRelease_local("AuroraWright","Luma3DS","luma.zip","Luma CFW");
    getFileBuffer_zip("Luma CFW", "boot.firm","boot.firm","");
    
    getLatestRelease("d0k3","GodMode9",".zip","GodMode9");
    getFileBuffer_zip("GodMode9", "GodMode9.firm","GodMode9.firm","luma/payloads");
    
    getLatestRelease("ErmanSayin", "Themely",".cia","Themely");
    addFile("Themely","cias","Themely.cia","list");
    
    getLatestRelease("zoogie", "DSP1",".cia","DSP1");
    addFile("DSP1","cias","DSP1.cia","list");
}

function ctr_9_2(){
    var req_data = $("#data_ver").serializeArray();
    var region = req_data["5"].value;
    var console = req_data["0"].value;
    var url;
    
    switch(console){
        case "OLD":
            switch (region)
            {
                case "E":
                    url = "magnet:?xt=urn:btih:8d6142313971b08f92257e7fb1c1d5689e34ed78&dn=9.2.0-20E%5Fctrtransfer%5Fo3ds.zip&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fzer0day.ch%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=http%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker1.wasabii.com.tw%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce&tr=http%3A%2F%2Ftracker.tfile.me%2Fannounce&tr=udp%3A%2F%2Ftorrent.gresille.org%3A80%2Fannounce&tr=http%3A%2F%2Ftorrent.gresille.org%2Fannounce&tr=udp%3A%2F%2Ftracker.yoshi210.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.filetracker.pl%3A8089%2Fannounce";
                    break;
                case "U":
                    url = "magnet:?xt=urn:btih:1dc79a2a0babb45497961888f369423a93135e2b&dn=9.2.0-20U%5Fctrtransfer%5Fo3ds.zip&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fzer0day.ch%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=http%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker1.wasabii.com.tw%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce&tr=http%3A%2F%2Ftracker.tfile.me%2Fannounce&tr=udp%3A%2F%2Ftorrent.gresille.org%3A80%2Fannounce&tr=http%3A%2F%2Ftorrent.gresille.org%2Fannounce&tr=udp%3A%2F%2Ftracker.yoshi210.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.filetracker.pl%3A8089%2Fannounce";
                    break;
                case "J":
                    url = "magnet:?xt=urn:btih:24ad2b85e67013ef1f91178dca7ad2e40663b9b2&dn=9.2.0-20J%5Fctrtransfer%5Fo3ds.zip&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fzer0day.ch%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=http%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker1.wasabii.com.tw%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce&tr=http%3A%2F%2Ftracker.tfile.me%2Fannounce&tr=udp%3A%2F%2Ftorrent.gresille.org%3A80%2Fannounce&tr=http%3A%2F%2Ftorrent.gresille.org%2Fannounce&tr=udp%3A%2F%2Ftracker.yoshi210.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.filetracker.pl%3A8089%2Fannounce";
                    break;
            }
            break;
        
        case "NEW":
            switch (region)
            {
                case "E":
                    url = "magnet:?xt=urn:btih:fed7bfeec0e52b42a77467cfb6ffd3e9dd2d5a70&dn=9.2.0-20E%5Fctrtransfer%5Fn3ds.zip&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fzer0day.ch%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=http%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker1.wasabii.com.tw%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce&tr=http%3A%2F%2Ftracker.tfile.me%2Fannounce&tr=udp%3A%2F%2Ftorrent.gresille.org%3A80%2Fannounce&tr=http%3A%2F%2Ftorrent.gresille.org%2Fannounce&tr=udp%3A%2F%2Ftracker.yoshi210.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.filetracker.pl%3A8089%2Fannounce";
                    break;
                case "U":
                    url = "magnet:?xt=urn:btih:985d47442dc470d1b9f908256bed041c63885f60&dn=9.2.0-20U%5Fctrtransfer%5Fn3ds.zip&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fzer0day.ch%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=http%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker1.wasabii.com.tw%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce&tr=http%3A%2F%2Ftracker.tfile.me%2Fannounce&tr=udp%3A%2F%2Ftorrent.gresille.org%3A80%2Fannounce&tr=http%3A%2F%2Ftorrent.gresille.org%2Fannounce&tr=udp%3A%2F%2Ftracker.yoshi210.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.filetracker.pl%3A8089%2Fannounce";
                    break;
                case "J":
                    url = "magnet:?xt=urn:btih:b22d67fd02b3b0e30ac991e451db0f2d32e7beca&dn=9.2.0-20J%5Fctrtransfer%5Fn3ds.zip&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fzer0day.ch%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=http%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker1.wasabii.com.tw%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce&tr=http%3A%2F%2Ftracker.tfile.me%2Fannounce&tr=udp%3A%2F%2Ftorrent.gresille.org%3A80%2Fannounce&tr=http%3A%2F%2Ftorrent.gresille.org%2Fannounce&tr=udp%3A%2F%2Ftracker.yoshi210.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.filetracker.pl%3A8089%2Fannounce";
                    break;
            }
            break;
    } 
    torrent(url,"9.2 CTR Transfer " + region, "Extract to /files9/");
    
    getLatestRelease("d0k3","GodMode9",".zip","GodMode9");
    getFileBuffer_zip("GodMode9", "GodMode9.firm","GodMode9.firm","luma/payloads");
    
    getLatestRelease("Steveice10", "FBI",".zip","FBI");
    getFileBuffer_zip("FBI", "3ds-arm/FBI.cia","FBI.cia","cias");
}

function updatea9lh(){
    startSetup();


    getLatestRelease("SciresM","boot9strap","boot9strap-1.0.zip", "boot9strap");
    extractZip("boot9strap","boot9strap","");
    
    getLatestRelease("d0k3","SafeB9SInstaller",".zip", "SafeB9SInstaller");
    getFileBuffer_zip("SafeB9SInstaller","SafeB9SInstaller.bin","SafeB9SInstaller.bin","luma/payloads");
    
    getLatestRelease_local("AuroraWright","Luma3DS","luma.zip","Lusma CFW");
    getFileBuffer_zip("Luma CFW", "boot.firm","boot.firm","");
    
    getLatestRelease("d0k3","GodMode9",".zip","GodMode9");
    getFileBuffer_zip("GodMode9", "GodMode9.bin","GodMode9.bin","luma/payloads");

    torrent("magnet:?xt=urn:btih:15a3c97acf17d67af98ae8657cc66820cc58f655&dn=secret_sector.bin&tr=udp%3A%2F%2Ftracker.filetracker.pl%3A8089%2Fannounce&tr=http%3A%2F%2Ftracker.tfile.me%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.yoshi210.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker1.wasabii.com.tw%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce&tr=udp%3A%2F%2Ftorrent.gresille.org%3A80%2Fannounce&tr=udp%3A%2F%2Fzer0day.ch%3A1337%2Fannounce&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=http%3A%2F%2Ftorrent.gresille.org%2Fannounce&tr=http%3A%2F%2Fexplodie.org%3A6969%2Fannounce","secret_sector.bin","Extract to /boot9strap/")
}

function dsiwareSave(){
    startSetup();

}
