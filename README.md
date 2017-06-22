# DigitizeConsent
Consent form digitization for human subjects research as required by IRB.

Current state of the art requires the study designer to manully draft the consent form, manully send the form out to study participants, and manually pass the data to third party researchers, etc. Nothing is kept tracked of. More importantly, the study designer may be unaware of risks of sharing data with others, and the research scientist who may be analyzing anonymized data may not be aware of the terms of agreement with the participants. To address the issues mentioned above, we create this consent form digitization system to reduce the human effort in generating consent form while keeping track of the agreements when data is shared with third party entities. The consent form generator also prompts the study designer to be aware of the privacy risks exist in the study, and propose protections against those risks. This web service also includes a crowdsourcing component, which allows users to contribute to our database when new inferences/risks are found. There is also a third component, which will come soon, an open database that allow users to search for whatever information they need. 

## Install Node.js, React, Express, Mongodb, and related packages
- Install Node.js
  - Run the command ```node -v``` to check if ```node``` has already been installed. 
  - If not, go to this link https://nodejs.org/en/download/ to get the latest version of ```node```.

- Install ```webpack``` and ```nodemon```
  - Install ```webpack``` globally: ```npm install -g webpack```.
  - Install ```nodemon``` globally: ```npm install -g nodemon```.

- React, Express, Mongodb and all other required packages are outlined in the ```package.json```, and you can simply run ```npm install``` to install those packages.   

## Instruction to Run
- Start Mongodb
  - Go to the Mongodb installation path, ```[MongoPath]/mongodb/bin/```. 
  - Run mongod: ```./mongod```.
- Start React server
  - In the project root directory, run ```nodemon```.
- Start webpack: ```webpack -w```.

