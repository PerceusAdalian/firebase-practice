import './App.css';
import { auth, database } from './firebase/init';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import React from 'react';

function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);

  const fetchPosts = React.useCallback(async () => {
    try {
      const data = await getDocs(collection(database, 'posts'));
      setPosts(
        data.docs.map((snapshot) => ({ id: snapshot.id, ...snapshot.data() }))
      );
    } catch (error) {
      console.error('Error getting posts:', error);
    }
  }, []);

  async function createPost() {
    if (!user) {
      console.error('User must be signed in to create a post.');
      return;
    }

    try {
      await addDoc(collection(database, 'posts'), {
        title: 'My Post',
        content: 'This is the content of my post.',
        author: user.uid,
        createdAt: new Date(),
        uid: user.uid,
      });
      console.log('Post created successfully.');
      await fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  async function updatePost(postId) {
    if (!user) {
      console.error('User must be signed in to update a post.');
      return;
    }

    try {
      const postRef = doc(database, 'posts', postId);
      await updateDoc(postRef, { title: 'Updated Title' });
      console.log('Post updated successfully.');
      await fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  }

  async function deletePost(postId) {
    if (!user) {
      console.error('User must be signed in to delete a post.');
      return;
    }

    try {
      const postRef = doc(database, 'posts', postId);
      await deleteDoc(postRef);
      console.log('Post deleted successfully.');
      await fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }

  async function getPostById(postId) {
    try {
      const postRef = doc(database, 'posts', postId);
      const snapshot = await getDocs(postRef);
      return snapshot.data();
    } catch (error) {
      console.error('Error getting post:', error);
    }
  }

  async function getPostByUid() {
    try {
      const postsRef = collection(database, 'posts');
      const q = query(postsRef, where('uid', '==', user.uid));
      const data = await getDocs(q);
      return data.docs.map((snapshot) => ({ id: snapshot.id, ...snapshot.data() }));
    } catch (error) {
      console.error('Error getting posts by UID:', error);
    }
  }

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  React.useEffect(() => {
    if (user) {
      fetchPosts();
    } else {
      setPosts([]);
    }
  }, [user, fetchPosts]);

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, 'test@example.com', 'password123');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, 'test@example.com', 'password123');
    } catch (error) {
      console.error('Error signing in user:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out user:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="App">
      <p>{user ? `Signed in as ${user.email}` : 'Not signed in'}</p>
      <button onClick={register}>Register</button>
      <button onClick={signIn}>Sign In</button>
      <button onClick={logout}>Logout</button>
      <button onClick={createPost}>Create Post</button>
      <button onClick={() => getPostById('post-id')}>Fetch Post</button>
      <button onClick={getPostByUid}>Fetch My Posts</button>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>: {post.content}{' '}
            <button onClick={() => updatePost(post.id)}>Update</button>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;