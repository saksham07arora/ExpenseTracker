const { ConfidentialClientApplication } = require('@azure/msal-node');
const authConfig = require('../config/authConfig')

const cca = new ConfidentialClientApplication({
  auth: authConfig.auth,
});

const checkToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const result = await cca.acquireTokenByClientCredential({
      scopes: ['https://aiexpense.onmicrosoft.com/Expense/Read'], 
    });
    
    next();
  } catch (error) {
    return res.status(401).send('Unauthorized');
  }
};

module.exports = { checkToken };
