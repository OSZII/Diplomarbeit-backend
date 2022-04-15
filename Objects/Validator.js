const Help = require("../Helper/Helper");

class Validator{

    // Verify Token
    static verifyToken(req, res, next) {
    // Get auth header value
    const brearerHeader = req.headers["authorization"];
  
    // Check if bearer is undefined
    if (typeof brearerHeader !== "undefined") {
      // Token von bearer trennen
      const bearer = brearerHeader.split(" ");
  
      // Get token
      const bearerToken = bearer[1];
  
      req.token = bearerToken;
  
      jwt.verify(req.token, "secretkey", async (err, authData) => {
        if (err) res.sendStatus(403);
        else {
          next();
        }
      })
    } else {
      // forbidden
      res.sendStatus(403);
    }
  }

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
        if(!isNaN(value)){
            if(value > 0){
                return true;
            }else return Help.largerThanZero;
            // return false;
        }else return Help.notANumber;
        // return true;
    }

    // Verify Token
    static verifyToken(req, res, next){
        // Get auth header value
        const brearerHeader = req.headers["authorization"];
        
        // Check if bearer is undefined
        if(typeof brearerHeader !== "undefined"){
          // Token von bearer trennen
          const bearer = brearerHeader.split(" ");
        
          // Get token
          const bearerToken = bearer[1];
        
          req.token = bearerToken;
        
          next();
        
        
        }else {
          // forbidden
          res.sendStatus(403)
        }
  
  
  }

}

module.exports = Validator;