import Banner from '@/components/Banner'
import FeaturedProperties from '@/components/FeaturedProperties'
import WhyChooseUs from '@/components/WhyChooseUs'
import Footer from '@/share/Footer'
import React from 'react'

function Home() {
    return (
        <div>
            <Banner />
            <FeaturedProperties />
            <WhyChooseUs />
            <Footer />
        </div>
    )
}

export default Home