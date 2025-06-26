import Header from "../components/home/Header";
import FeaturedProperties from "../components/home/FeaturedProperties";
import HomePoster from "../components/home/HomePoster";
import WhyChooseUs from "../components/home/WhyChooseUs";
import OurAgents from "../components/home/OurAgents";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const Home = () => {
  useDocumentTitle("Find Your Dream Home");

  return (
    <div>
      <Header />
      <FeaturedProperties />
      <HomePoster />
      <WhyChooseUs />
      <OurAgents />
    </div>
  );
};

export default Home;
