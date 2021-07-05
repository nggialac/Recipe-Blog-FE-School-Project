import http from "../apis/http-common";

const getAllCategory = () => {
    return http.get("foodcategory/all/recipe");
}

export default {
    getAllCategory,
}