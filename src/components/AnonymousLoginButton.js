/** @jsxImportSource @emotion/react */
import Button from '../components/button';
import firebase, { auth } from '../lib/firebase';
import { setUser, userWithIDExists } from '../lib/db';
import { css } from '@emotion/react';

const AnonymousLoginButton = () => {
  const avatarStyles = ['lorelei-neutral', 'lorelei', 'notionists', 'notionists-neutral'];

  const generateRandomSeed = () => {
    return Math.floor(Math.random() * 1000000).toString();
  };

  const getRandomStyle = () => {
    const randomIndex = Math.floor(Math.random() * avatarStyles.length);
    return avatarStyles[randomIndex];
  };

  const handleAnonymousLogin = async () => {
    const randomSeed = generateRandomSeed();
    const randomStyle = getRandomStyle();

    auth.signInAnonymously().then(async (cred) => {
      const userExists = await userWithIDExists(cred.user.uid);

      if (!userExists) {
        // Create a new user with the generated avatar seed and style
        await setUser(cred.user.uid, {
          name: cred.user.uid,
          displayName: 'Anonymous',
          about: 'Hii, change this text to add your very own little bio!',
          posts: [],
          readingList: [],
          // Everytime a new anonymous user creates an account, the below API will create a randomized PFP for them.
          photo: `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}`,
        });
      }
    });
  };

  return (
    <Button onClick={handleAnonymousLogin} css={css`
      display: block;
      border: none;
      outline: none;
      cursor: pointer;

      padding: 0.75em 1.5em;
      background: var(--grey-5);
      color: var(--grey-1);
      border-radius: 0.33em;

      border: none;

      transition: all 200ms ease;

      /* Adding the shadow effect */
      box-shadow: 0px 4px 1px #a3a3a3;
      
      &:hover {
        background: var(--grey-4);
      }

      &:active {
        transform: translateY(2px);
        box-shadow: none;
      }

      &:disabled {
        cursor: not-allowed;
        background: var(--grey-4);
        color: var(--grey-2);
      }
  `}>
    Anonymous 🥷
    </Button>
  );
};

export default AnonymousLoginButton;
