import { useEffect, useState } from 'react';
import appRequest from '../utils/app-request';

export interface IUseAppRequestProps {
    url: string,
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE',
    data?: unknown,
    name?: string,
    deps?: unknown[]
}

export interface IUseAppRequestResponse<T = unknown> {
    refresh(): void;
    loading: boolean;
    responseCode: number;
    data: T
}

const useAppRequest = <T = unknown>({ name = 'data', url, method, data, deps = [] }: IUseAppRequestProps): IUseAppRequestResponse => {
    const [responseData, setResponseData] = useState<T>();
    const [loading, setLoading] = useState(true);
    const [isRefresh, setRefresh] = useState(false);
    const [responseCode, setResponseCode] = useState(0);

    useEffect(()=>{
        setLoading(true);
        appRequest<T>({ url, method, data }).then(({ data, status })=>{
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