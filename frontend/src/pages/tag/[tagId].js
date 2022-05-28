import Head from 'next/head'
import Link from 'next/link'

export async function getStaticPaths() {
    const response = await fetch('https://fswd-wp.devnss.com/wp-json/wp/v2/tags', {
        method: 'GET',
        headers: { 'Authorization': 'Basic ZnN3ZDpmc3dkLWNtcw==' }
    })
    const data = await response.json()
    const paths = data.map((tag) => {
        return {
            params: { tagId: tag.id.toString() }
        }
    })

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps(context) {
    const { params } = context
    const responsse = await fetch(`https://fswd-wp.devnss.com/wp-json/wp/v2/tags/${params.tagId}`, {
        method: 'GET',
        headers: { 'Authorization': 'Basic ZnN3ZDpmc3dkLWNtcw==' }
    })
    const data = await responsse.json()
    
    const res_detail_posts = await fetch('https://fswd-wp.devnss.com/wp-json/wp/v2/posts', {
        method: 'GET',
        headers: { 'Authorization': 'Basic ZnN3ZDpmc3dkLWNtcw==' }
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
            tag: data,
            posts: posts_all_data,
            all_categories: categories_all_data,
            tags: tags_all_data,
        }
    }
}



const TagList = ({ posts, tag, tags }) => {
    const All_list = []
    const postTag = []
    posts.map((post) => {
        All_list.push(post.tags)
    })
    for (let row = 0; row < All_list.length; row++) {
        for (let col = 0; col < All_list[row].length; col++) {
            if (All_list[row][col] == tag.id) {col
                postTag.push(posts[row])
            }
        }
    }

    return (
        <div className='container' >
            <Head>
                <title>{ tag.name }</title>
            </Head>
            <div className='row'>
                <div className='col col-lg-12'>
                <h2>Tag : {tag.name} ({tag.count})</h2>
                    {
                        postTag.map((post, index) => {
                            return (
                                <div className='card  col-12 col-lg-6 col-md-12 rounded shadow p-3 mb-3 mt-3 text-white bg-dark ' key={index} style={{ textAlign: 'center' }}>
                                    <div className='card-body'>
                                        <h4 className='card-title'>
                                            {post.title.rendered} 
                                        </h4>
                                        <h5 className='card-text'>
                                            Published on {post.date}
                                        </h5>
                                        <Link href={'/posts/' + post.id}>
                                            <button type="button" className="mt-2 btn btn-warning">
                                                Read more ... 
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default TagList