import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import fs from 'fs';
import { SubstrateNetwork } from '../model';
import { decodeAddress } from '../utils';
// import { getEthereumTransactCall } from './typeGetters/getEthereumTransactCall';
let i = 58;
export default (network: SubstrateNetwork) =>
  async (ctx: ExtrinsicHandlerContext) => {
    const blockNumber = BigInt(ctx.block.height);
    // const date = new Date(ctx.block.timestamp);
    const rootAccount = decodeAddress(ctx.extrinsic.signer);
    // the types are failing so just go direct to the input...
    // const call = getEthereumTransactCall(ctx, network);
    const { input } = (ctx.extrinsic.args as any)[0].value;
    if (input && input.startsWith('0x60e06')) {
      console.log('\n');
      const data = {
        blockNumber: ctx.block.height,
        event: ctx.event.name,
        eventParams: ctx.event.params,
        hash: ctx.extrinsic.hash,
        signer: ctx.extrinsic.signer,
        rootAccount,
        input,
      };
      fs.writeFileSync(
        `./logs/${i}-${ctx.extrinsic.hash}.json`,
        JSON.stringify(data, null, 2)
      );
      i++;

      console.log(`Logged ${ctx.extrinsic.hash}`);
    }
    // console.log(Buffer.from(ctx.extrinsic.args[0]).toString('hex'));
  };
