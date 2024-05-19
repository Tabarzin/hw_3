import React from 'react';
import { observer } from 'mobx-react-lite';
import { authStore } from '@stores/AuthStore';

const UserProfile = observer(() => {
  const { session } = authStore;
  const user = session?.user;

  return (
    <div>
      {user ? (
        <div>
          <div>
            <img src={user.user_metadata.avatar_url} alt="Avatar" />
          </div>
          <div>
            <h2>Email</h2>
            <p>{user.email}</p>
          </div>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
});

export default UserProfile;
