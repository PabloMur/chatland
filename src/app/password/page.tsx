import CustomImageBanner from "@/app/components/CustomImageBanner";
import ContainerPrevFrames from "@/app/components/ContainerPrevFrames";
import loginImage from "../../../public/img/welcome.jpg";
import LoginForm from "@/app/components/forms/LoginForm";
export default function Password() {
  return (
    <ContainerPrevFrames>
      <LoginForm />
      <CustomImageBanner
        imageAlt={"imagen de persona sentada de manera lateral"}
        imageUrl={loginImage}
      />
    </ContainerPrevFrames>
  );
}
