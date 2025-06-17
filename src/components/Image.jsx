import { BASE_URL } from "../api/config";
const Imagecomponent = ({ src, type = "server", className }) => {
  const imageUrl = type === "server" ? `${BASE_URL}/uploads/${src}` : src;

  return <img src={imageUrl} className={className} alt="image" />;
};

export default Imagecomponent;
