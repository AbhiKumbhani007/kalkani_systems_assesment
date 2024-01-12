export const generateQueryString = (queryObj: any) => {
  let queryStr = "?";
  for (let key in queryObj) {
    if (queryObj[key] !== "") {
      queryStr += `${key}=${queryObj[key]}&`;
    }
  }
  return queryStr.slice(0, -1);
};

export const formatNumber = (num: number) => {
  return num?.toString()?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
