import jwt_decode from "jwt-decode";
import moment from "moment";

export function validateJwtExpiryDateIsExpired(value) {
  console.log("tokenUtils::validateJwtExpiryDateIsExpired::" + value);
  var expired = true;
  try {
    var decoded = jwt_decode(value);
    console.log("tokenUtils::validateJwtExpiryDateIsExpired::decoded::" + decoded.exp);
    var isBefore = moment(decoded.exp).isBefore(); 
    console.log("tokenUtils::validateJwtExpiryDateIsExpired::isBefore::" + isBefore);
    expired = isBefore;
  } catch (e) {
    console.log(e);
  }
  return expired;
}
