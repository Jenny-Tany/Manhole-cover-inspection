import request from "./request";
export const fetchPhoto = (pageNum, pageSize, userName) => {
  return request.get(`/photos`, {
    params: {
      page_num: pageNum,
      pageSize: pageSize,
      userName: userName,
    },
  });
};
