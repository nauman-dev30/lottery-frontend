import { cookieStorage, createStorage, http } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { opBNB } from "@reown/appkit/networks";

// Get projectId from https://dashboard.reown.com
export const projectId = "aacb8ea41a1e537af8016a7287e0db77";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [opBNB];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;

export const API_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
