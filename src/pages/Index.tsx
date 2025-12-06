import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ValuesPreview } from "@/components/home/ValuesPreview";
import { StoryPreview } from "@/components/home/StoryPreview";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { JoinSection } from "@/components/home/JoinSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ValuesPreview />
      <StoryPreview />
      <GalleryPreview />
      <JoinSection />
    </Layout>
  );
};

export default Index;
