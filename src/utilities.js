const allowedMethods = ['GET', 'POST'];
const isAllowedMethod = (method) => allowedMethods.includes(method);

module.exports = { isAllowedMethod };
