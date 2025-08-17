// Test the navigation override
        function testNavigationOverride() {
            const statusDisplay = document.getElementById('status-display');
            
            // Check if the override is loaded
            if (window.forceNavigate && window.urlMap) {
                statusDisplay.innerHTML = `
                    <div class="status success">
                        ✅ Navigation Override Loaded Successfully!<br>
                        - forceNavigate function: Available<br>
                        - URL Map: ${Object.keys(window.urlMap).length} entries<br>
                        - Current path: ${window.location.pathname}
                    </div>
                `;
            } else {
                statusDisplay.innerHTML = `
                    <div class="status error">
                        ❌ Navigation Override Not Loaded<br>
                        - forceNavigate function: ${window.forceNavigate ? 'Available' : 'Missing'}<br>
                        - URL Map: ${window.urlMap ? 'Available' : 'Missing'}<br>
                        - Current path: ${window.location.pathname}
                    </div>
                `;
            }
        }
        
        // Test manual navigation
        function testManualNavigation() {
            const resultDiv = document.getElementById('manual-nav-result');
            
            if (window.forceNavigate) {
                resultDiv.innerHTML = '<div class="status info">🧪 Testing navigation to /ceynov-x...</div>';
                
                // Test navigation to ceynov-x page
                setTimeout(() => {
                    window.forceNavigate('/ceynov-x');
                }, 1000);
            } else {
                resultDiv.innerHTML = '<div class="status error">❌ forceNavigate function not available</div>';
            }
        }
        
        // Display URL map
        function displayURLMap() {
            const urlMapDisplay = document.getElementById('url-map-display');
            
            if (window.urlMap) {
                const mapEntries = Object.entries(window.urlMap);
                const mapText = mapEntries.map(([key, value]) => `  "${key}" → "${value}"`).join('\n');
                urlMapDisplay.textContent = `URL Map (${mapEntries.length} entries):\n{\n${mapText}\n}`;
            } else {
                urlMapDisplay.textContent = 'URL Map not available';
            }
        }
        
        // Run tests when page loads
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🧪 Navigation test page loaded');
            
            // Wait a bit for scripts to load
            setTimeout(() => {
                testNavigationOverride();
                displayURLMap();
            }, 500);
        });
        
        // Monitor for navigation attempts
        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                const href = e.target.href || e.target.closest('a').href;
                console.log('🎯 Navigation link clicked:', href);
            }
        });