import { getUniqueId } from 'react-native-device-info';
const ip = "127.0.0.1:8080"
const uniqueId = getUniqueId();

export const api = {
    videoRecommend: `http://${ip}/recommendvideo?id=${uniqueId}&limits=15`,
    videoPlay: `http://${ip}/video?id=${uniqueId}&name=`,
    getCover: `http://${ip}/cover?id=${uniqueId}&name=`,
}