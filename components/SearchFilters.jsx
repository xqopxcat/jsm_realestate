import React, { useState, useEffect } from 'react';
import { Flex, Box, Select, Text, Input, Spinner, Icon, Button }  from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdCancel } from 'react-icons/md';
import Image from 'next/image';

import { filterData, getFilterValues } from '../constants/filterData';

const SearchFilters = () => {
    const [filters] = useState(filterData);
    const router = useRouter();
    
    const searchProperties = (filterValues) => {
        const path = router.pathname;
        const { query } = router;
        const values = getFilterValues(filterValues);
        
        values.forEach(({ name, value }) => {
            if (value && filterValues?.[name]) {
                query[name] = value;
            }
        });
        
        router.push({ pathname: path, query});
    };
    
    return (
        <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
            {
                filters.map(({ items, placeholder, queryName }) => {
                    return (
                        <Box key={ queryName }>
                            <Select
                                placeholder={ placeholder }
                                w="fit-content"
                                p="2"
                                onChange={ (e) => searchProperties({ [queryName]: e.target.value }) }
                            >
                                { items?.map(({ name, value}) => {
                                    return (
                                        <option value={ value } key={ value }>
                                            { name }
                                        </option>
                                    )
                                })}
                            </Select>
                        </Box>
                    )
                })
            }
        </Flex>
    );
};

export default SearchFilters;