'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Users2, IndianRupee, Headphones, ArrowRight, Star } from 'lucide-react';
import styles from './PromoBanner.module.css';

const WHY_CHOOSE_ITEMS = [
    {
        icon: <Users2 size={20} strokeWidth={2.3} />,
        title: 'Wide Range',
        sub: 'of Vehicles',
    },
    {
        icon: <IndianRupee size={19} strokeWidth={2.5} />,
        title: 'Best Price',
        sub: 'Guaranteed',
    },
    {
        icon: <Headphones size={19} strokeWidth={2.3} />,
        title: '24/7',
        sub: 'Customer Support',
    },
    {
        icon: <Star size={19} strokeWidth={2.3} fill="#ff6600" />,
        title: 'Safe &',
        sub: 'Reliable Rides',
    },
];

export default function PromoBanner() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className={styles.promoSection}>
            {/* 1. DESKTOP VIEW (Strictly Preserved) */}
            <motion.div
                className={styles.desktopBannerWrapper}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* 1. Desktop Background */}
                <div className={styles.bgImageLayer} style={{ position: 'absolute', inset: 0 }}>
                    <Image
                        src="/logo/rk-home.png"
                        alt="RK Travels Fleet"
                        fill
                        unoptimized
                        className={styles.bgImg}
                        priority
                    />
                    <div className={styles.bgFadeOverlay} />
                </div>

                <div className={styles.bannerContent}>
                    <div className={styles.bannerLeft}>
                        <h2 className={styles.bannerHeading}>
                            Comfortable Rides <br />
                            <span className={styles.highlightText}>for Every Journey</span>
                        </h2>
                        <p className={styles.bannerSubtext}>
                            Book your next ride with RK Travels and experience safe,
                            reliable and affordable travel.
                        </p>
                    </div>

                    <div className={styles.bannerMiddle}>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIconBadge}>
                                <Users2 size={16} strokeWidth={2.4} />
                            </div>
                            <div className={styles.featureText}>
                                <strong>Wide Range</strong>
                                <span>of Vehicles</span>
                            </div>
                        </div>

                        <div className={styles.featureItem}>
                            <div className={styles.featureIconBadge}>
                                <IndianRupee size={15} strokeWidth={2.6} />
                            </div>
                            <div className={styles.featureText}>
                                <strong>Best Price</strong>
                                <span>Guaranteed</span>
                            </div>
                        </div>

                        <div className={styles.featureItem}>
                            <div className={styles.featureIconBadge}>
                                <Headphones size={15} strokeWidth={2.4} />
                            </div>
                            <div className={styles.featureText}>
                                <strong>24/7</strong>
                                <span>Customer Support</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.bannerRight}>
                        <button type="button" className={styles.bookActionBtn}>
                            <span>Book Now</span>
                            <ArrowRight size={15} strokeWidth={2.4} />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* 2. MOBILE VIEW (320px to 425px) Exact match */}
            <div className={styles.mobileContainer}>
                {/* Top Dark Scenic Card */}
                <div className={styles.mobileSpecialCard} style={{ position: 'relative' }}>
                    <Image
                        src="/logo/rk-home.png"
                        alt="Outstation Trips Offer"
                        fill
                        unoptimized
                        className={styles.mobileCardBg}
                        priority
                    />
                    <div className={styles.mobileCardDarkOverlay} />
                    <div className={styles.mobileCardContent}>
                        {/* Tagline */}
                        <div className={styles.specialOfferTag}>
                            <span className={styles.orangeDash} />
                            SPECIAL OFFER
                        </div>

                        {/* Title */}
                        <h2 className={styles.mobileOfferTitle}>
                            Outstation Trips <br />
                            <span className={styles.mobileOfferHighlight}>Up to 20% Off</span>
                        </h2>

                        {/* Subtitle */}
                        <p className={styles.mobileOfferSubtext}>
                            Plan your weekend getaways with RK Travels.
                        </p>

                        {/* Book Now Button */}
                        <button type="button" className={styles.mobileBookBtn}>
                            <span>Book Now</span>
                            <ArrowRight size={14} strokeWidth={2.4} />
                        </button>
                    </div>
                </div>

                {/* Why Choose RK Travels Section */}
                <div className={styles.mobileWhyChooseWrap}>
                    <h3 className={styles.whyChooseHeading}>
                        Why Choose <span className={styles.whyChooseHighlight}>RK Travels?</span>
                    </h3>

                    {/* 4 Feature Items */}
                    <div className={styles.mobileFeatureRow}>
                        {WHY_CHOOSE_ITEMS.map((item, idx) => (
                            <div key={idx} className={styles.mobileFeatureCol}>
                                <div className={styles.mobileFeatureBadge}>
                                    {item.icon}
                                </div>
                                <strong className={styles.mobileFeatureTitle}>{item.title}</strong>
                                <span className={styles.mobileFeatureSub}>{item.sub}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}