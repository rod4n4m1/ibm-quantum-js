/*
 * Copyright (C) 2020 International Business Machines Corporation and others. All Rights Reserved.
 * The accompanying program is provided under the terms of the IBM public license ("agreement").
 * Written by Rod Anami <rod.anami@br.ibm.com>, May 2020.
 * Contributors: Paco Martin <paco@ibm.com>
*/

const config = require('./Config.js');
const request = require('request'); //TODO: Replace request per other module
const _ = require('underscore');

/**
* @param {String} token
* @returns {Promise<boolean>}
*/
const loginWithToken = async (token) => {
  return new Promise((resolve, reject) => {
    const postOptions = {
      uri: `${config.api}/users/loginWithToken`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'x-qx-client-application': config.headerAppType
      },
      json: {
        apiToken: token
      }
    };
    request(postOptions, function(error, response, body) {
      let result = null;
      if (error || !response) {
          console.log(`Critical: Login: ${error}`);
          reject(error);
      }
      const { statusCode } = response;
      if (statusCode !== 200) {
          console.log("Error: Login failed: ", statusCode, body);
      } else {
          result = _.pick(body, 'id','userId');
          console.log("Info: Login successful ", response.statusCode);
      }
      resolve(result);
    });
  });
}

/**
* @param {String} token
* @returns {Promise<boolean>}
*/
const getIBMBackends = async (token) => {
  return new Promise((resolve, reject) => {
    const getOptions = {
      uri: `${config.api}/Backends?access_token=${token}`,
      method: 'GET',
      headers: {
        'x-qx-client-application': config.headerAppType
      }
    };
    request(getOptions, function(error, response, body) {
      let processors = [];
      if (error || !response) {
          console.log(`Critical: Get Backends: ${error}`);
          reject(error);
      }
      const { statusCode } = response;
      if (statusCode !== 200) {
          console.log("Error: Get Backends failed: ", statusCode, body);
      } else {
          let parsedBody = JSON.parse(body);
          for (let processor of parsedBody) {
            processors.push(_.pick(processor,'name', 'version', 'description', 'serialNumber', 'chipName', 'status', 'id', 'topologyId', 'nQubits', 'simulator'));
          }
          console.log("Info: Get Backends successful ", response.statusCode);
      }
      resolve(processors);
    });
  });
}

/**
* @param {String} processor
* @returns {Promise<boolean>}
*/
const getIBMBackendQueue = async (processor) => {
  return new Promise((resolve, reject) => {
    const getOptions = {
      uri: `${config.api}/Backends/${processor}/queue/status`,
      method: 'GET',
      headers: {
        'x-qx-client-application': config.headerAppType
      }
    };
    request(getOptions, function(error, response, body) {
      let parsedBody = null;
      if (error || !response) {
          console.log(`Critical: Get Backend Queue Status: ${error}`);
          reject(error);
      }
      const { statusCode } = response;
      if (statusCode !== 200) {
          console.log("Error: Get Backend Queue Status failed: ", statusCode, body);
      } else {
          parsedBody = JSON.parse(body);
          console.log("Info: Get Backend Queue Status successful ", response.statusCode);
      }
      resolve(parsedBody);
    });
  });
}

/**
* @param {String} token
* @returns {Promise<boolean>}
*/
const getUserInfo = async (token) => {
  return new Promise((resolve, reject) => {
    const getOptions = {
      uri: `${config.api}/users/me?access_token=${token}`,
      method: 'GET',
      headers: {
        'x-qx-client-application': config.headerAppType,
      }
    };
    request(getOptions, function(error, response, body) {
      let parsedBody = null;
      if (error || !response) {
          console.log(`Critical: Get My User ${error}`);
          reject(error);
      }
      const { statusCode } = response;
      if (statusCode !== 200) {
          console.log("Error: Get My User failed: ", statusCode, body);
      } else {
          parsedBody = JSON.parse(body);
          console.log("Info: Get My User successful ", response.statusCode);
      }
      resolve(parsedBody);
    });
  });
}

/**
* @param {String} token
* @param {String} jobId
* @returns {Promise<boolean>}
*/
const cancelUserJob = async (token, jobId) => {
  return new Promise((resolve, reject) => {
    const postOptions = {
      uri: `${config.api}/Network/${config.hub}/Groups/${config.group}/Projects/${config.project}/Jobs/${jobId}/cancel?access_token=${token}`,
      method: 'POST',
      headers: {
        'x-qx-client-application': config.headerAppType,
      }
    };
    request(postOptions, function(error, response, body) {
      let parsedBody = null;
      if (error || !response) {
          console.log(`Critical: Cancel Job ${error}`);
          reject(error);
      }
      const { statusCode } = response;
      if (statusCode !== 200) {
          console.log("Error: Cancel Job failed: ", statusCode, body);
      } else {
          parsedBody = JSON.parse(body);
          console.log("Info: Cancel Job successful ", response.statusCode);
      }
      resolve(parsedBody);
    });
  });
}

