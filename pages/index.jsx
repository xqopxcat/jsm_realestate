import { Banner, Property } from '../components';
import { Flex } from '@chakra-ui/react';
import { getProperties } from '../redux/services/bayutCore';
import { wrapper } from '../redux/store';



const Home = ({ propertiesForSale, propertiesForRent}) => {
    return (
        <div>
            <Banner 
                purpose="RENT A HOME"
                title1="Rental Homes for"
                title2="Everyone"
                desc1="Explore Apartments, Villas, Homes"
                desc2="and more"
                buttonText="Explore Renting"
                linkName="/search?purpose=for-rent"
                imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
            />
            <Flex flexWrap="wrap">
                {
                    propertiesForRent?.map((property) => <Property property={ property } key={ property.id } />)
                }
            </Flex>
            <Banner 
                purpose="BUY A HOME"
                title1="Find, Buy & Own Your"
                title2="Dream Home"
                desc1="Explore Apartments, Villas, Homes"
                desc2="and more"
                buttonText="Explore Buying"
                linkName="/search?purpose=for-sale"
                imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
            />
            <Flex flexWrap="wrap">
                {
                    propertiesForSale?.map((property) => <Property property={ property } key={ property.id } />)
                }
            </Flex>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        const { data: dataForSale } = await store.dispatch(getProperties.initiate({ queryPayload: {
            locationExternalIDs: '5002',
            purpose: 'for-sale',
            hitsPerPage: '25',
        } }));
         
        const { data: dataForRent } = await store.dispatch(getProperties.initiate({ queryPayload: {
            locationExternalIDs: '5002',
            purpose: 'for-rent',
            hitsPerPage: '25',
        } })); 
        
        return {
            props: {
                propertiesForSale: dataForSale?.hits,
                propertiesForRent: dataForRent?.hits
            }
        }
    }
)


export default Home;