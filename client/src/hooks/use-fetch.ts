import React, { useEffect, useState } from "react";
import { Result } from "../types";

function useFetch<T = any, E = any>(url: string, tag: string) {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<E | null>(null);

	useEffect(() => {
		async function init() {
			try {
				const response = await fetch(url);
				if (response.ok) {
					const result: Result<T, E> = await response.json();
					setData(result.data ?? null);
					setLoading(false);
				} else {
					throw response;
				}
			} catch (error) {
				setError(error as E);
			} finally {
				setLoading(false);
			}
		}
		init();
	}, [tag]);

	return { data, loading, error };
}

export default useFetch;
