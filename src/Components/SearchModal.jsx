import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { RxMagnifyingGlass } from "react-icons/rx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "none",
  boxShadow: 24,
  p: 4,
};

const SearchModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className="bg-darkGray p-2 rounded-full hover:cursor-pointer">
        <RxMagnifyingGlass
          onClick={handleOpen}
          className="text-2xl font-bold"
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            key="Modal"
          >
            <Modal
              keepMounted
              open={open}
              onClose={handleClose}
              aria-labelledby="keep-mounted-modal-title"
              aria-describedby="keep-mounted-modal-description"
            >
              <Box sx={style}>
                <form className="relative">
                  <input
                    type="text"
                    placeholder="Search Product"
                    className="w-full border-b border-darkGray p-2 focus:outline-0"
                  />
                  <RxMagnifyingGlass className="absolute top-2 right-2 text-2xl font-bold hover:cursor-pointer" />
                </form>
              </Box>
            </Modal>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchModal;
