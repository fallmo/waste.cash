import { useState, useContext } from "react";
import { ReactComponent as ArrowBack } from "../../icons/arrow-left.svg";
import { attemtPayment } from "../../utils";
import { Button, IconBtn } from "../default/button";
import { Detail } from "../default/misc";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { GlobalContext } from "../../context/global-context";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_wvMgr7SbTkE4CsYcckhdDmpY00VMEntEUv");

export const Pay = () => {
  return (
    <div className={`max-width p-rel pp`}>
      <Header />
      <Elements stripe={stripePromise}>
        <PayForm />
      </Elements>
    </div>
  );
};

const Header = () => {
  const {
    main: { cashAmount },
  } = useContext(GlobalContext);
  return (
    <>
      <BackBtn />
      <div className="flex justify-between mb-1">
        <h2 className="font-5 weight-400 colorable">Amount:</h2>
        <h2 className="font-5 weight-500 colorable">
          ${cashAmount.toFixed(2)}
        </h2>
      </div>
    </>
  );
};

const PayForm = () => {
  const [clicks, setClicks] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const {
    main: { cashAmount },
    themeDark,
    dispatch,
  } = useContext(GlobalContext);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;
    if (clicks < 1) return setClicks(1);
    setClicks(2);
    setError("");
    setLoading(true);
    const {
      error: stripeErr,
      paymentMethod,
    } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (stripeErr) return handleError(stripeErr.message);
    const { error } = await attemtPayment(paymentMethod.id, cashAmount);
    if (error) handleError(error);
    else handleSuccess();
  };

  const handleError = error => {
    setLoading(false);
    setError(error);
  };

  const handleSuccess = () => {
    setLoading(false);
    dispatch({
      type: "MOVE_TO_THANKS",
    });
  };

  const btnTitle = loading
    ? "Proccessing"
    : clicks === 1
    ? "Confirm"
    : "Waste Now";

  if (themeDark) {
    CARD_OPTIONS.style.base.color = "#71ff9a";
    CARD_OPTIONS.style.invalid.color = "#ff5e5e";
    CARD_OPTIONS.style.invalid.iconColor = "#ff5e5e";
  }

  return (
    <div className="flex flex-column y-gap-2 p-rel">
      <CardElement options={CARD_OPTIONS} />
      <Button
        title={btnTitle}
        block
        onClick={handleSubmit}
        disabled={loading || !stripe || !elements}
      />
      <InfoText
        loading={loading}
        error={error}
        amount={cashAmount}
        warn={clicks === 1}
      />
    </div>
  );
};

const InfoText = ({ loading, error, warn, amount }) => {
  const content = loading
    ? "Payment is being proccessed securely..."
    : error
    ? error
    : warn
    ? `By proceeding you are agreeing to have your card charged $${amount}.`
    : "Test Cards: <a target='_blank' href='https://stripe.com/docs/testing'>https://stripe.com/docs/testing</a>";
  return <Detail text={content} color={error ? "red" : undefined} />;
};

const BackBtn = () => {
  const { dispatch } = useContext(GlobalContext);
  const style = {
    top: -52,
  };
  function moveBack() {
    dispatch({
      type: "BACK_TO_CASH",
    });
  }
  return (
    <div className="p-abs" style={style}>
      <IconBtn Icon={ArrowBack} className="mb-1" onClick={moveBack} />
    </div>
  );
};

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      // iconColor: "#c4f0ff",
      color: "#000",
      fontWeight: 400,
      fontFamily:
        "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
      fontSize: "23px",
      fontSmoothing: "antialiased",
      // ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#757575" },
    },
    invalid: {
      iconColor: "#a50b00",
      color: "#a50b00",
    },
  },
};
