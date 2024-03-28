import React from "react";
import "./DonationButton.css";

const DonationButton = () => {
  const handleDonationClick = () => {
    window.open("https://donate.stripe.com/test_8wM6qf4sC1To7NS28a", "_blank");
  };

  return (
    <button className="donation-btn" onClick={handleDonationClick}>
      Donate
    </button>
  );
};

export default DonationButton;
