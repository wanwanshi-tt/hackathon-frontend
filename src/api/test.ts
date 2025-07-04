import axios from 'axios';

export async function getTestData() {
  try {
    const res = await axios.get(
      'https://test-api-dcdybrhsa7g2dbbn.uksouth-01.azurewebsites.net/',
    );
    console.log('Test data fetched successfully:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching test data:', error);
    throw error;
  }
}
