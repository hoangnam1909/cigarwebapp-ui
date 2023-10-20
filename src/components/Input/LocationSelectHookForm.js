import axios from "axios";
import { useEffect, useState } from "react";

function LocationSelectHookForm({ setValue }) {
  const [provinces, setProvinces] = useState();
  const [districts, setDistricts] = useState();
  const [wards, setWards] = useState();

  const [province, setProvince] = useState({
    code: "0",
    name: "",
  });
  const [district, setDistrict] = useState({
    code: "0",
    name: "",
  });
  const [ward, setWard] = useState({
    code: "0",
    name: "",
  });

  const getProvinces = async () => {
    const res = await axios.get("https://provinces.open-api.vn/api/p/");
    if (res.status === 200) setProvinces(res.data);
  };

  useEffect(() => {
    let address = "";

    address += ward.name.length > 0 ? ward.name + ", " : "";
    address += district.name.length > 0 ? district.name + ", " : "";
    address += province.name.length > 0 ? province.name : "";

    setValue("address", address);
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
          required
          onChange={(e) => {
            let value = e.target.value;
            if (value != 0) {
              setProvince({
                code: value.split("|")[0],
                name: value.split("|")[1],
              });
            } else {
              setProvince({
                code: "0",
                name: "",
              });
            }
            setDistrict({
              code: "0",
              name: "",
            });
            setWard({
              code: "0",
              name: "",
            });
          }}
        >
          <option value="0">Chọn Tỉnh Thành</option>
          {provinces?.map((p) => {
            return (
              <option
                key={p.code}
                value={`${p.code}|${p.name}`}
                selected={p.code == province.code}
              >
                {p.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="col-md mt-3 mt-md-2">
        <select
          className="form-select"
          required
          onChange={(e) => {
            let value = e.target.value;
            if (value != 0) {
              setDistrict({
                code: value.split("|")[0],
                name: value.split("|")[1],
              });
            } else {
              setDistrict({
                code: "0",
                name: "",
              });
            }
            setWard({
              code: "0",
              name: "",
            });
          }}
        >
          <option selected>Chọn Quận Huyện</option>
          {districts?.map((d) => {
            return (
              <option
                key={d.code}
                value={`${d.code}|${d.name}`}
                selected={d.code == district.code}
              >
                {d.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="col-md mt-3 mt-md-2">
        <select
          className="form-select"
          onChange={(e) => {
            let value = e.target.value;
            if (value != 0) {
              setWard({
                code: value.split("|")[0],
                name: value.split("|")[1],
              });
            } else {
              setWard({
                code: "0",
                name: "",
              });
            }
          }}
        >
          <option value="0">Chọn Phường Xã</option>
          {wards?.map((w) => {
            return (
              <option
                key={w.code}
                value={`${w.code}|${w.name}`}
                selected={w.code == ward.code}
              >
                {w.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default LocationSelectHookForm;
