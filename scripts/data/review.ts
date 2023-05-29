import EntityBase from "~/scripts/data/entity-base";
import User from "~/scripts/data/user";

export default interface Review extends EntityBase {
    owner: User;
    title: string;
    rating: number;
    content: string;
    date: Date;
}