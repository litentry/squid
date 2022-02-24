import { EventHandlerContext } from '@subsquid/substrate-processor';
import {
  SubstrateNetwork,
  SubstrateAuction,
  SubstrateAuctionChronicle,
} from '../../model';
import { getOrCreate } from '../../utils/store';
import getApi from '../../utils/getApi';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {
    const api = await getApi(network);
    const endingPeriod = api.consts.auctions.endingPeriod.toJSON() as number;
    const leasePeriod = api.consts.slots.leasePeriod.toJSON() as number;
    const periods = api.consts.auctions.leasePeriodsPerSlot.toJSON() as number;
    const blockNumber = ctx.block.height;
    const createdAt = new Date(ctx.block.timestamp);
    const auctionId = ctx.event.params[0].value as number;
    const slotStart = ctx.event.params[1].value as number;
    const auctionEnds = ctx.event.params[2].value as number;

    const auction = new SubstrateAuction({
      id: `${network}:${auctionId}`,
      auctionId: auctionId,
      network,
      blockNumber,
      status: 'Started',
      slotsStart: slotStart,
      slotsEnd: slotStart + periods - 1,
      leaseStart: slotStart * leasePeriod,
      leaseEnd: (slotStart + periods - 1) * leasePeriod,
      createdAt,
      closingStart: auctionEnds,
      ongoing: true,
      resultBlock: null,
      closingEnd: auctionEnds + endingPeriod,
    });
    await ctx.store.save(auction);

    const chronicle = await getOrCreate(ctx.store, SubstrateAuctionChronicle, {
      id: network,
    });
    chronicle.curAuction = auction;
    await ctx.store.save(chronicle);
  };
