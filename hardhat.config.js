require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://eth-mainnet.g.alchemy.com/v2/eAx8IxKMjd6wb9X-PgINFoFR9KPZV01A",
      accounts: [
        "73295f2e888e3eae800c7f7edd7d99435e51a1dc49f4139933eeabf02ac22ac6",
      ],
    },
  },
};
