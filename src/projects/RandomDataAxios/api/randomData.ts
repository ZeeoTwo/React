import axios  from "axios";


const instance = axios.create({
    baseURL: "https://random-data-api.com/api/v2",
})

const genericRequestGet = (props) => {
    return instance.get(props.endpoint, { params : props.params});
}

/**
 * @param {Size} Number of the Users
 */
export const users = (Size: number) => {
    return genericRequestGet({
        endpoint: "/users",
        params: {size: Size}
    })
}

/**
 * @param {Size} Number of the Addresses 
 */
export const addresses = (Size: number) => {
    return genericRequestGet({
        endpoint: "/addresses",
        params: {size: Size}
    })
}

/**
 * @param {Size} Number of the Banks
 */
export const banks = (Size: number, ) => {
    return genericRequestGet({
        endpoint: "/banks",
        params: {size: Size}
    })
}

/**
 * @param {Size} Number of the Appliances
 */
export const appliances = (Size: number) => {
    return genericRequestGet({
        endpoint: "/appliances",
        params: {size: Size}
    })
}

/**
 * @param {Size} Number of the Beers
 */
export const beers = (Size: number) => {
    return genericRequestGet({
        endpoint: "/beers",
        params: {size: Size}
    })
}

/**
 * @param {Size} Number of the Blood Types 
 */
export const blood_types = (Size: number) => {
    return genericRequestGet({
        endpoint: "/blood_types",
        params: {size: Size}
    })
}

/**
 * @param {Size} Number of the Credit Cards
 */
export const credit_cards = (Size: number) => {
    return genericRequestGet({
        endpoint: "/credit_cards",
        params: {size: Size}
    })
}