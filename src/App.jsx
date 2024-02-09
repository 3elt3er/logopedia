import './App.css'
import React from "react";
import {useState} from "react";
import {useRef} from "react";

function App() {
  const [flowerList, setFlowerList] = useState([
    {ref: React.createRef(), src: './imgs/klumba.png', id: 'klumba', draggable: false},
    {ref: React.createRef(), src: './imgs/fialka.png', id: 'fialka', value: true, draggable: true},
    {ref: React.createRef(), src: './imgs/flox.png', id: 'flox', value: true, draggable: true},
    {ref: React.createRef(), src: './imgs/gvozdika.png', id: 'gvozdika', value: false, draggable: true},
    {ref: React.createRef(), src: './imgs/kalendula.png', id: 'kalendula', value: true, draggable: true},
    {ref: React.createRef(), src: './imgs/kolokolchik.png', id: 'kolokolchik', value: true, draggable: true},
    {ref: React.createRef(), src: './imgs/landish.png', id: 'landish', value: true, draggable: true},
    {ref: React.createRef(), src: './imgs/lavanda.png', id: 'lavanda', value: true, draggable: true},
    {ref: React.createRef(), src: './imgs/lutik.png', id: 'lutik', value: true, draggable: true},
    {ref: React.createRef(), src: './imgs/oduvanchik.png', id: 'oduvanchik', value: false, draggable: true},
    {ref: React.createRef(), src: './imgs/pion.png', id: 'pion', value: false, draggable: true},
    {ref: React.createRef(), src: './imgs/tulpan.png', id: 'tulpan', value: true, draggable: true},
  ])
  const [currentFlower, setCurrentFlower] = useState(null)

  const [flowerIn, setFlowerIn] = useState(new Set([]))

  const [emoji, setEmoji] = useState('./imgs/startEmoji.png')

  const [message, setMessage] = useState('Буква "Л"')

  const ref = useRef(null)

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
    const isFlowerInKlumba = flowerIn.has(flower.id)

    if ((flower.id === 'klumba' || isFlowerInKlumba) && currentFlower.value === true) {
      flowerIn.add(currentFlower.id)
      const updatedFlowerList = [...flowerIn, currentFlower];
      const droppedFlower = updatedFlowerList.find(item => item.id === currentFlower.id);
      droppedFlower.ref.current.style.top = e.clientY - 70 + 'px';
      droppedFlower.ref.current.style.left = e.clientX - 60 + 'px';
      droppedFlower.ref.current.style.zIndex = '1000';


      // droppedFlower.ref.current.style.display = 'none';
      setMessage('Молодец!')
      ref.current.style.background = 'green';
      ref.current.style.left = '44vw';
      setEmoji("./imgs/ok.png")
      if (flowerIn.size === 7) {
        setEmoji("./imgs/trophy.png")
        setMessage('Победа!')
        ref.current.style.background = 'gold';
        setTimeout(()=> {
          alert('ПОБЕДА! Спасибо за игру!')
        }, 200)
      }
    } else {
      setEmoji('./imgs/notok.png')
      setMessage('Попробуй еще разок!')
      ref.current.style.left = '40vw';
      ref.current.style.background = 'red';
    }
  }

  return (
    <div className='mainPage'>
      <img className='emoji' src={emoji} alt="Смайлик ответа" width='200px'/>
      <h1 className='appHeader'>Перетаскивай цветочки в клумбу</h1>
      <h1 className='message' ref={ref}>{message}</h1>
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
      <img draggable={false} id='grass' src="./imgs/grass.jpg" alt="Задний фон травы"/>
      <div className='flowers'>
        {flowerList.map(flower =>
          <img
            ref={flower.ref}
            className={'flower'}
            id={flower.id}
            src={flower.src}
            alt={flower.id}
            key={flower.id}
            draggable={flower.draggable}
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
