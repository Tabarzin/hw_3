import React from 'react';
import { observer } from 'mobx-react-lite';
import { authStore } from '@stores/AuthStore';
import styles from './UserProfile.module.scss';

const UserProfile: React.FC = observer(() => {
  // const { user, isAuthenticated, isLoading } = authStore;

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (!isAuthenticated) {
  //   return <div>Please sign in to access your profile.</div>;
  // }

  return (
    <div>
      <h2>User Profile</h2>
      {/* <p>Email: {user?.email}</p> */}
      {/* Add more user information fields as needed */}
    </div>
  );
});

export default UserProfile;
