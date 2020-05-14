# IBM Quantum JS
<img alt="David" src="https://img.shields.io/david/aromerohcr/ibm-quantum-js">
<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/aromerohcr/ibm-quantum-js">
<img alt="npm" src="https://img.shields.io/npm/dm/ibm-quantum-js">
<img alt="NPM" src="https://img.shields.io/npm/l/ibm-quantum-js">
<img alt="GitHub contributors" src="https://img.shields.io/github/contributors/aromerohcr/ibm-quantum-js">

This module provides a set of functions to help **JavaScript** Developers working on IBM Q Experience projects to authenticate and access API endpoints using Javascript promises.

## Requirements (MacOS/Windows)

* Node 10.x / npm v6.x
* Standard account on IBM Quantum Experience portal

**Note:** Depending on your Windows setup [windows-build-tools](https://www.npmjs.com/package/windows-build-tools) may need to be installed first. Also, for MacOS users, you should have **xcode-select** or entire Xcode App installed.

### Install

```shell
$ npm install ibm-quantum-js
```

### Uninstall

```shell
$ npm uninstall ibm-quantum-js
```

### Change Log

* `0.1.1`
  * First working module


### Usage

Perform a login on IBM Q Experience API with API_TOKEN and get a valid auth token:

```javascript

const quantum = require('ibm-quantum-js');

const token = await quantum.loginWithToken(API_TOKEN);

```

**Note:** API_TOKEN is created after you validate your IBM Q Experience user ID. You can find it under "My Account" in the IBM Q Experience web [site](https://quantum-computing.ibm.com/account).


Define a function to return user information from IBM Q:

```javascript
const quantum = require('ibm-quantum-js');

const userInformation = function(token) {
  return quantum.getUserInfo(token).then(function(result){
    return result;
  }).catch(function(error){
    return error;
  });
};

```

Get IBM Q backends (processors):

```javascript

const backends = await quantum.getIBMBackends(token);

```

Get IBM Q backend queue status:

```javascript

const processor = backends[0].name || 'ibmq_qasm_simulator';

const queueStatus = await quantum.getIBMBackendQueue(processor);

```

Get user experiments from IBM Q:

```javascript

const userExperiments = await quantum.getUserExperiments(token);

```

List user jobs in the IBM Q:

```javascript

const userExperiments = await quantum.listUserJobs(token);

```

Cancel an user job in the IBM Q:

```javascript

const userExperiments = await quantum.cancelUserJob(token, jobId);

```

Execute a new user job in the IBM Q:

```javascript

const token = await quantum.loginWithToken(API_TOKEN);

const userExperiments = await quantum.postUserJob(token, jobInfo, jobQObject);

```
**Note:** `jobQObject` is JSON object resulted from a compiled QASM (Quantum Assembly) code. `jobInfo` indicates which backend/processor to use.</p>

```javascript

const JOB_INFO = {
  allowObjectStorage: true,
  backend: {
    name: 'ibmq_qasm_simulator'
  }
};

```


Show the results of a COMPLETED user job in the IBM Q:

```javascript

const token = await quantum.loginWithToken(API_TOKEN);

const userExperiments = await quantum.showUserJobResults(token, jobId);

```

### List of functions available

* `loginWithToken(API_TOKEN)`
* `getIBMBackends(token)`
* `getIBMBackendQueue(processor)`
* `getUserInfo(token)`
* `getUserExperiments(token)`
* `cancelUserJob(token, jobId)`
* `listUserJobs(token)`
* `postUserJob(token, jobInfo, jobQObject)`
* `showUserJobResults(token, jobId)`


### QObject versus QASM

  * Unfortunately there's no available API to compile a QASM into a QOBJ, however its JSON schema is published [here](https://github.com/Qiskit/qiskit-terra/blob/master/qiskit/schemas/qobj_schema.json).


### Contributing
If you want to contribute to the module and make it better, your help is very welcome. You can do so submitting a **Pull Request**.

### Authors
Written by Rod Anami <rod.anami@br.ibm.com>, May 2020.
Contributor(s): Paco Martin <paco@ibm.com>

### License
This project is licensed under the IBM Public License.

Copyright (c) 2020 IBM
