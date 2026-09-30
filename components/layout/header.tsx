'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, Menu, X, User, LogOut, LayoutDashboard, Check } from 'lucide-react';
import AuthModal from '@/app/auth/AuthModal';
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

const CURRENCIES = [
    { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
    { code: 'USD', symbol: '$', label: 'US Dollar' },
    { code: 'EUR', symbol: '€', label: 'Euro' },
    { code: 'GBP', symbol: '£', label: 'British Pound' },
    { code: 'AED', symbol: 'د.إ', label: 'UAE Dirham' },
    { code: 'SGD', symbol: 'S$', label: 'Singapore Dollar' },
];

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('INR');
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [user, setUser] = useState<{ name: string; phone: string } | null>(null);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const currencyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 1. Sync User
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

        // 2. Sync Currency
        const storedCurrency = localStorage.getItem('rk_currency');
        if (storedCurrency) {
            setSelectedCurrency(storedCurrency);
        }

        syncUser();

        window.addEventListener('rk_auth_changed', syncUser);
        window.addEventListener('storage', syncUser);

        // Click outside handler for both dropdowns
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (dropdownRef.current && !dropdownRef.current.contains(target)) {
                setProfileDropdownOpen(false);
            }
            if (currencyRef.current && !currencyRef.current.contains(target)) {
                setCurrencyDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('rk_auth_changed', syncUser);
            window.removeEventListener('storage', syncUser);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelectCurrency = (code: string) => {
        setSelectedCurrency(code);
        localStorage.setItem('rk_currency', code);
        window.dispatchEvent(new CustomEvent('rk_currency_changed', { detail: { currency: code } }));
        setCurrencyDropdownOpen(false);
    };

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
        if (!nameStr) return 'U';
        const parts = nameStr.trim().split(' ').filter(Boolean);
        if (parts.length === 1) return parts[0][0].toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    {/* Left Brand Section: Hamburger (Mobile/Tablet) + Logo */}
                    <div className={styles.leftBrandSection}>
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
                                    width={220}
                                    height={60}
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

                    {/* Right Actions: Currency Dropdown & Auth / Profile Pill */}
                    <div className={styles.rightActions}>
                        {/* Currency Selector Pill & Dropdown */}
                        <div className={styles.currencyWrapper} ref={currencyRef}>
                            <button
                                type="button"
                                className={`${styles.currencyPill} ${currencyDropdownOpen ? styles.activeCurrencyPill : ''}`}
                                onClick={() => setCurrencyDropdownOpen((prev) => !prev)}
                                aria-expanded={currencyDropdownOpen}
                                aria-label="Select currency"
                            >
                                <span>{selectedCurrency}</span>
                                <ChevronDown
                                    size={14}
                                    className={`${styles.currencyChevron} ${currencyDropdownOpen ? styles.chevronRotated : ''
                                        }`}
                                />
                            </button>

                            {currencyDropdownOpen && (
                                <div className={styles.currencyDropdownMenu}>
                                    <div className={styles.currencyDropdownHeader}>Select Currency</div>
                                    {CURRENCIES.map((curr) => {
                                        const isSelected = curr.code === selectedCurrency;
                                        return (
                                            <button
                                                key={curr.code}
                                                type="button"
                                                onClick={() => handleSelectCurrency(curr.code)}
                                                className={`${styles.currencyOption} ${isSelected ? styles.selectedCurrencyOption : ''
                                                    }`}
                                            >
                                                <span className={styles.currencySym}>{curr.symbol}</span>
                                                <div className={styles.currencyInfo}>
                                                    <strong className={styles.currencyCode}>{curr.code}</strong>
                                                    <span className={styles.currencyLabel}>{curr.label}</span>
                                                </div>
                                                {isSelected && <Check size={14} className={styles.checkIcon} />}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Profile Dropdown or Login Button */}
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
                            <button
                                type="button"
                                className={styles.authBtn}
                                onClick={() => setAuthModalOpen(true)}
                            >
                                Login / Sign Up
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile Drawer */}
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

                        {/* Mobile Currency Bar */}
                        <div className={styles.mobileCurrencySelector}>
                            <span className={styles.mobileCurrencyLabel}>Currency:</span>
                            <div className={styles.mobileCurrencyGrid}>
                                {CURRENCIES.map((curr) => (
                                    <button
                                        key={curr.code}
                                        type="button"
                                        onClick={() => handleSelectCurrency(curr.code)}
                                        className={`${styles.mobileCurrBtn} ${curr.code === selectedCurrency ? styles.activeMobileCurrBtn : ''
                                            }`}
                                    >
                                        {curr.code}
                                    </button>
                                ))}
                            </div>
                        </div>

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
                                <button
                                    type="button"
                                    className={styles.mobileNavItem}
                                    style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        setAuthModalOpen(true);
                                    }}
                                >
                                    Login / Sign Up
                                </button>
                            )}
                        </nav>
                    </div>
                )}
            </header>

            {/* Floating Auth Modal Popup */}
            <AuthModal
                isOpen={authModalOpen}
                onClose={() => setAuthModalOpen(false)}
            />
        </>
    );
}