# MEAN-Money-App
This app helps split money among friends.

It is based on MEAN (MeanJS, ExpressJS, AngularJS, NodeJS) stack.

Basic steps to set up this project are mentioned

* Download the zip file of this repository
* Install mongoDB server (if not installed)
  (url: https://www.mongodb.com/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.4.4-signed.msi/download)
* Open cmd (search "cmd" in start menu)
* In cmd, enter "cd C:\mongodb\bin". Assuming mongoDb is installed in default location.
* In cmd, enter "mongod.exe". This should start the database server
* Install NodeJS (if not installed)
  (url: https://nodejs.org)
* Open another cmd window (search "cmd" in start menu). 
* Go to the "MEAN-Money-App" folder location through cmd. Similar to step 4.
* In cmd, enter "npm install". This will install all dependencies by reading package.json
* In cmd, enter “node server.js”. App is now hosted.
* In browser, enter “localhost:8080”. Enjoy the app! :)
