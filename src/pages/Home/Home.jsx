import Banner from '../../components/Home/Banner';
import ContactSection from '../../components/Home/ContactSection';
import DonationSection from '../../components/Home/DonationSection';
import FeaturedSection from '../../components/Home/FeaturedSection';
// import Donor from '../../components/Home/Donor';

const Home = () => {
  return (
    <div>
      <Banner></Banner> {/* <Donor />{' '} */}
      <DonationSection></DonationSection>
      {/* Featured Section */}
      <FeaturedSection></FeaturedSection>
      {/*contact section  */}
      <ContactSection></ContactSection>
    </div>
  );
};

export default Home;
