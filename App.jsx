import './App.css'
import React from "react";
import {useState} from "react";

function App() {
  const [flowerList, setFlowerList] = useState([
    {ref: React.createRef(), src: 'src/assets/klumba.png', id: 'klumba'},
    {ref: React.createRef(), src: 'src/assets/fialka.png', id: 'fialka', value: true},
    {ref: React.createRef(), src: 'src/assets/flox.png', id: 'flox', value: true},
    {ref: React.createRef(), src: 'src/assets/gvozdika.png', id: 'gvozdika', value: false},
    {ref: React.createRef(), src: 'src/assets/kalendula.png', id: 'kalendula', value: true},
    {ref: React.createRef(), src: 'src/assets/kolokolchik.png', id: 'kolokolchik', value: true},
    {ref: React.createRef(), src: 'src/assets/landish.png', id: 'landish', value: true},
    {ref: React.createRef(), src: 'src/assets/lavanda.png', id: 'lavanda', value: true},
    {ref: React.createRef(), src: 'src/assets/lutik.png', id: 'lutik', value: true},
    {ref: React.createRef(), src: 'src/assets/oduvanchik.png', id: 'oduvanchik', value: false},
    {ref: React.createRef(), src: 'src/assets/pion.png', id: 'pion', value: false},
    {ref: React.createRef(), src: 'src/assets/tulpan.png', id: 'tulpan', value: true},
  ])
  const [currentFlower, setCurrentFlower] = useState(null)

  const [flowerIn, setFlowerIn] = useState([])

  const [message, setMessage] = useState('Привет! Перетаскивай цветочки в клумбу.')

  function dragStartHandler(e, flower) {
    e.target.style.transform = 'scale(1.06)'
    setCurrentFlower(flower)
  }

  function dragEndHandler(e) {
    e.target.style.transform = 'scale(1)'
  }


  function dragOverHandler(e, flower) {
    e.preventDefault()
    flower.id === 'klumba' ? e.target.style.transform = 'scale(1.06)' : null


  }

  function dropHandler(e, flower) {
    e.preventDefault();
    e.target.style.transform = 'scale(1)';

    const isFlowerInKlumba = flowerIn.some((item) => item.id === flower.id )

    if (currentFlower.value && ( flower.id === 'klumba' || isFlowerInKlumba)) {
      const updatedFlowerList = [...flowerIn, currentFlower];
      setFlowerIn(updatedFlowerList);
      const droppedFlower = updatedFlowerList.find(item => item.id === currentFlower.id);
      droppedFlower.ref.current.style.top = e.clientY - 70 + 'px';
      droppedFlower.ref.current.style.left = e.clientX - 60 + 'px';
      droppedFlower.ref.current.style.zIndex = '1000';


      // droppedFlower.ref.current.style.display = 'none';
      setMessage('Молодец!')
    } else {
      setMessage('Попробуй еще разок!')
    }
  }

  return (
    <div className='mainPage'>
      <h1 className='appHeader'>{message}</h1>
      <h2 className='flowerName fialka'>Фиалка</h2>
      <h2 className='flowerName pion'>Пион</h2>
      <h2 className='flowerName flox'>Флокс</h2>
      <h2 className='flowerName gvozdika'>Гвоздика</h2>
      <h2 className='flowerName kolokolchik'>Колокольчик</h2>
      <h2 className='flowerName landish'>Ландыш</h2>
      <h2 className='flowerName lavanda'>Лаванда</h2>
      <h2 className='flowerName lutik'>Лютик</h2>
      <h2 className='flowerName tulpan'>Тюльпан</h2>
      <h2 className='flowerName oduvanchik'>Одуванчик</h2>
      <img draggable={false} id='grass' src="src/assets/grass.jpg" alt="Задний фон травы"/>
      <img draggable={false} id='klumba' src="src/assets/klumba.png" alt="Клумба"/>
      <div className='flowers'>
        {flowerList.map(flower =>
          <img
            ref={flower.ref}
            className={'flower'}
            id={flower.id}
            src={flower.src}
            alt={flower.id}
            key={flower.id}
            draggable={true}
            onDragStart={(e) => dragStartHandler(e, flower)}
            onDragLeave={(e) => dragEndHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e, flower)}
            onDrop={(e) => dropHandler(e, flower)}
          />
        )}
      </div>
    </div>
  )
}

export default App
