const moment = require("moment/moment");

const splitFullNameAndCalcAge = (obj) => {
    const [first_name, last_name] = obj.name.split(" ");
    const age = calculateAge(obj.brithday);
    const updatedObj = { ...obj, first_name, last_name, age};
    delete updatedObj.name;
    return(updatedObj);    
}

const calculateAge = (date) => {
    const today = moment();
    const birthDate = date;
    let age = today.diff(birthDate, "years");
    return age;
}

module.exports = {splitFullNameAndCalcAge};