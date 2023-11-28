import { usdc_abi, usdt_abi, usdc_mumbai_abi } from "../assets/abi.json";

// wallet connect project id
export const projectId: string = "0854ce5ff73158f88d93e8f047ff33d7";

// all chains
export const network = {
  ethereum :'ethereum',
  polygonMumbai : 'polygon_mumbai',
  solana : 'solana',
}

// all currency list
export const currency: any = ['eth', 'usdc', 'usdt', 'matic', 'sol'];


// network or chains for each currency
export const networkForCurrency: any = {
  eth: [network.ethereum],
  usdc : [network.ethereum, network.polygonMumbai],
  usdt: [network.ethereum],
  matic: [network.polygonMumbai],
  sol:[network.solana]
}


// native blockchain currency for direct transfer
export const nativeCurrency: any = {
  eth: true,
  matic: true,
};


// for native currensy transfer
export const chainsData: any = {
  [network.ethereum]: {
    toAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
    amount: "0.0001",
  },
  [network.polygonMumbai]: {
    toAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
    amount: "0.0001",
  },
  [network.solana]: {
    toAddress: "FsHdPWvGPPz4i2KB8UdXi1bHQwHXHNTdARMbzfQyJh8H",
    amount: 1000,
  }
};


// for other tokens transfer [1st key is chain id][2nd key is token/currency]
export const tokens: any = {
  1: {},
  5: {
    usdc: {
      contractAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
      recipientAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
      amount: 10000000,
      abi: [...usdc_abi],
    },
    usdt: {
      contractAddress: "0x6AD196dBcd43996F17638B924d2fdEDFF6Fdd677",
      recipientAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
      amount: 2000000,
      abi: [...usdt_abi],
    },
  },
  80001: {
    usdc: {
      contractAddress: "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23",
      recipientAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
      amount: 1000000,
      abi: [...usdc_mumbai_abi],
    },
  },
};
