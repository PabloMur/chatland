import CustomImageBanner from "@/app/components/CustomImageBanner";
import ContainerPrevFrames from "@/app/components/ContainerPrevFrames";
import loginImage from "../../../public/img/welcome.jpg";
import SignupForm from "../components/SignupForm";
export default function Signup() {
  return (
    <ContainerPrevFrames>
      <SignupForm />
      <CustomImageBanner
        imageUrl={loginImage}
        imageAlt="imagen de una mujer con un smartphone"
      ></CustomImageBanner>
    </ContainerPrevFrames>
  );
}
