import { useState } from 'react';
import Navbar from '../components/navbar'
import { CategoryContext } from '../../contexts/CategoryContext';
import { TagContext } from '../../contexts/TagContext';

import 'bootstrap/dist/css/bootstrap.min.css';
function App({ Component, pageProps }) {
    const { categories_all } = pageProps
    const { tags } = pageProps
    const [categoryNav] = useState(categories_all)
    const [tagsNav] = useState(tags)
    

    return (
        <div>
                <TagContext.Provider value={tagsNav}>
                    <CategoryContext.Provider value={categoryNav}>
                        <Navbar />
                        <Component {...pageProps} />
                    </CategoryContext.Provider>
                </TagContext.Provider>
        </div>
    )
}

export default App
