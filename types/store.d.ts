export type AuthStoreTypes = {
  token: string;
  actions: {
    logout: () => void;
    setToken: (token?: string) => void;
  };
};
