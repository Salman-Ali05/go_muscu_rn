import { create } from 'zustand';

const useSignupStore = create((set) => ({
  name: '',
  email: '',
  password: '',
  birthdate: '',
  programID: '',
  setUserData: (data) => set((state) => ({ ...state, ...data })),
}));

export default useSignupStore;
