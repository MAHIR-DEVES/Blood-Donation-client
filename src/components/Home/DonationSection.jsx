import React from 'react';

const DonationSection = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-red-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Connecting <span className="text-red-600">Blood Donors</span> With
              Those In Need
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Rokto is Bangladesh's premier real-time platform connecting blood
              seekers with voluntary donors through SMS.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-lg transition duration-200 shadow-lg">
                Find a Donor Now
              </button>
              <button className="bg-white hover:bg-gray-50 text-red-600 font-medium py-3 px-8 border-2 border-red-600 rounded-lg transition duration-200 shadow">
                Become a Donor
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Blood donation"
              className="rounded-xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* What is Rokto Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Blood donation process"
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What is Rokto?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Rokto is an automated blood service platform that instantly
                connects blood seekers with voluntary donors through SMS
                technology.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    100% free service for all users
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Operates 24/7 across all districts
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Secure and confidential matching system
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Rokto */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-red-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Why Choose Blood Hero?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-red-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Connection</h3>
              <p className="text-gray-600">
                Get matched with donors in your area within minutes through our
                platform.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-red-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Donors</h3>
              <p className="text-gray-600">
                All donors are properly screened and verified for your safety.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-red-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Nationwide Network</h3>
              <p className="text-gray-600">
                Access donors across all 64 districts of Bangladesh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Partners Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Hospital Partners
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              // Replace these with your actual hospital logo URLs
              '/images/hospital-logo-1.png',
              '/images/hospital-logo-2.png',
              '/images/hospital-logo-3.png',
              '/images/hospital-logo-4.png',
              '/images/hospital-logo-5.png',
              '/images/hospital-logo-6.png',
            ].map((imgSrc, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border border-gray-200 flex items-center justify-center hover:shadow-md transition-shadow min-h-[120px]"
              >
                {/* Fallback component if images don't load */}
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={`Hospital Partner ${index + 1}`}
                    className="max-h-16 max-w-full object-contain"
                    onError={e => {
                      e.target.onerror = null;
                      e.target.parentElement.innerHTML = `
                  <div class="text-center">
                    <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <span class="text-gray-600 text-sm">Hospital ${
                      index + 1
                    }</span>
                  </div>
                `;
                    }}
                  />
                ) : (
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg
                        className="h-6 w-6 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-600 text-sm">
                      Hospital {index + 1}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Want to partner with us?
            </h3>
            <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-lg transition duration-200 shadow-lg">
              Register Your Hospital
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Save Lives?</h2>
          <p className="text-xl mb-8">
            Join thousands of donors who are making a difference every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white hover:bg-gray-100 text-red-600 font-bold py-3 px-8 rounded-lg transition duration-200 shadow-lg">
              Register as Donor
            </button>
            <button className="bg-transparent hover:bg-red-700 text-white font-bold py-3 px-8 border-2 border-white rounded-lg transition duration-200">
              Request Blood
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonationSection;
