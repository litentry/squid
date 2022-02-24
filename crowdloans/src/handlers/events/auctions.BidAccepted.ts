import { EventHandlerContext } from '@subsquid/substrate-processor';
import {
  SubstrateNetwork,
  SubstrateAuction,
  SubstrateAuctionChronicle,
} from '../../model';
import { getOrCreate } from '../../utils/store';
import getApi from '../../utils/getApi';
import isFundAddress from '../../utils/isFundAddress';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {
    const api = await getApi(network);
    const blockNumber = ctx.block.height;
    const createdAt = new Date(ctx.block.timestamp);
    const who = ctx.event.params[0].value as Uint8Array;
    const paraId = ctx.event.params[1].value as number;
    const amount = ctx.event.params[2].value as bigint;
    const firstSlot = ctx.event.params[3].value as number;
    const lastSlot = ctx.event.params[4].value as number;
    const auctionId = (
      await api.query.auctions.auctionCounter()
    ).toJSON() as number;
    const isFund = isFundAddress(who, api);
  };

/**
 *
 * @param substrateEvent SubstrateEvent
 * Create Bid record and create auction parachain record if not exists already
 * Skip winning bid before we have query abilities
 */
export const handleBidAccepted = async (substrateEvent: SubstrateEvent) => {
  const parachain = await Storage.ensureParachain(paraId);
  const { id: parachainId } = parachain;

  const fundId = await Storage.getLatestCrowdloanId(parachainId);
  const bidAmount = parseNumber(amount);
  const bid = {
    id: `${blockNum}-${from}-${paraId}-${firstSlot}-${lastSlot}`,
    auctionId: `${auctionId}`,
    blockNum,
    winningAuction: auctionId,
    parachainId,
    isCrowdloan: isFund,
    amount: parseNumber(amount),
    firstSlot,
    lastSlot,
    createdAt,
    fundId: isFund ? fundId : null,
    bidder: isFund ? null : from,
  };

  logger.info(`Bid detail: ${JSON.stringify(bid, null, 2)}`);
  const { id: bidId } = await Storage.save('Bid', bid);
  logger.info(`Bid saved: ${bidId}`);

  await markParachainLeases(auctionId, paraId, firstSlot, lastSlot, bidAmount);

  await markLosingBids(auctionId, firstSlot, lastSlot, bidId);

  const auctionParaId = `${paraId}-${firstSlot}-${lastSlot}-${auctionId}`;
  const auctionPara = await AuctionParachain.get(auctionParaId);
  if (!auctionPara) {
    const { id } = await Storage.save('AuctionParachain', {
      id: `${paraId}-${firstSlot}-${lastSlot}-${auctionId}`,
      parachainId,
      auctionId: auctionId?.toString(),
      firstSlot,
      lastSlot,
      createdAt,
      blockNum,
    });
    logger.info(`Create AuctionParachain: ${id}`);
  }
};
