import { useEffect, useState } from "react";
import { Storage } from "@ionic/storage";

const SEARCH_KEY = "my-search";

export interface Search {
	id: string;
	value: string;
}

export const useStorage = () => {
	const [store, setStore] = useState<Storage>();
	const [searched, setSearched] = useState<Search[]>([]);
	useEffect(() => {
		const initStorage = async () => {
			const newStore = new Storage({
				name: "vindydb",
			});
			const store = await newStore.create();
			setStore(store);

			const storedSearch = (await store.get(SEARCH_KEY)) || [];
			setSearched(storedSearch);
		};

		initStorage();
	}, []);

	return {
		searched,
	};
};
