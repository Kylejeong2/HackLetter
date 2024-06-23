import axios from "axios";

export async function main() {
    const response = await axios.get('api/scrapeHackerNews');
    return response.data.articles
}