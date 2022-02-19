class Helper {

    static notANumber = "Parameter must be a number";
    static largerThanZero = "Parameter must be larger than 0";
    static longerThan = "Parameter must be longer than:";
    static notFound = "No results matching to given Parameters could be found";
    static notAllProperties = "Not all properties given";
    static mustBeString = "Parameter must be String";

  static hasOwnProperties(object, properties) {
    let result = true;
    for (let i = 0; i < properties.length; i++) {
      if (!object.hasOwnProperty(properties[i])) result = false;
    }
    return result;
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
