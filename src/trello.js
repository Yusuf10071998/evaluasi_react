import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Trello() {
    const [data, setData] = useState([])
    const [edit, setEdit] = useState('')
    const getData = () => {
        axios.get('http://localhost:3001/trello').then(hasil => {
            setData(hasil.data)
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const value = e.target.card.value
        axios.post('http://localhost:3001/trello', { name: value })
            .then(() => {
                console.log('post')
                getData()
            })
        e.target.card.value = ''
    }
    const handleDelete = (id) => {
        console.log(id)
        axios.delete(`http://localhost:3001/trello/${id}`).then(() => {
            console.log('delete')
            getData(id.card)
        })
    }
    const handleEdit = (e) => {
        e.preventDefault()
        axios.patch(`http://localhost:3001/trello/${data[edit].id}`, { name: e.target.card.value })
        .then (() => {
            getData()
            setEdit(null)
        })
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='bungkus'>
            <h3 className="title">Evaluasi Trello</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="card"></input>
                <button className="addNew" type="submit">Add new</button>
            </form>
            {data.map((card, i) => {
                return <li key={i}>
                    {edit === i ?
                        <form onSubmit={handleEdit}>
                            <input name="card" defaultValue={card.name} />
                            <button>Simpan</button>
                        </form>
                        : card.name
                    }
                    <div className='button'>
                        <button onClick={() => setEdit(i)}> edit </button>
                        <button onClick={() => handleDelete(card.id)}> delete </button>
                    </div>
                </li>
            })}
        </div>
    )
}
