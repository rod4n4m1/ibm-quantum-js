const quantum = require('../Quantum');

const SAMPLE_QOBJ = {
  config: {
    memory: false,
    memory_slots: 2,
    n_qubits: 2,
    parameter_binds: [],
    shots: 1024
  },
  experiments: [
      {
        config: {
          memory_slots: 2,
          n_qubits: 2},
          header: {
            clbit_labels: [['qc', 0], ['qc', 1]],
            creg_sizes: [['qc', 2]],
            memory_slots: 2,
            n_qubits: 2,
            name: 'bell',
            qreg_sizes: [['qr', 2]],
            qubit_labels: [['qr', 0], ['qr', 1]]},
            instructions: [
              { name: 'h', 'qubits': [0]},
              { name: 'cx', 'qubits': [0, 1]},
              { memory: [0], name: 'measure', qubits: [0]},
              { memory: [1], name: 'measure', qubits: [1]}
            ]
        }
  ] ,
  header: {
     backend_name: 'ibmq_qasm_simulator',
     backend_version: '0.4.1'
  },
  qobj_id: '08a043ea-cffd-4b46-a651-9c40e22373ff',
  schema_version: '1.1.0',
  type: 'QASM'
};
const JOB_INFO = {
  allowObjectStorage: true,
  backend: {
    name: 'ibmq_qasm_simulator'
  }
};
const IBMQ_PROC = 'ibmq_armonk';
const USER_ID = '5eb052dffe07ba001938c608';
const USER_JOB_ID = '5ebaf53bf74c8c0012e95601';
const USER_JOB_INFO = {
  id: '5ebaf53bf74c8c0012e95601',
  userId: '5eb052dffe07ba001938c608',
  status: 'COMPLETED'
};
const IBMQ_SIM = {
  name: 'ibmq_qasm_simulator',
  serialNumber: 'ibmq_qasm_simulator',
  status: 'on',
  id: 'ibmq_qasm_simulator',
  topologyId: '5ae875640f02050039315bf6',
  nQubits: 32,
  simulator: true
};

const API_TOKEN = process.env.API_TOKEN;
let token, jobId = null;

test('the result is the user id and authentication token', async () => {
    const data = await quantum.loginWithToken(API_TOKEN);
    token = data.id;
	return expect(data.userId).toBe(USER_ID) && expect(data.id).not.toBeNull();
});

test('the result is this user info', async () => {
    const data = await quantum.getUserInfo(token);
    //console.log(data);
	return expect(data.status).toEqual('Registered');
});

test('the result is a list with all quantum processors', async () => {
    const data = await quantum.getIBMBackends(token);
	return expect(data).toEqual(expect.arrayContaining([ expect.objectContaining(IBMQ_SIM) ]));
});

test('the result is the queue status of an IBM Q processor', async () => {
    const data = await quantum.getIBMBackendQueue(IBMQ_PROC);
	return expect(data.backend_version).not.toBeNull() &&
          expect(data.lengthQueue).toBeGreaterThanOrEqual(0) &&
          expect(data.message).not.toBeNull() &&
          expect(data.status).not.toBeNull() &&
          expect(data.state).not.toBeNull();
});

test('the result is a list of jobs', async () => {
    const data = await quantum.listUserJobs(token);
    //console.log(data);
	return expect(data).toEqual(expect.arrayContaining([ expect.objectContaining(USER_JOB_INFO) ]));
});

//TODO: Create a test case for cancelUserJob()

test('the result is a list of this user experiments', async () => {
    const data = await quantum.getUserExperiments(token,USER_ID,true);
    //console.log(data);
	return expect(data.total).toBeGreaterThanOrEqual(0);
});

test('the result is the job id created', async () => {
    const data = await quantum.postUserJob(token,JOB_INFO,SAMPLE_QOBJ);
    //console.log(data);
    jobId = data;
	return expect(data).not.toBeNull();
});

test('the result is the job results', async () => {
    const data = await quantum.showUserJobResults(token,USER_JOB_ID);
    //console.log(data);
	return expect(data.status).toEqual('COMPLETED');
});
