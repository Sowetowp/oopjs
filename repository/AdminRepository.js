import BaseUser from "../models/base/BaseUsers";
import AdminModel from "../models/users/Admin";
import Repository from "./Repository";

export default class AdminRepository extends Repository{
    constructor() {
        super(AdminModel);
    }
}