/**
* @param {String} token
* @returns {Promise<boolean>}
*/
const listUserJobs = async (token) => {
  return new Promise((resolve, reject) => {
    const getOptions = {
      uri: `${config.api}/Jobs?access_token=${token}`,
      method: 'GET',
      headers: {
        'x-qx-client-application': config.headerAppType,
      }
    };
    request(getOptions, function(error, response, body) {
      let jobs = [];
      if (error || !response) {
          console.log(`Critical: List Jobs ${error}`);
          reject(error);
      }
      const { statusCode } = response;
      if (statusCode !== 200) {
          console.log("Error: List Jobs failed: ", statusCode, body);
      } else {
          let parsedBody = JSON.parse(body);
          for (let job of parsedBody) {
            jobs.push(_.pick(job,'id', 'userId', 'status'));
          }
          console.log("Info: List Jobs successful ", response.statusCode);
      }
      resolve(jobs);
    });
  });
}

/**
* @param {String} token
* @param {String} userId
* @param {boolean} executions
* @returns {Promise<boolean>}
*/
const getUserExperiments = async (token, userId, executions) => {
  return new Promise((resolve, reject) => {
    const getOptions = {
      uri: `${config.api}/users/${userId}/codes/lastest?access_token=${token}&includeExecutions=${executions}`,
      method: 'GET',
      headers: {
        'x-qx-client-application': config.headerAppType
      }
    };
    request(getOptions, function(error, response, body) {
      let parsedBody = null;
      if (error || !response) {
          console.log(`Critical: ${error}`);
          reject(error);
      }
      const { statusCode } = response;
      if (statusCode !== 200) {
          console.log("Error: Get User Experiments failed: ", statusCode, body);
      } else {
          parsedBody = JSON.parse(body);
          console.log("Info: Get User Experiments successful ", response.statusCode);
      }
      resolve(parsedBody);
    });
  });
}

/**
* @param {String} token
* @param {Object} jobInfo
* @returns {Promise<boolean>}
*/
const createJobObjectStorage = async (token, jobInfo) => {
  return new Promise((resolve, reject) => {
    const postOptions = {
      uri: `${config.api}/Network/${config.hub}/Groups/${config.group}/Projects/${config.project}/Jobs?access_token=${token}`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'x-qx-client-application': config.headerAppType,
      },
      json: jobInfo
    };
    request(postOptions, function(error, response, body) {
      let result = null;
      if (error || !response) {
          console.log(`Critical: ${error}`);
          reject(error);
      }
      const { statusCode } = response;
      if (statusCode !== 200) {
          console.log("Error: Post Job Object failed: ", statusCode, body);
      } else {
          result = _.pick(body, 'id','objectStorageInfo');
          result.uploadQObjectUrl = result.objectStorageInfo.uploadUrl;
          result.jobId = result.id;
          console.log("Info: Post Job Object successful ", response.statusCode);
      }
      resolve(result);
    });
  });
}

/**
* @param {String} token
* @param {String} jobId
* @returns {Promise<boolean>}
*/
const getUploadUrlObjectStorage = async (token, jobId) => {
    return new Promise((resolve, reject) => {
        const getOptions = {
          uri: `${config.api}/Network/${config.hub}/Groups/${config.group}/Projects/${config.project}/Jobs/${jobId}/jobUploadUrl?access_token=${token}`,
          method: 'GET',
          headers: {
          'x-qx-client-application': config.headerAppType,
          }
        };
        request(getOptions, function(error, response, body) {
          let result = null;
          if (error || !response) {
              console.log(`Critical: ${error}`);
              reject(error);
          }
          const { statusCode } = response;
          if (statusCode !== 200) {
              console.log("Error: Get Job URL failed: ", statusCode, body);
          } else {
              result = _.pick(JSON.parse(body), 'url');
              console.log("Info: Get Job URL successful ", response.statusCode);
          }
          resolve(result.url);
        });
    });
}

