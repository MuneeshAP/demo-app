require('dotenv').config();//instatiate environment variables

let CONFIG = {} 

CONFIG.app          = process.env.APP   || 'dev';
CONFIG.port         = process.env.PORT  || '3000';

CONFIG.db_uri       = process.env.MONGODB_URI   ||  'mongodb://devil:Darkdragon3@ds161517.mlab.com:61517/transportexchange';


CONFIG.jwt_encryption  = process.env.JWT_ENCRYPTION || 'jwt_please_change';
CONFIG.jwt_expiration  = process.env.JWT_EXPIRATION || '10000';

CONFIG.editableProductFields =  process.env.EDITABLE_PRODUCT_FIELDS || ["name", "cost","images","outOfStock"];

module.exports = CONFIG;