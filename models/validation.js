import { getId } from "../controllers/main";

class Validation{
checkEmpty(value,idNoti,mess){
    if(value===" "){
        getId(idNoti).innerHTML=mess; 
        getId(idNoti).style.display="block";
        return false;
    }
    getId(idNoti).innerHTML="";
    getId(idNoti).style.display="none";
    return true;
}
checkCharacterLength(){
    
}
}