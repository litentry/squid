export default {
  alias: {
    assetManager: {
      Balance: 'TAssetBalance',
    },
    xTokens: {
      Balance: 'TAssetBalance',
    },
  },
  types: {
    AccountId: 'EthereumAccountId',
    Address: 'AccountId',
    Balance: 'u128',
    LookupSource: 'AccountId',
    Account: {
      nonce: 'U256',
      balance: 'u128',
    },
    ExtrinsicSignature: 'EthereumSignature',
    RoundIndex: 'u32',
    Candidate: {
      id: 'AccountId',
      fee: 'Perbill',
      bond: 'Balance',
      nominators: 'Vec<Bond>',
      total: 'Balance',
      state: 'CollatorStatus',
    },
    Nominator: {
      nominations: 'Vec<Bond>',
      total: 'Balance',
    },
    Bond: {
      owner: 'AccountId',
      amount: 'Balance',
    },
    TxPoolResultContent: {
      pending: 'HashMap<H160, HashMap<U256, PoolTransaction>>',
      queued: 'HashMap<H160, HashMap<U256, PoolTransaction>>',
    },
    TxPoolResultInspect: {
      pending: 'HashMap<H160, HashMap<U256, Summary>>',
      queued: 'HashMap<H160, HashMap<U256, Summary>>',
    },
    TxPoolResultStatus: {
      pending: 'U256',
      queued: 'U256',
    },
    Summary: 'Bytes',
    PoolTransaction: {
      hash: 'H256',
      nonce: 'U256',
      blockHash: 'Option<H256>',
      blockNumber: 'Option<U256>',
      from: 'H160',
      to: 'Option<H160>',
      value: 'U256',
      gasPrice: 'U256',
      gas: 'U256',
      input: 'Bytes',
    },
    AccountInfo: 'AccountInfoWithTripleRefCount',
    CollatorStatus: {
      _enum: {
        Active: 'Null',
        Idle: 'Null',
        Leaving: 'RoundIndex',
      },
    },
    Range: 'RangeBalance',
    RangeBalance: {
      min: 'Balance',
      ideal: 'Balance',
      max: 'Balance',
    },
    RangePerbill: {
      min: 'Perbill',
      ideal: 'Perbill',
      max: 'Perbill',
    },
    InflationInfo: {
      expect: 'RangeBalance',
      annual: 'RangePerbill',
      round: 'RangePerbill',
    },
    OrderedSet: 'Vec<Bond>',
    Collator: {
      id: 'AccountId',
      bond: 'Balance',
      nominators: 'Vec<Bond>',
      total: 'Balance',
      state: 'CollatorStatus',
    },
    CollatorSnapshot: {
      bond: 'Balance',
      nominators: 'Vec<Bond>',
      total: 'Balance',
    },
    SystemInherentData: {
      validationData: 'PersistedValidationData',
      relayChain_state: 'StorageProof',
      downwardMessages: 'Vec<InboundDownwardMessage>',
      horizontalMessages: 'BTreeMap<ParaId, Vec<InboundHrmpMessage>>',
    },
    RoundInfo: {
      current: 'RoundIndex',
      first: 'BlockNumber',
      length: 'u32',
    },
    AuthorId: 'AccountId32',
    AccountId32: 'H256',
    ProxyType: {
      _enum: [
        'Any',
        'NonTransfer',
        'Governance',
        'Staking',
        'CancelProxy',
        'Balances',
        'AuthorMapping',
      ],
    },
    RelayChainAccountId: 'AccountId32',
    RewardInfo: {
      totalReward: 'Balance',
      claimedReward: 'Balance',
      contributedRelayAddresses: 'Vec<RelayChainAccountId>',
    },
    Collator2: {
      id: 'AccountId',
      bond: 'Balance',
      nominators: 'Vec<AccountId>',
      topNominators: 'Vec<Bond>',
      bottomNominators: 'Vec<Bond>',
      totalCounted: 'Balance',
      totalBacking: 'Balance',
      state: 'CollatorStatus',
    },
    NominatorAdded: {
      _enum: {
        AddedToTop: 'Balance',
        AddedToBottom: 'Null',
      },
    },
    RegistrationInfo: {
      account: 'AccountId',
      deposit: 'Balance',
    },
    ParachainBondConfig: {
      account: 'AccountId',
      percent: 'Percent',
    },
    EthereumSignature: {
      r: 'H256',
      s: 'H256',
      v: 'U8',
    },
    NominatorStatus: {
      _enum: {
        Active: 'Null',
        Leaving: 'RoundIndex',
      },
    },
    Nominator2: {
      nominations: 'Vec<Bond>',
      revocations: 'Vec<AccountId>',
      total: 'Balance',
      scheduledRevocationsCount: 'u32',
      scheduledRevocationsTotal: 'Balance',
      status: 'NominatorStatus',
    },
    ExitQ: {
      candidates: 'Vec<AccountId>',
      nominatorsLeaving: 'Vec<AccountId>',
      candidateSchedule: 'Vec<(AccountId, RoundIndex)>',
      nominatorSchedule: 'Vec<(AccountId, Option<AccountId>, RoundIndex)>',
    },
    AssetType: {
      _enum: {
        Xcm: 'MultiLocation',
      },
    },
    AssetId: 'u128',
    TAssetBalance: 'u128',
    ENUM_AccountId32: {
      network: 'NetworkId',
      id: '[u8; 32]',
    },
    ENUM_AccountKey20: {
      network: 'NetworkId',
      key: '[u8; 20]',
    },
    ENUM_AccountIndex64: {
      network: 'NetworkId',
      index: 'Compact<u64>',
    },
    ENUM_Plurality: {
      id: 'BodyId',
      part: 'BodyPart',
    },
    JunctionV0: {
      _enum: {
        Parent: 'Null',
        Parachain: 'Compact<u32>',
        AccountId32: 'ENUM_AccountId32',
        AccountIndex64: 'ENUM_AccountIndex64',
        AccountKey20: 'ENUM_AccountKey20',
        PalletInstance: 'u8',
        GeneralIndex: 'Compact<u128>',
        GeneralKey: 'Vec<u8>',
        OnlyChild: 'Null',
        Plurality: 'ENUM_Plurality',
      },
    },
    CurrencyId: {
      _enum: {
        SelfReserve: 'Null',
        OtherReserve: 'u128',
      },
    },
    AssetRegistrarMetadata: {
      name: 'Vec<u8>',
      symbol: 'Vec<u8>',
      decimals: 'u8',
      isFrozen: 'bool',
    },
    VestingBlockNumber: 'u32',
    MultiLocation: 'MultiLocationV1',
    JunctionV1: {
      _enum: {
        Parachain: 'Compact<u32>',
        AccountId32: 'ENUM_AccountId32',
        AccountIndex64: 'ENUM_AccountIndex64',
        AccountKey20: 'ENUM_AccountKey20',
        PalletInstance: 'u8',
        GeneralIndex: 'Compact<u128>',
        GeneralKey: 'Vec<u8>',
        OnlyChild: 'Null',
        Plurality: 'ENUM_Plurality',
      },
    },
  },
};
