import { useState } from 'react'
import './JellyMenu.css'

export default function JellyMenu() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <div className="jelly-menu-container">
                <nav className="jelly-menu">
                    <input 
                        type="checkbox" 
                        href="#" 
                        className="jelly-menu-open" 
                        name="jelly-menu-open" 
                        id="jelly-menu-open" 
                        checked={isOpen}
                        onChange={toggleMenu}
                    />
                    <label className="jelly-menu-open-button" htmlFor="jelly-menu-open">
                        <span className="hamburger hamburger-1"></span>
                        <span className="hamburger hamburger-2"></span>
                        <span className="hamburger hamburger-3"></span>
                    </label>

                    <a href="#" className="jelly-menu-item" onClick={(e) => {e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'})}}>
                        <span className="jelly-icon">⬆️</span>
                    </a>
                    <a href="#" className="jelly-menu-item" onClick={(e) => {e.preventDefault(); alert('Saved Progress!')}}>
                        <span className="jelly-icon">💾</span>
                    </a>
                    <a href="#" className="jelly-menu-item" onClick={(e) => {e.preventDefault(); alert('Theme Toggled')}}>
                        <span className="jelly-icon">🌙</span>
                    </a>
                </nav>
            </div>

            {/* SVG gooey filter for the jelly effect */}
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'none' }}>
                <defs>
                    <filter id="shadowed-goo">
                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                        <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
                        <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
                        <feOffset in="shadow" dx="1" dy="1" result="shadow" />
                        <feComposite in2="shadow" in="goo" result="goo" />
                        <feComposite in2="goo" in="SourceGraphic" result="mix" />
                    </filter>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                        <feComposite in2="goo" in="SourceGraphic" result="mix" />
                    </filter>
                </defs>
            </svg>
        </>
    )
}
