export const UserRole = {
    user : "user",
    admin:"admin"
} as const ;

export type TUserRole = keyof typeof UserRole