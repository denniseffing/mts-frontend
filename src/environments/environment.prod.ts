import { BackendType } from 'app/config';

export const environment: {production: boolean, backendType: BackendType, authCallback: string, restPathRoot: string, restServiceRoot: string} = {
  production: true,
  backendType: BackendType.REST,
  authCallback: `${location.origin}/callback/`,
  restPathRoot: 'http://de-mucdevondepl01:9090/mythaistar/',
  restServiceRoot: 'http://de-mucdevondepl01:9090/mythaistar/services/rest/',
};
