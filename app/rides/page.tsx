'use client';

import React from 'react';

import PromoBanner from '@/components/home/PromoBanner';

export default function RidesPage() {
    return (
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            <div style={{ padding: '4rem 1.5rem', textAlign: 'center', flex: 1 }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0e1e2d', marginBottom: '0.5rem' }}>
                    City &amp; Outstation Rides
                </h1>
                <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                    Explore our complete fleet options and reliable ride booking.
                </p>
            </div>
            <PromoBanner />

        </main>
    );
}