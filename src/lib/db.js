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
  
  return terms.slice(0, 30); // Firebase limit is 30 values in array-contains-any
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
  
  // Process search input
  const searchTerms = searchInput
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(term => term.length > 2)
    .slice(0, 20); // Firebase limit is 30, using 20 to be safe
  
  if (searchTerms.length === 0) {
    return [];
  }
  
  // Query with array-contains-any
  const snapshot = await firestore
    .collection('posts')
    .where('published', '==', true)
    .where('searchQueries', 'array-contains-any', searchTerms)
    .limit(limit)
    .get();
  
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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