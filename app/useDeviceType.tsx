// useDeviceType.js
"use client"
import {useState, useEffect} from 'react';

const useDeviceType = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const userAgent = navigator.userAgent;
        // 使用正则表达式来检测常见的移动设备用户代理
        const mobileRegex = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
        const isMobileDevice = mobileRegex.test(userAgent.toLowerCase());

        setIsMobile(isMobileDevice);
    }, []);

    return isMobile;
};

export default useDeviceType;