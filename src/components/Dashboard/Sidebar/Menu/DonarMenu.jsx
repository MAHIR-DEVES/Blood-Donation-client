import { BiSolidDonateBlood } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { IoMdHome } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { SiMicrodotblog } from 'react-icons/si';
import MenuItem from './MenuItem';

// import BecomeSellerModal from '../../../Modal/BecomeSellerModal';
const DonarMenu = () => {
  // const [isOpen, setIsOpen] = useState(false);

  // const closeModal = () => {
  //   setIsOpen(false);
  // };

  return (
    <>
      =
      <MenuItem icon={IoMdHome} label="Home" address="" />
      <MenuItem
        icon={BiSolidDonateBlood}
        label="My Requests "
        address="donation-requests"
      />
      <MenuItem
        icon={FaUser}
        label="Create Requests "
        address="create-request"
      />
      <MenuItem icon={IoSearch} label="Search Donor" address="/search" />
      <MenuItem icon={SiMicrodotblog} label="Blog" address="/blog" />
      {/* <div
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-white  hover:bg-gray-300   hover:text-black cursor-pointer"
      >
        <GrUserAdmin className="w-5 h-5" />

        <span className="mx-4 font-medium">Become A Seller</span>
      </div>

      <BecomeSellerModal closeModal={closeModal} isOpen={isOpen} /> */}
    </>
  );
};

export default DonarMenu;
