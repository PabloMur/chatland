import LandingBanner from "@/app/components/LandingBanner";
import CustomImageBanner from "@/app/components/CustomImageBanner";
import landingImg from "../../public/img/landing.webp";
import ContainerPrevFrames from "@/app/components/ContainerPrevFrames";

export default function Home() {
  return (
    <ContainerPrevFrames>
      <LandingBanner />
      <CustomImageBanner
        imageAlt={"imagen de persona sentada de manera lateral"}
        imageUrl={landingImg}
      />
    </ContainerPrevFrames>
  );
}
