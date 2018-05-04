/**
	API wrapper for chosen data.gov income source

	@exports IncomeModel
	@file Manages income data obtained from chosen income API
	
	@typedef	{Object} IncomeDetails
	@property	{string} name of the county the income applies to
	@property	{string} most recent income for the given county
 */
 
 const axios = require('axios') ;
 const moment = require('moment') ;
 
 const URL = 'https://data.maryland.gov/api/views/nv7y-8663'
 
 
 /**
 *	@class	IncomeReports (name)
 */
 class IncomeReports
 {
	 /**
	 *	Requests income data for a given county from the chosen income API from data.gov. 
	 *	
	 *	@param	{string}	countyName	Name of the county the annual income applies to
	 *	@param	{string}	annIncome	Annual income value that applies to the given county
	 *	@return	{IncomeDetails[]} 		List of objects containing county location and recent annual income	
	 */
	 async fetchIncomeData(countyName , annIncome , incomes = [])
	 {
		 const response = await axios.get(URL) ;
		 let aggregatedIncomes = incomes ;
		 
		 
		 
		 
	 }
	 
	 /**
	 *	Requests income data for a given county from the chosen income API from data.gov. 
	 *	
	 *	@param	{string}	countyName	Name of the county the annual income applies to
	 *	@param	{string}	annIncome	Annual income value that applies to the given county
	 *	@return	{IncomeDetails[]} 		List of objects containing county location and recent annual income	
	 */
	 async getIncomes(countyName , annIncome)
	 {
		 try {
			 return await this.fetchIncomeData(moment(countyName) , moment(annIncome)) ;
		 } catch (err) {
			 return { error: err } ;
		 }
	 }
 }
 
 module.exports = new IncomeReports() ;
 
 