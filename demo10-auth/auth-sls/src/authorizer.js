const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

const { buildIAMPolicy } = require('./lib/util');

const myRoles = {
    // role name vc function name
    'heroes:list': 'private'
}

const authorizeUser = (userScopes, methodArn) => {
    console.log(userScopes,methodArn);

    return userScopes.find(scope => ~methodArn.indexOf(myRoles[scope]));

}

exports.handler = async event => {
    try {
        const token = event.authorizationToken;
        const decodedUser = jwt.verify(token, JWT_KEY);

        const user = decodedUser.user;
        const userId = decodedUser.user.username;

        const isAllowed = authorizeUser(user.scopes, event.methodArn);

        // dado que irá nas requests
        const autorizerContext = {
            user: JSON.stringify(user)
        }
        
        const policyDocument = buildIAMPolicy(userId,isAllowed ? 'Allow' : 'Deny', event.methodArn ,autorizerContext);

        return policyDocument;
    } catch (error) {
        console.error('Auth error***', error.stack);
        // 401 -> token inválido ou expirado
        // 403 -> token sem permissão para acessar a função

        return {
            statusCode: 401,
            body: error.stack
        }
    }
}
