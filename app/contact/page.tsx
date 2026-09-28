'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
    PhoneCall,
    Mail,
    MapPin,
    Clock,
    Send,
    MessageSquare,
    ShieldCheck,
    CheckCircle,
} from 'lucide-react';

import PromoBanner from '@/components/home/PromoBanner';
import styles from './Contact.module.css';

const CONTACT_INFO_CARDS = [
    {
        icon: <PhoneCall size={22} strokeWidth={2.4} />,
        title: 'Call Us Directly',
        primary: '+91 98765 43210',
        secondary: '+91 98765 43211',
        note: 'Toll-Free & 24/7 Available',
    },
    {
        icon: <Mail size={22} strokeWidth={2.4} />,
        title: 'Email Support',
        primary: 'bookings@rktravels.com',
        secondary: 'support@rktravels.com',
        note: 'Response within 30 minutes',
    },
    {
        icon: <MapPin size={22} strokeWidth={2.4} />,
        title: 'Headquarters',
        primary: 'RK Travels Terminal Plaza',
        secondary: 'Near International Airport Road',
        note: 'Open Mon–Sun: 24 Hours',
    },
    {
        icon: <Clock size={22} strokeWidth={2.4} />,
        title: 'Operating Hours',
        primary: '24 Hours / 7 Days',
        secondary: 'All 365 Days a Year',
        note: 'Instant booking confirmation',
    },
];

const FAQS = [
    {
        q: 'How quickly can I get a cab dispatched?',
        a: 'For immediate city rides, cabs are allocated within 5–10 minutes. For airport transfers and outstation journeys, we recommend booking at least 2 hours in advance.',
    },
    {
        q: 'Are there hidden toll or driver night charges?',
        a: 'No. RK Travels adheres to transparent fixed pricing. Standard toll taxes, parking fees, and driver charges are clearly broken down prior to trip confirmation.',
    },
    {
        q: 'What is the cancellation policy?',
        a: 'Free cancellations are available up to 1 hour before scheduled pickup for city rides, and up to 4 hours before outstation trips.',
    },
];

