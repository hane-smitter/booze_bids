import { ERROR } from "../constants";

export const unsetErr = () => {
    return {
        type: ERROR,
        payload: {err: []}
    }
}