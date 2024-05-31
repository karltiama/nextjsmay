import axiosInstance from "./axiosInstance";

export const getPokemonList = async () => {
	const response = await axiosInstance.get("pokemon");
	return response.data;
};

export const getPokemonDetails = async (name: string) => {
	const response = await axiosInstance.get(`pokemon/${name}`);
	return response.data;
};
