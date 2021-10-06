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
    let n = val.length;
    let valStrim = val.substr(0,n-3);
    let vaStrim2 = valStrim.substr(3,n);
    return vaStrim2+'/=';
};
export default MoneyFormat;