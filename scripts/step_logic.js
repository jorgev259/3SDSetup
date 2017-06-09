var guide = "3ds.guide";

function set_step_list() {
    var ver_data = [];
         var form_data = $("#data_ver").serializeArray();
        var i;
        for (i = 0; i <= 5; i++) {
            ver_data[i] = form_data[i].value;
        };
    
    var console = ver_data[0];
    var vers = Number(ver_data[1] + ver_data[2] + ver_data[3]);
    var browser = ver_data[4];

    var step_list = [];
    var compatible = true;
    
    //Hard-coded, will make it updatable later on
    switch(console){
        case "OLD":
            if (vers >= 900 && vers <= 1130) {
                //Soundhax
                step_list.push("soundhaxList");
                //d9 (hb)
                step_list.push("b9s_hb");
                //arm9
                step_list.push("finalize");
                
                start = "homebrew-launcher-(soundhax)";
            }

            if (vers >= 400 && vers <= 810) {
                if(browser>0){
                    step_list.push("b9s_browser");
                    step_list.push("finalize");
                    
                    start = "installing-boot9strap-(browser)";
                }else{
                    if((vers >=400 && vers<=450)||(vers>=600 && 630)){                      
                        step_list.push("b9s_mset");
                        step_list.push("finalize");
                        
                        start = "installing-boot9strap-(mset)";
                    }else{
                        compatible = false;
                    }
                }
            }

            if (vers >= 100 && vers <= 310) {
                compatible="false";
            }
            break;

        case "NEW":
            if (vers >= 900 && vers <= 1130) {
                //Soundhax
                step_list.push("soundhaxList");
                //d9 (hb)
                step_list.push("b9s_hb");
                //arm9
                step_list.push("finalize");
            }

            if (vers == 810) {
                compatible = false;
            }

            break;
    }

    if(vers<= 450 && vers>=300){
        step_list.push("Native.firm");
        step_list.push("Cetk");
    }

    if(vers<900){
        step_list.push("Luma3DS legacy");
    }

    if(vers>=1140){
        step_list = false;
        cfw114();
    }

    
    if(!compatible){
        step_list = false;
        toastr["warning"]("You need a hardmod (check 3ds.guide for more information)");
    }
    return step_list;
}
