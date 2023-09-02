import CustomImageBanner from "@/components/CustomImageBanner";
import ContainerPrevFrames from "@/components/ContainerPrevFrames";
import loginImage from "../../../public/img/welcome.jpg";
import LoginForm from "@/components/forms/LoginForm";
export default function Login() {
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
