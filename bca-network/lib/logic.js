/**
 * Track the trade of a commodity from one trader to another
 * @param {org.bca.bcanetwork.Trade} trade - the trade to be processed
 * @transaction
 */
 async function transactAssetOwner(trade) {
    trade.busasset.owner = trade.newOwner;
    let assetRegistry = await getAssetRegistry('org.bca.bcanetwork.BusAsset');
    await assetRegistry.update(trade.busasset);
}
