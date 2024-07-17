import * as chains from "viem/chains";

export const defaultChain = chains.polygon;

export const supportedChains = [
  chains.polygon,
  chains.polygonAmoy,
  chains.base,
  chains.baseSepolia,
];

export const supportedChainNames = supportedChains.map((chain) => chain.name);

export const usdcContractAddresses: {
  chain: string;
  address: string;
}[] = [
  {
    chain: chains.polygon.name,
    address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
  },
  {
    chain: chains.polygonAmoy.name,
    address: "0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582",
  },
  {
    chain: chains.base.name,
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  },
  {
    chain: chains.baseSepolia.name,
    address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  },
];

export function getChainByChainId(chainId?: string): chains.Chain {
  if (!chainId) {
    return chains.polygon;
  }

  const id = Number.parseInt(chainId.split(":")[1], 10);

  for (const chain of Object.values(chains)) {
    if ("id" in chain) {
      if (chain.id == id) {
        return chain;
      }
    }
  }

  throw new Error(`Chain with id ${chainId} not found`);
}

export function getChainByChainName(chainName?: string): chains.Chain {
  if (!chainName) {
    return chains.polygon;
  }

  for (const chain of Object.values(chains)) {
    if ("id" in chain) {
      if (chain.name == chainName) {
        return chain;
      }
    }
  }

  throw new Error(`Chain with name ${chainName} not found`);
}
