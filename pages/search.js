import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import { Property, SearchFilters } from '../components';
import Noresult from '../assets/images/noresult.svg';
import { getProperties } from '../redux/services/bayutCore';
import { wrapper } from '../redux/store';

const Search = ({ properties }) => {
    const [searchFilters, setSearchFilters] = useState(false);
    const router = useRouter();
    
    return (
        <Box>
            <Flex 
                cursor="pointer" 
                bg="gray.100" 
                borderBottom="1px"
                borderColor="gray.200"
                p="2"
                fontWeight="black"
                fontSize="lg"
                justifyContent="center"
                alignItems="center"
                onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
            >
                <Text>
                    Search Property By Filters
                </Text>
                <Icon w="7" as={ BsFilter } />
            </Flex>
            { searchFilters && <SearchFilters />}
            <Text fontSize="2xl" p="4" fontWeight="bold">
                Properties { router.query.purpose }
            </Text>
            <Flex flexWrap="wrap">
                { properties.map((property) => <Property property={ property } key={ property.id } />)}
            </Flex>
            {
                properties.length === 0 && (
                    <Flex 
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        marginTop="5"
                        marginBottom="5"
                    >
                        <Image alt="no result" src={ Noresult } />
                        <Text fontSize="2xl" marginTop="3">No Result Found</Text>
                    </Flex>
                )
            }
        </Box>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({ query }) => {
        const queryPayload = {
            purpose: query.purpose || 'for-rent',
            rentFrequency: query.rentFrequency || 'yearly',
            minPrice: query.minPrice || '0',
            maxPrice: query.maxPrice || '1000000',
            roomsMin: query.roomsMin || '0',
            bathsMin: query.bathsMin || '0',
            sort: query.sort || 'price-desc',
            areaMax: query.areaMax || '35000',
            locationExternalIDs: query.locationExternalIDs || '5002',
            categoryExternalID: query.categoryExternalID || '4'
        }
        const { data } = await store.dispatch(getProperties.initiate({ queryPayload }));
        return {
            props: {
              properties: data?.hits,
            },
        };
    }
)

export default Search;