'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Car, Plane, Mountain, Briefcase, ArrowRight } from 'lucide-react';
import styles from './Services.module.css';

const servicesData = [
    {
        title: 'City Taxi',
        desc: 'Quick and affordable rides within the city.',
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
        icon: Car,
        href: '/rides',
    },
    {
        title: 'Airport Transfer',
        desc: 'Hassle free airport pickup and drop.',
        image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=600&q=80',
        icon: Plane,
        href: '/airport',
    },
    {
        title: 'Outstation Trips',
        desc: 'Explore more with comfortable outstation rides.',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80',
        icon: Mountain,
        href: '/outstation',
    },
    {
        title: 'Corporate Travel',
        desc: 'Reliable travel for your business needs.',
        image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=600&q=80',
        icon: Briefcase,
        href: '/corporate',
    },
];

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            delay: i * 0.08,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

export default function Services() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className={styles.servicesSection}>
            {/* Section Header: Our Services & View All */}
            <div className={styles.sectionHeader}>
                <div className={styles.titleWrapper}>
                    <h2 className={styles.sectionTitle}>Our Services</h2>
                    <span className={styles.titleUnderline} />
                </div>
                <Link href="/services" className={styles.viewAllLink}>
                    View All <ArrowRight size={14} className={styles.viewAllArrow} />
                </Link>
            </div>

            {/* Grid */}
            <div className={styles.servicesGrid}>
                {servicesData.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <motion.article
                            key={item.title}
                            className={styles.serviceBox}
                            custom={idx}
                            variants={shouldReduceMotion ? undefined : cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <Link href={item.href} className={styles.cardLink}>
                                {/* Image Section */}
                                <div className={styles.serviceThumbWrap}>
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        className={styles.serviceImg}
                                    />
                                </div>

                                {/* Card Body */}
                                <div className={styles.serviceInfoRow}>
                                    {/* Round Orange Icon Badge */}
                                    <div className={styles.serviceIconPill}>
                                        <Icon size={18} strokeWidth={2.4} />
                                    </div>

                                    {/* Texts */}
                                    <div className={styles.serviceText}>
                                        <h3 className={styles.serviceTitle}>{item.title}</h3>
                                        <p className={styles.serviceDesc}>{item.desc}</p>
                                    </div>

                                    {/* Arrow CTA */}
                                    <div className={styles.arrowCTA}>
                                        <ArrowRight size={15} strokeWidth={2.2} />
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    );
                })}
            </div>
        </section>
    );
}