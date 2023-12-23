import React from 'react';

const Typography = () => {
    const styles = {
        bodyText1: {
            fontWeight: 'normal',
            fontSize: '16px',
            letterSpacing: '0.5px',
        },
        bodyText2: {
            fontWeight: 'normal',
            fontSize: '14px',
            letterSpacing: '0.25px',
        },
        headline1: {
            fontWeight: 'bold',
            fontSize: '28px',
            letterSpacing: '0.15px',
        },
        headline2: {
            fontWeight: 'bold',
            fontSize: '24px',
            letterSpacing: '0.15px',
        },
        subtitle1: {
            fontWeight: 'normal',
            fontSize: '18px',
            letterSpacing: '0.15px',
        },
        subtitle2: {
            fontWeight: 'normal',
            fontSize: '16px',
            letterSpacing: '0.1px',
        },
        button: {
            fontWeight: 'bold',
            fontSize: '14px',
            letterSpacing: '1.25px',
        },
        caption: {
            fontWeight: 'normal',
            fontSize: '12px',
            letterSpacing: '0.4px',
        },
        overline: {
            fontWeight: 'normal',
            fontSize: '10px',
            letterSpacing: '1.5px',
        },
    };

    return (
        <div>
            <p style={styles.bodyText1}>This is Body Text 1</p>
            <p style={styles.bodyText2}>This is Body Text 2</p>
            <h1 style={styles.headline1}>This is Headline 1</h1>
            <h2 style={styles.headline2}>This is Headline 2</h2>
            <p style={styles.subtitle1}>This is Subtitle 1</p>
            <p style={styles.subtitle2}>This is Subtitle 2</p>
            <button style={styles.button}>Click me</button>
            <p style={styles.caption}>This is a caption</p>
            <p style={styles.overline}>This is an overline</p>
        </div>
    );
};

export default Typography;
