import endPoints from './endPoints.js'

const {breweriesURL, breweriesIndexFormURL} = endPoints

// Note that dispatch must be passed in from 'connect' when these functions are called

export const getBrewery = (breweryId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        fetch(breweriesURL + '/' + breweryId, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'SET_BREWERY',
                    selected: json
                })
            }
        })
    }
}

export const clearBrewery = () => {
    return (dispatch) => {
        dispatch({type: 'CLEAR_BREWERY'})
    }
}

export const getAllBreweries = () => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        fetch(breweriesURL, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'SET_ALL_BREWERIES',
                    all: json
                })
            }
        })
    } 
} 

export const clearAllBreweries = () => {
    return (dispatch) => {
        dispatch({type: 'CLEAR_ALL_BREWERIES'})
    }
}

export const getAllBreweriesForm = () => {
    return async (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        await fetch(breweriesIndexFormURL, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'SET_ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS_MESSAGES'})
                dispatch({
                    type: 'SET_ALL_BREWERIES',
                    all: json
                })
            }
        })
    } 
} 