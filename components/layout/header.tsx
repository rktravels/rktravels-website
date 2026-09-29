'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
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
    const router = useRouter();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [user, setUser] = useState<{ name: string; phone: string } | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const syncUser = () => {
            const stored = localStorage.getItem('rk_user');
            if (stored) {
                try {
                    setUser(JSON.parse(stored));
                } catch {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };

        syncUser();
        window.addEventListener('rk_auth_changed', syncUser);
        window.addEventListener('storage', syncUser);

        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('rk_auth_changed', syncUser);
            window.removeEventListener('storage', syncUser);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('rk_user');
        window.dispatchEvent(new Event('rk_auth_changed'));
        setUser(null);
        setProfileDropdownOpen(false);
        setMobileMenuOpen(false);
        router.push('/');
    };

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    const getInitials = (nameStr: string) => {
        if (!nameStr) return 'RK';
        return nameStr
            .trim()
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                {/* Mobile & Tablet Left Cluster: Hamburger + Logo */}
                <div className={styles.brandCluster}>
                    <button
                        type="button"
                        className={styles.menuToggleBtn}
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>

                    <Link href="/" className={styles.logoLink} aria-label="RK Travels Home">
                        <div className={styles.logoImageWrap}>
                            <Image
                                src="/logo/rk-logo.PNG"
                                alt="RK Travels"
                                width={280}
                                height={75}
                                priority
                                unoptimized
                                className={styles.logoImage}
                            />
                        </div>
                    </Link>
                </div>

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

                {/* Right Actions: Currency, Profile Pill / Login CTA */}
                <div className={styles.rightActions}>
                    <div className={styles.currencyPill} role="button" tabIndex={0}>
                        <span>INR</span>
                        <ChevronDown size={14} className={styles.currencyChevron} />
                    </div>

                    {user ? (
                        <div className={styles.profileWrapper} ref={dropdownRef}>
                            <button
                                type="button"
                                className={styles.profilePillBtn}
                                onClick={() => setProfileDropdownOpen((prev) => !prev)}
                                aria-expanded={profileDropdownOpen}
                                aria-label="User Account Menu"
                            >
                                <div className={styles.avatarCircle}>{getInitials(user.name)}</div>
                                <span className={styles.profileName}>{user.name}</span>
                                <ChevronDown
                                    size={14}
                                    className={`${styles.dropdownChevron} ${profileDropdownOpen ? styles.chevronRotated : ''
                                        }`}
                                />
                            </button>

                            {profileDropdownOpen && (
                                <div className={styles.profileDropdownMenu}>
                                    <div className={styles.dropdownHeader}>
                                        <strong className={styles.dropUserTitle}>{user.name}</strong>
                                        <span className={styles.dropUserPhone}>+91 {user.phone}</span>
                                    </div>
                                    <div className={styles.dropdownDivider} />
                                    <Link
                                        href="/profile"
                                        className={styles.dropdownItem}
                                        onClick={() => setProfileDropdownOpen(false)}
                                    >
                                        <User size={16} />
                                        <span>My Profile</span>
                                    </Link>
                                    <Link
                                        href="/profile"
                                        className={styles.dropdownItem}
                                        onClick={() => setProfileDropdownOpen(false)}
                                    >
                                        <LayoutDashboard size={16} />
                                        <span>My Bookings</span>
                                    </Link>
                                    <div className={styles.dropdownDivider} />
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className={`${styles.dropdownItem} ${styles.logoutItem}`}
                                    >
                                        <LogOut size={16} />
                                        <span>Log Out</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/auth" style={{ textDecoration: 'none' }}>
                            <button type="button" className={styles.authBtn}>
                                Login / Sign Up
                            </button>
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Drawer Menu */}
            {mobileMenuOpen && (
                <div className={styles.mobileDrawer}>
                    {user && (
                        <div className={styles.mobileUserRibbon}>
                            <div className={styles.avatarCircle}>{getInitials(user.name)}</div>
                            <div className={styles.mobileUserData}>
                                <strong>{user.name}</strong>
                                <span>+91 {user.phone}</span>
                            </div>
                        </div>
                    )}

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

                        {user ? (
                            <>
                                <Link
                                    href="/profile"
                                    className={styles.mobileNavItem}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    My Profile &amp; Bookings
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className={`${styles.mobileNavItem} ${styles.mobileLogoutBtn}`}
                                >
                                    <LogOut size={16} />
                                    <span>Log Out</span>
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/auth"
                                className={styles.mobileNavItem}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Login / Sign Up
                            </Link>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}