import UserRepository from "./users-repository";

export default class Resolver {
  public userRepository: any;

  constructor() {
    this.userRepository = new UserRepository();
    console.log("Haiiii");
  }

  public async userLogin(user_data: any, domain_url: any): Promise<any> {
    console.log("Helloooo");
    return await this.userRepository.userLogin(user_data, domain_url);
  }
}
