explanation of contracts, the 606060 bit might be mainnet specific as I think the numbers are different on this chain

https://medium.com/@hayeah/diving-into-the-ethereum-vm-part-5-the-smart-contract-creation-process-cb7b6133b855

# How to find the contracts on moonscan:

- take log file hash & block
- query here https://moonbeam-squid-archive.litentry.io/graphql/console with

```
query MyQuery {
  substrate_block(where: {height: {_eq: 185673}}) {
    substrate_extrinsics(where: {name: {_eq: "ethereum.transact"}, hash: {_eq: "0x16fdadf76b68aaeb8ef8ff2434dcba9899fecdbdacbd00c2e96f78e37c0f7a5f"}}) {
      name
      meta
      method
      section
      blockId
      hash
      substrate_events {
        evmHash
        evmLogAddress
        name
      }
      args
    }
  }
}

```

- check the events in response for the evmHash, then go to Moonscan: https://moonbeam.moonscan.io and search, find contract address in contract created.
