"use client";

import gsap from 'gsap';
import { type LenisRef, ReactLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<LenisRef>(null)

    useEffect(() => {
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
        }

        gsap.ticker.add(update)

        return () => gsap.ticker.remove(update)
    }, []);

    return (
        <ReactLenis ref={lenisRef} root>
            {children}
        </ReactLenis>
    )
}

