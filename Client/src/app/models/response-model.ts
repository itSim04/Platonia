import { Interest } from "./interests-model";
import { Thought } from "./thoughts-model";
import { User } from "./users-model";

export interface RESPONSE_MODEL {

    status: number;
    error_message?: string;
    username_taken: boolean;
    email_taken?: boolean;
    name_taken?: boolean;
    user?: User;
    users?: Map<number, User>;
    thought?: Thought;
    thoughts?: Map<number, Thought>;
    interest?: Interest;
    interests?: Map<number, Interest>;
    missing_params?: string;

}