import {
  getAccessToken
} from '@auth0/nextjs-auth0';
import axios from "axios";
import {
  useCallback,
  useMemo
} from 'react';

const baseUrl = `${process.env.REACT_APP_URL}api/users`

const useUsers = () => {


  const getAll = useCallback(async () => {
    const token = await getAccessToken();
    const {
      data
    } = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.items;
  }, [getAccessTokenSilently]);
  
  const getCurrentUser = useCallback(async () => {
    const token = await getAccessToken();
    const {
      data
    } = await axios.get(`${baseUrl}/current`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }, [getAccessTokenSilently]);

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

  const getByEmail = useCallback(async (email) => {
    const token = await getAccessToken();
    const {
      data
    } = await axios.get(`${baseUrl}/email/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data;
  }, [getAccessTokenSilently]);

  const deleteById = useCallback(async (id) => {
    const token = await getAccessToken();
    await axios.delete(`${baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }, [getAccessTokenSilently])

  const save = useCallback(async (user) => {
    const token = await getAccessToken();
    const {
      id,
      ...values
    } = user;
    const {
      data
    } = await axios({
      method: id ? 'PUT' : 'POST',
      url: `${baseUrl}/${id ?? ''}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: values,
    });

    return data;
  }, [getAccessTokenSilently]);

  const userApi = useMemo(() => ({
    getAll,
    getById,
    getCurrentUser,
    getByEmail,
    deleteById,
    save,
  }), [getAll, getById, getByEmail, deleteById, save,getCurrentUser ])

  return userApi;
}

export default useUsers;