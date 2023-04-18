import { useContext, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { BsTrash3 } from "react-icons/bs";
import {} from "firebase/firestore";
import CartContext from "../Context/CartContext";

const CartDesign = ({ cart, handleDelete }) => {
  const { count } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDelete = (id) => {
    handleDelete(id);
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <div className="my-4 border-b pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-32">
              <img src={cart?.data?.productImg} alt="" />
            </div>
            <div className="ml-4 w-48 font-lato text-sm font-bold">
              <h1>{cart?.data?.title}</h1>
            </div>
          </div>
          <div>
            <p className="font-lato font-bold">${cart?.data?.price}</p>
          </div>
          <div className="flex items-center font-lato bg-slate-100 p-2 rounded-2xl">
            <button
              className="text-2xl font-bold"
              onClick={() => console.log(cart.id)}
            >
              -
            </button>
            <h6 className="mx-6 font-bold">{count}</h6>
            <button className="text-xl font-bold">+</button>
          </div>
          <div className="font-lato font-bold">
            <button onClick={handleOpen} className="bg-red-500 px-2 text-white">
              x
            </button>
            <div>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
              >
                <Fade in={open}>
                  <Box sx={style}>
                    <p className="font-lato font-semibold">
                      Once removed this item will no longer be available in your
                      cart.
                    </p>
                    <div className="flex justify-between font-lato font-bold mt-4">
                      <button
                        className="bg-red-500 p-2 px-4 text-white rounded-lg hover:bg-[#B22507]"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                      <button
                        className="flex justify-between items-center p-2 px-4 text-white rounded-lg bg-[#32CD32] hover:bg-[#355E3B]"
                        onClick={() => onDelete(cart.id)}
                      >
                        <BsTrash3 className="mr-2" />
                        <p>Remove</p>
                      </button>
                    </div>
                  </Box>
                </Fade>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDesign;
