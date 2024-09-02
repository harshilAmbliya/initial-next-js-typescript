export const apiBaseURL = {
    USERS: "/users",
    PENSION: "/forms/validate",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/logout",
    // admin here
    ADMIN_USER: "/users",
    ADMIN_USER_STATUS: "/change-users-status",
    ERROR_FEEDBACK: "/forms/validate",
    GET_VERSION: "/forms/schema",
    PENSION_PROVIDER: "/pension-provider",
    PENSION_PROVIDER_SCHEME: "/pension-scheme",
    PENSION_PROVIDER_SCHEME_DETAILS: "/pension-scheme",
    PENSION_PROVIDER_COHORT: "/pension-cohort",
    PROFILE: "/profile",
}

export const Tokens = {
    ADMIN_TOKEN: 'auth_token',
    ADMIN: 'admin',
    ADMIN_ROLE: 'role'
};


export const errorMessage = {
    TOKEN_NOT_PROVIDED: 'Token not provided',
    TOKEN_EXPIRED: 'Token has expired',
    TOKEN_INVALID_AUTH: 'Invalid authentication Token',
    TOKEN_INVALID: 'Could not decode token: Error while decoding to JSON: Syntax error',
    TOKEN_INVALID_SIGNATURE: 'Token Signature could not be verified.'
};


export const Filters = {
    PAGE: 1,
    OBJ: {
        totalRecords: 0,
        totalPages: 0,
        page: 1,
        perPage: 5,
        direction: 'asc',
        search: '',
        adminName: 'admin',
        categoryId: '',
        created_at: 'created_at',
        status: '',
        payment_status: '',
        payment_type: '',
        product_unit: '',
        base_unit: ''
    }
};