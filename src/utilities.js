const allowedMethods = new Set(['GET', 'POST']);

/**
 * @param {'GET'|'POST'|'PUT'|'DELETE'|'INVALID'} method
 */
const makeRequest = (method) => (
  fetch('http://localhost', { method })
    .then((res) => { console.log(`${method}: ${res.status}`); })
);

const makeRequests = () => {
  Promise.all([
    makeRequest('GET'),
    makeRequest('POST'),
    makeRequest('PUT'),
    makeRequest('DELETE'),
    makeRequest('INVALID'),
  ]).then(() => {
    console.log('Completed.');
  });
};

module.exports = { allowedMethods, makeRequests };
