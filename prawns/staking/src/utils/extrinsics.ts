import { ExtrinsicArg } from '@subsquid/substrate-processor';

export function getFieldByNameFromExtrinsicArgs(args: ExtrinsicArg[] | undefined, name: string): any {
  return (args && args.find(arg => arg.name === name))?.value;
}