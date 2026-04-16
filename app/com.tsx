"use client";
import { useEffect, useRef } from "react";
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export default function Page2() {

    useEffect(() => {
        setTimeout(() => {
            Haptics.impact({ style: ImpactStyle.Heavy }); // ✅ works after delay
            console.log('111111');
        }, 4000);
    }, [])

    return (
        <>
           
        </>
    );
}