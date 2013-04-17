# Trader Desktop

This is an exercise in learning key web technologies using a simple trading scenario. We will use the following technologies and frameworks to complete this exercise:

* Node.js
* Socket.IO
* jQuery
* Backbone.js
* RequireJS
* Keel
* Handlebars
* Sass/Compass

The application consists of a Node.js based server that accepts orders for trading stocks and 'places' the orders in the market.

* The server may break a large order in to smaller chunks called 'placements' and push them to the market at different times.
* A large order may not get filled in one shot, it may require several 'executions' to fill (depending on the supply and demand).
* The server keeps the client informed about order progress by sending events over WebSockets.

# Requirements

The server part is fully coded. You only need to code the client part providing the following functionality:

* Allow the user to place orders.
* Display the progress of orders in a table that is updated in real time. Listen to WebSocket messages from the server to implement this. If you have the Trader Desktop open in multiple browsers, they should all show the same information.
* Bonus points: In addition to the table, implement a creative visualization to display the same information.

In order to help with debugging, also implement the following two functions:

* Allow the user to delete all orders on the server.
* Allow the user to "refresh" the desktop. This should drop all orders from the client and get a fresh copy from the server.

The screen shot below can be used to guide your front-end implementation:

![Trader Desktop](https://raw.github.com/archfirst/trader-desktop/master/docs/trader-desktop.png)

For the purpose of this exercise, the trade button could pop up a dialog box asking for the number of trades to create. You can then just create that many trades using random symbols, quantities etc.

![Trade Dialog](https://raw.github.com/archfirst/trader-desktop/master/docs/trade-dialog.png)

## Build Instructions

### Install Build Tools
* Install [Node.js](http://nodejs.org/).
* Install [Grunt](https://github.com/gruntjs/grunt/wiki/Getting-started).

    $ npm install -g grunt-cli
* Install [Ruby](http://rubyinstaller.org/downloads/). (required for compass/sass)
* Install [Compass](http://compass-style.org/install/) (used for CSS authoring).

    $ gem install compass

### Build Trader Desktop
* Download the Trader Desktop repository as a zip file by clicking the ZIP icon on the [repository home page](https://github.com/archfirst/trader-desktop).
* Unzip the repository at a convenient location on your hard drive.
* Open a command shell and change your directory to your local Trader Desktop repository.
* Install Grunt plugins:

    $ npm install
* Execute the following command to build Trader Desktop:

    $ grunt
* Start the server using the following command:

    $ node server/server.js
* Start Trader Desktop by pointing your browser to [http://localhost:8080](http://localhost:8080). You should see the Login page.

## Server RESTful API
The server exposes three resources through a RESTful API: Users, Instruments and Orders. These resources are described below.

### Users

#### Get Users
Returns all Trader Desktop users. Assume all these users are traders.

##### Request
    GET http://localhost:8080/rest/users HTTP/1.1

##### Response
    HTTP/1.1 200 OK
    Content-Type: application/json

    [
      {
        "id": "AM",
        "name": "Amadeus Mozart"
      },
      {
        "id": "AR",
        "name": "A. R. Rahman"
      },
      ...
    ]

### Instruments

#### Get Instruments
Returns all instruments traded at the exchange.

##### Request
    GET http://localhost:8080/rest/instruments HTTP/1.1

##### Response
    HTTP/1.1 200 OK
    Content-Type: application/json

    [
      {
        "symbol": "AAPL",
        "name": "Apple Inc.",
        "lastTrade": 98.7
      },
      {
        "symbol": "ADBE",
        "name": "Adobe Systems Inc.",
        "lastTrade": 13.13
      },
      ...
    ]

### Orders
An order object has the following properties:

    id: int
    creationTime: date,
    side: 'Buy' | 'Sell'
    symbol: String
    quantity: int
    quantityPlaced: int
    quantityExecuted: int
    limitPrice: float
    priority: int  [1 (Low) - 100 (High)]
    status: 'New' | 'Placed' | 'Filled'
    traderId: String

#### Get Orders
Returns all orders saved on the server.

##### Request
    GET http://localhost:8080/rest/orders HTTP/1.1

##### Response
    HTTP/1.1 200 OK
    Content-Type: application/json

    [
      {
        "id": 78,
        "creationTime": "2013-04-16T22:41:51.380Z",
        "side": "Buy",
        "symbol": "DIS",
        "quantity": 983444,
        "quantityPlaced": 983444,
        "quantityExecuted": 983444,
        "limitPrice": 31.46,
        "priority": 50,
        "status": "Executed",
        "traderId": "AM"
      },
      ...
    ]

#### Create Order
Creates an order on the server.

##### Request
    POST http://localhost:8080/rest/orders HTTP/1.1
    Content-Type: application/json

    {
        "side": "Buy",
        "symbol": "AAPL",
        "quantity": 10000,
        "limitPrice": 426.24,
        "traderId": "AM"
    }

##### Response
    HTTP/1.1 201 Created
    Content-Type: application/json

    {
      "id": 10,
      "creationTime": "2013-04-17T00:01:18.000Z",
      "side": "Buy",
      "symbol": "AAPL",
      "quantity": 10000,
      "quantityPlaced": 0,
      "quantityExecuted": 0,
      "limitPrice": 426.24,
      "priority": 50,
      "status": "New",
      "traderId": "AM"
    }

#### Delete All Orders
Deletes all orders on the server.

##### Request
    DELETE http://localhost:8080/rest/orders HTTP/1.1

##### Response
    HTTP/1.1 200 OK

## Server Events

The server sends the following events over WebSockets.

#### orderCreatedEvent
The payload contains the order that was created.

#### placementCreatedEvent
The payload contains an object with the following properties:

    orderId: int
    quantityPlaced: int
    status: 'New' | 'Placed' | 'Filled'

#### executionCreatedEvent
The payload contains an object with the following properties:

    orderId: int
    quantityExecuted: int
    executionPrice: float
    status: 'New' | 'Placed' | 'Filled'

#### allOrdersDeletedEvent
This event is sent when all orders on the server are deleted.