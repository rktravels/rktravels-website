'use client';

import React, { useState } from 'react';
import {
    Car,
    Repeat,
    Mountain,
    Plane,
    MapPin,
    Calendar,
    Clock,
    User,
    ArrowRight,
    ArrowLeftRight,
    ChevronDown,
} from 'lucide-react';
import styles from './BookingWidget.module.css';

type RideTabType = 'oneway' | 'round' | 'outstation' | 'airport';

export default function BookingWidget() {
    const [selectedRide, setSelectedRide] = useState<RideTabType>('oneway');
    const [pickup, setPickup] = useState('');
    const [drop, setDrop] = useState('');

    const handleSwapLocations = () => {
        setPickup(drop);
        setDrop(pickup);
    };

    return (
        <div className={styles.widgetBox}>
            {/* Top Tabs Header */}
            <div className={styles.typeBar}>
                <button
                    type="button"
                    onClick={() => setSelectedRide('oneway')}
                    className={`${styles.typeBtn} ${selectedRide === 'oneway' ? styles.typeBtnActive : ''}`}
                >
                    <Car size={18} className={styles.tabIcon} />
                    <span>One Way</span>
                </button>

                <button
                    type="button"
                    onClick={() => setSelectedRide('round')}
                    className={`${styles.typeBtn} ${selectedRide === 'round' ? styles.typeBtnActive : ''}`}
                >
                    <Repeat size={17} className={styles.tabIcon} />
                    <span>Round Trip</span>
                </button>

                <button
                    type="button"
                    onClick={() => setSelectedRide('outstation')}
                    className={`${styles.typeBtn} ${selectedRide === 'outstation' ? styles.typeBtnActive : ''}`}
                >
                    <Mountain size={17} className={styles.tabIcon} />
                    <span>Outstation</span>
                </button>

                <button
                    type="button"
                    onClick={() => setSelectedRide('airport')}
                    className={`${styles.typeBtn} ${selectedRide === 'airport' ? styles.typeBtnActive : ''}`}
                >
                    <Plane size={17} className={styles.tabIcon} />
                    <span>Airport</span>
                </button>
            </div>

            {/* Main Form Area */}
            <form onSubmit={(e) => e.preventDefault()} className={styles.formArea}>
                {/* Pickup & Drop Row with Centered Swap Button */}
                <div className={styles.routeRow}>
                    <div className={styles.fieldBox}>
                        <MapPin size={20} className={styles.pinIcon} />
                        <div className={styles.fieldDetails}>
                            <span className={styles.fieldLabel}>Pickup Location</span>
                            <input
                                type="text"
                                value={pickup}
                                onChange={(e) => setPickup(e.target.value)}
                                placeholder="Enter pickup location"
                                className={styles.fieldInput}
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSwapLocations}
                        className={styles.switchLocationBtn}
                        aria-label="Swap pickup and drop locations"
                    >
                        <ArrowLeftRight size={14} />
                    </button>

                    <div className={styles.fieldBox}>
                        <MapPin size={20} className={styles.pinIcon} />
                        <div className={styles.fieldDetails}>
                            <span className={styles.fieldLabel}>Drop Location</span>
                            <input
                                type="text"
                                value={drop}
                                onChange={(e) => setDrop(e.target.value)}
                                placeholder="Enter drop location"
                                className={styles.fieldInput}
                            />
                        </div>
                    </div>
                </div>

                {/* Pickup Date, Pickup Time, Passengers */}
                <div className={styles.specsRow}>
                    <div className={styles.fieldBox}>
                        <Calendar size={19} className={styles.metaIcon} />
                        <div className={styles.fieldDetails}>
                            <span className={styles.fieldLabel}>Pickup Date</span>
                            <span className={styles.metaValue}>Sep 24, 2026</span>
                        </div>
                    </div>

                    <div className={styles.fieldBox}>
                        <Clock size={19} className={styles.metaIcon} />
                        <div className={styles.fieldDetails}>
                            <span className={styles.fieldLabel}>Pickup Time</span>
                            <span className={styles.metaValue}>10:30 AM</span>
                        </div>
                    </div>

                    <div className={styles.fieldBox}>
                        <User size={19} className={styles.metaIcon} />
                        <div className={styles.fieldDetails}>
                            <span className={styles.fieldLabel}>Passengers</span>
                            <div className={styles.passengerSelectRow}>
                                <span className={styles.metaValue}>1</span>
                                <ChevronDown size={16} className={styles.dropdownCarat} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Primary CTA Search Button */}
                <button type="submit" className={styles.searchSubmitBtn}>
                    <span>Search Cabs</span>
                    <ArrowRight size={19} />
                </button>
            </form>
        </div>
    );
}