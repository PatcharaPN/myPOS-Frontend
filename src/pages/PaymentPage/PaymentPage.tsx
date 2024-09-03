import { useMemo, useRef } from "react";
import "./PaymentPage.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../features/CartSlice";
import { useReactToPrint } from "react-to-print";
import { getAllPayments } from "../../features/paymentSlice";

const PaymentPage = () => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const cart = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const subtotal = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }, [cart]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Receipt",
  });

  const handlegoback = () => {
    navigate("/");
    dispatch(getAllPayments());
    dispatch(clearCart());
  };

  const tax = useMemo(() => {
    return subtotal * 0.1;
  }, [subtotal]);

  const totalAmount = useMemo(() => {
    return subtotal + tax;
  }, [subtotal, tax]);

  return (
    <div className="paymentmenu-wrapper" ref={componentRef}>
      <div className="paymentmenu">
        <div className="payment-result">
          <div className="icon-operation">
            <Icon width={120} className="check-icon" icon="gg:check-o" />
          </div>
          <div className="logo-receipt">
            <img src="../../../public/Logo.svg" alt="" />
          </div>
          <p className="complete-text">
            Your order operation has been completed
          </p>

          <div className="product-information">
            <div>Order</div>
            <div>Amount</div>
          </div>
          {cart.map((item) => (
            <div key={item.product._id} className="flex-product-info">
              <p>{item.product.name}</p>
              <p>${item.product.price.toFixed(2)}</p>
            </div>
          ))}
          <div className="product-information">
            <div>Total amount</div>
            <div>${totalAmount.toFixed(2)}</div>
          </div>
          <div className="flex-btn-group">
            <button className="back-btn" onClick={handlegoback}>
              Back to main page
            </button>
            <button className="download-receipt" onClick={handlePrint}>
              <Icon width={30} icon="material-symbols:download" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
