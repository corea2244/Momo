import axios from 'axios';
import { FIRESTORE_API_URL, PROJECT_ID } from '@env';

import { getAuthToken } from '../utils/utils';

export const getUserBasic = async () => {
  try {
    const response = await axios.get(
      // TODO: replace 'user1' with token
      `${FIRESTORE_API_URL}${PROJECT_ID}/databases/(default)/documents/User_Collection/user1`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getUserRoutine = async () => {
    const response = await axios.get(
      // TODO: replace 'user1' with token
        `${FIRESTORE_API_URL}${PROJECT_ID}/databases/(default)/documents/User_Collection/user1/routine`
    ).then(res => {
      return res;
    }).catch(e => {
      return e;
    });
    return response;
};