// Add this to your lib/utils.js or create a new file
export const generateSearchQueries = (post) => {
  const queries = [];
  
  // Add title words
  if (post.title) {
    const titleWords = post.title
      .trim()
      .toLowerCase()
      .replace(/[^\w\s]/g, '') // remove punctuation
      .split(/\s+/)
      .filter(word => word.length > 2); // ignore words shorter than 3 chars
    queries.push(...titleWords);
  }
  
  // Add excerpt words
  if (post.excerpt) {
    const excerptWords = post.excerpt
      .trim()
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2);
    queries.push(...excerptWords);
  }
  
  // Add content words (first 100 words to avoid too many tokens)
  if (post.content) {
    const contentText = post.content
      .replace(/<[^>]*>/g, '') // remove HTML tags
      .trim()
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2)
      .slice(0, 100); // limit to first 100 words
    queries.push(...contentText);
  }
  
  // Remove duplicates and return
  return [...new Set(queries)];
};

export function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('en-US', options)
}

export function truncate(str, length) {
  if (!str || str.length <= length) return str
  return str.slice(0, length) + '...'
}

/**
 * Uploads an image to ImgBB service
 * @param {File} file The image file to upload
 * @param {string} apiKey Your ImgBB API key
 * @returns {Promise<string>} A promise that resolves to the image URL
 */
export async function uploadToImgBB(file, apiKey) {
  if (!file) return null;
  
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    if (data.success) {
      return data.data.url;
    } else {
      console.error('Error uploading image:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Error uploading to ImgBB:', error);
    return null;
  }
}