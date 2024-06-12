import { useEffect, useState } from 'react';
import { auth } from './firebase'; // Firebase初期化ファイルからauthをインポート

function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // クリーンアップ関数
    return () => unsubscribe();
  }, []);

  return currentUser;
}

export default useAuth;
