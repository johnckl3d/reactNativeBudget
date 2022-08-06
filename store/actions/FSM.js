export const SET_ERROR = "SET_ERROR";
export const SET_LOADING = "SET_LOADING";
//export const SET_FETCH_DATA_STATUS = "SET_LOADING";


  export function hasError(bool) {
    return {
        type: SET_ERROR,
        hasErrored: bool
    };
}
export function isLoading(bool) {
    return {
        type: SET_LOADING,
        isLoading: bool
    };
}