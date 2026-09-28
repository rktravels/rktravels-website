'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import styles from './header.module.css';

const NAV_ITEMS = [
    { label: 'Home', href: '/' },
    { label: 'Rides', href: '/rides' },
    { label: 'Outstation', href: '/outstation' },
    { label: 'Airport', href: '/airport' },
    { label: 'Tour Packages', href: '/tour-packages' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                {/* Prominent Large Logo */}
                <Link href="/" className={styles.logoLink} aria-label="RK Travels Home">
                    <div className={styles.logoImageWrap}>
                        <Image
                            src="/logo/rk-logo.PNG"
                            alt="RK Travels"
                            width={280}
                            height={75}
                            priority
                            loading="eager"
                            style={{ width: 'auto', height: '100%' }}
                            className={styles.logoImage}
                        />
                    </div>
                </Link>

                {/* Center Desktop Navigation */}
                <nav className={styles.navMenu} aria-label="Main Navigation">
                    {NAV_ITEMS.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${styles.navItem} ${active ? styles.activeNavItem : ''}`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Actions: Currency (Desktop), Login/Sign Up & Hamburger (Mobile) */}
                <div className={styles.rightActions}>
                    <div className={styles.currencyPill} role="button" tabIndex={0}>
                        <span>INR</span>
                        <ChevronDown size={14} className={styles.currencyChevron} />
                    </div>
                    <button type="button" className={styles.authBtn}>
                        Login / Sign Up
                    </button>

                    {/* Mobile Hamburger Menu Toggle */}
                    <button
                        type="button"
                        className={styles.menuToggleBtn}
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer Menu */}
            {mobileMenuOpen && (
                <div className={styles.mobileDrawer}>
                    <nav className={styles.mobileNavLinks}>
                        {NAV_ITEMS.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`${styles.mobileNavItem} ${active ? styles.activeMobileItem : ''}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            )}
        </header>
    );
}