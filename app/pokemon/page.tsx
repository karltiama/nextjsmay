// pages/index.tsx
"use client";

import { useState, useEffect } from "react";
import { getPokemonList, getPokemonDetails } from "@/lib/pokeApi";

interface Pokemon {
	name: string;
	url: string;
}

const HomePage = () => {
	const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
	const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchPokemonList = async () => {
			try {
				const data = await getPokemonList();
				setPokemonList(data.results);
			} catch (error) {
				console.error("Error fetching Pokemon list:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPokemonList();
	}, []);

	const handlePokemonClick = async (name: string) => {
		try {
			const data = await getPokemonDetails(name);
			setSelectedPokemon(data);
		} catch (error) {
			console.error("Error fetching Pokemon details:", error);
		}
	};

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Pokémon List</h1>
			{loading ? (
				<p>Loading...</p>
			) : (
				<ul className="space-y-2">
					{pokemonList.map((pokemon) => (
						<li
							key={pokemon.name}
							className="cursor-pointer text-blue-500 hover:underline"
							onClick={() => handlePokemonClick(pokemon.name)}>
							{pokemon.name}
						</li>
					))}
				</ul>
			)}
			{selectedPokemon && (
				<div className="mt-4 p-4 border rounded">
					<h2 className="text-xl font-bold mb-2">{selectedPokemon.name}</h2>
					<p>Height: {selectedPokemon.height}</p>
					<p>Weight: {selectedPokemon.weight}</p>
					<img
						src={selectedPokemon.sprites.front_default}
						alt={selectedPokemon.name}
						className="mt-2"
					/>
				</div>
			)}
		</div>
	);
};

export default HomePage;
