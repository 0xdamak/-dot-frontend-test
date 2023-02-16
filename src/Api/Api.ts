const api = {
  async getBallotData() {
    const res = await fetch("http://localhost:8080/api/getBallotData");
    return await res.json();
  },
};

export default api;
