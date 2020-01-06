import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Series = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios
            .get('/api/series')
            .then(res => {
                setData(res.data.data)
            })
    }, [])

    const deleteSerie = id => {
        axios
            .delete('/api/series/' + id)
            .then(res => {
                const filtrado = data.filter(item => item.id !== id)
                setData(filtrado)
            })

    }

    const renderLine = record => {
        return (
            <tr key={record.id}>
                <th scope='row'>{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <button className='btn btn-danger' onClick={() => deleteSerie(record.id)}>Deletar</button>
                    <Link className='btn btn-primary' to={'series/' + record.id}>Editar</Link>

                </td>
            </tr>

        )
    }
    if (data.length === 0) {
        return (
            <div className='container'>
                <h1>Séries</h1>
                <div>
                    <Link className='btn btn-primary mb-2' to='/series/novo'>Nova Série</Link>
                </div>
                <div className='alert alert-warning' role='alert'>
                    Você não possui series criadas!
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <div>

                <h1>Séries</h1>
                <Link className='btn btn-primary mb-2' to='/series/novo'>Nova Série</Link>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(renderLine)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Series