/**
* @param {String} uploadUrl
* @param {Object} qObject
* @returns {Promise<boolean>}
*/
const uploadJobToObjectStorage = async (uploadUrl, qObject) => {
    return new Promise((resolve, reject) => {
        const putOptions = {
          uri: uploadUrl,
          method: 'PUT',
          headers: {
            'x-qx-client-application': config.headerAppType,
          },
          json: qObject
        };
        request(putOptions, function(error, response, body) {
          if (error || !response) {
              console.log(`Critical: ${error}`);
              reject(error);
          }
          const { statusCode } = response;
          if (statusCode !== 200) {
              console.log("Error: Put Q Object failed: ", statusCode, body);
          } else {
              console.log("Info: Put Q Object successful ", response.statusCode);
          }
          resolve();
        });
    });
}

/**
* @param {String} token
* @param {String} jobId
* @returns {Promise<boolean>}
*/
const notifyQObjectUploaded =  async (token, jobId) => {
    return new Promise((resolve, reject) => {
        const postOptions = {
          uri: `${config.api}/Network/${config.hub}/Groups/${config.group}/Projects/${config.project}/Jobs/${jobId}/jobDataUploaded?access_token=${token}`,
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'x-qx-client-application': config.headerAppType,
          }
        };
        request(postOptions, function(error, response, body) {
          if (error || !response) {
              console.log(`Critical: ${error}`);
              reject(error);
          }
          const { statusCode } = response;
          if (statusCode !== 200) {
              console.log("Error: Job Data Notify failed: ", statusCode, body);
          } else {
              console.log("Info: Job Data Notify successful ", response.statusCode);
          }
          console.log("##########################################");
        });
        resolve();
    });
}

/**
* @param {String} token
* @param {Object} jobInfo
* @param {Object} jobQObject
* @returns {String}
*/
const postUserJob = async function(token, jobInfo, jobQObject) {
    const jobCreatedInfo = await createJobObjectStorage(token, jobInfo);
    const jobId = jobCreatedInfo ? jobCreatedInfo.id : null;
    //console.log(jobId);
    let urlObjectStorage = jobCreatedInfo.uploadQObjectUrl;
    if (!urlObjectStorage) urlObjectStorage = await getUploadUrlObjectStorage(token, jobId);
    //console.log(urlObjectStorage);
    await uploadJobToObjectStorage(urlObjectStorage, jobQObject);
    await notifyQObjectUploaded(token, jobId);
    return jobId;
}

/**
* @param {String} token
* @param {String} jobId
* @returns {Promise<boolean>}
*/
const getResultDownloadUrl = async (token, jobId) => {
    return new Promise((resolve, reject) => {
        const getOptions = {
          uri: `${config.api}/Network/${config.hub}/Groups/${config.group}/Projects/${config.project}/Jobs/${jobId}/resultDownloadUrl?access_token=${token}`,
          method: 'GET',
          headers: {
          'x-qx-client-application': config.headerAppType,
          }
        };
        request(getOptions, function(error, response, body) {
          let result = null;
          if (error || !response) {
              console.log(`Critical: Get Download URL: ${error}`);
              reject(error);
          }
          const { statusCode } = response;
          if (statusCode !== 200) {
              console.log("Error: Get Download URL failed: ", statusCode, body);
          } else {
              result = _.pick(JSON.parse(body), 'url');
              //console.log('result: ', result);
              console.log("Info: Get Download URL successful ", response.statusCode);
          }
          resolve(result? result.url : null);
        });
    });
}

/**
* @param {String} downloadUrl
* @returns {Promise<boolean>}
*/
const getJobResults = async (downloadUrl) => {
    return new Promise((resolve, reject) => {
        const getOptions = {
          uri: downloadUrl,
          method: 'GET',
          headers: {
          'x-qx-client-application': config.headerAppType,
          }
        };
        request(getOptions, function(error, response, body) {
          let parsedBody = null;
          if (error || !response) {
              console.log(`Critical: Get Job Results: ${error}`);
              reject(error);
          }
          const { statusCode } = response;
          if (statusCode !== 200) {
              console.log("Error: Get Job Results failed: ", statusCode, body);
          } else {
              parsedBody = JSON.parse(body);
              console.log("Info: Get Job Results successful ", response.statusCode);
          }
          resolve(parsedBody);
        });
    });
}

/**
* @param {String} token
* @param {String} jobId
* @returns {Object}
*/
const showUserJobResults = async function(token, jobId) {
    let jobResults = null;
    const downloadUrl = await getResultDownloadUrl(token, jobId);
    if (downloadUrl) {
      jobResults = await getJobResults(downloadUrl);
    }
    return jobResults;
}


module.exports = {
          loginWithToken,
          getIBMBackends,
          getIBMBackendQueue,
          getUserInfo,
          getUserExperiments,
          cancelUserJob,
          listUserJobs,
          postUserJob,
          showUserJobResults
}
