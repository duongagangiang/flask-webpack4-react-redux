import {abortFetch, errorFetch, startFetch, updateFetch} from '../actions';
import restApi from '../utils/restApi';

export const updateContentAsync = () => {
    return (dispatch, getState) => {
        const timeSinceLastFetch = getState().currentUser;
        console.log('timeSinceLastFetch')
        console.log(timeSinceLastFetch);
        console.log('timeSinceLastFetch')
        const isDataStale = Date.now() - timeSinceLastFetch > timeToStale;
        if (isDataStale) {
          dispatch(startFetch());
          restApi('')
            .then(content => {
              dispatch(updateFetch(content));
            })
            .catch(err => {
              dispatch(errorFetch(err));
            });
        } else {
          dispatch(abortFetch());
        }

    }
}