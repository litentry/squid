import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../model';
import { decodeAddress } from '../utils';
// import { getEthereumTransactCall } from './typeGetters/getEthereumTransactCall';

export default (network: SubstrateNetwork) =>
  async (ctx: ExtrinsicHandlerContext) => {
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const rootAccount = decodeAddress(ctx.extrinsic.signer);
    // the types are failing so just go direct to the input...
    // const call = getEthereumTransactCall(ctx, network);
    const { input } = (ctx.extrinsic.args as any)[0].value;
    if (input.startsWith('0x60e06')) {
      console.log('\n');
      console.log((ctx.extrinsic.args as any)[0]?.value?.input);
    }
    // console.log(Buffer.from(ctx.extrinsic.args[0]).toString('hex'));
  };
