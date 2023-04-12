import axios from "axios";

// 상품 데이터를 가져오는 함수
export const fetchProducts = async () => {
  const response = await axios.get("http://127.0.0.1:8000/api/v1/products/");
  return response.data || [];
};

// 매장 데이터를 가져오는 함수
export const fetchStores = async () => {
  const response = await axios.get("http://127.0.0.1:8000/api/v1/stores/");
  return response.data;
};
