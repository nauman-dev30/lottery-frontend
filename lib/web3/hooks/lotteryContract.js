import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
  simulateContract,
} from "@wagmi/core";
import lotteryContractAbi from "../smartContracts/abis/lotteryContractAbi.json";
import { CONTRACT_ADDRESSES } from "../smartContracts/addresses";

// Lottery Contract
export const lotteryReadFunction = async (config, functionName, args) => {
  const data = await readContract(config, {
    abi: lotteryContractAbi,
    address: CONTRACT_ADDRESSES.LOTTERY_CONTRACT,
    functionName,
    args,
  });
  return data;
};

export const lotteryWriteFunction = async (
  config,
  functionName,
  args,
  value // 4th parameter: the optional native currency value to send (e.g., BNB)
) => {
  // Ensure args is always an array to prevent errors
  if (!Array.isArray(args)) {
    throw new Error("The 'args' parameter must be an array.");
  }

  // 1. Simulate the transaction to pre-validate and prepare the request
  let simulationResult;
  try {
    simulationResult = await simulateContract(config, {
      abi: lotteryContractAbi,
      address: CONTRACT_ADDRESSES.LOTTERY_CONTRACT,
      functionName,
      args,
      value, // Pass the native currency value to the simulation
    });
  } catch (err) {
    // Log detailed context for developer debugging
    console.error(
      `[Simulation Error] in Lottery function '${functionName}' with args:`,
      args,
      "and value:",
      value,
      err
    );
    // Propagate the error to the UI to be handled by a catch block
    throw err;
  }

  // Extract the prepared request from the successful simulation
  // The 'request' object now includes the 'value' if it was provided
  const { request } = simulationResult;

  // 2. Execute the actual transaction with the prepared request
  let txHash;
  try {
    txHash = await writeContract(config, request);
    console.log(`Transaction hash for '${functionName}':`, txHash);
  } catch (err) {
    // This will catch user-side errors, e.g., "User rejected transaction"
    console.error(
      `[Write Contract Error] in Lottery function '${functionName}':`,
      err
    );
    throw err;
  }

  // 3. Wait for the transaction to be mined and confirmed
  const receipt = await waitForTransactionReceipt(config, { hash: txHash });
  console.log(`Transaction for '${functionName}' confirmed:`, receipt);
  return receipt;
};
