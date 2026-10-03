export const BASE_URL = "http://localhost:8000/api/v1";

export const API_PATHS = {
    AUTH: {
        LOGIN: `${BASE_URL}/auth/login`,
        REGISTER: `${BASE_URL}/auth/register`,
        GET_USER_INFO: `${BASE_URL}/auth/user`,
    },
    DASHBOARD: { GET_DATA: `${BASE_URL}/dashboard` },
    EXPENSE: {
        ADD: `${BASE_URL}/expense/add`,
        GET_ALL_INCOME: `${BASE_URL}/expense/get`,
        DELETE_: (id) => `${BASE_URL}/expense/${id}`,
        DOWNLOAD_INCOME: `${BASE_URL}/expense/downloadexcel`
    },
    INCOME: {
        ADD: `${BASE_URL}/income/add`,
        GET_ALL_INCOME: `${BASE_URL}/income/get`,
        DELETE_: (id) => `${BASE_URL}/income/${id}`,
        DOWNLOAD_INCOME: `${BASE_URL}/income/downloadexcel`
    },
    IMAGE: {
        UPLOAD_IMAGE: `${BASE_URL}/auth/upload-image`
    }
}