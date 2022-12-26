import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const PostPage = () => {
    const [fetched, fetchedSet] = useState(0);
    const [img, imgSet] = useState("");
    const [title, titleSet] = useState("");
    const [text, textSet] = useState("");

    let { id } = useParams();

    useEffect(() => {
      if(!fetched) {
        console.log(id)
        fetch(`http://localhost:8081/post/${id}`, {
            method: "POST",
            body: "",
            headers: {
                "Content-Type": "text/plain"
            }
        }).then(res=>res.json())
        .then(value=>{
            imgSet(value.substring(
                value.indexOf('img: "') + 6, 
                value.lastIndexOf('", title:')
            ))
            titleSet(value.substring(
                value.indexOf('title: "') + 8, 
                value.lastIndexOf('", descr:')
            ))
            textSet(value.substring(
                value.indexOf('text: "') + 7, 
                value.indexOf('", img: ')
            ))
            fetchedSet(1)
        })
        .catch(error=>{console.log(error)})
      }
    });


    return (
        <div className='postPageBlock'>
            <div className='back'>
                <Link to="/">
                    <div className='backArrow'></div>
                </Link>
            </div>
        
            <div className="postPage">
                <img src={img} />
                <div className="postPageTitle">{title}</div>
                <div className="postPageText">{text}<br></br><br></br><br></br>
                <Button size='sm' variant="danger" type="submit" onClick={() => {
                    //
                    // ---- Были вынуждены не использовать запросы с body из-за проблем с CORS ----
                    //
                    // fetch(`http://localhost:8081/delete`, {
                    //     method: "POST",
                    //     body: `postId: ${id}`,
                    //     headers: {
                    //         "Content-Type": "application/json"
                    //     }
                    //
                    fetch(`http://localhost:8081/delete2/${id}`, {
                        method: "POST",
                        body: "",
                        headers: {
                            "Content-Type": "text/plain"
                        }
                    }).then(res=>res.json())
                    .then(value=>{
                        console.log(value)
                        window.location = '/'
                    })
                    .catch(error=>{console.log(error)})
                }}>
                    Удалить пост
                </Button></div>
            </div>
        </div>
    )
}

export default PostPage