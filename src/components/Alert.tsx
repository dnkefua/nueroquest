import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import './Alert.css';

interface Props {
    message: string;
    type: 'success' | 'error';
}

const Alert: React.FC<Props> = ({ message, type }) => {
    return (
        <AnimatePresence>
            <motion.div
                className="alert-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="alert-box glass"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                >
                    {type === 'success' ? (
                        <CheckCircle size={48} color="var(--success)" />
                    ) : (
                        <XCircle size={48} color="var(--error)" />
                    )}
                    <p>{message}</p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Alert;
