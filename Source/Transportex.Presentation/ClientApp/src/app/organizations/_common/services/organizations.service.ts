'use server';

import axios from "axios";
import { getAccessToken } from "@/common/utils/sessionTokenAccessor";

export const GetUserGroups = async (): Promise<any> => {
    const url = "http://localhost:25990/Api/V1/Identity/Users/419e450d-6806-48ad-92b1-8cb66e52cc7b/Groups";
    const token = await getAccessToken();

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(resp => resp.data)
        .catch(error => Promise.reject(error));

    return response;
};
