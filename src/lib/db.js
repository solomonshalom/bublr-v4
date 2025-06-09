import firebase, { firestore } from './firebase'

// Function to get all users with published posts for sitemap generation
export async function getAllUsersWithPublishedPosts() {
  const usersSnapshot = await firestore.collection('users').get()
  const users = []
  
  for (const userDoc of usersSnapshot.docs) {
    const userData = userDoc.data()
    if (userData.posts && userData.posts.length > 0) {
      // Get all posts for this user
      const postDocs = await Promise.all(
        userData.posts.map(postId => firestore.collection('posts').doc(postId).get())
      )
      
      // Filter to only published posts and extract necessary data
      const publishedPosts = postDocs
        .filter(postDoc => postDoc.exists && postDoc.data().published)
        .map(postDoc => {
          const postData = postDoc.data()
          return {
            id: postDoc.id,
            slug: postData.slug,
            lastEdited: postData.lastEdited,
            title: postData.title // Include title for better SEO
          }
        })
      
      // Only include users who have at least one published post
      if (publishedPosts.length > 0) {
        users.push({
          id: userDoc.id,
          name: userData.name,
          photo: userData.photo, // Include photo for image sitemap
          displayName: userData.displayName, // Include displayName for better titles
          posts: publishedPosts
        })
      }
    }
  }
  
  return users
}

