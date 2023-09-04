"use client";
import CustomImageBanner from "@/components/CustomImageBanner";
import ContainerPrevFrames from "@/components/ContainerPrevFrames";
import SignupForm from "@/components/forms/SignupForm";
import signupImage from "../../../public/img/landing.webp";
import Loader from "@/components/Loader";
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
