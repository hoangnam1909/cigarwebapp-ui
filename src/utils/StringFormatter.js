export function formatPhoneNumber(phoneNumberString) {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);
  if (match) {
    return match[1] + " " + match[2] + " " + match[3];
  }
  return null;
}

export const removeVietnameseAccent = (vietnameseString) => {
  let str = vietnameseString;

  str = str.replaceAll(/á|à|ả|ã|ạ|â|ấ|ầ|ẫ|ẩ|ậ|ă|ắ|ằ|ẳ|ẵ|ặ/g, "a");
  str = str.replaceAll(/đ/g, "d");
  str = str.replaceAll(/é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/g, "e");
  str = str.replaceAll(/í|ì|ỉ|ĩ|ị/g, "i");
  str = str.replaceAll(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, "u");
  str = str.replaceAll(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/g, "o");
  str = str.replaceAll(/ý|ỳ|ỷ|ỹ|ỵ/g, "y");

  return str;
};

export const nameNormalization = (str) => {
  let arr = str.trim().replace(/\s\s+/g, " ").split(" ");

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2;
};
