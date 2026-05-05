import FeaturdProduct from "./_components/FeaturdProduct/FeaturdProduct";
import HomeSlider from "./_components/HomeSlider/HomeSlider";
import Features from "./_components/Features/Features";
import PromoBanners from "./_components/PromoBanners/PromoBanners";
import NewsletterSection from "./_components/NewsletterSection/NewsletterSection";
import { lazy, Suspense } from "react";
import { PropagateLoader } from "react-spinners";
// import HomeCategories from "./_components/HomeCategories/HomeCategories";

const LazyHomeCategory = lazy(
  () => import("./_components/HomeCategories/HomeCategories"),
);

export default function Home() {
  return (
    <>
      <HomeSlider />
      <Features />
      <Suspense fallback={<PropagateLoader color="#5af215" />}>
        <LazyHomeCategory />
      </Suspense>
      <PromoBanners />
      <FeaturdProduct />
      <NewsletterSection />
    </>
  );
}
