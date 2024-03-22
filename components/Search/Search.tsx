'use client';

import { useState } from 'react';
import { Autocomplete } from '@mantine/core';

export function Search() {
    const [value, setValue] = useState('');
    const [data, setData] = useState([]);
    const onChange = async (e) => {
        console.log(e);
        setValue(e);
        const response = await fetch(`https://api.anilibria.tv/v3/title/search?search=${e}&limit=5`);
        const responseData = await response.json();
        const value = responseData.list.map((title) => (title.names.ru));
        setData(value);
        console.log(data, value)
    };
    /*
    const onChange = async (e) => {
        const value = e.target;
        console.log(e, e.key)
        setQuery(value);

        if (value.length > 3) {
            const response = await fetch(`https://api.anilibria.tv/v3/title/search?search=${value}&limit=5`);
            const data = await response.json();
            console.log(data);
        }
    };
     */
    return (
        <Autocomplete
          data={data}
          value={value}
          onChange={onChange}
          placeholder="Поиск"
        />
    );
}
