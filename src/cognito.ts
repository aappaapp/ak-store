import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { SimpleJwksCache } from "aws-jwt-verify/jwk";
import { SimpleJsonFetcher } from "aws-jwt-verify/https";

const cognito = new CognitoIdentityProvider({
  endpoint: "https://cognito-idp.us-east-1.amazonaws.com",
  region: "us-east-1",
  credentials: {
    accessKeyId: import.meta.env.ACCESS_KEY,
    secretAccessKey: import.meta.env.SECRET_ACCESS_KEY,
  },
});
const verifier = CognitoJwtVerifier.create(
  {
    userPoolId: "us-east-1_ymKU3QODa",
    tokenUse: "id",
    clientId: import.meta.env.APP_CLIENT_ID,
  },
  {
    jwksCache: new SimpleJwksCache({
      fetcher: new SimpleJsonFetcher({
        defaultRequestOptions: { responseTimeout: 10000 },
      }),
    }),
  },
);

export async function login(username: string, password: string) {
  return await cognito.initiateAuth({
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: import.meta.env.APP_CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  });
}

export async function signup(email: string, password: string) {
  return await cognito.signUp({
    ClientId: import.meta.env.APP_CLIENT_ID,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  });
}

export async function verify(token: string) {
  try {
    await verifier.verify(token);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function readSession(session: string) {
  try {
    return await verifier.verify(session);
  } catch {
    return null;
  }
}

export async function changePassword(
  session: string,
  oldPassword: string,
  newPassword: string,
) {
  return await cognito.changePassword({
    AccessToken: session,
    PreviousPassword: oldPassword,
    ProposedPassword: newPassword,
  });
}

export async function listUsers() {
  return await cognito.listUsers({
    UserPoolId: "us-east-1_ymKU3QODa",
  });
}
