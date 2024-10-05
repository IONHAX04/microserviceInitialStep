import StaffRepository from "./staff-repository";

export default class Resolver {
  public staffRepository: any;

  constructor() {
    this.staffRepository = new StaffRepository();
  }

  public async staffLoginV1(user_data: any, domain_code: any): Promise<any> {
    return await this.staffRepository.staffLoginV1(user_data, domain_code);
  }

  public async getUserDataV1(user_data: any, domain_code: any): Promise<any> {
    return await this.staffRepository.getUserDataV1(user_data, domain_code);
  }
}
