import { Thought } from "./thoughts-model";
import { User } from "./users-model";

export interface RESPONSE_MODEL {

    status: number;
    error_message?: string;
    username_available: boolean;
    email_available?: boolean;
    user?: User;
    users?: Map<number, User>;
    thought?: Thought;
    thoughts?: Map<number, Thought>;
    missing_params?: string;

}