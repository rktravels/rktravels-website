'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    X,
    CheckCircle2,
    AlertCircle,
    RefreshCw,
    Phone,
    User as UserIcon,
    Mail,
    ArrowRight,
    Shield,
    Zap,
} from 'lucide-react';
import styles from './AuthModal.module.css';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultMode?: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
    const router = useRouter();
    const [isFlipped, setIsFlipped] = useState(defaultMode === 'signup');
    const [phone, setPhone] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [enteredOtp, setEnteredOtp] = useState('');
    const [demoOtp, setDemoOtp] = useState<string | null>(null);

    // Sign up fields
    const [signupName, setSignupName] = useState('');
    const [signupPhone, setSignupPhone] = useState('');
    const [signupEmail, setSignupEmail] = useState('');

    // Notification Toast State
    const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    // Lock background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsFlipped(defaultMode === 'signup');
        } else {
            document.body.style.overflow = 'unset';
            setToast(null);
            setOtpSent(false);
            setEnteredOtp('');
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, defaultMode]);

    if (!isOpen) return null;

    const showToast = (type: 'success' | 'error', message: string) => {
        setToast({ type, message });
        setTimeout(() => {
            setToast(null);
        }, 4500);
    };

    // Step 1: Send OTP
    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (phone.trim().length < 10) {
            showToast('error', 'Please enter a valid 10-digit mobile number');
            return;
        }
        const generatedOtp = '1234';
        setDemoOtp(generatedOtp);
        setOtpSent(true);
        showToast('success', 'OTP Resent: 1234');
    };

    // Step 2: Verify OTP & Log In
    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (enteredOtp.trim() === demoOtp) {
            showToast('success', 'Successfully logged in! Redirecting...');

            const existingUserStr = localStorage.getItem('rk_user');
            let currentName = 'User';
            let currentEmail = 'user@gmail.com';
            let currentCity = 'Bangalore, Karnataka';

            if (existingUserStr) {
                try {
                    const parsed = JSON.parse(existingUserStr);
                    if (parsed.name) currentName = parsed.name;
                    if (parsed.email) currentEmail = parsed.email;
                    if (parsed.city) currentCity = parsed.city;
                } catch {
                    // Defaults retained
                }
            }

            const userData = {
                name: currentName,
                phone: phone,
                email: currentEmail,
                city: currentCity,
            };

            localStorage.setItem('rk_user', JSON.stringify(userData));
            window.dispatchEvent(new Event('rk_auth_changed'));

            setTimeout(() => {
                onClose();
                router.push('/profile');
            }, 1100);
        } else {
            showToast('error', 'Wrong OTP, please try again.');
        }
    };

    // Sign Up Submission
    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        if (signupPhone.trim().length < 10) {
            showToast('error', 'Please enter a valid 10-digit mobile number');
            return;
        }

        const newUser = {
            name: signupName.trim() || 'User',
            phone: signupPhone.trim(),
            email: signupEmail.trim() || 'user@gmail.com',
            city: 'Bangalore, Karnataka',
        };

        localStorage.setItem('rk_user', JSON.stringify(newUser));
        window.dispatchEvent(new Event('rk_auth_changed'));

        showToast('success', 'Account created! Redirecting to profile...');
        setTimeout(() => {
            onClose();
            router.push('/profile');
        }, 1100);
    };

    return (
        <div className={styles.modalBackdrop} onClick={onClose} role="dialog" aria-modal="true">
            <div className={styles.modalWrapper} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button
                    type="button"
                    className={styles.closeBtn}
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    <X size={20} />
                </button>

                {/* 3D Flip Card Scene */}
                <div className={styles.sceneContainer}>
                    <div className={`${styles.flipperCard} ${isFlipped ? styles.isFlipped : ''}`}>
                        {/* ========================================================
                FRONT FACE: LOGIN
                ======================================================== */}
                        <div className={styles.cardFaceFront}>
                            <div className={styles.authCard}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.authEyebrow}>WELCOME BACK</span>
                                    <h2 className={styles.authTitle}>
                                        {otpSent ? 'Verify OTP' : 'Login to RK Travels'}
                                    </h2>
                                    <p className={styles.authSubtitle}>
                                        {otpSent
                                            ? `Enter the 4-digit code sent to +91 ${phone}`
                                            : 'Enter your 10-digit mobile number to receive a secure OTP'}
                                    </p>
                                </div>

                                {!otpSent ? (
                                    <form onSubmit={handleSendOtp} className={styles.authForm}>
                                        <div className={styles.inputGroup}>
                                            <label htmlFor="modalLoginPhone">Mobile Number</label>
                                            <div className={styles.inputFieldWrap}>
                                                <span className={styles.countryCode}>+91</span>
                                                <input
                                                    id="modalLoginPhone"
                                                    type="tel"
                                                    required
                                                    maxLength={10}
                                                    placeholder="98765 43210"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                                    className={styles.authInput}
                                                    autoFocus
                                                />
                                                <Phone size={17} className={styles.inputRightIcon} />
                                            </div>
                                        </div>

                                        {toast && (
                                            <div className={`${styles.inlineAlert} ${styles[toast.type]}`}>
                                                {toast.type === 'success' ? (
                                                    <CheckCircle2 size={16} className={styles.toastIcon} />
                                                ) : (
                                                    <AlertCircle size={16} className={styles.toastIcon} />
                                                )}
                                                <span>{toast.message}</span>
                                            </div>
                                        )}

                                        <button type="submit" className={styles.primaryBtn}>
                                            <span>Send OTP</span>
                                            <ArrowRight size={16} />
                                        </button>

                                        <div className={styles.loginTrustRibbon}>
                                            <div className={styles.trustItem}>
                                                <Shield size={13} className={styles.trustIcon} />
                                                <span>100% Verified Cabs</span>
                                            </div>
                                            <span className={styles.trustDot}>•</span>
                                            <div className={styles.trustItem}>
                                                <Zap size={13} className={styles.trustIcon} />
                                                <span>Zero Surge Pricing</span>
                                            </div>
                                        </div>
                                    </form>
                                ) : (
                                    <form onSubmit={handleVerifyOtp} className={styles.authForm}>
                                        <div className={styles.inputGroup}>
                                            <label htmlFor="modalOtpField">Enter 4-Digit OTP</label>
                                            <div className={styles.inputFieldWrap}>
                                                <input
                                                    id="modalOtpField"
                                                    type="text"
                                                    required
                                                    maxLength={4}
                                                    placeholder="• • • •"
                                                    value={enteredOtp}
                                                    onChange={(e) => setEnteredOtp(e.target.value.trim())}
                                                    className={`${styles.authInput} ${styles.otpInput}`}
                                                    autoFocus
                                                />
                                            </div>

                                            {/* Contextual Alert Under OTP Input */}
                                            {toast && (
                                                <div className={`${styles.inlineAlert} ${styles[toast.type]}`}>
                                                    {toast.type === 'success' ? (
                                                        <CheckCircle2 size={16} className={styles.toastIcon} />
                                                    ) : (
                                                        <AlertCircle size={16} className={styles.toastIcon} />
                                                    )}
                                                    <span>{toast.message}</span>
                                                </div>
                                            )}
                                        </div>

                                        <button type="submit" className={styles.primaryBtn}>
                                            <span>Verify &amp; Log In</span>
                                            <ArrowRight size={16} />
                                        </button>

                                        <div className={styles.resendRow}>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setEnteredOtp('');
                                                    showToast('success', 'OTP Resent: 1234');
                                                }}
                                                className={styles.resendBtn}
                                            >
                                                <RefreshCw size={13} />
                                                <span>Resend Code</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setOtpSent(false);
                                                    setEnteredOtp('');
                                                }}
                                                className={styles.changeNumberBtn}
                                            >
                                                Change Number
                                            </button>
                                        </div>
                                    </form>
                                )}

                                <div className={styles.switchModeWrap}>
                                    <p className={styles.switchText}>
                                        Don&apos;t have an account?{' '}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsFlipped(true);
                                                setToast(null);
                                            }}
                                            className={styles.switchBtn}
                                        >
                                            Sign Up
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ========================================================
                BACK FACE: SIGN UP (3D Flipped)
                ======================================================== */}
                        <div className={styles.cardFaceBack}>
                            <div className={styles.authCard}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.authEyebrow}>NEW TRAVELER</span>
                                    <h2 className={styles.authTitle}>Create Your Account</h2>
                                    <p className={styles.authSubtitle}>
                                        Join RK Travels for instant bookings, fare discounts, and priority support.
                                    </p>
                                </div>

                                <form onSubmit={handleSignUp} className={styles.authForm}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="modalSignupName">Full Name</label>
                                        <div className={styles.inputFieldWrap}>
                                            <input
                                                id="modalSignupName"
                                                type="text"
                                                required
                                                placeholder="Enter your full name"
                                                value={signupName}
                                                onChange={(e) => setSignupName(e.target.value)}
                                                className={styles.authInput}
                                            />
                                            <UserIcon size={17} className={styles.inputRightIcon} />
                                        </div>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="modalSignupPhone">Mobile Number</label>
                                        <div className={styles.inputFieldWrap}>
                                            <span className={styles.countryCode}>+91</span>
                                            <input
                                                id="modalSignupPhone"
                                                type="tel"
                                                required
                                                maxLength={10}
                                                placeholder="98765 43210"
                                                value={signupPhone}
                                                onChange={(e) => setSignupPhone(e.target.value.replace(/\D/g, ''))}
                                                className={styles.authInput}
                                            />
                                            <Phone size={17} className={styles.inputRightIcon} />
                                        </div>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="modalSignupEmail">Email Address</label>
                                        <div className={styles.inputFieldWrap}>
                                            <input
                                                id="modalSignupEmail"
                                                type="email"
                                                required
                                                placeholder="user@gmail.com"
                                                value={signupEmail}
                                                onChange={(e) => setSignupEmail(e.target.value)}
                                                className={styles.authInput}
                                            />
                                            <Mail size={17} className={styles.inputRightIcon} />
                                        </div>
                                    </div>

                                    {toast && isFlipped && (
                                        <div className={`${styles.inlineAlert} ${styles[toast.type]}`}>
                                            {toast.type === 'success' ? (
                                                <CheckCircle2 size={16} className={styles.toastIcon} />
                                            ) : (
                                                <AlertCircle size={16} className={styles.toastIcon} />
                                            )}
                                            <span>{toast.message}</span>
                                        </div>
                                    )}

                                    <button type="submit" className={styles.primaryBtn}>
                                        <span>Create Account</span>
                                        <ArrowRight size={16} />
                                    </button>
                                </form>

                                <div className={styles.switchModeWrap}>
                                    <p className={styles.switchText}>
                                        Already have an account?{' '}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsFlipped(false);
                                                setToast(null);
                                            }}
                                            className={styles.switchBtn}
                                        >
                                            Log In
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}