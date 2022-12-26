import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import { Form, Button, FormGroup, Card } from 'react-bootstrap';


const Create = () => {
    const [title, setTitle] = useState("");
    const [descr, setDescr] = useState("");
    const [img, setImg] = useState("");
    const [text, setText] = useState("");

    return (
        <div className='postPageBlock'>
            <div className='back' style={{ width: '40vw'}}>
                <Link to="/">
                    <div className='backArrow'></div>
                </Link>
            </div>
            <Card style={{ width: '40vw', margin: '20px auto', padding: '20px 40px', boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)" }}>
                <Form>
                    <FormGroup className="mb-3" controlId="formBasicUsername">
                        <Form.Control type="text" value={title} placeholder="Заголовок поста" minLength={1} onChange={e => setTitle(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="formBasicUsername">
                        <Form.Control type="text" value={descr} placeholder="Описание" minLength={1} onChange={e => setDescr(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="formBasicUsername">
                        <Form.Control type="text" value={img} placeholder="Ссылка на картинку" minLength={1} onChange={e => setImg(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="formBasicUsername">
                        <Form.Control as="textarea" rows={3} value={text} placeholder="Текст" minLength={1} onChange={e => setText(e.target.value)} />
                    </FormGroup>
                    

                    <div style={{marginTop: '30px'}}>
                        <Button size='sm' variant="primary" onClick={() => {
                            //
                            // ---- Были вынуждены не использовать запросы с body из-за проблем с CORS ----
                            //
                            // fetch(`http://localhost:8081/add`, {
                            //     method: "POST",
                            //     body: `"text": "${text}", title": "${title}", img": "${img}", descr": "${descr}"`,
                            //     headers: {
                            //         "Content-Type": "application/json"
                            //     }
                            //
                            fetch(`http://localhost:8081/add2/${encodeURIComponent(title)}/${encodeURIComponent(img)}/${encodeURIComponent(text)}/${encodeURIComponent(descr)}`, {
                                method: "POST",
                                body: "",
                                headers: {
                                    "Content-Type": "text/plain"
                                }
                            }).then(res=>res.json())
                            .then(value=>{
                                console.log(value)
                                window.location = `post/${value}`
                            })
                            .catch(error=>{console.log(error)})
                        }}>
                            Создать
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    )
}

const encode = link => {
    const search = '/';
    const replaceWith = 'Ъ';
    return link.split(search).join(replaceWith);
}

export default Create