import SettingsTabloid from "@/components/SettingsTabloid";
import PageContainer from "@/components/containers/PageContainer";
import SecondaryTitle from "@/components/ui/Titles/SecondaryTitles";
const SettingsPage = () => {
  return (
    <PageContainer title={"Settings"}>
      <SettingsTabloid />
    </PageContainer>
  );
};
export default SettingsPage;
