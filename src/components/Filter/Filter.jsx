import React from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';

import { changeFilterValue } from '../../redux/slices/contactsSlice';

import './Filter.module.css';

const Filter = () => {
  const filterValue = useSelector(state => state.filterValue.value);
  const dispatch = useDispatch();
  return (
    <label>
      <input
        name="filter"
        value={filterValue}
        placeholder="Find contacts by name or phone"
        onChange={e => {
          dispatch(changeFilterValue(e.currentTarget.value));
        }}
      ></input>
    </label>
  );
};

export default Filter;
