Moodle App
=====================

This is a multilanguage moodle app built with ionic, is used to get notifications, reminders. Show assignments info, calendar, chat with participants and teachers, administrative tools and more.
## Features

This repository was built with the following technologies:

  - Ionic v1
	- Angular
  - AngularUI Router
  - Jasmine

## Install environment
First of all you must install nvm (Node Version Manager), it's important if you are using a different versions of node.js.

### Install Node.js

	nvm install 0.12.15
	nvm use 0.12.15

### Install ionic

	npm cache clean
	npm install -g cordova ionic

### Install npm required packages

	sudo npm install -g bower
	sudo npm install -g gulp

### Clone project

	git clone https://github.com/migueref/moodle-app.git
	cd moodle-app

### Install the npm plugin dependencies

	npm install

## Build App
Install the platforms. It's important to use these versions because newer versions are going to cause some problems with the plugins installed.

	ionic platform add android@5.1.1
	ionic platform add ios@4.1.0

### Run the following command to install the platforms and all the required Cordova plugins

	ionic state restore

### Install bower

	bower install

### Run gulp's default task

	gulp

### Open app in browser

	ionic serve

### Run app for android
	cordova build android

## Connect with me

Linkedin https://www.linkedin.com/in/migueref
