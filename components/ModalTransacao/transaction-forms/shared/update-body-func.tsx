import {
  IDeposito,
  IEmprestimo,
  IPix,
  ITed,
} from "@/utils/interfaces/transaction";

export const updateBody = (
  data: IDeposito | IEmprestimo | ITed | IPix,
  key: string,
  value: string,
  setBody: any
) => {
  setBody({
    ...data,
    [key]: key === "valor" ? Number(value) : value,
  });
};
