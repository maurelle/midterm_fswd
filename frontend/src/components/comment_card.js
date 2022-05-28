const Comment_inCard = ({ post, data_comments }) => {
    const comment = data_comments.filter((comment) => {
        return post.id == comment.post
    })
    return (
        <div>
            <h3>
                Comment ({comment.length})
            </h3>
            {
                comment.map((item, index) => {
                    let comment_date = new Date(item.date_gmt).toDateString()
                    let comment_time = new Date(item.date_gmt).toLocaleTimeString()
                    return (
                        <div className='card bg-info shadow p-3 mb-3  rounded' key={index}>
                            <div className='card-body'>
                                <h4 className='card-title block-example border border-bottom-0 border-dark rounded' style={{ width: '10rem', textAlign: 'center'  }}>{item.author_name}</h4>
                                <p className='card-text'>{comment_date}</p>
                                <p className='card-text'>{comment_time}</p>
                                <div className='card-text' dangerouslySetInnerHTML={{ __html: item.content.rendered }}></div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Comment_inCard