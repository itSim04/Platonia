import { Interest } from "./interests-model";
import { Option, Thought } from "./thoughts-model";
import { User } from "./users-model";

export interface RESPONSE {

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
    options?: Map<number, Option>;
    missing_params?: string;
    profile_id?: number;
    banner_id?: number;
    follows?: boolean;

}