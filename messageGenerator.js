/**
 * Provide methods to generate communication message with the glove, following the OpenGlove communication protocol
 * @module messageGenerator
 * @author Rodrigo Monsalve Lagos
 */

module.exports = function MessageGenerator() {

  const SEPARATOR = ",";
  const TERMINAL = "s";
  const INITIALIZE_MOTOR_FUNCTION_NUMBER = "1";
  const ACTIVATE_MOTOR_FUNCTION_NUMBER = "2";
  const ANALOG_READ_FUNCTION_NUMBER = "3";
  const DIGITAL_READ_FUNCTION_NUMBER = "4";
  const INITIALIZE_DIGITAL_INPUT_FUNCTION_NUMBER = "5";
  const PIN_MODE_FUNCTION_NUMBER = "6";
  const DIGITAL_WRITE_FUNCTION_NUMBER = "7";
  const ANALOG_WRITE_FUNCTION_NUMBER = "8";
  const DIGITAL_HIGH = "HIGH";
  const DIGITAL_HIGH_NUMBER = "-1";
  const DIGITAL_LOW = "LOW";
  const DIGITAL_LOW_NUMBER = "-2";
  const ANALOG_MINIMUM = 0;
  const ANALOG_MAXIMUM = 255;
  const INPUT_MODE = "INPUT";
  const INPUT_MODE_NUMBER = "1";
  const OUTPUT_MODE = "OUTPUT";
  const OUTPUT_MODE_NUMBER = "2";
  const DIGITAL_WRITE_HIGH = "HIGH";
  const DIGITAL_WRITE_HIGH_NUMBER = "1";
  const DIGITAL_WRITE_LOW = "LOW"
  const DIGITAL_WRITE_LOW_NUMBER = "0";

  /**
   * @function initializeMotor
   * @description Generate a message to initialize pins like motors in the control software
   * @param {Array} pins List of pins that are initialized
   * @return {String} A string with the "initializeMotor" format specified in the OpenGlove communication protocol
   */

  this.initializeMotor = function(pins) {
    
  	if (pins.length == 0 ) {
  		throw new Error("Array must have at least one element");
  	}

  	var message = [INITIALIZE_MOTOR_FUNCTION_NUMBER, pins.length];

  	for	(i = 0; i < pins.length; i++) {

  		if (isNaN(pins[i])) {
  			throw new Error("Invalid pin " + pins[i]);
  		}

  		message.push(pins[i]);
    }

    message = message.join(SEPARATOR);
  	message = message + TERMINAL;
  	return message;

  };

  /**
   * @function activateMotor
   * @description Generate a message to activate motors. Each motor is activated with the value in the same index
   * @param {Array} pins List of pins where are connected the motors
   * @param {values} List with the intensities to activate the motors. It can be "HIGH" or "LOW" in digital mode or a number bewteen 0 and 255 in analog mode
   * @return {String} A string with the "activateMotor" format specified in the OpenGlove communication protocol
   */

  this.activateMotor = function(pins,values) {

  	if (pins.length == 0 || pins.values == 0){
  		throw new Error("Arrays must have at least one element");
  	}

  	if (pins.length != values.length){
  		throw new Error("Arrays length must be equal");
  	}

  	var message = [ACTIVATE_MOTOR_FUNCTION_NUMBER, pins.length];

  	for	(i = 0; i < pins.length; i++) {

  		if (isNaN(pins[i])) {
  			throw new Error("Invalid pin " + pins[i]);
  		}

  		if (values[i] === DIGITAL_HIGH) {
  			message.push(pins[i]);
  			message.push(DIGITAL_HIGH_NUMBER);

  		} else if (values[i] === DIGITAL_LOW) {
  			message.push(pins[i]);
  			message.push(DIGITAL_LOW_NUMBER);

  		} else {
  			var valueInt = parseInt(values[i]);
  			if (isNaN(valueInt)){
  				throw new Error("Invalid value " + values[i]);

  			}	else{
				if ((valueInt <= ANALOG_MAXIMUM) && (valueInt >= ANALOG_MINIMUM)){
					message.push(pins[i]);
  					message.push(valueInt);			
				} else{
					throw new Error("Numeric values must be between 0 and 255, found " + values[i]);
				}
  			}
  		}

    }

  	message = message.join(SEPARATOR);
    message = message + TERMINAL;
    return message;
      
  };

  /**
   * @function analogRead
   * @description Generate a message to read from an analog pin
   * @param {Number} pin Number of the pin to be readed
   * @return {String} A string with the "analogRead" format specified in the OpenGlove communication protocol
   */

  this.analogRead = function(pin) {

  	if (isNaN(pin)) {
  		throw new Error("Invalid pin " + pin);
  	}
    var message = [ANALOG_READ_FUNCTION_NUMBER, pin];
    message = message.join(SEPARATOR);
    message = message + TERMINAL;
    return message;

  };

  /**
   * Generate a message to read from a digital pin
   * @param {Number} pin Number of the pin to be readed
   * @return {String} A string with the "digitalRead" format specified in the OpenGlove communication protocol
   */

  this.digitalRead = function(pin) {
    
    if (isNaN(pin)) {
  		throw new Error("Invalid pin " + pin);
  	}
    var message = [DIGITAL_READ_FUNCTION_NUMBER, pin];
    message = message.join(SEPARATOR);
    message = message + TERMINAL;
    return message;
  };

  /**
   * Generate a message to initialize a pin in input or output mode. Each pin is initialized with the mode in the same index
   * @param {Array} pins Array with the numbers of the pins to be initialized
   * @param {Array} modes Array with the modes to initialize the pins, it can be "INPUT" or "OUTPUT"
   * @return {String} A string with the "pinMode" format specified in the OpenGlove communication protocol
   */

  this.pinMode = function(pins, modes) {
    
    if (pins.length == 0 || pins.modes == 0){
  		throw new Error("Arrays must have at least one element");
  	}
  	if (pins.length != modes.length){
  		throw new Error("Arrays length must be equal");
  	}
  	var message = [PIN_MODE_FUNCTION_NUMBER, pins.length];

  	for	(i = 0; i < pins.length; i++) {

  		if (isNaN(pins[i])) {
  			throw new Error("Invalid pin " + pin);
  		}

  		if(modes[i] === INPUT_MODE) {
  			message.push(pins[i]);
  			message.push(INPUT_MODE_NUMBER);

  		} else if(modes[i] === OUTPUT_MODE){
  			message.push(pins[i]);
  			message.push(OUTPUT_MODE_NUMBER);
  		}

  		else{
  			throw new Error(modes[i] + " is not a valid pin mode");
  		}
  	}

  	message = message.join(SEPARATOR);
    message = message + TERMINAL;
    return message;

  };

  /**
   * Generate a message to write a value in a digital pin. Each pin is write with the value in the same index
   * @param {Array} pins Array with the numbers of the pins to be writed
   * @param {Array} values Array with the values to be write in the pins, it can be "HIGH" or "LOW"
   * @return {String} A string with the "digitalWrite" format specified in the OpenGlove communication protocol
   */

  this.digitalWrite = function(pins, values) {
    
    if (pins.length == 0 || pins.values == 0){
  		throw new Error("Arrays must have at least one element");
  	}
  	if (pins.length != values.length){
  		throw new Error("Arrays length must be equal");
  	}
  	var message = [DIGITAL_WRITE_FUNCTION_NUMBER, pins.length];

  	for	(i = 0; i < pins.length; i++) {

  		if (isNaN(pins[i])) {
  			throw new Error("Invalid pin " + pin);
  		}

  		if(values[i] === DIGITAL_WRITE_LOW) {
  			message.push(pins[i]);
  			message.push(DIGITAL_WRITE_LOW_NUMBER);

  		} else if(values[i] === DIGITAL_WRITE_HIGH){
  			message.push(pins[i]);
  			message.push(DIGITAL_WRITE_HIGH_NUMBER);
  		}

  		else{
  			throw new Error(values[i] + " is not a valid pin mode");
  		}
  	}

  	message = message.join(SEPARATOR);
    message = message + TERMINAL;
    return message;

  };

  /**
   * Generate a message to write a PWM value in a digital pin.  Each pin is write with the value in the same index
   * @param {Array} pins Array with the numbers of the pins to be writed
   * @param {Array} values Array with the values to be write in the pins, it can be from 0 to 255
   * @return {String} A string with the "analogWrite" format specified in the OpenGlove communication protocol
   */

  this.analogWrite = function(pins,values) {
    
    if (pins.length == 0 || pins.values == 0){
  		throw new Error("Arrays must have at least one element");
  	}
  	if (pins.length != values.length){
  		throw new Error("Arrays length must be equal");
  	}
  	var message = [ANALOG_WRITE_FUNCTION_NUMBER, pins.length];

  	for	(i = 0; i < pins.length; i++) {

  		if (isNaN(pins[i])) {
  			throw new Error("Invalid pin " + pin);
  		}

  		var valueInt = parseInt(values[i]);
		if (isNaN(intValue)){
			throw new Error("Invalid value " + values[i]);
		}

		message.push(pins[i]);
		message.push(intValue);

  	}

  	message = message.join(SEPARATOR);
    message = message + TERMINAL;
    return message;

  };

 
}