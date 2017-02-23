function set_step_list() {        
    var form_data = $("#data_ver").serializeArray();

    var ver_data = {};
    var i;
    for (i = 0; i <= 5; i++) {
        ver_data[i.toString()] = form_data[i].value;
    };
    
    
    var console = ver_data[0];
    var vers = Number(ver_data[1] + ver_data[2] + ver_data[3]);
    var browser = ver_data[4];

    var step_list = [];
    var compatible = true;
    
    //Hard-coded, will make it updatable later on
    switch(console){
        case "OLD":
            if (vers >= 900 && vers <= 1120) {
                //Soundhax
                step_list.push("soundhax");
                //d9 (hb)
                step_list.push("d9(hb)");
                //ctr
                step_list.push("2.1_ctr");
                //arm9
                step_list.push("install");
            }

            if (vers >= 400 && vers <= 810) {
                switch (browser <= 25) {
                    case true:
                        //Update latest
                        compatible = false;
                        break;

                    case false:
                        //d9 browser
                        step_list.push("d9(browser)")
                        break;
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
            if (vers >= 900 && vers <= 1120) {
                //Soundhax
                step_list.push("soundhax");
                //d9 (hb)
                step_list.push("d9(hb)");
                //ctr
                step_list.push("2.1_ctr");
                //arm9
                step_list.push("install");
            }

            if (vers == 810) {
                compatible = false;
            }

            break;
    }
    
    if(vers >= 1130){
        step_list = false;
        alert("You need a NAND backup and hardmod");
    }

    if (!compatible) {
        step_list = false;
        alert("You need to update to 11.2 or you need a ds flashcard to continue (Check 3ds.guide for more info)")
    }
    return step_list;
}
