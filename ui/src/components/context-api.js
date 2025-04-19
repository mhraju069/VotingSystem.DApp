import { createContext, useContext, useState, useEffect } from 'react';

const VoteContext = createContext();

export function VoteProvider({ children }) {
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [isVotingActive, setIsVotingActive] = useState(false);

    // কাউন্টডাউন লজিক এখানে রাখুন
    useEffect(() => {
        let interval;
        if (isVotingActive && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setIsVotingActive(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isVotingActive, timeRemaining]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    return (
        <VoteContext.Provider value={{ 
            timeRemaining, 
            isVotingActive, 
            setTimeRemaining, 
            setIsVotingActive,
            formatTime
        }}>
            {children}
        </VoteContext.Provider>
    );
}

export function useVote() {
    return useContext(VoteContext);
}