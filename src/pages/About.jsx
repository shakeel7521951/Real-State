import AboutUs from "../components/about/AboutUs";
import CommonHeader from "../components/common/CommonHeader";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const About = () => {
  useDocumentTitle("About Us");

  return (
    <div>
      <CommonHeader
        title="About Us"
        subtitle="We're here to help with all your real estate needs"
      />
      <AboutUs />
    </div>
  );
};

export default About;
