import Banner from '../../components/Home/Banner';
// import Donor from '../../components/Home/Donor';

const Home = () => {
  return (
    <div>
      <Banner></Banner> {/* <Donor />{' '} */}
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              SMS-based platform to connect blood searchers with donors
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Rokto is a real-time free platform to help blood searchers connect
              voluntary blood donors around Bangladesh.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200">
                Find a Donation Center
              </button>
              <button className="bg-white hover:bg-gray-50 text-red-600 font-medium py-3 px-6 border border-red-600 rounded-lg transition duration-200">
                Learn More
              </button>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What is Rokto?
            </h2>
            <p className="text-gray-600 mb-6">
              Rokto is an automated blood service that connects blood searchers
              with voluntary donors in a moment through SMS.
              <br />
              Rokto is always a free service for all.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why Rokto?
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-red-600 mr-2"
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
                <span className="text-gray-600">100% Automated</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-red-600 mr-2"
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
                <span className="text-gray-600">Always free</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-red-600 mr-2"
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
                <span className="text-gray-600">24-7 service</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-red-600 mr-2"
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
                <span className="text-gray-600">All data is secured</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
