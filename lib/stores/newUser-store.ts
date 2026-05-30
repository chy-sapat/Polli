import { create } from "zustand";

type UserState = {


    email: string;
    password: string;
    name: string;
    nationality: string;
    setUser: (user: Partial<UserState>) => void;
    clearUser: () => void;
};


export const useUserData = create<UserState>((set) => ({
    email: "",
    password: "",
    name: "",
    nationality: "",

    setUser: (user) => set((state) => ({ ...state, ...user })),

    clearUser: () =>
        set({
            email: "",
            password: "",
            name: "",
            nationality: "",

        }),
}));
