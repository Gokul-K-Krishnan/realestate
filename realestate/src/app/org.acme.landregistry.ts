import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.acme.landregistry{
   export class Individual extends Participant {
      id: string;
      name: string;
   }
   export class Property extends Asset {
      id: string;
      info: string;
      mls: number;
      url: string;
      location: string;
      owner: Individual;
   }
   export class PropertyLedger extends Transaction {
      buyer: Individual;
      seller: Individual;
      property: Property;
   }
// }
