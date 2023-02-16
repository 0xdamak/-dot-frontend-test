import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Close } from "assets/icons";
import styles from "./Modal.module.scss";

type Props = {
  display: boolean;
  close: () => void;
  children: ReactNode;
};

export default function Modal({ display, close, children }: Props) {
  useEffect(() => {
    if (display) {
      document.querySelector("html")!.style.overflow = "hidden";
    }
    if (!display) {
      document.querySelector("html")!.style.removeProperty("overflow");
    }
  }, [display]);

  return (
    <AnimatePresence>
      {display && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className={styles.container}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Close onClick={close} />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
