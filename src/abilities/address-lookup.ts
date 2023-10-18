export default class AddressLookup {
    private readonly debounceTime = 250;

    private zipCodeInput: HTMLInputElement | null = null;
    private houseNumberInput: HTMLInputElement | null = null;

    private cityResultInput: HTMLInputElement | null = null;
    private streetResultInput: HTMLInputElement | null = null;

    private debounceTimeout: number | null = null;

    public init(): void {
        this.zipCodeInput = document.querySelector(
            '[data-address-lookup="zip-code"]',
        );
        this.houseNumberInput = document.querySelector(
            '[data-address-lookup="house-number"]',
        );

        this.cityResultInput = document.querySelector(
            '[data-address-lookup="city-result"]',
        );
        this.streetResultInput = document.querySelector(
            '[data-address-lookup="street-result"]',
        );

        [this.zipCodeInput, this.houseNumberInput].forEach(element => {
            element?.addEventListener(
                'change',
                this.onLookupValuesChanged.bind(this),
            );
            element?.addEventListener(
                'keyup',
                this.onLookupValuesChanged.bind(this),
            );
        });
    }

    private onLookupValuesChanged(): void {
        const zipCode = this.zipCodeInput?.value;
        const houseNumber = this.houseNumberInput?.value;

        if (zipCode && this.isZipCode(zipCode) && houseNumber) {
            this.debouncedLookupAddress(zipCode, houseNumber);
        }
    }

    private debouncedLookupAddress(zipCode: string, houseNumber: string): void {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }

        this.debounceTimeout = window.setTimeout(() => {
            this.lookupAddress(zipCode, houseNumber);
        }, this.debounceTime);
    }

    private async lookupAddress(
        zipCode: string,
        houseNumber: string,
    ): Promise<void> {
        const lookupUrl = `https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?fq=postcode:${zipCode
            .replace(' ', '')
            .trim()}&fq=huisnummer:${houseNumber}`;

        const response = await fetch(lookupUrl, {
            method: 'GET',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
            },
        }).catch(error => error);

        if (response instanceof Error) {
            return;
        }

        const data = await (response as Response).json();

        if (data?.response?.docs?.length > 0) {
            this.processLookupResult(data?.response?.docs);
        }
    }

    private processLookupResult(
        lookupResults: { woonplaatsnaam: string; straatnaam: string }[],
    ): void {
        const [bestMatch] = lookupResults;

        this.cityResultInput!.value = bestMatch?.woonplaatsnaam ?? '';
        this.streetResultInput!.value = bestMatch?.straatnaam ?? '';
    }

    private isZipCode(zipCode: string): boolean {
        return /^\d{4}\s?[a-zA-Z]{2}$/.test(zipCode);
    }
}
