import Banner from '@/components/Banner'
import FeaturedProperties from '@/components/FeaturedProperties'
import Reviews from '@/components/Reviews'
import WhyChooseUs from '@/components/WhyChooseUs'
import Footer from '@/share/Footer'

function Home() {
    return (
        <div>
            <Banner />
            <FeaturedProperties />
            <WhyChooseUs />
            <Reviews />
            <Footer />
        </div>
    )
}

export default Home