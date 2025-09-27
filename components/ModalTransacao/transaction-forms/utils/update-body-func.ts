import { Deposito, Loan, Pix, Ted } from "@/utils/interfaces/transaction";

export const updateBody = (
  data: Deposito | Loan | Ted | Pix,
  key: string,
  value: string,
  setBody: any
) => {
  setBody({
    ...data,
    [key]: key === "valor" ? Number(value) : value,
  });
};
