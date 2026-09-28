'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    PhoneCall,
    Mail,
    MapPin,
    Clock,
    ArrowRight,
    ShieldCheck,
    Heart,
} from 'lucide-react';
import styles from './Footer.module.css';

const QUICK_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'City Rides', href: '/rides' },
    { label: 'Outstation Trips', href: '/outstation' },
    { label: 'Airport Transfers', href: '/airport' },
    { label: 'Tour Packages', href: '/tour-packages' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
];

const POPULAR_ROUTES = [
    'Bangalore to Mysore Cabs',
    'Chennai to Pondicherry Cabs',
    'Delhi to Agra One-Way',
    'Mumbai to Pune Express',
    'Hyderabad to Vijayawada',
    'Bangalore to Coorg Holiday',
];

export default function Footer() {
    return (
        <footer className={styles.footer}>
            {/* Top Value Assurance Ribbon */}
            <div className={styles.ribbonWrapper}>
                <div className={styles.ribbonContainer}>
                    <div className={styles.ribbonItem}>
                        <div className={styles.ribbonIconBadge}>
                            <ShieldCheck size={20} strokeWidth={2.4} />
                        </div>
                        <div>
                            <strong>100% Verified Drivers</strong>
                            <span>Licensed, background checked &amp; trained</span>
                        </div>
                    </div>

                    <div className={styles.ribbonDivider} />

                    <div className={styles.ribbonItem}>
                        <div className={styles.ribbonIconBadge}>
                            <Clock size={20} strokeWidth={2.4} />
                        </div>
                        <div>
                            <strong>On-Time Guaranteed</strong>
                            <span>Punctual doorstep pickups 24/7</span>
                        </div>
                    </div>

                    <div className={styles.ribbonDivider} />

                    <div className={styles.ribbonItem}>
                        <div className={styles.ribbonIconBadge}>
                            <PhoneCall size={20} strokeWidth={2.4} />
                        </div>
                        <div>
                            <strong>24x7 Customer Support</strong>
                            <span>Immediate live dispatch assistance</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Links & Info Grid */}
            <div className={styles.mainFooterContainer}>
                <div className={styles.footerGrid}>
                    {/* Column 1: Brand Info & Bio */}
                    <div className={styles.brandCol}>
                        <Link href="/" className={styles.logoLink} aria-label="RK Travels Home">
                            <div className={styles.logoImageWrap}>
                                <Image
                                    src="/logo/rk-logo.PNG"
                                    alt="RK Travels"
                                    width={220}
                                    height={60}
                                    style={{ width: 'auto', height: '100%' }}
                                    className={styles.logoImage}
                                />
                            </div>
                        </Link>
                        <p className={styles.brandBio}>
                            Your trusted travel companion for local cab bookings, swift airport pickups, and
                            unforgettable outstation road trips across India with upfront pricing and zero surge fees.
                        </p>
                        <div className={styles.supportBadge}>
                            <div className={styles.badgePulseDot} />
                            <span>Dispatch Desk: <strong>Available 24/7</strong></span>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className={styles.linksCol}>
                        <div className={styles.colHeader}>
                            <h4 className={styles.colTitle}>Quick Links</h4>
                            <span className={styles.colUnderline} />
                        </div>
                        <ul className={styles.linksList}>
                            {QUICK_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={styles.footerLink}>
                                        <ArrowRight size={13} className={styles.linkArrow} />
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Popular Routes */}
                    <div className={styles.routesCol}>
                        <div className={styles.colHeader}>
                            <h4 className={styles.colTitle}>Popular Routes</h4>
                            <span className={styles.colUnderline} />
                        </div>
                        <ul className={styles.routesList}>
                            {POPULAR_ROUTES.map((route, idx) => (
                                <li key={idx} className={styles.routeItem}>
                                    <span className={styles.routeDot} />
                                    <span>{route}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact & Location */}
                    <div className={styles.contactCol}>
                        <div className={styles.colHeader}>
                            <h4 className={styles.colTitle}>Get In Touch</h4>
                            <span className={styles.colUnderline} />
                        </div>

                        <div className={styles.contactList}>
                            <div className={styles.contactItem}>
                                <PhoneCall size={17} className={styles.contactIcon} />
                                <div>
                                    <strong>Call Us 24/7</strong>
                                    <a href="tel:+919876543210">+91 98765 43210</a>
                                </div>
                            </div>

                            <div className={styles.contactItem}>
                                <Mail size={17} className={styles.contactIcon} />
                                <div>
                                    <strong>Email Support</strong>
                                    <a href="mailto:bookings@rktravels.com">bookings@rktravels.com</a>
                                </div>
                            </div>

                            <div className={styles.contactItem}>
                                <MapPin size={17} className={styles.contactIcon} />
                                <div>
                                    <strong>Main Terminal</strong>
                                    <span>RK Travels Terminal Plaza, Airport Link Road</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Legal & Copyright Bar */}
            <div className={styles.bottomBarWrapper}>
                <div className={styles.bottomBarContainer}>
                    <p className={styles.copyrightText}>
                        &copy; 2026 <strong>RK Travels</strong>. All rights reserved.
                    </p>

                    <div className={styles.legalLinks}>
                        <Link href="/terms">Terms of Service</Link>
                        <span className={styles.legalDot}>•</span>
                        <Link href="/privacy">Privacy Policy</Link>
                        <span className={styles.legalDot}>•</span>
                        <Link href="/refund">Refund Rules</Link>
                    </div>

                    <p className={styles.craftedText}>
                        Safe journeys powered with <Heart size={13} className={styles.heartIcon} /> by RK Travels
                    </p>
                </div>
            </div>
        </footer>
    );
}