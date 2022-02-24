import { EventHandlerContext } from '@subsquid/substrate-processor';
import {
  SubstrateNetwork,
  SubstrateAuction,
  SubstrateAuctionChronicle,
} from '../../model';
import { getById } from '../../utils/store';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {
    // todo... should we be using typegen here?
    const auctionId = ctx.event.params[0].value as number;

    const auction = await getById(
      ctx.store,
      SubstrateAuction,
      `${network}:${auctionId}`
    );

    auction.status = 'Closed';
    auction.ongoing = false;
    await ctx.store.save(auction);

    const chronicle = await getById(
      ctx.store,
      SubstrateAuctionChronicle,
      network
    );
    chronicle.curAuction = null;
    await ctx.store.save(chronicle);
  };
