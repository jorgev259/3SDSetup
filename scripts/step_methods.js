var auto = false;
var auto_list;

$(document).ready(function(){
    toastr["info"]("If you have a non-working browser, select '0' on the last firmware number");  
    available = false;    
})

function startup_CFW(){
    var step_list = set_step_list();
    console.log(step_list);
    if(step_list){
        toastr["info"]("Once all downloads finish, click 'Download Zip' and extract everything inside plairekt.zip into your SD Card");
        $('body').css("background-image", "url(img/bg22.png)");
        
        $("#inner1").hide();
        $("#inner2").show();
        

        step_list.forEach(function(step){
            switch(step){
                case "soundhax":
                    soundhax_hb();
                    break;
                    
                case "safectr_hb":
                    safectr_hb();
                    break;
                    
                case "safectr_browser":
                    safectr_browser();
                    break;
                    
                case "safectr_mset":
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
    if(auto){
        ver_data = auto_list;
    }else{
         var form_data = $("#data_ver").serializeArray();
        var i;
        for (i = 0; i <= 5; i++) {
            ver_data[i] = form_data[i].value;
        };
    }
    
    var vers = Number(ver_data[1] + ver_data[2] + ver_data[3]);
    
    if(vers > 900 && vers < 1140){
        toastr.clear();
        toastr["info"]("Once all downloads finish, click 'Download Zip' and extract everything inside plairekt.zip into your SD Card");
        $('body').css("background-image", "url(img/bg22.png)");  
        soundhax_hb();
        $("#inner1").hide();
        $("#inner2").show();
        available = true;
    }else{
        toastr["warning"]("Non-supported homebrew firmware, look for secondary exploits");
    }
}

function soundhax_hb(){
    var req_data;
    if(auto){
        req_data = default_form;
        req_data["0"].value = auto_list["0"];
        req_data["5"].value = auto_list["5"];
    }else{
         req_data = $("#data_ver").serializeArray();
    }
    
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

function safectr_browser(){
    ctr21();
    folder("CTRTransfer");
    
    getLatestRelease("d0k3","SafeCtrTransfer",".zip", "SafeCtrTransfer");
    getFileBuffer_zip("SafeCtrTransfer","SafeCTRTransfer.dat","SafeCTRTransfer.dat","");
    getFileBuffer_zip("SafeCtrTransfer","Launcher.dat","Launcher.dat","");
}

function safectr_hb(){
    ctr21();
    folder("CTRTransfer");
    
    getLatestRelease("d0k3","SafeCtrTransfer",".zip", "SafeCtrTransfer");
    getFileBuffer_zip("SafeCtrTransfer","SafeCTRTransfer.bin","safehaxpayload.bin","");
    
    var ver_data = [];
    if(auto){
        ver_data = auto_list;
    }else{
         var form_data = $("#data_ver").serializeArray();
        var i;
        for (i = 0; i <= 5; i++) {
            ver_data[i] = form_data[i].value;
        };
    }
    
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
    
    folder("CTRTransfer");
    ctr21();
    
    getLatestRelease("d0k3","SafeCtrTransfer",".zip", "SafeCtrTransfer");
    getFileBuffer_zip("SafeCtrTransfer","SafeCTRTransfer.dat","SafeCTRTransfer.dat","");
    getFileBuffer_zip("SafeCtrTransfer","SafeCTRTransfer.nds","SafeCTRTransfernds","flashcart files");
    
}

function install(){
    var ver_data = [];
    if(auto){
        ver_data = auto_list;
    }else{
         var form_data = $("#data_ver").serializeArray();
        var i;
        for (i = 0; i <= 5; i++) {
            ver_data[i] = form_data[i].value;
        };
    }
    
    var vers = Number(ver_data[1] + ver_data[2] + ver_data[3]);
    
    if(vers >= 300 && vers <= 450){                          
        getFileBuffer_url("https://cors-anywhere.herokuapp.com/http://nus.cdn.c.shop.nintendowifi.net/ccs/download/0004013800000002/00000056", "Firmware file");
        addFile("Firmware file","luma","firmware.bin","list");
        
        getFileBuffer_url("https://cors-anywhere.herokuapp.com/http://nus.cdn.c.shop.nintendowifi.net/ccs/download/0004013800000002/00000056", "cetk file");
        addFile("cetk file","luma","cetk","list")
    }
    
    torrent("magnet:?xt=urn:btih:a1195c9f7ab650fa7c7bf020b51fc19ea8d9440c&dn=data%5Finput%5Fv3.zip&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fzer0day.ch%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=http%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker1.wasabii.com.tw%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce&tr=http%3A%2F%2Ftracker.tfile.me%2Fannounce&tr=udp%3A%2F%2Ftorrent.gresille.org%3A80%2Fannounce&tr=http%3A%2F%2Ftorrent.gresille.org%2Fannounce&tr=udp%3A%2F%2Ftracker.yoshi210.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.filetracker.pl%3A8089%2Fannounce","data_input v3","Extract to the root of the sd card");
    
    folder("files9");
    
    getLatestRelease_local("Plailect", "SafeA9LHInstaller","a9lhinstaller.zip","A9LH Installer");
    deletefile_zip("A9LH Installer","arm9loaderhax.bin");
    extractZip("A9LH Installer","","");
    
    getLatestRelease_local("AuroraWright","arm9loaderhax","release.zip","A9LH");
    extractZip("A9LH","a9lh","");
    
    cfw_files(false,ver_data[5],ver_data[0]);
}

function cfw_files(change_start,region,console){
    var ver_data = [];
    if(change_start){
        start = "installing-arm9loaderhax#section-iii---configuring-luma3ds";
        var form_data = $("#data_ver").serializeArray();
        var i;
        for (i = 0; i <= 5; i++) {
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
    
    if(!auto){
         $("#inner1").hide();
        $("#inner2").show();
    }
    
    folder("files9");
    
    torrent("magnet:?xt=urn:btih:18b3a17f78e2376e05feaa150749d9fd689b25dc&dn=aeskeydb.bin&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fzer0day.ch%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=http%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker1.wasabii.com.tw%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce&tr=http%3A%2F%2Ftracker.tfile.me%2Fannounce&tr=udp%3A%2F%2Ftorrent.gresille.org%3A80%2Fannounce&tr=http%3A%2F%2Ftorrent.gresille.org%2Fannounce&tr=udp%3A%2F%2Ftracker.yoshi210.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.filetracker.pl%3A8089%2Fannounce","aeskeydb.bin","Extract to /files9/");
    
    
    
    getLatestRelease("yellows8", "hblauncher_loader",".zip","HBL Loader");
    getFileBuffer_zip("HBL Loader", "hblauncher_loader.cia","hblauncher_loader.cia","cias");
    
    getLatestRelease("Hamcha", "lumaupdate",".cia","Luma Updater");
    addFile("Luma Updater","cias","lumaupdater.cia","list");
  
    getLatestRelease("Steveice10", "FBI",".zip","FBI");
    getFileBuffer_zip("FBI", "3ds-arm/FBI.cia","FBI.cia","cias");
    
    getLatestRelease_local("AuroraWright","Luma3DS","luma.zip","Luma CFW");
    getFileBuffer_zip("Luma CFW", "arm9loaderhax.bin","arm9loaderhax.bin","");
    
    getLatestRelease("d0k3","GodMode9",".zip","GodMode9");
    getFileBuffer_zip("GodMode9", "GodMode9.bin","GodMode9.bin","luma/payloads");
    
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
    
    getLatestRelease("d0k3","GodMode9",".bin","GodMode9");
    getFileBuffer_zip("GodMode9", "GodMode9.bin","GodMode9.bin","luma/payloads");
    
    getLatestRelease("Steveice10", "FBI",".zip","FBI");
    getFileBuffer_zip("FBI", "3ds-arm/FBI.cia","FBI.cia","cias");
}

function ctr21(){
    var req_data;
    if(auto){
        req_data = default_form;
        req_data["5"].value = auto_list["0"];
    }else{
         req_data = $("#data_ver").serializeArray();
    }
    
    var region = req_data["5"].value;
    var url;
    
    switch (region)
    {
        case "E":
            url = "magnet:?xt=urn:btih:89acc9c1b488b8b38251de0ddf07975d6bd354a1&dn=2.1.0-4E%5Fctrtransfer%5Fo3ds.zip&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fzer0day.ch%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=http%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker1.wasabii.com.tw%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce&tr=http%3A%2F%2Ftracker.tfile.me%2Fannounce&tr=udp%3A%2F%2Ftorrent.gresille.org%3A80%2Fannounce&tr=http%3A%2F%2Ftorrent.gresille.org%2Fannounce&tr=udp%3A%2F%2Ftracker.yoshi210.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.filetracker.pl%3A8089%2Fannounce";
            break;
        
        case "J":
            url = "magnet:?xt=urn:btih:3dbb9c9c85a33c6242f424dcbaebcacdd8a5912b&dn=2.1.0-4J%5Fctrtransfer%5Fo3ds.zip&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fzer0day.ch%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=http%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker1.wasabii.com.tw%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce&tr=http%3A%2F%2Ftracker.tfile.me%2Fannounce&tr=udp%3A%2F%2Ftorrent.gresille.org%3A80%2Fannounce&tr=http%3A%2F%2Ftorrent.gresille.org%2Fannounce&tr=udp%3A%2F%2Ftracker.yoshi210.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.filetracker.pl%3A8089%2Fannounce";
            break;
        
        default:
            url = "magnet:?xt=urn:btih:1609ce9ee7b0ed9b6dea0b3e7cca4fc52dad6ff4&dn=2.1.0-4U%5Fctrtransfer%5Fo3ds.zip&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fzer0day.ch%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=http%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.aletorrenty.pl%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker1.wasabii.com.tw%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce&tr=http%3A%2F%2Ftracker.tfile.me%2Fannounce&tr=udp%3A%2F%2Ftorrent.gresille.org%3A80%2Fannounce&tr=http%3A%2F%2Ftorrent.gresille.org%2Fannounce&tr=udp%3A%2F%2Ftracker.yoshi210.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.filetracker.pl%3A8089%2Fannounce";
            break;
    }
    
    torrent(url,"2.1 CTR Transfer " + region, "Extract to /CtrTransfer/");
}
