import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

//00:32

const InfoSerie = ({ match }) => {
    const [form, setForm] = useState({
        name: ''
    })
    const [success, setSuccess] = useState(false)
    const [mode, setMode] = useState('INFO')
    const [genres, setGenres] = useState([])

    const [data, setData] = useState({})
    useEffect(() => {
        axios.get('/api/series/' + match.params.id)
            .then(res => {
                setData(res.data)
                setForm(res.data)
            })
        axios
            .get('/api/genres')
            .then(res => {
                setGenres(res.data.data)
            })
    }, [match.params.id])


    //custom header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }

    const seleciona = value => () => {
        setForm({
            ...form,
            status: value
        })
    }

    const save = () => {
        axios.put('/api/series/' + match.params.id, form)
            .then(res => {
                setSuccess(true)
            })
    }
    if (success) {
        return <Redirect to='/series' />
    }

    return (
        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{ background: 'rgba(0,0,0,0.7' }}>
                    <div className='container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img alt={data.name} className='img-fluid' src={data.poster} />
                            </div>
                            <div className='col-8'>
                                <h1 className='font-weight-light text-white'>{data.name}</h1>
                                <div className='lead text-white'>
                                    {
                                        form.status == 'ASSISTIDO' && <Badge color='success'>Assistido</Badge>
                                        || <Badge color='warning'>Para Assistir</Badge>
                                    }
                                    <br />Genêro: {data.genre}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div>
                <button className='btn btn-primary mt-2 ml-5' onClick={() => setMode('EDIT')}>Editar</button>
            </div>
            {
                mode === 'EDIT' &&

                <div className='container'>
                    <h1>Nova Série</h1>
                    {/* <pre>{JSON.stringify(form)}</pre> */}
                    <button className='btn btn-danger mt-2 mb-2' onClick={() => setMode('INFO')}>Cancelar</button>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='name'>Name</label>
                            <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' placeholder='Nome do Genêro' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='name'>Comentarios</label>
                            <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='name' placeholder='Nome do Genêro' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='name'>Genero</label>
                            <select className='form-control' onChange={onChange('genre_id')} >
                                {genres.map(genre => <option key={genre.id} value={genre.id} select={genre.id === form.genre}>{genre.name}</option>)}

                            </select>
                        </div>



                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='status' id='assistido' value='ASSISTIDO' onChange={seleciona('ASSISTIDO')} />
                            <label className='form-check-label' htmlFor='assistido'>
                                Assistido
                            </label>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='status' id='paraAssistir' value='PARA_ASSISTIDO' onChange={seleciona('PARA_ASSISTIR')} />
                            <label className='form-check-label' htmlFor='paraAssistir'>
                                Para Assistir
                            </label>
                        </div>




                        <button type='button' onClick={save} className='btn btn-primary mt-2 mb-2'>Salvar</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default InfoSerie
