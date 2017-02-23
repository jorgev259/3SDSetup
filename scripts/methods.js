var bufferList = new Object();
var finalZip = new JSZip();

function getFileBuffer_url(url,name){    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";

    xhr.onload = function () {
         var fileBlob = new Blob([xhr.response]);
        
        if (this.status === 200) {
            var fileReader = new FileReader();
            fileReader.onload = function() {
                bufferList[name] = this.result;
            };
            fileReader.readAsArrayBuffer(fileBlob);
        }
    };
    xhr.send();
    progress(name,"Download " + name + ": ongoing");
}

function getFileBuffer_zip(bufferName,original_name,new_name,path){
    JSZip.loadAsync(bufferList[bufferName]).then(function (data) {        
        data.file(original_name).async("arraybuffer").then(function success(content){
            addFile(content,path,new_name,"buffer");
        })                                
    });
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

                var file_name = (file.name).replace("starter/","");
                if (file.dir) {
                    file_count++;
                    return;
                }

                file.async("arraybuffer").then(function(content) {
                    file_count++;
                    
                    addFile(content, "", file_name, "buffer",false);

                    if(file_count == Object.keys(data.files).length){
                        progress(bufferName, bufferName + ": Added to file");
                    }
                    
                });
            });               
        })
    }
    
}

function addFile(name,path,filename,origin,step){
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
        setTimeout(function(){ addFile(name,path,filename,origin,step);},500);
    }else{                
        if(path == ""){
            finalZip.file(filename,buffer);
        }else{
            finalZip.folder(path).file(filename,buffer);
        }
        
        if(step != false){
            progress(step, step + ": Moved to file");
        }
        console.log(finalZip);
    }
}

function getGitURL(author,repo, bufferName, keyword){
     $.getJSON("https://api.github.com/repos/" + author + "/" + repo + "/releases/latest").done(function(data){
         var i;
         for(i=0;i<data.assets.length;i++){
             if(data.assets[i].name.includes(keyword)){                
                 getFileBuffer_url(data.assets[i].browser_download_url,bufferName);
                 i=data.assets.length;
             }
         }
     })
}

function progress(step,message){
    if($("#" + step).length>0){
        $("#" + step).text(message);
    }else{
        $("#progress").append("<div id='" + step + "'>" + message + "</div>")
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
    
    getFileBuffer_url(updatePayload(),"otherapp");
    addFile("otherapp","","otherapp.bin","list","otherapp");
    getFileBuffer_url("https://raw.githubusercontent.com/nedwill/soundhax/master/soundhax-" + region + "-" + console + ".m4a", "soundhax");
    addFile("soundhax","","soundhax.mp4","list","soundhax");
    getFileBuffer_url("https://smealum.github.io/ninjhax2/starter.zip","starter");
    extractZip("starter","");
}

function downloadZip(){
    finalZip.generateAsync({type:"blob"})
    .then(function (blob) {
        saveAs(blob, ":3.zip");
    });
}