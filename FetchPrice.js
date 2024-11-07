const { ethers } = require("ethers");
const { abi:QuoterABI }  = require("@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json");

const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-mainnet.g.alchemy.com/v2/IJ4LZSycj4nEx6txqXK0zEZnRYnahyF5"
);

const fetchPrice = async (
    fromAddress,
    toAddress,
    humanValue
) => {
    const QUOTER_CONTRACT_ADDRESS = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";
    const quoterContract = new ethers.Contract(
        QUOTER_CONTRACT_ADDRESS,
        QuoterABI,
        provider
    );

    const amountIn = ethers.utils.parseUnits(humanValue,18)
    const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
        fromAddress,
        toAddress,
        3000,
        amountIn.toString(),
        0
    )
    const amount = ethers.utils.formatUnits(quotedAmountOut.toString(),18);
    return amount;
}

const main = async () => {
    const fromAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // WETH
    const toAddress = "0x84cA8bc7997272c7CfB4D0Cd3D55cd942B3c9419"; // DIA

    const humanValue = "1";
    const result = await fetchPrice(
        fromAddress,
        toAddress,
        humanValue
    );

    console.log(result)
}

main();