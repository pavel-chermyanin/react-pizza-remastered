import React, { useRef } from 'react'
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

import { setSearchValue } from '../../redux/slices/filterSlice';

import styles from './Search.module.scss'

const Search = () => {
    const dispatch = useDispatch()

    const inputRef = useRef()
    const [inputValue, setInputValue] = React.useState('')

    const updateSearchValue = React.useCallback(
        debounce(str => {
            dispatch(setSearchValue(str))
        }, 250),
        []
    )

    const onClickClear = () => {
        setInputValue('')
        dispatch(setSearchValue(''))
        inputRef.current.focus()
    }
    const onChangeInput = (e) => {
        setInputValue(e.target.value)
        updateSearchValue(e.target.value)
    }
    return (
        <div className={styles.wrapper}>
            <svg
                className={styles.icon}
                id="i-search"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2">
                <circle cx="14" cy="14" r="12" />
                <path d="M23 23 L30 30" />
            </svg>
            <input
                ref={inputRef}
                onChange={onChangeInput}
                value={inputValue}
                className={styles.input}
                placeholder='Поиск пиццы...' />
            {
                inputValue ? (
                    <svg
                        onClick={onClickClear}
                        className={styles.clearIcon}
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 50 50"
                        enableBackground="new 0 0 50 50">
                        <path fill="#231F20" d="M9.016,40.837c0.195,0.195,0.451,0.292,0.707,0.292c0.256,0,0.512-0.098,0.708-0.293l14.292-14.309
	l14.292,14.309c0.195,0.196,0.451,0.293,0.708,0.293c0.256,0,0.512-0.098,0.707-0.292c0.391-0.39,0.391-1.023,0.001-1.414
	L26.153,25.129L40.43,10.836c0.39-0.391,0.39-1.024-0.001-1.414c-0.392-0.391-1.024-0.391-1.414,0.001L24.722,23.732L10.43,9.423
	c-0.391-0.391-1.024-0.391-1.414-0.001c-0.391,0.39-0.391,1.023-0.001,1.414l14.276,14.293L9.015,39.423
	C8.625,39.813,8.625,40.447,9.016,40.837z"/>
                    </svg>
                ) : null
            }
        </div>
    )
}

export default Search