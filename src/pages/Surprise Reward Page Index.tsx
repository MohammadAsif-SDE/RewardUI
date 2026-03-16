import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift, Sparkles, PartyPopper } from "lucide-react";

const fireConfetti = () => {
  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ["#FFD700", "#FFA500", "#FF6347", "#7B68EE", "#00CED1"],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ["#FFD700", "#FFA500", "#FF6347", "#7B68EE", "#00CED1"],
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();

  // Big burst
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    colors: ["#FFD700", "#FFA500", "#FF6347", "#7B68EE", "#00CED1"],
  });
};

const Index = () => {
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    setClaimed(true);
    fireConfetti();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <AnimatePresence mode="wait">
        {!claimed ? (
          <motion.div
            key="claim"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center px-6 relative z-10"
          >
            {/* Gift icon */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8"
            >
              <div className="w-28 h-28 rounded-full bg-card flex items-center justify-center reward-glow">
                <Gift className="w-14 h-14 text-primary" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold mb-3 shimmer-text">
                You Have a Reward!
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-md mb-10">
                We've got something special waiting just for you. Tap below to claim it!
              </p>
            </motion.div>

            <motion.button
              onClick={handleClaim}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="group relative px-10 py-4 rounded-full bg-primary font-bold text-lg text-primary-foreground tracking-wide reward-glow hover:reward-glow-strong transition-shadow duration-300 flex items-center gap-3"
            >
              <Sparkles className="w-5 h-5" />
              Claim Your Reward
              <Sparkles className="w-5 h-5" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center px-6 relative z-10"
          >
            <motion.div
              initial={{ rotate: -20, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 12 }}
              className="mb-8"
            >
              <div className="w-32 h-32 rounded-full bg-card flex items-center justify-center reward-glow-strong">
                <PartyPopper className="w-16 h-16 text-primary" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold mb-4 shimmer-text"
            >
              Reward Granted! 🎉
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-muted-foreground text-lg md:text-xl max-w-lg mb-8"
            >
              Congratulations! Your reward has been successfully claimed. Enjoy your special gift!
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="px-8 py-3 rounded-full border border-primary/30 bg-primary/10 text-primary font-semibold text-sm tracking-wider uppercase"
            >
              ✨ Reward Activated ✨
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