export const createPostWithSearch = async (postData) => {
  const searchQueries = generateSearchQueries(postData);
  
  const postWithSearch = {
    ...postData,
    searchQueries,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  
  const docRef = await firestore.collection('posts').add(postWithSearch);
  return docRef.id;
};

export const updatePostWithSearch = async (postId, postData) => {
  const searchQueries = generateSearchQueries(postData);
  
  const updateData = {
    ...postData,
    searchQueries,
    updatedAt: Date.now(),
  };
  
  await firestore.collection('posts').doc(postId).update(updateData);
};

export const generateSearchQueries = (postData) => {
  // Extract text from title and content
  const title = postData.title || '';
  const content = postData.content || '';
  const excerpt = postData.excerpt || '';
  
  // Combine all text for tokenization
  const fullText = `${title} ${excerpt} ${content}`.toLowerCase();
  
  // Tokenize and filter for unique terms
  const terms = fullText
    .replace(/[^\w\s]/g, '') // Remove special chars
    .split(/\s+/) // Split by whitespace
    .filter(term => term.length > 2) // Only terms with 3+ chars
    .filter((term, i, arr) => arr.indexOf(term) === i); // Unique terms
  
  // Generate phonetic variants and common prefixes for fuzzy matching
  const fuzzyTerms = [];
  terms.forEach(term => {
    // Add the original term
    fuzzyTerms.push(term);
    
    // Add term prefixes for partial matching (if term length > 4)
    if (term.length > 4) {
      // Add prefixes of different lengths (minimum 3 chars)
      for (let i = 3; i < term.length; i++) {
        fuzzyTerms.push(term.substring(0, i));
      }
    }
    
    // Add common misspelling patterns
    // Double letter to single letter
    if (/(.)\1/.test(term)) {
      fuzzyTerms.push(term.replace(/(.)\1+/g, '$1'));
    }
    
    // Single letter to double letter for common doubled letters
    ['l', 'r', 's', 't', 'p', 'n', 'm'].forEach(letter => {
      if (term.includes(letter)) {
        fuzzyTerms.push(term.replace(letter, letter + letter));
      }
    });
    
    // Common vowel substitutions
    if (term.includes('a')) fuzzyTerms.push(term.replace(/a/g, 'e'));
    if (term.includes('e')) fuzzyTerms.push(term.replace(/e/g, 'a'));
    if (term.includes('i')) fuzzyTerms.push(term.replace(/i/g, 'y'));
  });
  
  // Filter again for uniqueness and limit to 30 terms
  return [...new Set(fuzzyTerms)].slice(0, 30); // Firebase limit is 30 values in array-contains-any
};

export const searchPosts = async (searchInput, limit = 20) => {
  if (!searchInput || searchInput.trim() === '') {
    // Return recent published posts if no search term
    const snapshot = await firestore
      .collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
  
  const originalInput = searchInput.trim();
  
  // Process search input
  const searchTerms = searchInput
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(term => term.length > 2);
  
  if (searchTerms.length === 0) {
    return [];
  }
  
  try {
    // First attempt: Try to find posts that exactly match the title
    const titleSnapshot = await firestore
      .collection('posts')
      .where('published', '==', true)
      .where('title', '==', originalInput)
      .limit(limit)
      .get();
    
    if (!titleSnapshot.empty) {
      return titleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    
    // Generate fuzzy search terms
    const fuzzySearchTerms = [];
    
    // Add original terms
    searchTerms.forEach(term => {
      fuzzySearchTerms.push(term);
      
      // Add prefixes for partial matching (if term length > 4)
      if (term.length > 4) {
        fuzzySearchTerms.push(term.substring(0, Math.ceil(term.length * 0.75)));
        fuzzySearchTerms.push(term.substring(0, Math.ceil(term.length * 0.5)));
      }
      
      // Common vowel substitutions
      if (term.includes('a')) fuzzySearchTerms.push(term.replace(/a/g, 'e'));
      if (term.includes('e')) fuzzySearchTerms.push(term.replace(/e/g, 'a'));
      if (term.includes('i')) fuzzySearchTerms.push(term.replace(/i/g, 'y'));
    });
    
    // Keep unique terms and limit to 20 for Firestore
    const uniqueFuzzyTerms = [...new Set(fuzzySearchTerms)].slice(0, 20);
    
    // Second attempt: Search by terms in searchQueries array with fuzzy terms
    const snapshot = await firestore
      .collection('posts')
      .where('published', '==', true)
      .where('searchQueries', 'array-contains-any', uniqueFuzzyTerms)
      .limit(limit)
      .get();
    
    let results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Apply additional client-side fuzzy matching and sort by relevance
    // Higher score = better match
    results = results.map(post => {
      let score = 0;
      
      // Exact title match gets highest score
      if (post.title && post.title.toLowerCase() === originalInput.toLowerCase()) {
        score += 100;
      }
      
      // Title contains search term
      if (post.title && searchTerms.some(term => post.title.toLowerCase().includes(term))) {
        score += 50;
      }
      
      // Content contains search term
      if (post.content && searchTerms.some(term => post.content.toLowerCase().includes(term))) {
        score += 25;
      }
      
      // Count how many search terms are found in the post's searchQueries
      const matchCount = searchTerms.filter(term => 
        post.searchQueries && post.searchQueries.includes(term)
      ).length;
      
      score += matchCount * 10;
      
      return { ...post, _score: score };
    });
    
    // Sort by relevance score (descending)
    results.sort((a, b) => b._score - a._score);
    
    // Remove the temporary score field
    return results.map(({ _score, ...post }) => post);
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
};


export async function userWithIDExists(id) {
  const doc = await firestore.collection('users').doc(id).get()
  return doc.exists
}

export async function userWithNameExists(name) {
  const query = await firestore
    .collection('users')
    .where('name', '==', name)
    .get()

  return !query.empty
}

export async function getUserByID(id) {
  const doc = await firestore.collection('users').doc(id).get()
  if (!doc.exists) {
    throw { code: 'user/not-found' }
  }

  const user = doc.data()
  const postDocPromises = user.posts.map(postId => getPostByID(postId))
  user.posts = await Promise.all(postDocPromises)

  return { id: doc.id, ...user }
}

export async function getUserByName(name) {
  const query = await firestore
    .collection('users')
    .where('name', '==', name)
    .get()

  if (query.empty || !query.docs[0].exists) {
    throw { code: 'user/not-found' }
  }

  const user = { id: query.docs[0].id, ...query.docs[0].data() }
  const postDocPromises = user.posts.map(postId => getPostByID(postId))
  user.posts = await Promise.all(postDocPromises)

  return user
}

export async function getPostByID(id) {
  const doc = await firestore.collection('posts').doc(id).get()
  if (!doc.exists) {
    throw { code: 'post/not-found' }
  }

  return { id: doc.id, ...doc.data() }
}

export async function removePostForUser(uid, pid) {
  await firestore.collection('posts').doc(pid).delete()
  firestore
    .collection('users')
    .doc(uid)
    .update({ posts: firebase.firestore.FieldValue.arrayRemove(pid) })
}

export async function postWithIDExists(id) {
  const doc = await firestore.collection('posts').doc(id).get()
  return doc.exists
}

export async function postWithUsernameAndSlugExists(username, slug) {
  const user = await getUserByName(username)
  return user.posts.find(post => post.slug === slug)
}

export async function postWithUserIDAndSlugExists(uid, slug) {
  const user = await getUserByID(uid)
  return user.posts.find(post => post.slug === slug)
}

export async function getPostByUsernameAndSlug(username, slug) {
  const user = await getUserByName(username)
  const post = user.posts.find(post => post.slug === slug)
  if (!post) {
    throw { code: 'post/not-found' }
  }

  return post
}

export async function setUser(id, data) {
  await firestore.collection('users').doc(id).set(data)
}

export async function setPost(id, data) {
  await firestore.collection('posts').doc(id).set(data)
}

export async function createPostForUser(userId) {
  const doc = await firestore.collection('posts').add({
    title: '',
    excerpt: '',
    content: '',
    author: userId,
    published: false,
    lastEdited: firebase.firestore.Timestamp.now(),
  })

  await firestore.collection('posts').doc(doc.id).update({ slug: doc.id })

  await firestore
    .collection('users')
    .doc(userId)
    .update({ posts: firebase.firestore.FieldValue.arrayUnion(doc.id) })

  return doc.id
}