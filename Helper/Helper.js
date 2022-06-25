class Helper {

    static ID_ERROR = "Id must be number and positive!";
    static INVALID_PROPERTIES_ERROR = "Properties are incorrect!";
    static NOTHING_FOUND_ERROR = "No results matching to given Parameters could be found";
    static LENGTH_ERROR = "Length must be at least 3 characters long!";
    static USERNAME_ERROR = "Username already exists!";
    static EMAIL_ERROR = "Email already exists!";
    static INVALID_FOREIGNKEY_ERROR = "Foreign key is invalid!";
    static INVALID_UNIT_ERROR = "Unit is invalid!";

    static checkProperties(properties, object) {
        for (let i = 0; i < properties.length; i++) {
            if (!object.hasOwnProperty(properties[i])) return false;
        }
        return true;
    }

    static async searchById(parameters, object) {
        if (parameters > 0) return [400, this.largerThanZero]

        let receivedObject = await object.getById(parameters);

        if (receivedObject.length == 0) return [404, this.notFound];

        return receivedObject;
    }

    static async searchByString(parameters, object) {
        if (parameters.length < 3) return [400, this.longerThan3];

        let receivedObject = await object.getByName(parameters);

        if (receivedObject.length == 0) return [404, this.notFound];

        return receivedObject;
    }

    static async searchByType(parameters, object) {
        if (parameters.length < 3) return [400, this.longerThan3];

        let receivedObject = await object.getByType(parameters);

        if (receivedObject.length == 0) return [404, this.notFound];

        return receivedObject;
    }

    static isNanArray(values) {
        let result = true;

        for (let i = 0; i < values.length; i++) {
            result &= isNaN(values[i]) | (values[i] == null);
        }

        return result;
    }
}

module.exports = Helper;
