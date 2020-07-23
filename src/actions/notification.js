import endPoints from './endPoints.js'
// Note that dispatch must be passed in from 'connect' when these functions are called

const {notificationsURL} = endPoints

export const markReadNotification = (notificationId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({notification: {read: true}})
        }
        fetch(notificationsURL + "/" + notificationId, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS'})
                dispatch({
                    type: 'MARK_READ_NOTIFICATION',
                    id: json.id,
                    notification: json
                })
            }
        })
    }
}

export const deleteNotification = (notificationId) => {
    return (dispatch) => {
        dispatch({type: 'LOADING'})
        const options = {
            method: 'DELETE',
            credentials: 'include'
        }
        fetch(notificationsURL + "/" + notificationId, options).then(resp => resp.json()).then(json => {
            if (json.errors) {
                dispatch({
                    type: 'ERRORS',
                    errors: json.errors
                })
            } else {
                dispatch({type: 'CLEAR_ERRORS'})
                dispatch({
                    type: 'DELETE_NOTIFICATION',
                    id: notificationId
                })
            }
        })
    }
}