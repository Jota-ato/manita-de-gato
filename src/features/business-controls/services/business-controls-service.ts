import { BusinessControlsUpdate } from "../types/business-controls.types";
import { businessControlsRepository, IBusinessControlsRepository } from "./business-controls-respository";

class BusinessControlsService {
    constructor(
        private businessControlsRepository: IBusinessControlsRepository
    ) { }

    async getBusinessControls() {
        return await this.businessControlsRepository.get()
    }

    async updateBusinessControls(data: BusinessControlsUpdate, id: string) {
        await this.businessControlsRepository.update(data, id)
    }
}

export const businessControlsService = new BusinessControlsService(
    businessControlsRepository
)