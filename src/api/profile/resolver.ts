import ProfileRepository from "./profile-repository";

export default class Resolver {
  public profileRepository: any;

  constructor() {
    this.profileRepository = new ProfileRepository();
  }
}