export default function ContactPage() {
    const shouldReduceMotion = useReducedMotion();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 5000);
    };

    return (
        <main className={styles.contactWrapper}>


            {/* 1. HERO SECTION */}

            {/* 1. HERO SECTION */}
            <section className={styles.heroSection}>
                <div className={styles.heroBgWrapper} style={{ position: 'absolute', inset: 0 }}>
                    <Image
                        src="/logo/rk-home.png"
                        alt="RK Travels Customer Assistance"
                        fill
                        priority
                        sizes="100vw"
                        className={styles.heroBgImg}
                    />
                    <div className={styles.heroOverlay} />
                </div>

                <div className={styles.heroContent}>
                    <motion.div
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className={styles.heroTextWrap}
                    >
                        <span className={styles.heroEyebrow}>24/7 CUSTOMER ASSISTANCE</span>
                        <h1 className={styles.heroTitle}>
                            We Are Here To <br />
                            <span className={styles.highlightText}>Help Your Journey</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Have questions regarding our outstation packages, airport transfers, or corporate cab
                            solutions? Reach out anytime.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. CONTACT CHANNELS */}
            <section className={styles.channelsSection}>
                <div className={styles.channelsGrid}>
                    {CONTACT_INFO_CARDS.map((card, idx) => (
                        <div key={idx} className={styles.channelCard}>
                            <div className={styles.channelIconBadge}>{card.icon}</div>
                            <strong className={styles.channelTitle}>{card.title}</strong>
                            <span className={styles.channelPrimary}>{card.primary}</span>
                            <span className={styles.channelSecondary}>{card.secondary}</span>
                            <span className={styles.channelNote}>{card.note}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. MAIN FORM & DISPATCH CONTAINER */}
            <section className={styles.formSection}>
                <div className={styles.formContainer}>
                    {/* Left Column: Form */}
                    <div className={styles.formCard}>
                        <div className={styles.sectionHeader}>
                            <div className={styles.titleWrapper}>
                                <h2 className={styles.sectionTitle}>Send Us a Message</h2>
                                <span className={styles.titleUnderline} />
                            </div>
                        </div>
                        <p className={styles.formSub}>
                            Fill in your inquiry details below and our team will connect with you within 30 minutes.
                        </p>

                        <form onSubmit={handleSubmit} className={styles.contactForm}>
                            <div className={styles.formRow}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="fullName">Full Name</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        required
                                        placeholder="Enter your full name"
                                        className={styles.formInput}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        required
                                        placeholder="e.g. +91 98765 43210"
                                        className={styles.formInput}
                                    />
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        placeholder="name@example.com"
                                        className={styles.formInput}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="serviceType">Service Interested In</label>
                                    <select id="serviceType" className={styles.formSelect} defaultValue="outstation">
                                        <option value="city">City Taxi</option>
                                        <option value="airport">Airport Transfer</option>
                                        <option value="outstation">Outstation Trip</option>
                                        <option value="corporate">Corporate Rental</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="message">Your Message or Route Details</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    required
                                    placeholder="Tell us about your pickup location, drop location, or special travel request..."
                                    className={styles.formTextarea}
                                />
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                <span>Send Message</span>
                                <Send size={16} strokeWidth={2.4} />
                            </button>

                            {formSubmitted && (
                                <div className={styles.successMessage}>
                                    <CheckCircle size={18} />
                                    <span>Thank you! Your inquiry has been dispatched successfully.</span>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Right Column: Instant WhatsApp Dispatch & Guarantees */}
                    {/* Right Column: Instant Booking Dispatch & Expanded Guarantees */}
                    <div className={styles.infoSideCol}>
                        {/* Quick Dispatch Card */}
                        <div className={styles.dispatchCard}>
                            <div className={styles.dispatchHeader}>
                                <div className={styles.dispatchPillBadge}>
                                    <MessageSquare size={18} strokeWidth={2.4} />
                                </div>
                                <div>
                                    <h3 className={styles.dispatchTitle}>Instant WhatsApp Booking</h3>
                                    <span className={styles.dispatchSub}>Fastest way to get confirmation</span>
                                </div>
                            </div>
                            <p className={styles.dispatchDesc}>
                                Need a ride on short notice? Chat with our direct booking desk on WhatsApp for immediate rate quotes and cab allocation.
                            </p>
                            <a
                                href="https://wa.me/919876543210"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.whatsappBtn}
                            >
                                Chat on WhatsApp <Send size={14} />
                            </a>
                        </div>

                        {/* Travel Guarantees Card (Expanded to 4 Points + Direct Support Box) */}
                        <div className={styles.guaranteeBox}>
                            <div className={styles.guaranteeItem}>
                                <div className={styles.guaranteeIconWrap}>
                                    <ShieldCheck size={20} className={styles.guaranteeIcon} strokeWidth={2.4} />
                                </div>
                                <div>
                                    <strong>Zero Hidden Costs</strong>
                                    <span>Transparent billing with pre-calculated fares.</span>
                                </div>
                            </div>

                            <div className={styles.guaranteeItem}>
                                <div className={styles.guaranteeIconWrap}>
                                    <Clock size={20} className={styles.guaranteeIcon} strokeWidth={2.4} />
                                </div>
                                <div>
                                    <strong>On-Time Pickup Guarantee</strong>
                                    <span>Driver arrives 10 minutes ahead of scheduled time.</span>
                                </div>
                            </div>

                            <div className={styles.guaranteeItem}>
                                <div className={styles.guaranteeIconWrap}>
                                    <CheckCircle size={20} className={styles.guaranteeIcon} strokeWidth={2.4} />
                                </div>
                                <div>
                                    <strong>Sanitized &amp; Clean Cars</strong>
                                    <span>Thoroughly cleaned vehicles inspected before every trip.</span>
                                </div>
                            </div>

                            <div className={styles.guaranteeItem}>
                                <div className={styles.guaranteeIconWrap}>
                                    <PhoneCall size={20} className={styles.guaranteeIcon} strokeWidth={2.4} />
                                </div>
                                <div>
                                    <strong>24/7 Live Monitoring</strong>
                                    <span>Continuous trip safety and GPS dispatch assistance.</span>
                                </div>
                            </div>

                            {/* Direct Help Desk Strip */}
                            <div className={styles.directHelpStrip}>
                                <div className={styles.helpText}>
                                    <span className={styles.liveIndicatorDot} />
                                    <span>Immediate dispatch assistance:</span>
                                    <strong>+91 98765 43210</strong>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* 4. FAQS */}
            <section className={styles.faqSection}>
                <div className={styles.sectionHeaderCentered}>
                    <h2 className={styles.sectionTitle}>
                        Frequently Asked <span className={styles.highlightText}>Questions</span>
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        Quick answers regarding reservations, billing, and cancellations.
                    </p>
                </div>

                <div className={styles.faqGrid}>
                    {FAQS.map((faq, i) => (
                        <div key={i} className={styles.faqCard}>
                            <h3 className={styles.faqQuestion}>{faq.q}</h3>
                            <p className={styles.faqAnswer}>{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. PROMO BANNER CTA */}
            <PromoBanner />
        </main>
    );
}