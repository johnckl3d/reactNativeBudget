export const nFormatter = (num, digits) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};

/*
 * Tests
 */
//   const tests = [
//     { num: 0, digits: 1 },
//     { num: 12, digits: 1 },
//     { num: 1234, digits: 1 },
//     { num: 100000000, digits: 1 },
//     { num: 299792458, digits: 1 },
//     { num: 759878, digits: 1 },
//     { num: 759878, digits: 0 },
//     { num: 123, digits: 1 },
//     { num: 123.456, digits: 1 },
//     { num: 123.456, digits: 2 },
//     { num: 123.456, digits: 4 }
//   ];
//   tests.forEach(function(test) {
//     console.log("nFormatter(" + test.num + ", " + test.digits + ") = " + nFormatter(test.num, test.digits));
// });

export const extractCostCategoryList = (budget) => {
  var result = [];
  const ccArr = budget.costCategories.slice();
  //console.log("extractCostCategoryList::ccArr::" + JSON.stringify(ccArr));
  for (let i = 0; i < ccArr.length; i++) {
    const obj = {
      label: ccArr[i].name,
      value: ccArr[i].costCategoryId,
    };
    result.push(obj);
    // console.log(
    //   "extractCostCategoryList::result[i]::" + JSON.stringify(result[i])
    // );
  }
  //console.log("extractCostCategoryList::result::" + JSON.stringify(result));
  return result;
};
