export async function getStaticPaths() {
    const res = await fetch('https://fswd-wp.devnss.com/wp-json/wp/v2/posts', {
        method: 'GET',
        headers: { 'Authorization': 'Basic ZnN3ZDpmc3dkLWNtcw==' }
    })
    const data = await res.json()
    const paths = data.map((post) => {
        return {
            params: {
                postId: post.id.toString(),
            }
        }
    })
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps(context) {
    const { params } = context
    const res = await fetch(`https://fswd-wp.devnss.com/wp-json/wp/v2/posts/${params.postId}`, {
        method: 'GET',
        headers: { 'Authorization': 'Basic ZnN3ZDpmc3dkLWNtcw==' }
    })
    const data = await res.json()

    const url_author = data._links.author[0].href
    const responsse_author = await fetch(url_author, {
        method: 'GET',
        headers: { 'Authorization': 'Basic ZnN3ZDpmc3dkLWNtcw==' }
    })
    const person_author = await responsse_author.json()

    
    const response_comments = await fetch(`https://fswd-wp.devnss.com/wp-json/wp/v2/comments`, {
        method: 'GET',
        headers: { 'Authorization': 'Basic ZnN3ZDpmc3dkLWNtcw==' }
    })
    const data_comments = await response_comments.json()

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
            post: data,
            authorData: person_author,
            data_comments: data_comments,
            all_categories: categories_all_data, 
            categories: categories_all_data,
            tags: tags_all_data,
        }
    }
}

import Head from 'next/head'
import Link from 'next/link'
import CommentList_Card from '../../components/comment_card'

const PostId = ({ post, authorData, data_comments, tags, categories, all_categories }) => {
    const tag_in_post = tags.filter((tag, index) => {
        return post.tags[index]
    })

    
    const post_categories = categories.filter((category, index) => {
        return post.categories[index]
    })

    let blog_date = new Date(post.date_gmt).toDateString()
    let publication_time = new Date(post.date_gmt).toLocaleTimeString()

    return (
        <div className='container'>
            <Head>
                <title>{post.title.rendered}</title>
            </Head>
            <div className='row'>
                <div className='col'>
                    <div className='row-12'>
                        <h1>{post.title.rendered}</h1>
                        <h4>Author :
                            <Link href={'/author/' + authorData.id}>
                                <button type="button" className="btn outline-success mb-2" style={{marginLeft: '30px', border: '1px solid', borderRadius: '5px'}}>
                                    {authorData.name}
                                </button>
                            </Link>
                        </h4>
                        <h4>Published on : </h4>
                        <button type="button" className="btn outline-success mb-2" style={{marginLeft: '30px', border: '1px solid', borderRadius: '5px'}}>
                            {blog_date}
                        </button>
                        <h4>Publication time : </h4>
                        <button type="button" className="btn outline-success mb-2" style={{marginLeft: '30px', border: '1px solid', borderRadius: '5px'}}>
                            {publication_time}
                        </button>

                        <div className="card text-dark bg-warning rounded shadow p-3 mb-1 mt-3" style={{ width: '16rem' }}>
                            <h4>Categories : </h4>
                        
                            {
                                post_categories.map((category, index) => {
                                    return (
                                        <div key={index}>
                                            <Link href={'/categories/' + category.id}>
                                                <div className="block-example border border-bottom-0 border-dark rounded shadow p-3 mb-1" style={{ width: '14rem', textAlign: 'center' }}>
                                                    {category.name}
                                                </div>
                                                
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="card text-dark bg-info rounded shadow p-3 mb-1 mt-3" style={{ width: '16rem' }}>
                            <h4>Tag : </h4>
                            <div>
                            {
                                tag_in_post.map((tag, index) => {
                                    return (
                                        <div key={index}>
                                            <Link href={'/tag/' + tag.id}>
                                                <div className="block-example border border-bottom-0 border-dark rounded shadow p-3 mb-1" style={{ width: '14rem', textAlign: 'center' }}>
                                                    {tag.name}
                                                </div>
                                                
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                            </div>

                        </div>

                

                        
                        
                        <hr></hr>
                        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
                        <CommentList_Card post={post} data_comments={data_comments} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostId