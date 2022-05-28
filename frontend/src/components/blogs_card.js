import Link from 'next/link'
import Image from "react-bootstrap/Image";

const Blog_Cards = ({ posts }) => {
    return (
        <div className='container mt-2'>
            <div className='row'>
                {
                    posts.map((post, index) => {
                        let blog_date = new Date(post.date_gmt).toDateString()
                        let publication_time = new Date(post.date_gmt).toLocaleTimeString()
                        return (
                            <div className='col-12 col-lg-4 col-md-12' key={index}>
                                <div className="card text-white bg-dark rounded shadow p-3 mb-5">
                                    <div className='card-body'>
                                        <h5 className='card-title text-center mb-4'>
                                            { post.title.rendered }
                                        </h5>
                                        <div className='card-text mb-2'>
                                            <p>Published on { blog_date }  </p>
                                            <p>Publication time { publication_time } </p>
                                        </div>
                                        <Link href={'/posts/' + post.id}>
                                            <button type="button" className='btn btn-light pull-right col-12 '>
                                                Read More ...    
                                                <Image
                                                    src="https://cdn-icons-png.flaticon.com/512/318/318476.png"
                                                    width="30"
                                                    height="30"
                                                    className='ml-4'
                                                />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Blog_Cards;