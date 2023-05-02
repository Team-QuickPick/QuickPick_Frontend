import axiosInstance from "./axiosConfig";

// 상품 데이터를 가져오는 함수
export const fetchProducts = async () => {
  const response = await axiosInstance.get("products/");
  return response.data || [];
};

// 매장 데이터를 가져오는 함수
export const fetchStores = async () => {
  const response = await axiosInstance.get("stores/");
  return response.data;
};
