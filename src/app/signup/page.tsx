import CustomImageBanner from "@/app/components/CustomImageBanner";
import ContainerPrevFrames from "@/app/components/ContainerPrevFrames";
import SignupForm from "../components/forms/SignupForm";
import signupImage from "../../../public/img/landing.webp";
export default function Signup() {
  return (
    <ContainerPrevFrames>
      <SignupForm />
      <CustomImageBanner
        imageAlt={"imagen de persona sentada de manera lateral"}
        imageUrl={signupImage}
      />
    </ContainerPrevFrames>
  );
}
