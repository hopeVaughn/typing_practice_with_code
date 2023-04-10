import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import useTyping, { CharStateType, PhaseType } from 'react-typing-game-hook';

const TypeThroughInput: FC<{ text: string }> = ({ text }) => {
  const [duration, setDuration] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const letterElements = useRef<HTMLDivElement>(null);

  const {
    states: {
      charsState,
      currIndex,
      phase,
      correctChar,
      errorChar,
      startTime,
      endTime,
    },
    actions: { insertTyping, deleteTyping, resetTyping },
  } = useTyping(text, { skipCurrentWordOnSpace: false, pauseOnError: true });

  // set cursor
  const pos = useMemo(() => {
    if (currIndex !== -1 && letterElements.current) {
      let spanref: any = letterElements.current.children[currIndex];
      let left = spanref.offsetLeft + spanref.offsetWidth - 2;
      let top = spanref.offsetTop - 2;
      return { left, top };
    } else {
      return {
        left: -2,
        top: 2,
      };
    }
  }, [currIndex]);

  //set WPM
  useEffect(() => {
    if (phase === PhaseType.Ended && endTime && startTime) {
      setDuration(Math.floor((endTime - startTime) / 1000));
    } else {
      setDuration(0);
    }
  }, [phase, startTime, endTime]);

  //handle key presses
  const handleKeyDown = (
    letter: string,
    control: boolean,
    e: React.KeyboardEvent
  ) => {
    if (letter === ' ') {
      e.preventDefault(); // This line to prevent default spacebar behavior
    }
    if (letter === 'Escape') {
      resetTyping();
    } else if (letter === 'Backspace') {
      deleteTyping(control);
    } else if (letter === 'Enter') {
      // This condition for the Enter key
      e.preventDefault(); // Prevent default behavior of Enter key
      insertTyping('\n'); // Insert a newline character
    } else if (letter === 'Tab') {
      e.preventDefault(); // prevent default tab behavior
      insertTyping('  '); // insert four spaces instead of tab
    } else if (letter.length === 1) {
      insertTyping(letter);
    }
  };

  return (
    <div>
      <div
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e.key, e.ctrlKey, e)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`text-xl outline-none relative font-serif bg-white p-4 rounded`}
      >
        <div
          ref={letterElements}
          className='tracking-wide pointer-events-none select-none mb-4'
          tabIndex={0}
        >
          {text.split('').map((letter, index) => {
            let state = charsState[index];
            let color =
              state === CharStateType.Incomplete
                ? 'text-gray-400'
                : state === CharStateType.Correct
                ? 'text-gray-700'
                : 'text-red-500';
            return (
              <span
                key={letter + index}
                className={`${color} whitespace-pre-wrap ${
                  currIndex === index ? 'underline' : ''
                }`}
              >
                {letter}
              </span>
            );
          })}
        </div>
        {phase !== PhaseType.Ended && isFocused ? (
          <span
            style={{
              left: pos.left,
              top: pos.top,
            }}
            className={`caret border-l-2 border-black caret-blink`}
          >
            &nbsp;
          </span>
        ) : null}
      </div>
      <p className='text-sm'>
        {phase === PhaseType.Ended && startTime && endTime ? (
          <>
            <span className='text-green-500 mr-4'>
              WPM: {Math.round(((60 / duration) * correctChar) / 5)}
            </span>
            <span className='text-blue-500 mr-4'>
              Accuracy: {((correctChar / text.length) * 100).toFixed(2)}%
            </span>
            <span className='text-yellow-500 mr-4'>Duration: {duration}s</span>
          </>
        ) : null}
        <span className='mr-4'> Current Index: {currIndex}</span>
        <span className='mr-4'> Correct Characters: {correctChar}</span>
        <span className='mr-4'> Error Characters: {errorChar}</span>
      </p>
    </div>
  );
};

export default TypeThroughInput;
