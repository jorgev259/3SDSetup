var bufferList = new Object();
var finalZip = new JSZip();
var torrent_number = [];
var available = false;

$(document).ready(function(){
    $("#inner2").hide();
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
});

function getFileBuffer_url(url, name) {
    available = false;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";
    xhr.onprogress = function (e) {
        if (e.lengthComputable) {
            available = false;
            var percent = Math.floor((e.loaded / e.total) * 100);
            progress(name,"Download " + name + ": <progress value='" + percent + "' max='100'></progress>");
        }
    };
    xhr.onerror = function(){
        progress(name,"Download " + name + ": retrying");
        getFileBuffer_url(url,name);
    }
    xhr.onload = function () {
         var fileBlob = new Blob([xhr.response]);
        
        if (this.status === 200) {
            var fileReader = new FileReader();
            fileReader.onload = function() {
                bufferList[name] = this.result;
            };
            fileReader.readAsArrayBuffer(fileBlob);
            progress(name,"Download " + name + ": Complete");
            available = true;
        }
    };
    xhr.send();
    progress(name,"Download " + name + ": starting");
}

function getLatestRelease(author,repo,filename,step){
    $.getJSON("https://api.github.com/repos/" + author + "/" + repo + "/releases/latest", function( data ) {
        Object.keys(data.assets).forEach(function(key){
            var file = data.assets[key];
            
            if(file.name.indexOf(filename) > -1){
                getFileBuffer_url("https://cors-anywhere.herokuapp.com/" + file.browser_download_url,step);
                return;
            }
        })
    });
}

function getLatestRelease_local(author,repo,filename,step){
    jQuery.get('7zfiles/'+ author + '_' + repo + '/name.txt', function(name) {
        getFileBuffer_url("7zfiles/" + author + "_" + repo + "/" + filename,step);
        $.getJSON("https://api.github.com/repos/" + author + "/" + repo + "/releases/latest", function( data ) {                   
            if(name != data.name){
                alert("The hosted file for " + repo + " is outdated, please inform Rikumax25 at Discord or open an issue on github");
            }
        });
    });
}

function notLatestRelease(author,repo,filename,step){
    $.getJSON("https://api.github.com/repos/" + author + "/" + repo + "/releases", function( data ) {
      var data = data[0];  Object.keys(data.assets).forEach(function(key){
            var file = data.assets[key];
            
            if(file.name.indexOf(filename) > -1){
                getFileBuffer_url("https://cors-anywhere.herokuapp.com/" + file.browser_download_url,step);
            }
        })
    });
}

function getFileBuffer_zip(bufferName,original_name,new_name,path){
    if(bufferList[bufferName] == undefined){
        setTimeout(function(){ getFileBuffer_zip(bufferName,original_name,new_name,path)},500);
    }else{
    
        JSZip.loadAsync(bufferList[bufferName]).then(function (data) {    
            data.file(original_name).async("arraybuffer").then(function success(content){
                addFile(content,path,new_name,"buffer");
                progress_finish(bufferName, bufferName + ": Added to zip file");
                
            })                                
        });
    }
}

function extractFolder(bufferName,folder,path){
    if(bufferList[bufferName] == undefined){
        setTimeout(function(){ extractFolder(bufferName,folder)},500);
    }else{   
        JSZip.loadAsync(bufferList[bufferName]).then(function (data) {
            var file_count2 = 0;
            
            //Modified from @jkcgs's snippet from extractZip :3
            Object.keys(data.files).forEach(function(filename){
                var file = data.files[filename];
                if (file.dir || !filename.startsWith(folder)) {
                    file_count2++;
                    return;
                }
                
                file.async("arraybuffer").then(function(content) {
                    file_count2++;
                    addFile(content, path, filename, "buffer");

                    if(file_count2 == Object.keys(data.files).length){
                        progress_finish(bufferName, bufferName + ": Added to zip file");
                        
                    }
                    
                });
            });
        });
    }
}

function extractZip(bufferName,path,remove_path){
    if(bufferList[bufferName] == undefined){
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
                        progress_finish(bufferName, bufferName + ": Added to zip file");
                        
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
            progress_finish(name, name + ": Added to zip file");
        }
    }
}

function folder(name){
    finalZip.file(name + "/dummy.txt", "i love ice cream");
    finalZip.remove(name + "/dummy.txt");
}

function progress(step,message){   
    if(document.getElementById(step) !== null){
        document.getElementById(step).innerHTML = message;
    }else{
        $("#progress").append("<div id='" + step + "'>" + message + "</div>");
    }
}

function progress_finish(step,message){       
    if(document.getElementById(step) !== null){
        document.getElementById(step).innerHTML = message;
    }else{
        $("#progress").append("<div id='" + step + "'>" + message + "</div>");
    }
}

function torrent(url,name,message){    
    var toastorrent = toastr;
    toastorrent.options.onclick = function() { window.open('http://dev.deluge-torrent.org/wiki/Download', '_blank'); };
    toastorrent["info"]("You need a torrent client like Deluge to download the torrent files, the white button links (Click here to go to Deluge's website)");

    $("#torrent_list").append("<div><a onclick='torrent_click(" + torrent_number.length + ")' class='btn btn-lg btn-torrent' href='" + url + "'>" + name + " (" + message + ")</a></div>");
    
    torrent_number[torrent_number.length] = 0;
}

function torrent_click(number){
    torrent_number[number] = 1;
    var count = 0;
    for(var i=0;i<torrent_number.length;i++){
        if(torrent_number[i] == 1){
            count++;
        }
    }
    if(count == torrent_number.length){
        available = true;
    }
}

function downloadZip(){
    if(available){
        finalZip.generateAsync({type:"blob"})
        .then(function (blob) {
            saveAs(blob, "plairekt.zip");
        });
    }else{
        toastr["error"]("You need to open all torrents and wait until all downloads are finished before downloading the zip");
    }
}
