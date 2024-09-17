require('dotenv').config();
const config = {
    auth: {
      clientId:'3b44316d-bd7a-40c9-98b1-ae92544cb615' ,
// clientId: '7bc24eb9-6ae7-4456-8603-9ca35a98aa0a',
      clientSecret:'IYB8Q~Pz3Zt66PGB3SKx55fgYW4.YrcCVG0wgb9k',
// clientSecret: '600abbea-7f8b-43b8-90cc-3d2297498dd9', // Your Azure B2C application secret
      authority: `https://aiexpense.b2clogin.com/aiexpense.onmicrosoft.com/B2C_1_signupsignin`,
// authority: `https://login.microsoftonline.com/124f03ff-4097-43cc-b351-8065e9098d65`, // Your Azure B2C tenant ID
//       redirectUri: 'http://localhost:5000/api/auth/callback', 
    },
  };
  
  module.exports = config;
  