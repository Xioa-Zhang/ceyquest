// Universal Button Connector - Works in both main page and iframe contexts
console.log('🔗 Button Connector Loaded');

function connectButtons() {
    console.log('🔧 Connecting buttons...');
    
    // Check if we're in an iframe or main page
    const isInIframe = window.parent !== window;
    console.log(`🌐 Context: ${isInIframe ? 'Iframe' : 'Main Page'}`);
    
    // Get-Started button containers - Updated to include ALL classes used across pages
    const getStartedContainers = document.querySelectorAll('.framer-kd1pvw-container, .framer-1ym8ku-container, .framer-f1eqkx-container, .framer-1j63q5x-container, .framer-lkqeth-container, .framer-awff8w-container, .framer-8311vo-container, .framer-19vrrx1-container');
    console.log(`🎯 Found ${getStartedContainers.length} Get-Started button containers`);
    
    getStartedContainers.forEach((container, index) => {
        if (!container.hasAttribute('data-get-started-connected')) {
            console.log(`🎯 Connecting Get-Started button ${index + 1} to onboarding...`);
            container.setAttribute('data-get-started-connected', 'true');
            
            // Find the anchor tag within the container
            const anchor = container.querySelector('a');
            if (anchor) {
                // Override the default href behavior
                anchor.addEventListener('click', function(e) {
                    e.preventDefault(); // Prevent default navigation
                    console.log('🚀 Get-Started button clicked - navigating to onboarding');
                    
                    if (isInIframe) {
                        // We're in an iframe - navigate parent window
                        console.log('🔄 In iframe, navigating parent to onboarding');
                        try {
                            window.parent.location.href = '/onboarding';
                        } catch (error) {
                            console.log('❌ Failed to navigate parent, trying fallback');
                            window.parent.location.href = '/';
                        }
                    } else {
                        // We're in main page - try React route first, then fallback
                        console.log('🔄 In main page, trying React route first');
                        try {
                            window.location.href = '/onboarding';
                        } catch (error) {
                            console.log('❌ React route failed, trying fallback');
                            if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
                                window.location.href = '/';
                            } else {
                                console.log('ℹ️ Already on home page, Get-Started action completed');
                            }
                        }
                    }
                });
                
                console.log(`✅ Connected Get-Started button ${index + 1}`);
            } else {
                console.log(`⚠️ No anchor tag found in Get-Started container ${index + 1}`);
            }
        }
    });
    
    // Login button containers - Updated to include ALL classes used across pages
    const loginContainers = document.querySelectorAll('.framer-1sqgmjm-container, .framer-hgltw9-container, .framer-wi6nyj-container, .framer-qhhado-container');
    console.log(`🔐 Found ${loginContainers.length} Login button containers`);
    
    loginContainers.forEach((container, index) => {
        if (!container.hasAttribute('data-login-connected')) {
            console.log(`🔐 Connecting Login button ${index + 1} to login...`);
            container.setAttribute('data-login-connected', 'true');
            
            // Find the anchor tag within the container
            const anchor = container.querySelector('a');
            if (anchor) {
                // Override the default href behavior
                anchor.addEventListener('click', function(e) {
                    e.preventDefault(); // Prevent default navigation
                    console.log('🔐 Login button clicked - navigating to login');
                    
                    if (isInIframe) {
                        // We're in an iframe - navigate parent window
                        console.log('🔄 In iframe, navigating parent to login');
                        try {
                            window.parent.location.href = '/login';
                        } catch (error) {
                            console.log('❌ Failed to navigate parent, trying fallback');
                            window.parent.location.href = '/';
                        }
                    } else {
                        // We're in main page - try React route first, then fallback
                        console.log('🔄 In main page, trying React route first');
                        try {
                            window.location.href = '/login';
                        } catch (error) {
                            console.log('❌ React route failed, trying fallback');
                            if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
                                window.location.href = '/';
                            } else {
                                console.log('ℹ️ Already on home page, Login action completed');
                            }
                        }
                    }
                });
                
                console.log(`✅ Connected Login button ${index + 1}`);
            } else {
                console.log(`⚠️ No anchor tag found in Login container ${index + 1}`);
            }
        }
    });
    
    // Log summary
    if (getStartedContainers.length === 0 && loginContainers.length === 0) {
        console.log('⚠️ No Get-Started or Login buttons found on this page');
        if (isInIframe) {
            console.log('💡 Tip: If you\'re in an iframe, the button connector needs to run inside the iframe, not in the parent window');
        }
    } else {
        console.log(`📊 Summary: ${getStartedContainers.length} Get-Started + ${loginContainers.length} Login buttons found`);
    }
}

// Run immediately
connectButtons();

// Run every 2 seconds to catch any late-loading elements
setInterval(connectButtons, 2000);

// Also run when DOM changes
const observer = new MutationObserver(connectButtons);
observer.observe(document.body, { childList: true, subtree: true });

console.log('✅ Button connector ready');
