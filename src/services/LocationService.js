import provinceAPI from "~/apis/provinceAPI/provinceAPI";

export const parseToAddress = ({
  provinceId,
  districtId,
  wardId,
  detailAddress,
}) => {
  console.log(provinceId);
  console.log(districtId);
  console.log(wardId);
  let result = "";
  result = detailAddress != null ? detailAddress : "";

  const getData = async () => {
    const provinceRes = await provinceAPI.getProvince(provinceId);
    const districtRes = await provinceAPI.getDistrict(districtId);
    const wardRes = await provinceAPI.getWard(wardId);

    result += wardRes.status === 200 ? wardRes.name + ", " : "";
    result += districtRes.status === 200 ? districtRes.name + ", " : "";
    result += provinceRes.status === 200 ? provinceRes.name + ", " : "";
  };

  getData();

  console.log(result);

  return result;
};
