/*
 * @Author: Dhx
 * @Date: 2023-12-24 05:22:24
 * @Description: 
 * @FilePath: \RvcWeb\src\utils\preload.ts
 */
// 图片预加载

import {getTeam, getTools} from "@/api/home/introAPI.ts";

interface Tools {
    id: number;
    img: string;
    tool: string;
    url: string;
}

interface Team {
    id: number;
    avatar: string;
    description: string;
    nickname: string;
    role: string;
}

export const preloadImages = async () => {
    const toolsData = await getTools();
    const teamsData = await getTeam();

    const toolImageUrls = (toolsData.data as Tools[]).map(tool => tool.img);
    const teamAvatarUrls = (teamsData.data as Team[]).map(team => team.avatar);
    await Promise.all([
        preloadImageArray(toolImageUrls),
        preloadImageArray(teamAvatarUrls),
    ]);
};

const preloadImageArray = (imageUrls: string[]) => {
    const promises = imageUrls.map(url => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = url;
        });
    });

    return Promise.all(promises);
};