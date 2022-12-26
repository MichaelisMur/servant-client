import React, {useState, useEffect} from 'react'
import './style/App.css'
import { Form, Button, FormGroup, Card } from 'react-bootstrap';
import Post from './Post'
import { Link } from 'react-router-dom';

const Main = () => {

  const [allPosts, allPostsSet] = useState([]);
  const [fetched, fetchedSet] = useState(0);

  useEffect(() => {
    if(!fetched) {
      fetch("http://localhost:8081/all", {
          method: "POST",
          body: "",
          headers: {
              "Content-Type": "text/plain"
          }
      }).then(res=>res.json())
      .then(response=>{
        allPostsSet(response.split("],[").reverse())
        console.log(response.split("],["))
        fetchedSet(1)
      })
      .catch(error=>{console.log(error)})
    }
  });

  return(
        <div className='main'>
          <div className='addPost'>
            <Link to="/create">
              <Button variant="outline-secondary" size="lg">
                Добавить пост
              </Button>
            </Link>
          </div>
          {allPosts.map((value, index) => {
            let img = value.substring(
                value.indexOf('img: "') + 6, 
                value.lastIndexOf('", title:')
            );
            let title = value.substring(
                value.indexOf('title: "') + 8, 
                value.lastIndexOf('", descr:')
            );
            let descr = value.substring(
                value.indexOf('descr: "') + 8, 
                value.indexOf('", postId:')
            );
            let postId = value.substring(
                value.indexOf('postId: ') + 8, 
                value.indexOf('postId: ') + 16
            );
            
            return <Post id={postId} img={img} title={title} descr={descr} key={index} />
          })}
      </div>
    )
}

export default Main