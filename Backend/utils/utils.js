export function getCredentialsFromAuthHeaders(authHeader) {
  if (!authHeader) {
    return [null, null];
  }

  const base64Credentials = authHeader.split(" ")[1];

  const credentials = Buffer.from(base64Credentials, "base64")
    .toString("utf-8")
    .split(":");

  return credentials;
}
