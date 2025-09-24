export interface IFirebaseUserResponse {
  _tokenResponse: {
    displayName: string;
    email: string;
    expiresIn: string;
    idToken: string;
    registered: boolean;
  };
  user: {
    uid: string;
    email: string;
    displayName: string;
    phoneNumber: string;
    providerData: any[];
    apiKey: string;
  };
}

export class UserData {
  name: string = "";
  email: string = "";
  password: string = "";
  birthDate: string = "";
  cpf: string = "";
}

export class BankAccountData {
  agencia: string = "";
  conta: string = "";
  digito: string = "";
  linhaCredito: number = 0;
  saldo: number = 0;
}
