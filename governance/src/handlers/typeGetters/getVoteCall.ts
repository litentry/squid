// NOTE: this method is incomplete as will not work as is, but leaving it here to save a little time when we need it

// function getVoteCall(
//   ctx: ExtrinsicHandlerContext,
//   network: SubstrateNetwork
// ): {
//   refIndex: number;
//   vote: v1090.AccountVote;
// } {
//   switch (network) {
//     case SubstrateNetwork.phala: {
//       const extrinsic = new KhalaDemocracyVoteCall(ctx);
//       if (extrinsic.isV1) {
//         const { refIndex, vote } = extrinsic.asV1;
//         // switch is required to convince the compiler in correct type
//         switch (vote.__kind) {
//           case 'Standard':
//             return { refIndex, vote: { __kind: vote.__kind, ...vote.value } };
//           case 'Split':
//             return { refIndex, vote: { __kind: vote.__kind, ...vote.value } };
//         }
//       } else if (extrinsic.isV1090) {
//         const { refIndex, vote } = extrinsic.asV1090;
//         // switch is required to convince the compiler in correct type
//         switch (vote.__kind) {
//           case 'Standard':
//             return { refIndex, vote: { __kind: vote.__kind, ...vote.value } };
//           case 'Split':
//             return { refIndex, vote: { __kind: vote.__kind, ...vote.value } };
//         }
//       } else {
//         return extrinsic.asLatest;
//       }
//     }

//     default: {
//       throw new Error('getVoteExtrinsic::network not supported');
//     }
//   }
// }
