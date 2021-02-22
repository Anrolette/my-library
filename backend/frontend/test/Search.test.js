const search = async (evt) => {
    if (evt.key === "Enter") {
      await fetch(`/search/${kind}/${evt.target.value}/${limit}`)
        .then((res) => res.json())
        .then((response) => setResults(response.results));
    }
  };

