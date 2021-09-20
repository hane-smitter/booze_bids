import { ERROR, STATUS } from "../constants";

export const unsetErr = () => {
    return {
        type: ERROR,
        payload: {err: []}
    }
}
export const unsetStatus = () => {
    return {
        type: STATUS,
        payload: {status: {}}
    }
}