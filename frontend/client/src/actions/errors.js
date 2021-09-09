import { ERROR } from "../actionTypes";

export const unsetErr = () => {
    return {
        type: ERROR,
        payload: {err: []}
    }
}