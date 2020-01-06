import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

//00:32

const InfoSerie = ({ match }) => {
    const [form, setForm] = useState('')
    const [success, setSuccess] = useState(false)
    const [mode, setMode] = useState('INFO');

    const [data, setData] = useState({})
    useEffect(() => {
        axios.get('/api/series/' + match.params.id)
            .then(res => {
                setData(res.data)
                setForm(res.data)
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

    const onChange = evt => {
        setForm({
            ...form,
            name: evt.target.value
        })
    }

    const save = () => {
        axios.post('/api/series', {
            form
        })
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
                                    <Badge color='success'>Assistido</Badge>
                                    <Badge color='warning'>Para Assistir</Badge>
                                    Genêro: {data.genre}
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
                    <button className='btn btn-danger mt-2 mb-2' onClick={() => setMode('INFO')}>Cancelar</button>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='name'>Name</label>
                            <input type='text' value={form.name} onChange={onChange} className='form-control' id='name' placeholder='Nome do Genêro' />

                        </div>
                        <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default InfoSerie
