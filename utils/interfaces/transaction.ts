export type transacao = Deposito | Loan | Ted | Pix;

export enum TransacationTypes {
  DEPOSITO = "DEPOSITO",
  TED = "TED",
  EMPRESTIMO = "EMPRESTIMO",
  PIX = "PIX",
}

export enum TransPeriod {
  RECENT = "RECENT",
  OLD = "OLD",
  NULL = "NULL",
}

export class Ted {
  transId?: string;
  data?: string;
  valor?: number = 0;
  cpfDestinatario?: string;
  numConta?: number;
  agencia?: string;
  digito?: number;
  descricao?: string;
  tipo: TransacationTypes.TED = TransacationTypes.TED;
  file?: any;
}
export class Pix {
  transId?: string;
  data?: string;
  valor?: number = 0;
  descricao?: string;
  chavePix?: string;
  destinatario?: string = ""; // nome
  tipo: TransacationTypes.PIX = TransacationTypes.PIX;
  file?: any;
}

export class Loan {
  transId?: string;
  valor: number = 0; // valor do empréstimo
  data?: string;
  aberto?: boolean;
  tipo?: TransacationTypes.EMPRESTIMO = TransacationTypes.EMPRESTIMO;
  valorPago?: number; // valor para pagar o empréstimo
  valorDevido?: number | 0; // seu valor só é alterado no BFF
  file?: any;
}

export class Deposito {
  transId?: string;
  valor: number = 0;
  data?: string;
  tipo?: TransacationTypes.DEPOSITO = TransacationTypes.DEPOSITO;
  file?: any;
}

// === FILTROS ===
export class TransactionFilter {
  transType?: TransacationTypes;
  transPeriod?: TransPeriod;
}
