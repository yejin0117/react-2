'use client'

import {useContext} from "react";
import {ThemeContext} from "./theme-provider";

export default function ThemeStatus() {
    const {theme, toggleTheme} = useContext(ThemeContext);
    return (
        <div style ={{ display:'inline-block', marginLeft: '12px' }}>
            <button onClick={toggleTheme} aria-label="toggle theme">
              Theme: {theme === 'dark'? '🌙 Dark' : '☀️ Light'}
            </button>
        </div>
    );
}