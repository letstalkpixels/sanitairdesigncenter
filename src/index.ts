import AddressLookup from './abilities/address-lookup';

class SDC {
    public init(): void {
        new AddressLookup().init();
    }
}

(() => {
    new SDC().init();
})();
