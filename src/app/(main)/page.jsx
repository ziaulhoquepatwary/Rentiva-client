import Banner from '@/components/Banner'
import FeaturedProperties from '@/components/FeaturedProperties'
import Reviews from '@/components/Reviews'
import WhyChooseUs from '@/components/WhyChooseUs'
import FeaturesOverview from '@/components/FeaturesOverview'

export const dynamic = "force-dynamic";

function Home() {
    return (
        <div>
            <Banner />
            <WhyChooseUs />
            <FeaturedProperties />
            <FeaturesOverview />
            <Reviews />
        </div>
    )
}

export default Home