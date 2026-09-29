'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

import styles from './Auth.module.css';

export default function AuthPage() {
    const router = useRouter();
    const [isFlipped, setIsFlipped] = useState(false);
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

    const showToast = (type: 'success' | 'error', message: string) => {
        setToast({ type, message });
        setTimeout(() => {
            setToast(null);
        }, 4000);
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
        showToast('success', `OTP sent to +91 ${phone} (Demo Code: 1234)`);
    };

    // Step 2: Verify OTP & Log In
    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (enteredOtp.trim() === demoOtp) {
            showToast('success', 'Successfully logged in! Redirecting...');

            // Save user to localStorage
            const userData = {
                name: 'Rahul Sharma',
                phone: phone,
            };
            localStorage.setItem('rk_user', JSON.stringify(userData));

            // Dispatch event to update Header immediately
            window.dispatchEvent(new Event('rk_auth_changed'));

            setTimeout(() => {
                router.push('/profile');
            }, 1200);
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

        // Save newly registered user
        const newUser = {
            name: signupName.trim() || 'New User',
            phone: signupPhone.trim(),
        };
        localStorage.setItem('rk_user', JSON.stringify(newUser));
        window.dispatchEvent(new Event('rk_auth_changed'));

        showToast('success', 'Account created! Redirecting to profile...');
        setTimeout(() => {
            router.push('/profile');
        }, 1200);
    };

    return (
        <main className={styles.authPageWrapper}>
            {/* 1. Header with dynamic auth state */}


            {/* 2. Floating Pop-up Toast Message */}
            {toast && (
                <div className={`${styles.toastPopup} ${styles[toast.type]}`}>
                    {toast.type === 'success' ? (
                        <CheckCircle2 size={18} className={styles.toastIcon} />
                    ) : (
                        <AlertCircle size={18} className={styles.toastIcon} />
                    )}
                    <span>{toast.message}</span>
                </div>
            )}

            {/* 3. 3D Flip Card Scene */}
            <section className={styles.sceneContainer}>
                <div className={`${styles.flipperCard} ${isFlipped ? styles.isFlipped : ''}`}>
                    {/* FRONT FACE: LOGIN (Mobile Number + OTP) */}
                    <div className={styles.cardFaceFront}>
                        <div className={styles.neonHaloRing}>
                            <div className={styles.orbBody}>
                                <div className={styles.orbHeader}>
                                    <h1 className={styles.neonTitle}>WELCOME</h1>
                                    <p className={styles.orbSubtitle}>
                                        {otpSent ? 'Verify OTP to continue' : 'Login with Mobile Number'}
                                    </p>
                                </div>

                                {!otpSent ? (
                                    <form onSubmit={handleSendOtp} className={styles.orbForm}>
                                        <div className={styles.inputWrap}>
                                            <input
                                                type="tel"
                                                required
                                                maxLength={10}
                                                placeholder="Enter Mobile Number"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                                className={styles.orbInput}
                                            />
                                        </div>

                                        <button type="submit" className={styles.orbSubmitBtn}>
                                            GET OTP
                                        </button>
                                    </form>
                                ) : (
                                    <form onSubmit={handleVerifyOtp} className={styles.orbForm}>
                                        <div className={styles.inputWrap}>
                                            <input
                                                type="text"
                                                required
                                                maxLength={4}
                                                placeholder="Enter 4-Digit OTP"
                                                value={enteredOtp}
                                                onChange={(e) => setEnteredOtp(e.target.value.trim())}
                                                className={`${styles.orbInput} ${styles.otpInput}`}
                                            />
                                        </div>

                                        <button type="submit" className={styles.orbSubmitBtn}>
                                            VERIFY &amp; LOGIN
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
                                                <RefreshCw size={12} />
                                                <span>Resend OTP</span>
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
                                            onClick={() => setIsFlipped(true)}
                                            className={styles.switchBtn}
                                        >
                                            Sign Up
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BACK FACE: SIGN UP */}
                    <div className={styles.cardFaceBack}>
                        <div className={styles.neonHaloRing}>
                            <div className={styles.orbBody}>
                                <div className={styles.orbHeader}>
                                    <h1 className={styles.neonTitle}>SIGN UP</h1>
                                    <p className={styles.orbSubtitle}>Create your account</p>
                                </div>

                                <form onSubmit={handleSignUp} className={styles.orbForm}>
                                    <div className={styles.inputWrap}>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Full Name"
                                            value={signupName}
                                            onChange={(e) => setSignupName(e.target.value)}
                                            className={styles.orbInput}
                                        />
                                    </div>

                                    <div className={styles.inputWrap}>
                                        <input
                                            type="tel"
                                            required
                                            maxLength={10}
                                            placeholder="Mobile Number"
                                            value={signupPhone}
                                            onChange={(e) => setSignupPhone(e.target.value.replace(/\D/g, ''))}
                                            className={styles.orbInput}
                                        />
                                    </div>

                                    <div className={styles.inputWrap}>
                                        <input
                                            type="email"
                                            required
                                            placeholder="Email Address"
                                            value={signupEmail}
                                            onChange={(e) => setSignupEmail(e.target.value)}
                                            className={styles.orbInput}
                                        />
                                    </div>

                                    <button type="submit" className={styles.orbSubmitBtn}>
                                        CREATE ACCOUNT
                                    </button>
                                </form>

                                <div className={styles.switchModeWrap}>
                                    <p className={styles.switchText}>
                                        Already have an account?{' '}
                                        <button
                                            type="button"
                                            onClick={() => setIsFlipped(false)}
                                            className={styles.switchBtn}
                                        >
                                            Login
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4 Bottom Glowing Cyan Dots */}

            </section>
        </main>
    );
}