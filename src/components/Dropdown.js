import React, { useState, useMemo, useRef, useEffect } from 'react';
import useActiveState from '../hooks/useActiveState';

const Dropdown = ({ label, list, onChange, value, disabled }) => {
  const [isVisible, setIsVisible, containerRef] = useActiveState();
  const inputRef = useRef();
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isVisible) return inputRef.current?.focus();
    setSearchQuery('');
  }, [isVisible]);

  useEffect(() => {
    setSelectedId(value);
  }, [value]);

  const selectedValue = useMemo(
    () => list.find((item) => item.id === selectedId)?.name,
    [list, selectedId]
  );

  const filteredList = useMemo(
    () =>
      list.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [list, searchQuery]
  );

  return (
    <div className='dropdown' ref={containerRef}>
      <p>{label}</p>
      <button type='button' disabled={disabled} onClick={() => setIsVisible()}>
        <p>{selectedValue || 'Please Search'}</p>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1}
          stroke='currentColor'
          style={{ width: '16px', rotate: isVisible ? '180deg' : '' }}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.5 8.25l-7.5 7.5-7.5-7.5'
          />
        </svg>
      </button>
      {isVisible && (
        <div className='dropdown-list'>
          <input
            type='text'
            onChange={(e) => setSearchQuery(e.target.value)}
            ref={inputRef}
          />
          <ul className='list-items'>
            {filteredList.length ? (
              filteredList.map((item) => (
                <li
                  onClick={() => {
                    setSelectedId(item.id);
                    setIsVisible(false);
                    onChange && onChange(item.id);
                  }}
                  key={item.id}
                  className='list-item'
                >
                  {item.name}
                </li>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '5px 10px' }}>
                No Data Found
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
