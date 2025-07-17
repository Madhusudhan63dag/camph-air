import React from 'react';

const Return = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-[#5d3c77]">Return Policy</h1>

      <p className="mb-4">
        <strong>Camph Airr</strong> is committed to helping people create fresher, safer, and more aromatic spaces. We stand behind the quality of our products with a <strong>15-day return policy</strong>.
        If you feel that our product is not meeting your expectations, we offer a refund within 15 days of receipt of your order — excluding shipping charges.
      </p>

      <p className="mb-4">
        Any remaining product along with the original packaging must be returned to <strong>Camph Airr</strong> for the refund to be processed.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Eligibility Criteria</h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>Refunds require returning either used or unused product packaging of Camph Airr.</li>
        <li>The return process must be initiated and completed by the customer.</li>
        <li>The returned product must reach the specified address mentioned on our website.</li>
        <li>The returned product must arrive within 15 days of the purchase date.</li>
        <li>We do not accept damaged or tampered products for returns.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Refund Process</h2>
      <p className="mb-4">
        Once the returned product is received and verified, the eligible refund will be processed. The amount will be credited to the original source of payment within <strong>10 working days</strong>.
      </p>

      <p className="mt-10 text-sm text-gray-500">
        For any assistance, please reach out to our customer support through the contact information provided on the website.
      </p>
    </div>
  );
};

export default Return;
