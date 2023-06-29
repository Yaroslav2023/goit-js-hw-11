import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
let page = "";

async function searchImg (query) {
    page = 1;
try {
    const response = await axios.get(`${BASE_URL}`, { params: {
        key: '37885243-7291bb9e2bd4e4c8b3d9bfd2b',
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        q: query,
        per_page: 40,
        page: 1,
    }});
    return response;
} catch (error) {
    console.warn(error);
}
return


};

async function loadMoreImgApi (query) {
    page += 1;

    try {
        const response = await axios.get(`${BASE_URL}`, { params: {
            key: '37885243-7291bb9e2bd4e4c8b3d9bfd2b',
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            q: query,
            per_page: 40,
            page: page,
        }
        });
        return response
    } catch (error) {
        console.error(error);
    }
    
};

export { searchImg, loadMoreImgApi };


// const API_KEY = "37885243-7291bb9e2bd4e4c8b3d9bfd2b";
// const IMAGE_TYPE = "photo";
// const IMG_ORIENTATION = "horizontal";
// const SAFE_SEARCH = true;

// try {
//     const response = await axios.get(`${BASE_URL}`, { params: {
//         key: '37885243-7291bb9e2bd4e4c8b3d9bfd2b',
//         image_type: "photo",
//         orientation: "horizontal",
//         safesearch: true,
//         q: query,
//         per_page: 40,
//         page: page,
//     }});
//     page += 1;
//     return response
// } catch (error) {
//     return error;
// }
