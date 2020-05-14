<h1> IBM Quantum JS </h1>
<img alt="David" src="https://img.shields.io/david/aromerohcr/ibm-quantum-js">
<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/aromerohcr/ibm-quantum-js">
<img alt="npm" src="https://img.shields.io/npm/dm/ibm-quantum-js">
<img alt="NPM" src="https://img.shields.io/npm/l/ibm-quantum-js">
<img alt="GitHub contributors" src="https://img.shields.io/github/contributors/aromerohcr/ibm-quantum-js">

<p> This module provides a set of functions to help <b>JavaScript</b> Developers working on IBM Q Experience projects to authenticate and access API endpoints using Javascript promises.</p>

<h3>Requirements (MacOS/Windows)</h3>

* Node 10.x / npm v6.x

<b>Note:</b> Depending on your Windows setup <a href="https://www.npmjs.com/package/windows-build-tools">windows-build-tools</a> may need to be installed first. Also, for MacOS users, you should have xcode-select or entire Xcode App installed.

<h3> Install </h3>

```shell
$ npm install ibm-quantum-js
```

<h3> Uninstall </h3>

```shell
$ npm uninstall ibm-quantum-js
```

<h3> Change Log </h3>

* `0.1.1`
  * First working module


<h3> Usage </h3>

<p> Perform a login with API_TOKEN and get a valid auth token: </p>

```javascript

const quantum = require('ibm-quantum-js');

const token = await quantum.loginWithToken(API_TOKEN);

```
<p> *Note:* API_TOKEN is created after you validate IBM Q Experience user ID. You can find it under "My Account" in the IBM Q Experience web [site](https://quantum-computing.ibm.com/account).</p>

<p> Get user information: </p>

```javascript

const token = await quantum.loginWithToken(API_TOKEN);

const userInfo = await quantum.getUserInfo(token);

```

<p> Get IBM Quantum backends(processors): </p>

```javascript

const token = await quantum.loginWithToken(API_TOKEN);

const backends = await quantum.getIBMBackends(token);

```

<p> Get IBM Quantum backend queue status: </p>

```javascript

const processor = backends[0].name || 'ibmq_qasm_simulator';

const queueStatus = await quantum.getIBMBackendQueue(processor);

```

<p> Get user experiments on IBM Q: </p>

```javascript

const token = await quantum.loginWithToken(API_TOKEN);

const userExperiments = await quantum.getUserExperiments(token);

```

<p> List user jobs on IBM Q: </p>

```javascript

const token = await quantum.loginWithToken(API_TOKEN);

const userExperiments = await quantum.listUserJobs(token);

```

<p> Cancel an user job in the IBM Q: </p>

```javascript

const token = await quantum.loginWithToken(API_TOKEN);

const userExperiments = await quantum.cancelUserJob(token, jobId);

```

<p> Execute a new user job in the IBM Q: </p>

```javascript

const token = await quantum.loginWithToken(API_TOKEN);

const userExperiments = await quantum.postUserJob(token, jobInfo, jobQObject);

```
<p> *Note:* `jobQObject` is JSON object from a compiled QASM (Quantum Assembly) code. `jobInfo` indicates which processor to use.</p>

```javascript

const JOB_INFO = {
  allowObjectStorage: true,
  backend: {
    name: 'ibmq_qasm_simulator'
  }
};

```


<p> Show the results of a COMPLETED user job in the IBM Q: </p>

```javascript

const token = await quantum.loginWithToken(API_TOKEN);

const userExperiments = await quantum.showUserJobResults(token, jobId);

```

<h3> List of functions available </h3>

* `loginWithToken(API_TOKEN)`
* `getIBMBackends(token)`
* `getIBMBackendQueue(processor)`
* `getUserInfo(token)`
* `getUserExperiments(token)`
* `cancelUserJob(token, jobId)`
* `listUserJobs(token)`
* `postUserJob(token, jobInfo, jobQObject)`
* `showUserJobResults(token, jobId)`


<h3> QObject versus QASM </h3>
<ul>
  <li>Unfortunately there's no available API to compile a QASM into QOBJ, however its JSON schema is published here.</li>
</ul>

<h3> Contributing </h3>
If you want to contribute to the module and make it better, your help is very welcome. You can do so submitting a <b>Pull Request</b>.

<h3> Authors </h3>
Written by Rod Anami <rod.anami@br.ibm.com>, May 2020.
Contributors: Paco Martin <paco@ibm.com>

<h3> License </h3>
This project is licensed under the IBM Public License.
Copyright (c) 2020 IBM
