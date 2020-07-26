import { Auth } from '@/firebase/auth';

export const auth = (() => {
    return {
      initialize() {
        return new Promise((resolve) => {
            const unsubscribe = Auth
              .onAuthStateChanged((user) => {
                unsubscribe();
                resolve(user);
                return;
              });
          });    
      }
    }
  })()