import { IDeposito, IEmprestimo, IPix, ITed } from "./transaction";

export class BankAccount {
  uid?: number;

  numeroConta: string = "";
  digito: number = 0;
  usuarioCpf: string = "";
  linhaCredito: number = 0;
  agencia: string = "";
  saldo: number = 0;

  depositos: IDeposito[] = [];
  transferencias: ITed[] | IPix[] = [];
  historicoEmprestimos: IEmprestimo[] = [];
}
