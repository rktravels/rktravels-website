'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
    User,
    CalendarDays,
    Wallet,
    Phone,
    Mail,
    MapPin,
    Clock,
    ArrowRight,
    ShieldCheck,
    CheckCircle2,
    TrendingUp,
    Download,
    AlertCircle,
} from 'lucide-react';
import styles from './Profile.module.css';

type ActiveTab = 'profile' | 'bookings' | 'credits';

const MOCK_BOOKINGS = [
    {
        id: 'RKT-98214',
        service: 'Outstation Trip',
        car: 'Innova Crysta (6-Seater)',
        from: 'Bangalore (Indiranagar)',
        to: 'Mysore Palace, Karnataka',
        date: 'Oct 04, 2026',
        time: '06:30 AM',
        fare: '₹4,850',
        status: 'Confirmed',
    },
    {
        id: 'RKT-97802',
        service: 'Airport Transfer',
        car: 'Dzire Prime Sedan',
        from: 'HSR Layout Sector 2',
        to: 'Kempegowda Int. Airport (BLR)',
        date: 'Sep 21, 2026',
        time: '04:15 AM',
        fare: '₹1,240',
        status: 'Completed',
    },
    {
        id: 'RKT-96144',
        service: 'City Taxi Rental',
        car: 'Etios Sedan',
        from: 'Electronic City Phase 1',
        to: 'MG Road, Bangalore',
        date: 'Sep 12, 2026',
        time: '11:00 AM',
        fare: '₹620',
        status: 'Cancelled',
    },
];

