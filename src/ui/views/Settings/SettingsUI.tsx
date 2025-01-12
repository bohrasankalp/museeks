import os from 'os';
import React, { useCallback, ChangeEventHandler } from 'react';

import * as SettingsActions from '../../actions/SettingsActions';
import * as Setting from '../../components/Setting/Setting';

import CheckboxSetting from '../../components/SettingCheckbox/SettingCheckbox';
import { Config } from '../../../shared/types/museeks';
import { themes } from '../../lib/themes';

interface Props {
  config: Config;
}

const SettingsUI: React.FC<Props> = (props) => {
  const { config } = props;

  const onThemeChange = useCallback<ChangeEventHandler<HTMLSelectElement>>((e) => {
    SettingsActions.applyTheme(e.currentTarget.value);
  }, []);

  return (
    <div className='setting setting-interface'>
      <Setting.Section>
        <Setting.Label htmlFor='setting-theme'>Theme</Setting.Label>
        <Setting.Select defaultValue={config.theme} onChange={onThemeChange} id='setting-theme'>
          {themes.map((theme) => {
            return (
              <option key={theme._id} value={theme._id}>
                {theme.name}
              </option>
            );
          })}
        </Setting.Select>
        <Setting.Description>Change the appearance of the interface</Setting.Description>
      </Setting.Section>
      <Setting.Section>
        <CheckboxSetting
          slug='native-notifications'
          title='Display Notifications'
          description='Send notifications when the playing track changes'
          defaultValue={config.displayNotifications}
          onClick={SettingsActions.toggleDisplayNotifications}
        />
        <CheckboxSetting
          slug='sleepmode'
          title='Sleep mode blocker'
          description='Prevent the computer from going into sleep mode'
          defaultValue={config.sleepBlocker}
          onClick={SettingsActions.toggleSleepBlocker}
        />
        {os.platform() !== 'darwin' && (
          <CheckboxSetting
            slug='tray'
            title='Minimize to tray on close'
            description='Prevent the app from shutting down when clicking the "close" window button'
            defaultValue={config.minimizeToTray}
            onClick={SettingsActions.toggleMinimizeToTray}
          />
        )}
        <CheckboxSetting
          slug='update'
          title='Auto update checker'
          description='Automatically check for updates on startup'
          defaultValue={config.autoUpdateChecker}
          onClick={SettingsActions.toggleAutoUpdateChecker}
        />
      </Setting.Section>
    </div>
  );
};

export default SettingsUI;
