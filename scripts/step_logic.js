var guide = "3ds.guide";

function set_step_list() {
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
                step_list.push("soundhax");
                //d9 (hb)
                step_list.push("bootstrap9_hb");
                //arm9
                step_list.push("install");
                
                start = "homebrew-launcher-(soundhax)";
            }

            if (vers >= 400 && vers <= 810) {
                if(browser>0){
                    step_list.push("safectr_browser");
                    step_list.push("install");
                    
                    start = "safectrtransfer-(browser)";
                }else{
                    if((vers >=400 && vers<=450)||(vers>=600 && 630)){                      
                        step_list.push("safectr_mset");
                        step_list.push("install");
                        
                        start = "safectrtransfer-(mset)";
                    }else{
                        compatible = false;
                    }
                }
            }

            if (vers >= 100 && vers <= 310) {
                switch (browser > 0) {
                    case true:
                        if (vers === 210) {
                            //install arm9
                            step_list.push("install");
                            //9.2 ctr
                            step_list.push("9.2_ctr");
                            
                            start= "installing-arm9loaderhax"
                        } else {
                            //Update latest
                            compatible = false;
                        }
                        break;

                    case false:
                        //Update latest
                        compatible = false;
                        break;
                }
            }
            break;

        case "NEW":
            if (vers >= 900 && vers <= 1130) {
                //Soundhax
                step_list.push("soundhax");
                //d9 (hb)
                step_list.push("safectr_hb");
                //arm9
                step_list.push("install");
            }

            if (vers == 810) {
                compatible = false;
            }

            break;
    }

    
    if(vers >= 1140){
        step_list = false;
        auto = false;
        toastr["warning"]("You need a NAND backup and hardmod");
    }else if (!compatible) {
        step_list = false;
        auto = false;
        toastr["warning"]("You need to do a cart update (check 3ds.guide for more info)");
    }
    return step_list;
}
