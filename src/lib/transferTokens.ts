import { EIP1193Provider } from "@privy-io/react-auth";
import { encodeFunctionData } from "viem";
import { usdcContractAddresses } from "./supportedChains";
import { USDC_ABI } from "./usdcAbi";

export async function transferUSDC(
  providerPromise: Promise<EIP1193Provider> | null,
  chain: string,
  address: string,
  amount: number
): Promise<string> {
  const contractAddress = usdcContractAddresses.find(
    (contract) => contract.chain === chain
  )?.address;

  if (contractAddress == null) {
    throw new Error("Contract address not found");
  }

  console.log(
    `Transferring ${amount} USDC to ${address} on ${chain} : ${contractAddress}`
  );

  const data = encodeFunctionData({
    abi: USDC_ABI,
    functionName: "transfer",
    args: [address, (amount * 10 ** 6).toString()],
  });

  const transactionRequest = {
    to: contractAddress,
    data: data,
    value: "0x0",
  };

  const provider = await providerPromise;

  if (provider == null) {
    throw new Error("Provider not found");
  }

  const transactionHash = await provider.request({
    method: "eth_sendTransaction",
    params: [transactionRequest],
  });

  console.log(`Transaction hash: ${transactionHash}`);

  return transactionHash;
}
