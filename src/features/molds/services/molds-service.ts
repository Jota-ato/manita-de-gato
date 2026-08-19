import {
  customersRepository,
  ICustomersRepository,
} from "@/features/customers/services/customers-repository";
import { MoldInput } from "../schemas/molds-schemas";
import { FullMold, NewMold } from "../types/molds.types";
import { IMoldsRepository, moldsRepository } from "./molds-repository";
import { createPhone } from "@/shared/utils/phone";
import { AppError } from "@/shared/lib/errors";
import { Customer } from "@/db/schema";
import { customersService } from "@/features/customers/services/customers-service";

class MoldsService {
  constructor(
    private moldsRepository: IMoldsRepository,
    private customersRepository: ICustomersRepository,
  ) {}

  private async resolveCustomer(data: MoldInput): Promise<Customer> {
    let customer: Customer;

    if (data.isRegisterClient) {
      const dbClient = await this.customersRepository.getByPhone(
        createPhone(data.clientCountryCode, data.clientPhone),
      );

      if (!dbClient) throw new AppError("Cliente no encontrado", "404");
      customer = dbClient;
    } else {
      customer = await customersService.createCustomer({
        lastName: data.lastName,
        name: data.name,
        phone: createPhone(data.clientCountryCode, data.clientPhone),
      });
    }

    if (!customer) throw new AppError("Cliente no encontrado", "404");

    return customer;
  }

  async createMold(data: MoldInput): Promise<void> {
    const customer = await this.resolveCustomer(data);

    const payload: NewMold = {
      ...data,
      customerId: customer.id,
      totalPrice: data.totalPrice.toString(),
      amountPaid: data.amountPaid ? data.amountPaid.toString() : "0",
    };

    await this.moldsRepository.insert(payload);
  }

  async updateMold(id: string, data: MoldInput): Promise<void> {
    const customer = await this.resolveCustomer(data);

    const payload: Partial<NewMold> = {
      ...data,
      customerId: customer.id,
      totalPrice: data.totalPrice.toString(),
      amountPaid: data.amountPaid ? data.amountPaid.toString() : "0",
    };

    await this.moldsRepository.update(id, payload);
  }

  async getAllMolds(
    limit: number,
    page: number,
  ): Promise<{ molds: FullMold[]; totalCount: number }> {
    const [molds, totalCount] = await Promise.all([
      this.moldsRepository.getAll(limit, page),
      this.moldsRepository.getCount(),
    ]);

    return { molds, totalCount };
  }

  async getMoldById(id: string): Promise<FullMold | null> {
    return await this.moldsRepository.getById(id);
  }
}

export const moldsService = new MoldsService(
  moldsRepository,
  customersRepository,
);
