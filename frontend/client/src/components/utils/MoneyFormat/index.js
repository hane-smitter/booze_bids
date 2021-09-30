function moneyFormatSupport(money) {
    if (isNaN(money)) return 'NaN';
    if (!!(typeof Intl == "object" && Intl && typeof Intl.NumberFormat == "function")) {
        return new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "KES"
        }).format(money);
    }
    return money;
}
const MoneyFormat = ( money ) => {
    let val = moneyFormatSupport(money);
    return val;
};
export default MoneyFormat;