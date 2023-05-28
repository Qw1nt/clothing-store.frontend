import EntityBase from "~/scripts/data/entity-base";

export default interface User extends EntityBase {
    login: string;
    registerDate: Date
    firstSecondNames: string;
    role: string;
}