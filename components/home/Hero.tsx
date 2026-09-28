'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, IndianRupee, Clock, ThumbsUp } from 'lucide-react';
import BookingWidget from './BookingWidget';
import styles from './Hero.module.css';

const MOBILE_USPS = [
    {
        icon: <ShieldCheck size={18} strokeWidth={2.5} />,
        title: 'Verified Drivers',
        desc: 'Trusted & Trained',
    },
    {
        icon: <IndianRupee size={17} strokeWidth={2.5} />,
        title: 'Transparent Pricing',
        desc: 'No Hidden Charges',
    },
    {
        icon: <ThumbsUp size={17} strokeWidth={2.5} />,
        title: 'Clean & Comfortable',
        desc: 'Well Maintained Cars',
    },
    {
        icon: <Clock size={18} strokeWidth={2.5} />,
        title: 'On-Time Service',
        desc: 'Always Reliable',
    },
];

export default function Hero() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className={styles.heroSection}>
            {/* 1. Full Panoramic Background */}
            <div className={styles.bgWrapper} style={{ position: 'absolute' }}>
                <Image
                    src="/logo/rk-home.png"
                    alt="RK Travels Airport Panorama"
                    fill
                    priority
                    sizes="100vw"
                    className={styles.bgImg}
                />
                <div className={styles.leftGradientFade} />
            </div>

            <div className={styles.contentContainer}>
                {/* 2. Left Column: Headings & Booking Widget */}
                <motion.div
                    className={styles.leftCol}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className={styles.heroTitleWrap}>
                        <div className={styles.mobileEyebrow}>SAFE • RELIABLE • AFFORDABLE</div>
                        <h1 className={styles.heroTitle}>
                            Your Journey <br />
                            <span className={styles.highlightWord}>Our Priority</span>
                        </h1>
                        <p className={styles.heroSub}>
                            Book a taxi for your city rides, airport transfers or outstation trips with RK Travels.
                        </p>
                    </div>

                    <BookingWidget />
                </motion.div>

                {/* 3. Desktop USP Ribbon (Strictly Unchanged) */}
                <motion.div
                    className={styles.rightCol}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className={styles.uspStrip}>
                        <div className={styles.uspItem}>
                            <ShieldCheck size={28} strokeWidth={2.2} className={styles.uspIcon} />
                            <div className={styles.uspText}>
                                <strong>Verified Drivers</strong>
                                <span>Trusted &amp; Trained</span>
                            </div>
                        </div>
                        <div className={styles.uspDivider} />

                        <div className={styles.uspItem}>
                            <IndianRupee size={28} strokeWidth={2.4} className={styles.uspIcon} />
                            <div className={styles.uspText}>
                                <strong>Transparent Pricing</strong>
                                <span>No Hidden Charges</span>
                            </div>
                        </div>
                        <div className={styles.uspDivider} />

                        <div className={styles.uspItem}>
                            <Clock size={28} strokeWidth={2.2} className={styles.uspIcon} />
                            <div className={styles.uspText}>
                                <strong>On-Time Service</strong>
                                <span>Always Reliable</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 4. Mobile 4-Column USP Bar */}
                <div className={styles.mobileUspGrid}>
                    {MOBILE_USPS.map((item, idx) => (
                        <div key={idx} className={styles.mobileUspItem}>
                            <div className={styles.mobileUspIconBadge}>
                                {item.icon}
                            </div>
                            <strong className={styles.mobileUspTitle}>{item.title}</strong>
                            <span className={styles.mobileUspDesc}>{item.desc}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}