import { Interest } from "./interest-main";
import { Option } from "./thoughts-request";
import { User } from "./user-main";
import { Thought } from "./thought-main"

export interface Response {

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