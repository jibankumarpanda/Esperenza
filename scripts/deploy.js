import hre from "hardhat";

async function main() {
  console.log(`Deploying contracts to network: ${hre.network.name}`);

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer address:", deployer.address);
  const bal = await deployer.getBalance();
  console.log("Deployer balance:", hre.ethers.utils.formatEther(bal));

  // Deploy PaymentContract (example constructor arg: ecoFund)
  const ecoFund = "0x000000000000000000000000000000000000dead";
  console.log("Deploying PaymentContract...");
  const PaymentContract = await hre.ethers.getContractFactory("PaymentContract");
  const payment = await PaymentContract.deploy(ecoFund);
  await payment.deployed();
  console.log("✅ PaymentContract deployed at:", payment.address);

  // Deploy PhoneMapping (if present)
  try {
    console.log("Deploying PhoneMapping...");
    const PhoneMapping = await hre.ethers.getContractFactory("PhoneMapping");
    const phoneMapping = await PhoneMapping.deploy();
    await phoneMapping.deployed();
    console.log("✅ PhoneMapping deployed at:", phoneMapping.address);
  } catch (err) {
    console.log("PhoneMapping deploy skipped or failed (contract may not exist):", err && err.message ? err.message : err);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

