import Banner from '@/components/Banner'
import FeaturedProperties from '@/components/FeaturedProperties'
import Reviews from '@/components/Reviews'
import WhyChooseUs from '@/components/WhyChooseUs'

function Home() {
    return (
        <div>
            <Banner />
            <FeaturedProperties />
            <WhyChooseUs />
            <Reviews />
        </div>
    )
}

export default Home