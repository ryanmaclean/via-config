import React, {Component} from 'react';
import styles from './title-bar.css';

export const Title = {
  KEYS: 'Keys',
  LIGHTING: 'Lighting',
  DEBUG: 'Debug'
};

export class TitleBar extends Component {
  isDetected() {
    return !!this.props.getKeyboard();
  }

  getKeyboardName() {
    const keyboard = this.props.getKeyboard();
    return (keyboard && keyboard.name) || 'M60A';
  }

  getTitlesForKeyboard(keyboard) {
    let titles = [Title.KEYS];
    if (keyboard.lights) {
      titles = [...titles, Title.LIGHTING];
    }
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      titles = [...titles, Title.DEBUG];
    }
    return titles;
  }

  render() {
    const {selectedTitle} = this.props;

    return (
      <div className={styles.titleBarContainer}>
        <div className={styles.titles}>
          {this.isDetected() ? (
            [
              <div key="kbname" className={styles.kbName}>
                {this.getKeyboardName()}
              </div>,
              this.getTitlesForKeyboard(this.props.getKeyboard()).map(title => (
                <div
                  onClick={_ => this.props.setSelectedTitle(title)}
                  key={title}
                  className={[
                    title === selectedTitle && styles.selected,
                    styles.title
                  ].join(' ')}
                >
                  {title}
                </div>
              ))
            ]
          ) : (
            <div className={[styles.kbName, styles.kbDisconnected].join(' ')}>
              No kb detected
            </div>
          )}
        </div>
      </div>
    );
  }
}
