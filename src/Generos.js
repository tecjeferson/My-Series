import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Generos = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
                setData(res.data.data)
            })
    }, [])

    const deleteGenero = id => {
        axios
            .delete('/api/genres/' + id)
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
                    <button className='btn btn-danger' onClick={() => deleteGenero(record.id)}>Deletar</button>
                    <Link className='btn btn-primary' to={'generos/' + record.id}>Editar</Link>

                </td>
            </tr>

        )
    }
    if (data.length === 0) {
        return (
            <div className='container'>
                <h1>Generos</h1>
                <div>
                    <Link className='btn btn-primary mb-2' to='/generos/novo'>Novo Genero</Link>

                </div>
                <div className='alert alert-warning' role='alert'>
                    Você não possui generos criados!
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <div>

                <h1>Generos</h1>
                <Link className='btn btn-primary mb-2' to='/generos/novo'>Novo Genero</Link>
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

export default Generos