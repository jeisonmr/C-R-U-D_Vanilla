
/**
 * @param {Like<User>} userDataLike - The user object
 */
export class User{
  id:number;
  isActive:boolean;
  balance:string;
  avatar:string;
  firstName:string;
  lastName:string;
  gender:string;
  
  constructor({
    id,
    isActive,
    balance,
    avatar,
    firstName,
    lastName,
    gender })
  {
    this.id = id;
    this.isActive = isActive;
    this.balance = balance;
    this.avatar = avatar;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
  }
}