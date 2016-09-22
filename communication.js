var serialPortLibrary = require("serialport");
var serialPortConstructor = require("serialport").SerialPort;
var events = require("events");
var util = require('util');

/**
 * Represents  a comunication instance between the API and the glove. Provide methods for send and receive data through serial port
 * @module communication
 * @author Rodrigo Monsalve Lagos
 */

/**
 * @function Communication 
 * @description Open the communication with the port and baudrate specified. Emits "open" event on sucessfully communication. Emits "data" event on received data.
 * @param {String} portName Name of the serial port to open a communication
 * @param {Number} baudrate Data rate in bits per second. Use one of these values: 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 28800, 38400, 57600, or 115200
 */

function Communication(portName, baudrate) {
	
	this.serialPort = new serialPortConstructor(portName, {
			baudRate: baudrate,
			parser: serialPortLibrary.parsers.readline("\n")
	}, true);

	var self = this;

	this.serialPort.on("open", function () {

		self.emit("open",'');
		self.serialPort.on('data', function(data){

			self.emit('data', data);

		});
	});

}	

Communication.prototype = new events.EventEmitter;

/**
 * @function getPortNames
 * @description List all active serial ports names.
 * @param {Function} callback An optional callback function with the form function(err, portNames). Portnames is an array with the names of all active serial ports.  
 * @return {Array} If no callback is provided, returns an array with the names of all active serial ports.
 */

Communication.prototype.getPortNames = function(callback) {
    
	serialPortConstructor.list(function (err, ports) {

		var portNames = [];
		if (!err) {
			ports.forEach(function(port) {
				portNames.push(port.comName);	
			});
		}

		if (callback){
			return callback(err, portNames)
		}
		else{
			return portNames;			

		}
	});
};

/**
 * @function write
 * @description Send the string to the serial port
 * @param {data} String data to send
 * @param {Function} callback An optional callback function with the form "function(err)". If no callback is provided, an exception is raised.
 */

Communication.prototype.write = function(data, callback) {

	var self = this;
	if(callback){
		this.serialPort.write(data, callback(err));
	}
	else{
		this.serialPort.write(data);
	}
		
};

/**
 * @function closePort
 * @description Close the active serial communication
 * @param {Function} callback An optional callback function with the form "function(err)". If no callback is provided, an exception is raised.
 */

Communication.prototype.closePort = function(callback) {
	
	if(callback){
		this.serialPort.close(callback(err));
	}
	else{
		this.serialPort.close();
	}
	
};

module.exports = Communication;
