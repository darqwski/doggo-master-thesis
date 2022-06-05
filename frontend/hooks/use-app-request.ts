import { useEffect, useState } from 'react';
import appRequest from '../utils/app-request';

export interface IUseAppRequestProps {
    url: string,
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE',
    data?: unknown,
    name?: string,
    jsonResponse?: boolean;
    deps?: unknown[]
}

export interface IUseAppRequestResponse<T = unknown, name = string> {
    refresh(): void;
    loading: boolean;
    responseCode: number;
    data: T | undefined
}

const useAppRequest = <T = unknown>({ name = 'data', url, method, data, deps = [], jsonResponse = true }: IUseAppRequestProps): IUseAppRequestResponse<T> => {
    const [responseData, setResponseData] = useState<T>();
    const [loading, setLoading] = useState(true);
    const [isRefresh, setRefresh] = useState(false);
    const [responseCode, setResponseCode] = useState(0);

    useEffect(()=>{
        setLoading(true);
        appRequest<T>({ url, method, data, jsonResponse }).then(({ data, status })=>{
            setResponseData(data);
            setResponseCode(status);
            setLoading(false);
        });
    }, [isRefresh, ...deps]);

    const refresh = () => setRefresh(i=>!i);

    return {
        [name]: responseData,
        data: responseData,
        refresh,
        loading,
        responseCode
    };
};

export default useAppRequest;