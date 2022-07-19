import type {Result} from './support'

export type PreimageStatus = PreimageStatus_Missing | PreimageStatus_Available

export interface PreimageStatus_Missing {
  __kind: 'Missing'
  value: number
}

export interface PreimageStatus_Available {
  __kind: 'Available'
  value: PreimageStatusAvailable
}

export interface PreimageStatusAvailable {
  data: Uint8Array
  provider: Uint8Array
  deposit: bigint
  since: number
  expiry: (number | undefined)
}
