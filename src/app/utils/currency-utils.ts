class CurrencyUtils {
    private readonly formatter: Intl.NumberFormat;

    constructor() {
        this.formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
        });
    }

    public toEur(amount: number): string {
        return this.formatter.format(amount / 100);
    }
}

const currencyUtils: CurrencyUtils = new CurrencyUtils();

export { CurrencyUtils, currencyUtils };
