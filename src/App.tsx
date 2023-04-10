import React from 'react';
import TypingThroughInput from './components/TypingThroughInput';
import 'tailwindcss/tailwind.css';

const App = () => {
  const code = `import React, { useState } from 'react';

const AddItemList: React.FC = () => {
const [items, setItems] = useState<string[]>([]);
const [text, setText] = useState('');

const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setText(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setItems([...items, text]);
  setText('');
};

return (
  <div className='w-full md:w-1/2 lg:w-1/3 mx-auto px-6 md:px-0'>
    <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
      <label className='text-gray-700 font-semibold'>
        Add item:
        <input
          type='text'
          value={text}
          onChange={handleTextChange}
          className='border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </label>
      <button
        type='submit'
        className='bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
      >
        Add
      </button>
    </form>
    <ul className='mt-4'>
      {items.map((item) => (
        <li key={item} className='bg-gray-200 p-2 rounded-md my-2'>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default AddItemList;`;

  return (
    <div className='container mx-auto flex flex-col p-4'>
      <div className='mb-4'>
        <h1 className='text-xl sm:text-2xl md:text-3xl font-bold'>
          Typing Practice using Code
        </h1>
        <h6 className='text-sm sm:text-base md:text-lg'>
          using React Typing Game Hook
        </h6>
      </div>
      <h5 className='text-xs sm:text-sm md:text-base'>Esc to reset</h5>
      <div className='border-2 p-4 rounded-lg'>
        <h1 className='mb-2 text-lg sm:text-xl md:text-2xl'>
          Practice Typing React TSX Code
        </h1>
        <TypingThroughInput text={code} />
      </div>
    </div>
  );
};

export default App;
