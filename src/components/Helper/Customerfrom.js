import { axiosPrivate } from './axios';

export const customerfromsubmitByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/customerinformations', payloadData);
    return res.data;
};
export const uploadProductApi = async (payloadData, product) => {
    let res = await axiosPrivate.post('/fileuploads/' + product + '/upload', payloadData);
    return res.data;
};
export const ProductinformationApi = async () => {
    let res = await axiosPrivate.get('/customerinformations');
    return res.data;
};
