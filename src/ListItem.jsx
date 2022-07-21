import React, { useState } from 'react';
import './ListItem.css'

function ListItem({item, toggleItem, deleteItem, editItem, updateItem, cancelEdit  }) {
  const [text,setText] = useState(item.title)

  const saveItem = () => {updateItem(item.id, text)}
  const discardItem = () => {cancelEdit(item.id)}

  return (

    <li>
      {!item.isEdit ? (
      <>
      <input type='checkbox' className='checkBox' checked={item.checked} onChange={() => toggleItem(item.id)} />
      <span>{item.title}</span>
      <div>
        <button className='primary' onClick={() => deleteItem(item.id)}>Delete</button>
        <button className='primary' onClick={() => editItem(item.id)}>Edit</button>
      </div>
      </>): (
        <>
        <input type="text" value={text} onChange={e=>setText(e.target.value)} />
        <button onClick={saveItem}>SAVE</button>
        <button onClick={discardItem}>Discard</button>
        </>
      )
      }
    </li>
  )

}

export default ListItem;
