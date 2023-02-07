import {
  getAccessToken
} from '@auth0/nextjs-auth0';
import axios from "axios";
import {
  useCallback,
  useMemo
} from 'react';

const baseUrl = `${process.env.REACT_APP_URL}api/list`

const useList = () => {


  const getAll = useCallback(async () => {
    const token = await getAccessToken();

    const {
      data
    } = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }, [getAccessToken])

  const getById = useCallback(async (id) => {
    const {token} = await getAccessToken();
    console.log(token);
    const {
      data
    } = await axios.get(`${baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }, [getAccessToken]);


  const deleteById = useCallback(async (id) => {
    const token = await getAccessToken();
    await axios.delete(
      `${baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }, [getAccessToken]);

  const save = useCallback(async (list) => {
    const token = await getAccessToken();
    const {
      id,
      ...values
    } = list;
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
  }, [getAccessToken]);

  const listApi = useMemo(() => ({
    getAll,
    getById,
    deleteById,
    save,
  }), [getAll, getById, deleteById, save, ])
  return listApi;
}

export default useList;