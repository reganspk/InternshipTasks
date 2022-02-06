export const DATA_FAILURE = 'DATA_FAILURE';

export const DATA_SUCCESS = 'DATA_SUCCESS';
export const DATA_ATTEMPT = 'DATA_ATTEMPT';
export const POST_FAILURE = 'POST_FAILURE';

export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_ATTEMPT = 'POST_ATTEMPT';

export const getDataAction = (payload = {myUIChange: () => {}}) => ({
  type: DATA_ATTEMPT,
  payload,
});

export const registerDataAction = formData => ({
  type: POST_ATTEMPT,
  payload: formData,
});
