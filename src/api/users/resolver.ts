import UserRepository from "./users-repository";

export default class Resolver {
  public userRepository: any;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async userLogin(user_data: any, domain_url: any): Promise<any> {
    return await this.userRepository.userLogin(user_data, domain_url);
  }
}
