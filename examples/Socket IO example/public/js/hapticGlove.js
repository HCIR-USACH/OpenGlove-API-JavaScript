function HapticGlove(socket,id){

	this.id = id;
	this.socket = socket;

	this.openPort = function(portName, baudRate){
		this.socket.emit('openPortClient',
			{
				id: this.id,
				portName: portName,
				baudRate: baudRate
			}
		);
	}

	this.getPortNames = function(){
		this.socket.emit('getPortNamesClient',{id : this.id});
	}

	this.write = function(data){
		this.socket.emit('writeClient',
			{
				id: this.id, 
				data: data
			}
		);
	}

	this.closePort = function(){
		this.socket.emit('closePortClient',{id : this.id});
	}

	this.initializeMotor = function(pins) {
    	this.socket.emit('initializeMotorClient',
			{
				id: this.id, 
				pins: pins
			}
		);
  	}

  	this.activateMotor = function(pins,values) {
  		this.socket.emit('activateMotorClient',
			{
				id: this.id, 
				pins: pins,
				values: values
			}
		);
  	}

	this.analogRead = function(pin) {
		this.socket.emit('analogReadClient',
			{
				id: this.id, 
				pins: pins
			}
		);
	}

  	this.digitalRead = function(pin) {
    	this.socket.emit('digitalReadClient',
			{
				id: this.id, 
				pin: pin
			}
		);
    }

  	this.pinMode = function(pins, modes) {
    	this.socket.emit('pinModeClient',
			{
				id: this.id, 
				pins: pins,
				modes: modes
			}
		);
  	}

  	this.digitalWrite = function(pins, values) {
  		this.socket.emit('digitalWriteClient',
			{
				id: this.id, 
				pins: pins,
				values: values
			}
		);
	}
   
  	this.analogWrite = function(pins,values) {
  		this.socket.emit('analogWriteClient',
			{
				id: this.id, 
				pins: pins,
				values: values
			}
		);
	}
 
}