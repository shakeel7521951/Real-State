import CommonHeader from "../components/common/CommonHeader";
import PropertyListing from "../components/properties/PropertyListing";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const Properties = () => {
  useDocumentTitle("Properties");

  return (
    <div>
      <CommonHeader title="Properties" />
      <PropertyListing />
    </div>
  );
};

export default Properties;
