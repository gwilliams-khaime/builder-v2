'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { DesignPanel } from './design-panel';

// Mock mode type - UI only, no editor logic
type Mode = 'kai' | 'manual';

interface RightPanelProps {
  isOpen: boolean;
}

// UI-only Right Panel - removed all GrapesJS and editor integrations
export function RightPanel({ isOpen }: RightPanelProps) {
  // Mock state - replaced toolbar store with local state
  const [mode, setMode] = useState<Mode>('manual');
  
  // Mock subscription data - replaced API calls with static values
  const [remainingDays] = useState<number>(7);
  const subscriptionPlans = null; // Mock: no subscription plans
  const freeTrialEnded = false;
  const subscription_status = null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 348, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="h-full bg-panel border-l border-border overflow-hidden relative z-20"
        >
          <div className="w-[348px] h-full">
            <div
              key="properties-aside"
              data-testid="properties-panel"
              className="bg-panel h-full relative flex-shrink-0 flex flex-col overflow-hidden"
            >
              {subscriptionPlans && !freeTrialEnded && subscription_status === 'trialing' && (
                <div className="bg-[#F89725] px-[10px] rounded-t-2xl h-[44px] flex items-center justify-between">
                  <div className="flex items-center gap-[7px]">
                    <Image src="/icons/sand-box.svg" alt="Timer Icon" width={17} height={17} />
                    <span className="text-[13px] font-inter font-semibold text-gray-100">
                      {remainingDays ?? 0} Days Left for Trial
                    </span>
                  </div>
                  <span
                    className="text-white underline font-semibold text-[12px] cursor-pointer"
                  >
                    Start Subscription
                  </span>
                </div>
              )}

              <div className="relative flex-1 overflow-hidden">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={mode}
                    initial={{
                      x: mode === 'kai' ? '-100%' : '100%',
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                    }}
                    exit={{
                      x: mode === 'kai' ? '100%' : '-100%',
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 bg-panel"
                  >
                    {mode === 'kai' ? (
                      <div data-testid="kai-chat-panel">
                        {/* Kai Chat Panel placeholder - removed integration */}
                        <div className="p-4 text-center text-muted-foreground">
                          <p>Kai Chat Panel</p>
                          <p className="text-xs mt-2">UI placeholder - integration removed</p>
                        </div>
                      </div>
                    ) : (
                    
                        <DesignPanel  />
           
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
