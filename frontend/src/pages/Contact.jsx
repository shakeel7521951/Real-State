import CommonHeader from "../components/common/CommonHeader";
import ContactForm from "../components/contact/ContactForm";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const Contact = () => {
  useDocumentTitle("Contact Us");

  return (
    <div>
      <CommonHeader
        title="Contact Us"
        subtitle="We're here to help with all your real estate needs"
      />
      <ContactForm />
    </div>
  );
};

export default Contact;
