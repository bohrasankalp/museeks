import os from 'os';
import React, { useCallback, useEffect } from 'react';
import KeyBinding from 'react-keybinding-component';
import { useHistory } from 'react-router';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Toasts from './components/Toasts/Toasts';

import AppActions from './actions/AppActions';
import * as PlayerActions from './actions/PlayerActions';

import styles from './App.module.css';
import { isCtrlKey } from './lib/utils-platform';

/*
|--------------------------------------------------------------------------
| The App
|--------------------------------------------------------------------------
*/

const Museeks: React.FC = (props) => {
  const history = useHistory();

  const onKey = useCallback(
    async (e: KeyboardEvent) => {
      switch (e.key) {
        case ' ':
          e.preventDefault();
          e.stopPropagation();
          await PlayerActions.playPause();
          break;
        case ',':
          if (isCtrlKey(e)) {
            e.preventDefault();
            e.stopPropagation();
            history.push('/settings');
          }
          break;
        default:
          break;
      }
    },
    [history]
  );

  useEffect(() => {
    AppActions.init();
  }, []);

  return (
    <div className={`${styles.root} os-${os.platform()}`}>
      <KeyBinding onKey={onKey} preventInputConflict />
      <Header />
      <main className={styles.mainContent}>{props.children}</main>
      <Footer />
      <Toasts />
    </div>
  );
};

export default Museeks;
