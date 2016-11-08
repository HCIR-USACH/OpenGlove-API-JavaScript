# OpenGlove-API-JavaScript

## Example
```javascript
var openGlove = require('../OpenGlove/glove');
var glove = new openGlove();
var pins = [10,12];
var valuesON = ["HIGH","LOW"];
var valuesOFF = ["LOW", "LOW"];

glove.openPort("COM3",9600);

glove.on("open",function(){
	
	glove.initializeMotor(pins);		
	glove.activateMotor(pins, valuesON);

});

```
