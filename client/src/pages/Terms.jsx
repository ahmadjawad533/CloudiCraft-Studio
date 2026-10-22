import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md px-2 py-1 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Workbench
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8 sm:p-10 shadow-sm space-y-8">
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-center space-x-2 text-blue-600 mb-2">
              <FileText className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">Legal Agreement</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Terms and Conditions</h1>
            <p className="text-sm text-gray-500 mt-2">
              Effective Date: [EFFECTIVE DATE] | Last Updated: [LAST UPDATED DATE]
            </p>
          </div>

          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">1. Acceptance of Terms</h2>
              <p>
                By accessing or using this application, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, you may not access or use the application.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">2. Acceptable Use</h2>
              <p>
                You agree to use this platform solely for legitimate business operations. You must not:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li>Upload illegal, defamatory, obscene, or infringing media or documents.</li>
                <li>Attempt to bypass security controls, rate limits, or authentication mechanisms.</li>
                <li>Scrape, reverse-engineer, or disrupt application infrastructure.</li>
                <li>Store sensitive personal data without proper customer consent.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">3. User Responsibility for AI-Generated Outputs and Quotes</h2>
              <p>
                The application provides automated features and artificial intelligence assistance (powered by the Gemini API) to generate draft notes, analyze images, and prepare price estimates.
              </p>
              <p className="font-medium text-gray-900">
                You retain sole and final responsibility for reviewing, verifying, and approving every AI-drafted quote, calculation, and document before sending it to any customer.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">4. No Warranty on AI Accuracy</h2>
              <p>
                The services and AI-generated outputs are provided on an "as-is" and "as-available" basis without warranties of any kind, whether express or implied. [COMPANY LEGAL NAME] makes no guarantee that automated calculations, itemizations, or photo evaluations will be accurate, complete, or error-free.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">5. User Content and Media Storage</h2>
              <p>
                You retain ownership of all job photos, quote information, and media you upload. By uploading content, you grant [COMPANY LEGAL NAME] a non-exclusive license to host, process, transform, and store your media through third-party processors (including Cloudinary, Supabase, and Vercel) solely to provide the services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">6. Account Termination</h2>
              <p>
                We reserve the right to suspend or terminate accounts that violate these Terms, fail to pay applicable fees, or engage in activity that threatens system integrity or legal compliance. You may terminate your account at any time by contacting [CONTACT EMAIL].
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, [COMPANY LEGAL NAME] and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities arising from your use of or inability to use the platform.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">8. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of [COUNTRY/STATE], without regard to conflict of law principles.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">9. Contact</h2>
              <p>
                If you have questions regarding these Terms, please contact us:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 font-mono text-xs text-gray-800 space-y-1">
                <div>[COMPANY LEGAL NAME]</div>
                <div>Email: [CONTACT EMAIL]</div>
                <div>Jurisdiction: [COUNTRY/STATE]</div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
