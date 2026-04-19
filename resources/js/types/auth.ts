export type User = {
    id: number;
    username: string;
    email: string;
    role: 'superadmin' | 'admin' | 'user';
    phone_number?: string | null;
    bio?: string | null;
    profile_image?: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
    [key: string]: unknown;
};

export type Auth = {
    user: User | null;
};

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};
