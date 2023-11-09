import AddressLookup from './abilities/address-lookup';
import { OpenGraphUrl } from './abilities/open-graph-url';

class SDC {
    public init(): void {
        new AddressLookup().init();
        new OpenGraphUrl().init();
    }
}

(() => {
    new SDC().init();
})();
