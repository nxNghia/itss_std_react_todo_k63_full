import React, { useState, useEffect } from 'react';

/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';
import db from '../lib/firebase'
import {collection, getDocs, addDoc, updateDoc, doc} from 'firebase/firestore'

/* ライブラリ */

function Todo() {
  const [items, putItems] = useState([]);
  
  const [filter, setFilter] = React.useState('ALL');
  const itemCollection = collection(db, "todos");
  const displayItems = items.filter(item => {
    if (filter === 'ALL') return true;
    if (filter === 'TODO') return !item.done;
    if (filter === 'DONE') return item.done;
  });
  
  const handleCheck = async(item) => {
    const todo = doc(db,"todos",item.key)
    console.log(todo.data)
    const newField = {done: !item.done}
    await updateDoc(todo,newField)
  };

  const deleteAll = async()=> {    
    db.collection("todos").get().then(res => {
      res.forEach(element => {
      element.ref.delete()
      })
    })
  }
  const fetchTodos = async()=>{
    const data = await getDocs(itemCollection)
    putItems(data.docs.map((doc)=> ({...doc.data(), key: doc.id})))
  }
  useEffect(() => {
    fetchTodos();
  }, [items])
  
  const handleAdd = async(text) => {
    await addDoc(itemCollection, {text: text, done: false})    
  };
  
  const handleFilterChange = value => setFilter(value);

  return (
    <article class="panel is-danger">
      <div className="panel-heading">
        <span class="icon-text">
          <span class="icon">
            <i class="fas fa-calendar-check"></i>
          </span>
          <span> ITSS Todoアプリ</span>
        </span>
      </div>
      <Input onAdd={handleAdd} />
      <Filter
        onChange={handleFilterChange}
        value={filter}
      />
      {displayItems.map(item => (
        <TodoItem 
          key={item.key}
          item={item}
          onCheck={handleCheck}
        />
      ))}
      <div className="panel-block">
        {displayItems.length} items
      </div>
      <div className="panel-block">
        <button className="button is-light is-fullwidth" onClick={deleteAll}>
          全てのToDoを削除
        </button>
      </div>
    </article>
  );
}

export default Todo;