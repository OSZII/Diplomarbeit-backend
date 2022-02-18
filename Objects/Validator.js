
class Validator{

    static validate(value, min, max){
        return this.validateNotNUll(value) && this.validateLenght(value, min, max);
    }

    static validateNotNUll(value){
        if(!value){ 
            return false;
        }
        else return true;
    }

    static validateLenght(value, min, max){
        if(value.length < min || value.length > max){
            return false;
        }else return true;
    }


    static validateEmail(value){
        if(value.includes("@") && value.includes(".")){
            return true;
        }else {
            return false;
        }
    }
    
    static validateJson(value){
        try{
            JSON.parse(value);
        }catch(e){
            return false;
        }
        return true;
    }

    static validateNumber(value){
        if(isNaN(value)){
            return false;
        }
        return true;
    }

}

module.exports = Validator;