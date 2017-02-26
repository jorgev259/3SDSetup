var bufferList = new Object();
var finalZip = new JSZip();

function getFileBuffer_url(url,name){    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";
    xhr.onprogress = function(e){
        if (e.lengthComputable){
            var percent = Math.floor((e.loaded / e.total) * 100);
            progress(name,"Download " + name + ": " + percent);
        }
    };
    xhr.onload = function () {
         var fileBlob = new Blob([xhr.response]);
        
        if (this.status === 200) {
            var fileReader = new FileReader();
            fileReader.onload = function() {
                bufferList[name] = this.result;
            };
            fileReader.readAsArrayBuffer(fileBlob);
            progress(name,"Download " + name + ": Complete");
            
        }
    };
    xhr.send();
    progress(name,"Download " + name + ": ongoing");
}

function getFileBuffer_zip(bufferName,original_name,new_name,path){
    if(bufferList[bufferName] == undefined){
        console.log("Extract " + original_name + " from " + bufferName + " delayed");
        setTimeout(function(){ getFileBuffer_zip(bufferName,original_name,new_name,path)},500);
    }else{
    
        JSZip.loadAsync(bufferList[bufferName]).then(function (data) {        
            data.file(original_name).async("arraybuffer").then(function success(content){
                addFile(content,path,new_name,"buffer");
                progress(bufferName, bufferName + ": Added to zip file");
            })                                
        });
    }
}

function extractZip(bufferName,path,remove_path){
    if(bufferList[bufferName] == undefined){
        console.log("Extract " + bufferName + " delayed");
        setTimeout(function(){ extractZip(bufferName,path,remove_path);},500);
    }else{
        JSZip.loadAsync(bufferList[bufferName]).then(function (data) {
            progress(bufferName, bufferName + ": Extracting");
            var file_count = 0;
            
            //Code snippet from @jkcgs :3
            Object.keys(data.files).forEach(function(key){
                var file = data.files[key];
                var file_name = file.name;
                if(remove_path != ""){var file_name = (file_name).replace(remove_path + "/","");};
                if (file.dir) {
                    file_count++;
                    return;
                }

                file.async("arraybuffer").then(function(content) {
                    file_count++;
                    
                    addFile(content, path, file_name, "buffer");

                    if(file_count == Object.keys(data.files).length){
                        progress(bufferName, bufferName + ": Added to zip file");
                    }
                    
                });
            });               
        })
    }
    
}

function addFile(name,path,filename,origin){
    //origin either "list" or "buffer"
    
    var buffer;
    switch(origin){
        case "list":
            buffer = bufferList[name];
            break;
        case "buffer":
            buffer = name;
            break;
    }
    
    if(buffer == undefined){
        setTimeout(function(){ addFile(name,path,filename,origin);},500);
    }else{                
        if(path == ""){
            finalZip.file(filename,buffer);
        }else{
            finalZip.folder(path).file(filename,buffer);
        }
        
        if(origin == "list"){
            progress(name, name + ": Added to zip file");
        }
        console.log(finalZip);
    }
}

function progress(step,message){
    if(document.getElementById(step) !== null){
        document.getElementById(step).innerHTML = message;
    }else{
        $("#progress").append("<div id='" + step + "'>" + message + "</div>");
    }
}

function startup(){
    var step_list = set_step_list();
    console.log(step_list);
    if(step_list){
        $("#startButton").attr("onclick","downloadZip()");
        $("#startButton").text("Download Zip");

        step_list.forEach(function(step){
            switch(step){
                case "soundhax":
                    soundhax_hb();
                    break;
                    
                case "d9(hb)":
                    d9_hb();
                    break;
                case "install":
                    install();
                    break;
                default:
                    break;
            }
        })
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
    
    getFileBuffer_url("https://raw.githubusercontent.com/nedwill/soundhax/master/soundhax-" + region + "-" + console + ".m4a", "Soundhax");
    addFile("Soundhax","","soundhax.mp4","list");
    
    getFileBuffer_url("https://smealum.github.io/ninjhax2/starter.zip","Starter Homebrew Kit");
    extractZip("Starter Homebrew Kit","","starter");
}

function d9_hb(){   
    finalZip.file("files9/");
    
    getFileBuffer_url("https://rikumax25.github.io/3SDSetup/gitFiles/d9.zip","Decrypt9");
    getFileBuffer_zip("Decrypt9","Decrypt9WIP.bin","safehaxpayload.bin","");
    
    getFileBuffer_url("https://rikumax25.github.io/3SDSetup/gitFiles/safehax.3dsx","Safehax");
    addFile("Safehax","3ds","safehax.3dsx","list");
    
    getFileBuffer_url("https://rikumax25.github.io/3SDSetup/gitFiles/fasthax.3dsx","Fasthax");
    addFile("Fasthax","3ds","fasthax.3dsx","list");   
}

function install(){    
    getFileBuffer_url("https://rikumax25.github.io/3SDSetup/gitFiles/a9lhinstaller.zip","A9LH Installer");
    extractZip("A9LH Installer","","");
    
    getFileBuffer_url("https://rikumax25.github.io/3SDSetup/gitFiles/a9lh.zip","A9LH");
    extractZip("A9LH","A9LH","");
    
    getFileBuffer_url("https://rikumax25.github.io/3SDSetup/gitFiles/hbloader.zip","HBL Loader");
    getFileBuffer_zip("HBL Loader", "hblauncher_loader.cia","hblauncher_loader.cia","cias");
    
    getFileBuffer_url("https://rikumax25.github.io/3SDSetup/gitFiles/lumaupdater.cia","Luma Updater");
    addFile("Luma Updater","cias","lumaupdater.cia","list");
  
    getFileBuffer_url("https://rikumax25.github.io/3SDSetup/gitFiles/FBI.zip","FBI");
    getFileBuffer_zip("FBI", "3ds-arm/FBI.cia","FBI.cia","cias");
    
    getFileBuffer_url("https://rikumax25.github.io/3SDSetup/gitFiles/luma.zip","Luma CFW");
    getFileBuffer_zip("Luma CFW", "arm9loaderhax.bin","arm9loaderhax.bin","");
    
    getFileBuffer_url("https://rikumax25.github.io/3SDSetup/gitFiles/h9.zip","Hourglass9");
    getFileBuffer_zip("Hourglass9", "Hourglass9.bin","start_Hourglass9.bin","luma/payloads");
    
    getFileBuffer_url("https://rikumax25.github.io/3SDSetup/gitFiles/DspDump.3dsx","DspDump");
    addFile("DspDump","3ds","DspDump.3dsx","list");
}

function downloadZip(){
    finalZip.generateAsync({type:"blob"})
    .then(function (blob) {
        saveAs(blob, "plairekt.zip");
    });
}
