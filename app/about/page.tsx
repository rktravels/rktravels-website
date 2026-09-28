'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
    ShieldCheck,
    Clock,
    ThumbsUp,
    Award,
    Users2,
    Car,
    Headphones,
    CheckCircle2,
    ArrowRight,
} from 'lucide-react';
import PromoBanner from '@/components/home/PromoBanner';
import styles from './About.module.css';

const STATS = [
    { value: '10+', label: 'Years of Experience' },
    { value: '50K+', label: 'Happy Travelers' },
    { value: '150+', label: 'Verified Drivers' },
    { value: '4.9★', label: 'Average Rating' },
];

const CORE_VALUES = [
    {
        icon: <ShieldCheck size={22} strokeWidth={2.4} />,
        title: 'Safety First',
        desc: 'GPS-enabled fleet, SOS assistance, and thoroughly background-verified drivers.',
    },
    {
        icon: <Clock size={22} strokeWidth={2.4} />,
        title: 'Always On-Time',
        desc: 'Punctual door-to-door pickups with real-time flight and train tracking.',
    },
    {
        icon: <ThumbsUp size={22} strokeWidth={2.4} />,
        title: 'Clean & Sanitized',
        desc: 'Regularly serviced, immaculate vehicles providing a comfortable journey.',
    },
    {
        icon: <Headphones size={22} strokeWidth={2.4} />,
        title: '24/7 Support',
        desc: 'Round-the-clock dedicated customer assistance for uninterrupted travel.',
    },
];

const FLEET_TYPES = [
    {
        name: 'Economy Sedans',
        model: 'Dzire, Etios or equivalent',
        seats: '4 Passengers',
        desc: 'Ideal for city rides, daily commutes, and budget-friendly transfers.',
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    },
    {
        name: 'Premium Sedans',
        model: 'Honda City, Ciaz or equivalent',
        seats: '4 Passengers',
        desc: 'Executive-class travel for business meetings, airport drops, and VIP clients.',
        image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=600&q=80',
    },
    {
        name: 'Family SUVs',
        model: 'Innova Crysta, Ertiga',
        seats: '6–7 Passengers',
        desc: 'Spacious luggage capacity and premium legroom for long outstation tours.',
        image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=600&q=80',
    },
];

export default function AboutPage() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <main className={styles.aboutWrapper}>
            {/* Header unchanged from current navigation template */}


            {/* 1. HERO BANNER */}
            <section className={styles.heroSection}>
                <div className={styles.heroBgWrapper}>
                    <Image
                        src="/logo/rk-home.png"
                        alt="RK Travels Fleet Background"
                        fill
                        priority
                        sizes="100vw"
                        className={styles.heroBgImg}
                    />
                    <div className={styles.heroOverlay} />
                </div>

                <div className={styles.heroContent}>
                    <motion.div
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className={styles.heroTextWrap}
                    >
                        <span className={styles.heroEyebrow}>ABOUT RK TRAVELS</span>
                        <h1 className={styles.heroTitle}>
                            Driven by Trust, <br />
                            <span className={styles.highlightText}>Defined by Comfort</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            From daily local commutes to seamless airport journeys and scenic outstation
                            vacations, we deliver safe, transparent, and top-tier cab services across India.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. STATS BAR */}
            <section className={styles.statsSection}>
                <div className={styles.statsContainer}>
                    {STATS.map((stat, i) => (
                        <div key={i} className={styles.statBox}>
                            <strong className={styles.statValue}>{stat.value}</strong>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. STORY & MISSION */}
            <section className={styles.storySection}>
                <div className={styles.storyContainer}>
                    <div className={styles.storyLeft}>
                        <div className={styles.sectionHeader}>
                            <div className={styles.titleWrapper}>
                                <h2 className={styles.sectionTitle}>Our Mission &amp; Journey</h2>
                                <span className={styles.titleUnderline} />
                            </div>
                        </div>
                        <p className={styles.storyParagraph}>
                            Founded with the singular purpose of making highway and city transit dependable,
                            <strong> RK Travels</strong> has grown into a preferred choice for thousands of travelers,
                            corporate teams, and vacationing families.
                        </p>
                        <p className={styles.storyParagraph}>
                            We eliminate hidden charges, ride cancellations, and poorly maintained vehicles. Every
                            booking comes with verified drivers, upfront pricing, and round-the-clock dispatch
                            monitoring so you can travel without stress.
                        </p>

                        <ul className={styles.storyPointers}>
                            <li>
                                <CheckCircle2 size={18} className={styles.checkIcon} />
                                <span>Zero surge pricing on pre-booked airport and outstation transfers</span>
                            </li>
                            <li>
                                <CheckCircle2 size={18} className={styles.checkIcon} />
                                <span>24/7 dedicated support desk with live route tracking</span>
                            </li>
                            <li>
                                <CheckCircle2 size={18} className={styles.checkIcon} />
                                <span>Commercial licenses, insurance, and routine mechanical audits</span>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.storyRight}>
                        <div className={styles.storyCardGraphic}>
                            <div className={styles.storyBadge}>
                                <Award size={26} strokeWidth={2.4} />
                                <div>
                                    <strong>Trusted Quality</strong>
                                    <span>ISO Certified Standards</span>
                                </div>
                            </div>
                            <Image
                                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=700&q=80"
                                alt="RK Travels Road Journey"
                                fill
                                sizes="(max-width: 768px) 100vw, 500px"
                                className={styles.storyImg}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. CORE VALUES (2x2 on Mobile, 4-col on Desktop) */}
            <section className={styles.valuesSection}>
                <div className={styles.sectionHeaderCentered}>
                    <h2 className={styles.sectionTitle}>
                        Why Travel With <span className={styles.highlightText}>RK Travels?</span>
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        Our core pillars that ensure an effortless travel experience on every mile.
                    </p>
                </div>

                <div className={styles.valuesGrid}>
                    {CORE_VALUES.map((item, index) => (
                        <div key={index} className={styles.valueCard}>
                            <div className={styles.valueIconPill}>{item.icon}</div>
                            <h3 className={styles.valueTitle}>{item.title}</h3>
                            <p className={styles.valueDesc}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. OUR FLEET */}
            <section className={styles.fleetSection}>
                <div className={styles.sectionHeader}>
                    <div className={styles.titleWrapper}>
                        <h2 className={styles.sectionTitle}>Our Maintained Fleet</h2>
                        <span className={styles.titleUnderline} />
                    </div>
                    <Link href="/rides" className={styles.viewAllLink}>
                        Explore All Cabs <ArrowRight size={14} className={styles.viewAllArrow} />
                    </Link>
                </div>

                <div className={styles.fleetGrid}>
                    {FLEET_TYPES.map((fleet, i) => (
                        <div key={i} className={styles.fleetCard}>
                            <div className={styles.fleetImgWrap}>
                                <Image
                                    src={fleet.image}
                                    alt={fleet.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className={styles.fleetImg}
                                />
                                <span className={styles.fleetSeatBadge}>{fleet.seats}</span>
                            </div>
                            <div className={styles.fleetBody}>
                                <h3 className={styles.fleetName}>{fleet.name}</h3>
                                <span className={styles.fleetModel}>{fleet.model}</span>
                                <p className={styles.fleetDesc}>{fleet.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. PROMO BANNER CTA */}
            <PromoBanner />
        </main>
    );
}