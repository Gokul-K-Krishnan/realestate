
'use strict';



/**
 * Buying Real Estate
 * @param {org.acme.landregistry.PropertyLedger} trade
 * @transaction
 */

function buyingRealEstate( trade ){

  // Check if the buyer has enough to pay the notary, real estate agent and insurance
  if( trade.property.owner === trade.seller ){
    trade.property.owner = trade.buyer
    
    return getAssetRegistry('org.acme.landregistry.Property')
    .then(function (assetRegistry) {

        // Update the asset in the asset registry.
        return assetRegistry.update(trade.property);
    });
  }
  else {
    throw new Error('Property cannot be sold')
  }

}


