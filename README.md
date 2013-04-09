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

The application consists of a Node.js based server that accepts orders for buying and selling stocks and 'places' them in the market.

* The server may break a large order in to smaller chunks called 'placements' and push them to the market at different times.
* A large order may not get filled in one shot, it may require several 'executions' to fill (depending on the supply and demand).
* The user can cancel an order at any time - this cancels the unexecuted portion of the order only.
* The server keeps the client informed about order progress using messages over WebSockets.

The server part is fully coded. You only need to code the client part providing the following functionality:

* Allow the user to place orders.
* Allow the user to cancel orders.
* Display the progress of orders in a table that is updated in real time. Listen to WebSocket messages from the server to implement this.
* Bonus points: In addition to the table, implement some sort of a creative visualization to display the same information.

The screen shot below can be used to guide your front-end implementation:

--- Place screenshot here ---


## Build Instructions

### Install Build Tools
* Install [Git](https://help.github.com/articles/set-up-git).
* Install [Node.js](http://nodejs.org/).
* Install [Grunt](https://github.com/gruntjs/grunt/wiki/Getting-started).

    $ npm install -g grunt-cli
* Install [Ruby](http://rubyinstaller.org/downloads/). (required for compass/sass)
* Install [Compass](http://compass-style.org/install/) (used for CSS authoring).

    $ gem install compass

### Build Trader Desktop
* Open Git Bash (the command line tool for git) and change directory to the location where you keep your development projects. For example, C:\Projects.
* Clone the Trader Desktop project from the master repository at Github. (Optionally, you could first fork the master repository and then clone your fork instead.)

    $ git clone https://github.com/archfirst/trader-desktop.git
* Change your directory in Git Bash to your local Trader Desktop repository:

    $ cd trader-desktop
* Install Grunt plugins:

    $ npm install
* Execute the following command to build Trader Desktop:

    $ grunt
* Start the server using the following command:

    $ node server/server.js
* Start Trader Desktop by pointing your browser to http://localhost:8080. You should see the Login page.

## Server API