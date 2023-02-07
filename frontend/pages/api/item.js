import {
  getAccessToken,
} from '@auth0/nextjs-auth0'
import axios from "axios";
import {
  useCallback,
  useMemo
} from 'react';

const baseUrl = `${process.env.REACT_APP_URL}api/item`

const useItem = () => {


  const getByListId = useCallback(async (listId) => {
    const token = await getAccessToken();
    console.log(token);
    const {
      data
    } = await axios.get(`${baseUrl}/list/${listId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }, [getAccessTokenSilently])

  const getById = useCallback(async (id) => {
    const token = await getAccessToken();
    const {
      data
    } = await axios.get(`${baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }, [getAccessTokenSilently]);


  const deleteById = useCallback(async (id) => {
    const token = await getAccessToken();
    await axios.delete(
      `${baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }, [getAccessTokenSilently]);

  const save = useCallback(async (item) => {
    const token = await getAccessToken();
    const {
      id,
      ...values
    } = item;
    const {
      data
    } = await axios({
      method: id ? 'PUT' : 'POST',
      url: `${baseUrl}/${id ? id : ''}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: values,
    });
    return data;
  }, [getAccessTokenSilently]);

  const itemApi = useMemo(() => ({
    getByListId,
    getById,
    deleteById,
    save,
  }), [getByListId, getById, deleteById, save, ])
  return itemApi;
}

export default useItem;