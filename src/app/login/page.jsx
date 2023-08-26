import CustomImageBanner from "@/app/components/CustomImageBanner";
import ContainerPrevFrames from "@/app/components/ContainerPrevFrames";
import loginImage from "../../../public/img/welcome.jpg";
import LoginForm from "@/app/components/LoginForm";
export default function Login() {
  return (
    <ContainerPrevFrames>
      <LoginForm></LoginForm>
      <CustomImageBanner
        imageUrl={loginImage}
        imageAlt="imagen de una mujer con un smartphone"
      ></CustomImageBanner>
    </ContainerPrevFrames>
  );
}
