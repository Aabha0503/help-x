import { useCallback, useEffect, useState } from "react";

export default function useApiResource(fetcher, options = {}) {
  const { initialData = [], autoLoad = true } = options;
  const [data, setData] = useState(() => initialData);
  const [isLoading, setIsLoading] = useState(autoLoad);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      setData(result);
      return result;
    } catch (requestError) {
      setError(requestError.message || "Request failed");
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    if (autoLoad) load();
  }, [autoLoad, load]);

  return {
    data,
    isLoading,
    error,
    isEmpty: !isLoading && !error && data.length === 0,
    retry: load
  };
}
