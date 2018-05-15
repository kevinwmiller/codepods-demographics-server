const incomeReports = require('../apis/incomeReports') ;

exports.get = () => {
    return incomeReports.getIncome();
}



