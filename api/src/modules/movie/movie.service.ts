import TvMazeService from '../../services/TvMazeService';

export default {
  searchMovies: async (search: string): Promise<string> => {
    try {
      const response = await TvMazeService.searchMovies(search);

      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Search does not work. Please try again later');
    }
  },
};
