import './App.css';
import { useEffect, useState } from 'react';
import ListItem from './ListItem';

let initialData = [
  { id: "12345", title: 'Hello', checked: false, isEdit:false },
  { id: "12346", title: 'world', checked: true, isEdit: false },
]

const KEY = "secreatTodo"

function App() {
  const [items, setItems] = useState( JSON.parse(localStorage.getItem(KEY)) || []) // {id:'str', title: 'str', checked: Bool }
  const [inputText, setInputText] = useState('')
//   const [input1Text, setInput1Text] = useState('')

//   const searchGithub =(e) => {
// e.preventDefault()
//     fetch(`https://api.github.com/users/${input1Text}`)
//     .then(res => res.json())
//     .then(data => {
//       console.log(data)
      
//     })
//   }

  useEffect(() => {
    storeitemToLocal()
  },[items])

  const storeitemToLocal = () => {
    const stringifyitems = JSON.stringify(items)
    localStorage.setItem(KEY,stringifyitems)
  }


  const addItem = (e) => {
    e.preventDefault()
    let title = inputText
    let newItem = {
      id: Date.now(),
      title,
      checked: false
    }

    setItems([...items, newItem])
    setInputText('')

  }

  const toggleItem = (id) => {
    let itemUpdatedClone = items.map(item => {
      if (item.id == id) {
        item.checked = !item.checked
      }
      return item
    })

    setItems(itemUpdatedClone)
  }

  const deleteItem = (id) => {
    let itemUpdatedClone = items.filter(item => (item.id != id))
    setItems(itemUpdatedClone)
  }

  const editItem =(id) => {
    let itemUpdatedClone = items.map(item => {
      if (item.id == id) {
        item.isEdit = true
      } else {
        item.isEdit = false
      }
      return item
    })

    setItems(itemUpdatedClone)
  }

  const updateItem = (id,text) => {
    let itemUpdatedClone = items.map(item => {
      if (item.id == id) {
        item.title = text
        item.isEdit = false
      }
      return item
    })

    setItems(itemUpdatedClone)
  }

  const cancelEdit =(id) => {
    let itemUpdatedClone = items.map(item => {
      if (item.id == id) {
        item.isEdit = false
      }
      return item
    })

    setItems(itemUpdatedClone)
  }


  return (
    <section className='container'>
      <h1>Todo List</h1>
      <form onSubmit={addItem}>
        <input value={inputText} type="text" onChange={(e) => setInputText(e.target.value)} />
        <button type="submit">+ Add List</button>
      </form>

      {/* <form onSubmit={searchGithub}>
        <input value={input1Text} type="text" onChange={(e) => setInput1Text(e.target.value)} />
        <button type="submit">+ search</button>
      </form> */}
      <ul>
        {items.map((v) => (<ListItem cancelEdit={cancelEdit} updateItem={updateItem} editItem={editItem} key={v.id} item={v} toggleItem={toggleItem} deleteItem={deleteItem} />))}
      </ul>
    </section>

  );
}



export default App;
