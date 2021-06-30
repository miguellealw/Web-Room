// add ... to long string
export function truncateString(str: string, maxSize: number) {
  // return (str.length > maxSize) ? `${str.substr(0, maxSize-1)}&hellip;` : str;
  return str.length > maxSize ? `${str.substr(0, maxSize - 1)}...` : str;
}

export function numberWithCommas(x: number) {
  // return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  let xStr = x.toString();

  // NOTE: find better way of doing this
  if (x > 0 && x < 999) {
    // 0 - 999
    // i.e 235 -> 235 Subscribers
    return x;
  } else if (x > 1000 && x < 9999) {
    // 1,000 - 9,999
    // i.e. 3,320 -> 3.32K Subscribers
    let dotLoc = 1
    return xStr.substring(0, dotLoc) + "." + xStr.substring(++dotLoc) + "K"
  } else if (x > 10000 && x < 99999) {
    // 10,000 - 99,999
    // i.e. 26,700 -> 26.7K Subscribers
    let dotLoc = 2
    return xStr.substring(0, dotLoc) + "." + xStr.substring(dotLoc, ++dotLoc) + "K"
  } else if (x > 100000 && x < 999999) {
    // 100,000 - 999,999
    // i.e. 174,000 -> 174K Subscribers
    let dotLoc = 3
    return xStr.substring(0, dotLoc) + "K"
  } else if (x > 1000000 && x < 9999999) {
    // 1,000,000 - 9,999,999
    // i.e. 2,710,000 -> 2.71M Subscribers
    let dotLoc = 1
    return xStr.substring(0, dotLoc) + "." + xStr.substring(dotLoc, ++dotLoc) + "M"
  } else if (x > 10000000 && x < 99999999) {
    // 10,000,000 - 99,999,999
    // i.e. 14,300,000 -> 14.3M Subscribers
    let dotLoc = 2
    return xStr.substring(0, dotLoc) + "." + xStr.substring(dotLoc, ++dotLoc) + "M"
  } else {
    // > 100,000,00
    // i.e. 112,000,000 -> 112M Subscribers
    let dotLoc = 3
    return xStr.substring(0, dotLoc) + "M"
  }


}
