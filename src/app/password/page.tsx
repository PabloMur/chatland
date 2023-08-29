import CustomImageBanner from "@/app/components/CustomImageBanner";
import ContainerPrevFrames from "@/app/components/ContainerPrevFrames";
import loginImage from "../../../public/img/welcome.jpg";
import PasswordForm from "../components/forms/PasswordForm";
export default function Password() {
  return (
    <ContainerPrevFrames>
      <PasswordForm />
      <CustomImageBanner
        imageAlt={"imagen de persona sentada de manera lateral"}
        imageUrl={loginImage}
      />
    </ContainerPrevFrames>
  );
}
