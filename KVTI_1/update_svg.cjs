const fs = require('fs');
let code = fs.readFileSync('src/components/LandingDetails.jsx', 'utf8');
const startIdx = code.indexOf('{/* Outer Decorative Rings */}');
const endIdx = code.indexOf('</svg>', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    const newSvgInner = `{/* Outer Clean Ring */}
                            <circle cx="100" cy="100" r="90" strokeWidth="1" strokeOpacity="0.4" />
                            <circle cx="100" cy="100" r="85" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="4 4" />
                            
                            {/* Minimalist Degree Marks */}
                            <g strokeWidth="1" strokeOpacity="0.5">
                                {[...Array(12)].map((_, i) => (
                                    <line key={\`tick-modern-\${i}\`} x1="100" y1="10" x2="100" y2="15" transform={\`rotate(\${i * 30} 100 100)\`} />
                                ))}
                            </g>
                            <g strokeWidth="2" strokeOpacity="0.8">
                                {[...Array(4)].map((_, i) => (
                                    <line key={\`tick-major-modern-\${i}\`} x1="100" y1="5" x2="100" y2="20" transform={\`rotate(\${i * 90} 100 100)\`} />
                                ))}
                            </g>

                            {/* Inner Clean Rings */}
                            <circle cx="100" cy="100" r="60" strokeWidth="0.5" strokeOpacity="0.3" />
                            <circle cx="100" cy="100" r="20" strokeWidth="1" strokeOpacity="0.5" />

                            {/* Tech-oriented Crosshairs */}
                            <path d="M 10 100 L 80 100 M 120 100 L 190 100 M 100 10 L 100 80 M 100 120 L 100 190" strokeWidth="0.5" strokeOpacity="0.4" />

                            {/* Modern Sharp Needle (Digital/Vector style) */}
                            {/* North Pointer (Filled/Highlighted) */}
                            <polygon points="100,25 108,100 100,115 92,100" fill="currentColor" fillOpacity="0.8" stroke="none" />
                            {/* South Pointer (Outline/Hollow) */}
                            <polygon points="100,175 108,100 100,85 92,100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />

                            {/* Center Node */}
                            <circle cx="100" cy="100" r="5" fill="#0f172a" stroke="currentColor" strokeWidth="2" />
                            <circle cx="100" cy="100" r="1.5" fill="currentColor" stroke="none" />
                        `;
    const before = code.substring(0, startIdx);
    const after = code.substring(endIdx);
    fs.writeFileSync('src/components/LandingDetails.jsx', before + newSvgInner + after);
    console.log('Success');
} else {
    console.log('Could not find indices', startIdx, endIdx);
}
