import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicy() {
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
              <Shield className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">Legal Document</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Privacy Policy</h1>
            <p className="text-sm text-gray-500 mt-2">
              Effective Date: [EFFECTIVE DATE] | Last Updated: [LAST UPDATED DATE]
            </p>
          </div>

          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">1. Overview</h2>
              <p>
                This Privacy Policy explains how [COMPANY LEGAL NAME] ("we," "our," or "us") collects, uses, stores, and protects personal and operational information when you use our web application and services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">2. Information We Collect</h2>
              <p>We collect information directly from you when you create an account, upload files, or enter project details:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li><strong>Account Information:</strong> Name, email address, password hash, and company details.</li>
                <li><strong>Customer and Contact Details:</strong> Customer names, phone numbers, and physical addresses entered by users for jobs or quotes.</li>
                <li><strong>Uploaded Media and Content:</strong> Job photos, video files, images, notes, and quote data uploaded to the platform.</li>
                <li><strong>System Logs:</strong> Request timestamps, IP addresses, browser user agent, and basic diagnostic metadata.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">3. How We Use Your Information</h2>
              <p>We use collected data solely to deliver, maintain, and improve our services, including:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li>Providing user authentication and account access.</li>
                <li>Processing, transforming, and hosting job media and quote documents.</li>
                <li>Running automated assistance and transcription features on your notes and photos.</li>
                <li>Maintaining system stability, troubleshooting errors, and preventing unauthorized use.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">4. Third-Party Service Providers and Processors</h2>
              <p>We share data only with trusted infrastructure providers required to operate the application:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li><strong>Cloudinary:</strong> For media storage, image optimization, and CDN delivery.</li>
                <li><strong>Supabase:</strong> For relational database storage and user authentication.</li>
                <li><strong>Vercel:</strong> For web application hosting and serverless compute execution.</li>
                <li><strong>Gemini API (Google):</strong> For artificial intelligence processing of job notes and image analysis.</li>
              </ul>
              <p>
                We do not sell your personal data or customer records to data brokers, advertisers, or any third parties.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">5. Cookies and Local Storage</h2>
              <p>
                We use cookies and browser local storage strictly for essential session authentication and user interface preferences. We do not use third-party advertising cookies or cross-site tracking scripts.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">6. Data Retention and Deletion</h2>
              <p>
                We retain your account data and uploaded media for as long as your account remains active. You can request the permanent deletion of your account and all associated customer data, photos, and quotes at any time by contacting us at [CONTACT EMAIL].
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">7. Security</h2>
              <p>
                We protect your data using industry-standard measures: encrypted HTTPS transport, secure server-side credential isolation, authenticated API endpoints, and least-privilege access controls. However, no internet transmission is completely immune to vulnerabilities.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">8. Your Rights</h2>
              <p>
                Depending on your jurisdiction, you have the right to access, correct, export, or delete your personal data. To exercise any of these rights, email us at [CONTACT EMAIL].
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">9. Contact Information</h2>
              <p>
                For questions or requests regarding this Privacy Policy, please contact:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 font-mono text-xs text-gray-800 space-y-1">
                <div>[COMPANY LEGAL NAME]</div>
                <div>Attn: Privacy Officer</div>
                <div>Email: [CONTACT EMAIL]</div>
                <div>Location: [COUNTRY/STATE]</div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
