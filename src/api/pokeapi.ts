export const fetchPokemons = async (page: number, search: string) =>
{
    const limit = 6;
    const offset = (page - 1) * limit;
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    if(search)
    {
        url = `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`;
        try
        {
            const res = await fetch(url);
            if(!res.ok) throw new Error("No encontrado");
            const data = await res.json();
            return [data];
        }
        catch
        {
            return [];
        }
    }
    else
    {
        const res = await fetch(url);
        const data = await res.json();
        const pokemons = await Promise.all(
            data.results.map(async (p: any) =>
            {
                const res = await fetch(p.url);
                return res.json();
            })
        );
        return pokemons;
    }
};
