import Head from 'next/head'
import CardPost from '../components/blogs_card'


export async function getStaticProps() {
    const res_detail_posts = await fetch('https://fswd-wp.devnss.com/wp-json/wp/v2/posts', {
        method: 'GET',
    })
    const posts_all_data = await res_detail_posts.json()


    const res_all_categories = await fetch('https://fswd-wp.devnss.com/wp-json/wp/v2/categories', {
            method: 'GET',
            headers: { 'Authorization': 'Basic ZnN3ZDpmc3dkLWNtcw==' }
        })
    const categories_all_data = await res_all_categories.json()


    const res_all_tags = await fetch('https://fswd-wp.devnss.com/wp-json/wp/v2/tags', {
        method: 'GET',
        headers: { 'Authorization': 'Basic ZnN3ZDpmc3dkLWNtcw==' }
    })
    const tags_all_data = await res_all_tags.json()

    


    return {
        props: {
            posts: posts_all_data,
            all_categories: categories_all_data,
            tags: tags_all_data,
            
        }
    }
}

const Home = ({ posts, tags, all_categories }) => {
    return (
        <div className='container'>
            <Head>
                <title>Home</title>
            </Head>
            <div className='row'>
                <CardPost posts={posts} />
            </div>
        </div>
    )
}

export default Home