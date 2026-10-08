export const BASE_URL = " https://expense-tracker-mern-kk0f.onrender.com";

export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/v1/auth/login",
        REGISTER: "/api/v1/auth/register",
        GET_USER_INFO: "/api/v1/auth/user",
    },
    DASHBOARD: { GET_DATA: "/api/v1/dashboard" },
    EXPENSE: {
        ADD: "/api/v1/expense/add",
        GET_ALL_EXPENSE: "/api/v1/expense/get",
        DELETE: (id) => `/api/v1/expense/${id}`,
        DOWNLOAD_EXPENSE: "/api/v1/expense/downloadexcel"
    },
    INCOME: {
        ADD: "/api/v1/income/add",
        GET_ALL_INCOME: "/api/v1/income/get",
        DELETE: (id) => `/api/v1/income/${id}`,
        DOWNLOAD_INCOME: "/api/v1/income/downloadexcel"
    },
    IMAGE: {
        UPLOAD_IMAGE: "/api/v1/auth/upload-image"
    }
}