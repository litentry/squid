import { EVM, functionHashes, eventHashes } from 'evm';

interface Opcode {
  pc: number;
  pushData?: Buffer;
  name: string;
  opcode: number;
  fee: number;
  in: number;
  out: number;
  dynamic: boolean;
  async: boolean;
}

interface Item {
  hash: string;
  name?: string;
}

export function getContractData(code: string): {
  functions: Item[];
  events: Item[];
  unknownHashes: string[];
} {
  const evm = new EVM(code);
  const opcodes = evm.getOpcodes() as Opcode[];

  return {
    functions: getKnownHashes(opcodes, functionHashes).map((hash) => ({
      name: functionHashes[hash],
      hash,
    })),
    events: getKnownHashes(opcodes, eventHashes).map((hash) => ({
      name: eventHashes[hash],
      hash,
    })),
    unknownHashes: getUnknownHashes(opcodes),
  };
}

function getKnownHashes(
  opcodes: Opcode[],
  lookup: { [name: string]: string }
): string[] {
  return [
    ...new Set(
      opcodes
        .filter((opcode) => opcode.name === 'PUSH4')
        .map((opcode) =>
          opcode.pushData ? opcode.pushData.toString('hex') : ''
        )
        .filter((hash) => hash in lookup)
    ),
  ];
}

function getUnknownHashes(opcodes: Opcode[]): string[] {
  return [
    ...new Set(
      opcodes
        .filter((opcode) => opcode.name === 'PUSH4')
        .map((opcode) =>
          opcode.pushData ? opcode.pushData.toString('hex') : ''
        )
        .filter((hash) => !functionHashes[hash] && !eventHashes[hash])
    ),
  ];
}
