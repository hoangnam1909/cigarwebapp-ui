import axios from "axios";
import { useEffect, useState } from "react";

function LocationSelect({ setLocation }) {
  const [provinces, setProvinces] = useState();
  const [districts, setDistricts] = useState();
  const [wards, setWards] = useState();

  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();

  const getProvinces = async () => {
    const res = await axios.get("https://provinces.open-api.vn/api/p/");
    if (res.status === 200) setProvinces(res.data);
  };

  useEffect(() => {
    setLocation(
      `${ward ? ward.name + ", " : ""}
      ${district ? district.name + ", " : ""}
      ${province ? province.name : ""}`
    );
  }, [province, district, ward]);

  useEffect(() => {
    getProvinces();
  }, []);

  useEffect(() => {
    if (province?.code != 0 && province != null) {
      const getDistricts = async () => {
        const res = await axios.get(
          `https://provinces.open-api.vn/api/p/${province.code}?depth=2`
        );
        if (res.status === 200) setDistricts(res.data.districts);
      };

      getDistricts();
    }

    setDistricts();
    setWards();
  }, [province]);

  useEffect(() => {
    if (district?.code != 0 && district != null) {
      const getWards = async () => {
        const res = await axios.get(
          `https://provinces.open-api.vn/api/d/${district.code}?depth=2`
        );
        if (res.status === 200) setWards(res.data.wards);
      };

      getWards();
    }

    setWards();
  }, [district]);

  return (
    <div className="row g-2 mb-3">
      <div className="col-md mt-md-2">
        <select
          className="form-select"
          defaultValue={"0"}
          onChange={(e) => {
            let value = e.target.value;
            if (value != 0) {
              setProvince({
                code: value.split("|")[0],
                name: value.split("|")[1],
              });
            } else {
              setProvince();
            }
            setDistrict();
            setWard();
          }}
        >
          <option value="0">Chọn Tỉnh Thành</option>
          {provinces?.map((province, index) => {
            return (
              <option key={index} value={`${province.code}|${province.name}`}>
                {province.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="col-md mt-3 mt-md-2">
        <select
          className="form-select"
          defaultValue={"0"}
          onChange={(e) => {
            let value = e.target.value;
            if (value != 0) {
              setDistrict({
                code: value.split("|")[0],
                name: value.split("|")[1],
              });
            } else {
              setDistrict();
            }
            setWard();
          }}
        >
          <option value="0">Chọn Quận Huyện</option>
          {districts?.map((district, index) => {
            return (
              <option key={index} value={`${district.code}|${district.name}`}>
                {district.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="col-md mt-3 mt-md-2">
        <select
          className="form-select"
          defaultValue={"0"}
          onChange={(e) => {
            let value = e.target.value;
            if (value != 0) {
              setWard({
                code: value.split("|")[0],
                name: value.split("|")[1],
              });
            } else {
              setWard();
            }
          }}
        >
          <option value="0">Chọn Phường Xã</option>
          {wards?.map((ward, index) => {
            return (
              <option key={index} value={`${ward.code}|${ward.name}`}>
                {ward.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default LocationSelect;
