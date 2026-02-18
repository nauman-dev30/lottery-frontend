import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
  simulateContract,
} from "@wagmi/core";
import trdoTokenAbi from "../smartContracts/abis/trdoTokenAbi.json";
import { CONTRACT_ADDRESSES } from "../smartContracts/addresses";

// TRDO Token
export const trdoTokenReadFunction = async (config, functionName, args) => {
  const data = await readContract(config, {
    abi: trdoTokenAbi,
    address: CONTRACT_ADDRESSES.TRDO_TOKEN,
    functionName,
    args,
  });
  return data;
};

export const trdoTokenWriteFunction = async (config, functionName, args) => {
  // 1. Simulate the transaction to pre-validate and prepare the request
  let simulationResult;
  try {
    simulationResult = await simulateContract(config, {
      abi: trdoTokenAbi,
      address: CONTRACT_ADDRESSES.TRDO_TOKEN,
      functionName,
      args,
    });
  } catch (err) {
    // Log detailed context for developer debugging
    console.error(
      `[Simulation Error] in TRDO function '${functionName}' with args:`,
      args,
      err
    );
    // Propagate the error to the UI to be handled by a catch block
    throw err;
  }

  // Extract the prepared request from the successful simulation
  const { request } = simulationResult;

  // 2. Execute the actual transaction with the prepared request
  let txHash;
  try {
    txHash = await writeContract(config, request);
    console.log(`Transaction hash for '${functionName}':`, txHash);
  } catch (err) {
    // This will catch user-side errors, e.g., "User rejected transaction"
    console.error(
      `[Write Contract Error] in TRDO function '${functionName}':`,
      err
    );
    throw err;
  }

  // 3. Wait for the transaction to be mined and confirmed
  const receipt = await waitForTransactionReceipt(config, { hash: txHash });
  console.log(`Transaction for '${functionName}' confirmed:`, receipt);
  return receipt;
};