const MOCK_TRANSACTIONS = [
    {
        id: 'TXN-8812',
        type: 'Cashback Earned',
        date: 'Sep 21, 2026',
        amount: '+₹150',
        isCredit: true,
    },
    {
        id: 'TXN-8740',
        type: 'Trip Payment Deduction',
        date: 'Sep 21, 2026',
        amount: '-₹500',
        isCredit: false,
    },
    {
        id: 'TXN-8511',
        type: 'Wallet Top-up Promo',
        date: 'Aug 29, 2026',
        amount: '+₹1,000',
        isCredit: true,
    },
];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<ActiveTab>('profile');
    const [savedSuccess, setSavedSuccess] = useState(false);

    // Profile Form State
    const [name, setName] = useState('Rahul Sharma');
    const [phone, setPhone] = useState('+91 98765 43210');
    const [email, setEmail] = useState('rahul.sharma@example.com');
    const [city, setCity] = useState('Bangalore, Karnataka');

    const handleProfileSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3500);
    };

    return (
        <main className={styles.profileWrapper}>


            <div className={styles.dashboardContainer}>
                {/* User Hero Summary Banner */}
                <section className={styles.userBanner}>
                    <div className={styles.userAvatarWrap}>
                        <div className={styles.userAvatar}>
                            <span>RS</span>
                        </div>
                        <div className={styles.userMeta}>
                            <h1 className={styles.userName}>{name}</h1>
                            <p className={styles.userContact}>
                                <span>{phone}</span> • <span>{email}</span>
                            </p>
                            <div className={styles.memberBadge}>
                                <ShieldCheck size={14} />
                                <span>RK Verified Member</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.quickStatsRow}>
                        <div className={styles.statBox}>
                            <strong>14</strong>
                            <span>Total Trips</span>
                        </div>
                        <div className={styles.statBox}>
                            <strong>₹650</strong>
                            <span>RK Credits</span>
                        </div>
                    </div>
                </section>

                {/* Tab Navigation Pill Bar */}
                <nav className={styles.tabBar} aria-label="Profile navigation">
                    <button
                        type="button"
                        className={`${styles.tabBtn} ${activeTab === 'profile' ? styles.activeTabBtn : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <User size={18} />
                        <span>Profile Details</span>
                    </button>

                    <button
                        type="button"
                        className={`${styles.tabBtn} ${activeTab === 'bookings' ? styles.activeTabBtn : ''}`}
                        onClick={() => setActiveTab('bookings')}
                    >
                        <CalendarDays size={18} />
                        <span>My Bookings</span>
                    </button>

                    <button
                        type="button"
                        className={`${styles.tabBtn} ${activeTab === 'credits' ? styles.activeTabBtn : ''}`}
                        onClick={() => setActiveTab('credits')}
                    >
                        <Wallet size={18} />
                        <span>RK Credits</span>
                    </button>
                </nav>

                {/* ========================================================
            TAB 1: PROFILE DETAILS
            ======================================================== */}
                {activeTab === 'profile' && (
                    <section className={styles.tabContentCard}>
                        <div className={styles.cardHeader}>
                            <div>
                                <h2 className={styles.cardTitle}>Personal Information</h2>
                                <p className={styles.cardSub}>Update your contact and identification details</p>
                            </div>
                        </div>

                        <form onSubmit={handleProfileSave} className={styles.profileForm}>
                            <div className={styles.formGrid}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="fullName">Full Name</label>
                                    <div className={styles.inputWrapper}>
                                        <User size={16} className={styles.inputIcon} />
                                        <input
                                            id="fullName"
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className={styles.textInput}
                                        />
                                    </div>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="phoneNumber">Phone Number (Verified)</label>
                                    <div className={styles.inputWrapper}>
                                        <Phone size={16} className={styles.inputIcon} />
                                        <input
                                            id="phoneNumber"
                                            type="tel"
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className={styles.textInput}
                                        />
                                    </div>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="emailAddress">Email Address</label>
                                    <div className={styles.inputWrapper}>
                                        <Mail size={16} className={styles.inputIcon} />
                                        <input
                                            id="emailAddress"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className={styles.textInput}
                                        />
                                    </div>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="primaryCity">Default Pickup City</label>
                                    <div className={styles.inputWrapper}>
                                        <MapPin size={16} className={styles.inputIcon} />
                                        <input
                                            id="primaryCity"
                                            type="text"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            className={styles.textInput}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.formActionRow}>
                                <button type="submit" className={styles.saveBtn}>
                                    Save Changes
                                </button>
                                {savedSuccess && (
                                    <div className={styles.savedAlert}>
                                        <CheckCircle2 size={16} />
                                        <span>Profile updated successfully!</span>
                                    </div>
                                )}
                            </div>
                        </form>
                    </section>
                )}

                {/* ========================================================
            TAB 2: MY BOOKINGS
            ======================================================== */}
                {activeTab === 'bookings' && (
                    <section className={styles.tabContentCard}>
                        <div className={styles.cardHeader}>
                            <div>
                                <h2 className={styles.cardTitle}>Ride History &amp; Bookings</h2>
                                <p className={styles.cardSub}>Manage your upcoming trips and download ride invoices</p>
                            </div>
                        </div>

                        <div className={styles.bookingList}>
                            {MOCK_BOOKINGS.map((booking) => (
                                <div key={booking.id} className={styles.bookingCard}>
                                    <div className={styles.bookingTopRow}>
                                        <div className={styles.bookingBadgeWrap}>
                                            <span className={styles.bookingService}>{booking.service}</span>
                                            <span
                                                className={`${styles.statusBadge} ${styles[booking.status.toLowerCase()]
                                                    }`}
                                            >
                                                {booking.status}
                                            </span>
                                        </div>
                                        <strong className={styles.bookingFare}>{booking.fare}</strong>
                                    </div>

                                    <div className={styles.bookingCarName}>{booking.car}</div>

                                    <div className={styles.routeTimeline}>
                                        <div className={styles.routeStop}>
                                            <div className={styles.dotFrom} />
                                            <div className={styles.stopDetails}>
                                                <span className={styles.stopLabel}>Pickup</span>
                                                <span className={styles.stopText}>{booking.from}</span>
                                            </div>
                                        </div>
                                        <div className={styles.routeLine} />
                                        <div className={styles.routeStop}>
                                            <div className={styles.dotTo} />
                                            <div className={styles.stopDetails}>
                                                <span className={styles.stopLabel}>Drop</span>
                                                <span className={styles.stopText}>{booking.to}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.bookingFooter}>
                                        <div className={styles.footerDate}>
                                            <Clock size={14} />
                                            <span>{booking.date} at {booking.time}</span>
                                        </div>

                                        <div className={styles.footerActions}>
                                            <span className={styles.bookingId}>ID: {booking.id}</span>
                                            {booking.status === 'Completed' && (
                                                <button type="button" className={styles.invoiceBtn}>
                                                    <Download size={13} />
                                                    <span>Invoice</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ========================================================
            TAB 3: RK CREDITS & WALLET
            ======================================================== */}
                {activeTab === 'credits' && (
                    <section className={styles.creditsSection}>
                        <div className={styles.walletBalanceCard}>
                            <div className={styles.walletHeader}>
                                <div className={styles.walletIconWrap}>
                                    <Wallet size={24} />
                                </div>
                                <div>
                                    <span className={styles.walletLabel}>Available RK Credits</span>
                                    <h2 className={styles.walletTotal}>₹650.00</h2>
                                </div>
                            </div>
                            <p className={styles.walletNote}>
                                1 RK Credit = ₹1. Credits are automatically redeemed on your upcoming rides for instant discounts.
                            </p>
                            <div className={styles.walletActions}>
                                <button type="button" className={styles.topUpBtn}>
                                    + Add Credit Promo
                                </button>
                            </div>
                        </div>

                        <div className={styles.tabContentCard}>
                            <h3 className={styles.subHeading}>Recent Wallet Activity</h3>
                            <div className={styles.transactionList}>
                                {MOCK_TRANSACTIONS.map((txn) => (
                                    <div key={txn.id} className={styles.txnItem}>
                                        <div className={styles.txnLeft}>
                                            <div
                                                className={`${styles.txnIconWrap} ${txn.isCredit ? styles.txnPlus : styles.txnMinus
                                                    }`}
                                            >
                                                <TrendingUp size={16} />
                                            </div>
                                            <div>
                                                <strong className={styles.txnType}>{txn.type}</strong>
                                                <span className={styles.txnDate}>{txn.date} • {txn.id}</span>
                                            </div>
                                        </div>
                                        <strong
                                            className={`${styles.txnAmount} ${txn.isCredit ? styles.creditGreen : styles.debitRed
                                                }`}
                                        >
                                            {txn.amount}
                                        </strong>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>

        </main>
    );
}