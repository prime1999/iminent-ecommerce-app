import { useState, useEffect, useRef } from "react";
import Rating from "@mui/material/Rating";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { toast } from "react-toastify";

const CardDesign = ({ product }) => {
  const [productCopy, setProductCopy] = useState({ ...product });
  const [quantity, setQuantity] = useState(1);
  const isMounted = useRef(true);
  const navigate = useNavigate();

  //update the productCopy data anf add the uerRef(userId) if a user is logged in
  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setProductCopy({ ...productCopy, userRef: user.uid });
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  const addProductToCart = async () => {
    //Function to upload image to storage
    // const uploadImage = async (image, authToken) => {
    //   try {
    //     //check if user is authenticated
    //     if (!authToken) {
    //       throw new Error("User is not authenticated");
    //     }

    //     // initialize storage
    //     const storage = getStorage();
    //     // get filename
    //     const d = new Date();
    //     const date =
    //       d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    //     const time = d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();
    //     const fileName = `${date}_${time}_${image}`;
    //     console.log(fileName);
    //     // ref to the storage folder
    //     const storageRef = ref(storage, `images/${fileName}`);
    //     // upload image to image folder in storage
    //     const uploadTask = uploadBytesResumable(storageRef, image);
    //     // return download URL when upload is complete
    //     return new Promise((resolve, reject) => {
    //       uploadTask.on(
    //         "state_changed",
    //         // handle upload progress
    //         (snapshot) => {
    //           const progress =
    //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //           console.log("Upload is " + progress + "% done");
    //           switch (snapshot.state) {
    //             case "paused":
    //               console.log("Upload is paused");
    //               break;
    //             case "running":
    //               console.log("Upload is running");
    //               break;
    //           }
    //         },
    //         // handle upload errors
    //         (error) => {
    //           console.error("Error uploading image:", error);
    //           reject(error);
    //         },
    //         // resolve promise with download URL when upload is complete
    //         () => {
    //           getDownloadURL(uploadTask.snapshot.ref)
    //             .then((downloadURL) => {
    //               console.log("File available at", downloadURL);
    //               resolve(downloadURL);
    //             })
    //             .catch((error) => {
    //               console.log(error);
    //             });
    //         }
    //       );
    //     });
    //   } catch (error) {
    //     console.error("Error uploading image:", error);
    //     throw error;
    //   }
    // };

    // const authToken = await auth.currentUser.getIdToken(
    //   /* forceRefresh */ true
    // );
    // const imageUrl = await uploadImage(product.image, authToken);

    //clone productCopy
    const addedProduct = {
      ...productCopy,
      productId: productCopy.id,
      timestamp: serverTimestamp(),
      productImg: productCopy.image,
      quantity,
    };
    delete addedProduct.rating;
    delete addedProduct.image;
    delete addedProduct.id;

    //Add addedProduct to cart collection on firebase
    await addDoc(collection(db, "cart"), addedProduct);
    navigate("/cart");
  };

  return (
    <div className="container font-poppins">
      <div className="relative mx-4 w-[220px] border h-[400px] bg-white  my-4 hover:shadow-xl">
        <Link to={`/product-details/${product.id}`}>
          <div className="flex justify-center items-center pt-8">
            <img src={product.image} alt="" className="w-[150px]" />
          </div>
          <div className="absolute bottom-7 bg-white p-4 w-full">
            <h2 className="font-bold text-md">{product.title}</h2>
            <p className="my-2 text-darkGray">{`$${product.price}`}</p>
            <div className="flex justify-between mb-4">
              <Rating name="read-only" value={product.rating.rate} readOnly />
              <p className="text-darkGray font-lato">
                ({product.rating.count})
              </p>
            </div>
          </div>
        </Link>
        <div className="absolute bottom-0 flex justify-center w-full my-2">
          <button
            onClick={addProductToCart}
            className="w-3/4 p-2 bg-orange rounded-lg font-poppins font-normal text-white"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDesign;
