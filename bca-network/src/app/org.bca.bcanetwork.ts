import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.bca.bcanetwork{
   export class BusAsset extends Asset {
      assetID: string;
      nameOfAsset: string;
      isStressed: boolean;
      assetList: string;
      marketValue: number;
      termID: string;
      Description: string;
      auditDate: string;
      auditReport: string;
      auditrating: number;
      diligenceDate: string;
      diligenceReport: string;
      diligenceRating: number;
      owner: Trader;
   }
   export class Inventory {
   }
   export class Terms {
   }
   export class Audit {
   }
   export class Diligence {
   }
   export class Trader extends Participant {
      tradeId: string;
      firstName: string;
      lastName: string;
      houseNumber: string;
      street: string;
      city: string;
      country: string;
   }
   export class Address {
   }
   export class Trade extends Transaction {
      busasset: BusAsset;
      newOwner: Trader;
   }
// }
