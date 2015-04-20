console.log("enter test")

var webdriverFactoryModule = require('../../../utility/webdriverFactory.js');
var tprUsecaseModule = require('../tprUseCase.js');
var browserUtilityModule = require("../../../utility/browserUtility.js");

var webdriverClient = webdriverFactoryModule.webdriverFactory.createWebdriverClientFor("chrome");
var tprUseCase = tprUsecaseModule.tprUseCase;
var browserUtility = browserUtilityModule.browserUtility;

var tprUser = "spyle";
var tprPass = "Lem1ller";
var tprSec = "ellen";
var url = "https://dev-logins.interthinx.com/adfs/ls/?wa=wsignin1.0&wtrealm=https%3a%2f%2fwww.dev-fraudguard.com%2fSysdome2010%2f&wctx=rm%3d0%26id%3dpassive%26ru%3d%252fSysdome2010%252f&wct=2015-03-26T18%3a56%3a43Z";

tprUseCase.loginAs(webdriverClient,tprUser,tprPass, tprSec, url).then(function(newWebdriverClient){

	newWebdriverClient.findElements({name:'reviewtypelevelid'}).then(function(elements){
		for(var elementId in elements){

			elements[elementId].getAttribute("value").then(function(attributeValue){
				console.log(attributeValue)
				if(attributeValue == "2"){

					elements[elementId].click().then(function(){
								var brokerData = {
										fName : "FIRSTNAMEMOCK5",
										lName: "LASTNAMEMOCK5",
										mName: "D",
										address : "14702 OTSEGO ST 4",
										city : "SHERMAN OAKS",
										zip : "91403",
										state: "CA",
										ssna: "988",
										ssnb: "66",
										ssnc: "123"
										}

					tprUseCase.fillOutIndividualBroker(newWebdriverClient,brokerData).then(function(currentWebdriverClient){
														
					tprUseCase.printTprOrderNumber(currentWebdriverClient);		

					}, function(error){
						console.log("log: error"  +error);

					});

					})

				}

			})
		}

	})
	


});



