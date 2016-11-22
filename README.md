# bci2k.js

> A javascript connector for BCI2000

[![NPM Version][npm-image]][npm-url]

## Install

```bash
npm install --save bci2k
```

## Usage

### Connect to BCI2000

```js
var bci2k = require( 'bci2k' );
var connection = bci2k.Connection();

connection.onconnect = function( event ) {
    console.log( 'Yay!' );  
};

connection.connect( '127.0.0.1' );
```

### Execute system commands

```js
connection.execute( 'Get System State', function( result ) {
    console.log( 'System state is ' + result );
} );

connection.resetSystem(); // === connection.execute( 'Reset System' );
```

### Tap data from part of the signal processing chain

```js
var dataConnection = null;

// Tap into the raw signal
connection.tap( 'Source', function( dataConnection ) {
    
    dataConnection.onSignalProperties = function( properties ) {
        console.log( 'Recording from channels: ' + properties.channels );
    };

    dataConnection.onGenericSignal = function( signal ) {
        if ( signal.length > 0 ) {
            console.log( 'Got one sample block of data with ' + signal.length + ' channels and ' + signal[0].length + ' samples.' );
        }
    };

    dataConnection.onStateVector = function( stateVector ) {
        console.log( 'Current stimulus code: ' + stateVector['StimulusCode'] );
    };

} );

```

### And more!


## License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://img.shields.io/npm/v/live-xxx.svg
[npm-url]: https://npmjs.org/package/bci2k
