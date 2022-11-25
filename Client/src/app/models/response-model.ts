import { THOUGHT } from "./thoughts-model";
import { USER } from "./users-model";

export interface RESPONSE_MODEL {

    status: number;
    error_message: string;
    username_available: boolean | undefined;
    email_available: boolean | undefined;
    user: USER | undefined;
    users: USER[] | undefined;
    thought: THOUGHT | undefined;
    thoughts: THOUGHT[] | undefined;
    missing_params: string;

}