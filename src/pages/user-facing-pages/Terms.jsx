import React from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

const Terms = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <DocumentTextIcon className="w-8 h-8 text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Terms and Conditions
          </h1>
        </div>
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              1. Description of Service
            </h2>
            <p>
              The platform provides features such as account overview, activity
              logs, data visualization, settings management, and downloadable
              reports.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              2. Eligibility
            </h2>
            <p>
              You must be an authorized user with a valid customer ID and API
              key issued by the platform administrator. By using this platform,
              you represent that you are authorized to access the information
              presented.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              3. User Responsibilities
            </h2>
            <p className="mb-2">
              • Keep your customer ID and API key confidential
            </p>
            <p className="mb-2">
              • You are solely responsible for any activity conducted under your
              credentials
            </p>
            <p>
              • You must not misuse the platform by attempting to breach
              security, inject malicious scripts, or access unauthorized data
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              4. API Key Use
            </h2>
            <p>
              The API key is a secure token provided solely for your use.
              Sharing, redistributing, or exposing your API key is strictly
              prohibited. Misuse may result in immediate termination of access.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              5. Data Privacy
            </h2>
            <p>
              We take your data privacy seriously. Your data is processed only
              for the purpose of delivering the dashboard service. For more
              information, please refer to our Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              6. Intellectual Property
            </h2>
            <p>
              All content, software, designs, and components of this dashboard
              are the intellectual property of the platform provider.
              Unauthorized copying, modification, or distribution is prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              7. Limitation of Liability
            </h2>
            <p>
              We are not liable for any indirect, incidental, or consequential
              damages resulting from your use of the platform. Use of the
              service is provided "as-is" and "as-available" without warranties
              of any kind.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              8. Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate your access without
              notice if we detect misuse, unauthorized access, or violation of
              these Terms.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              9. Modifications to Terms
            </h2>
            <p>
              We may update these terms at any time. Continued use of the
              dashboard after any changes constitutes acceptance of the revised
              terms.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              10. Governing Law
            </h2>
            <p>
              These Terms and Conditions shall be governed by and construed in
              accordance with the applicable laws.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              11. Contact Us
            </h2>
            <p>
              If you have any questions regarding these Terms and Conditions,
              please contact us at:
            </p>
            <p className="mt-2">
              📧 Email:{" "}
              <span className="text-blue-600">support@example.com</span>
              <br />
              📞 Phone: +1 (555) 123-4567
            </p>
          </div>

          <div className="pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            © {new Date().getFullYear()}  All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
