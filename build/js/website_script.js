document.addEventListener("DOMContentLoaded", function () {
    var width = document.body.clientWidth;
    var offset = 0;
    if (width <= 992) {
        offset = 130;
    } else {
        offset = 160;
    }
    var final_scroll_to = "";

    // Scroll event to scroll to the clicked menu link.
    document.querySelectorAll(".scrolling_tabs").forEach(function (tab) {
        tab.addEventListener("click", function (e) {
            if (window.innerWidth < 540) {
                // Execute the script
                var catTabSlider = document.querySelector(".cat_tab_slider");
                if (catTabSlider) {
                    catTabSlider.style.visibility = "hidden";
                    catTabSlider.style.opacity = "0";
                }
            }
            e.preventDefault();
            var width = document.body.clientWidth;
            var offset = 0;
            if (width <= 992) {
                offset = 130;
            } else {
                offset = 160;
            }

            var tab_name = this.getAttribute("href");
            tab_name = tab_name.toLowerCase();

            final_scroll_to = tab_name;
            var target = document.querySelector(tab_name);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: "smooth"
                });
            }
            document.querySelectorAll(".scrolling_tabs").forEach(function (tab) {
                tab.classList.remove("active");
            });
            if (!this.classList.contains("active")) {
                this.classList.add("active");
            }
        });
    });

    // Bind scroll end event to scroll to the active tab
    (function () {
        var timer;
        window.addEventListener("scroll", function () {
            clearTimeout(timer);
            timer = setTimeout(refresh, 500);
        });

        var refresh = function () {
            // Get the current scroll position
            var scrollPosition = window.scrollY;

            // Check the last scrolled position for active tab
            document.querySelectorAll('.shop_product_list_parent > div').forEach(function (section) {
                // Get the ID and position of the section
                var sectionID = section.getAttribute('id');
                var sectionText = section.querySelector(".category_name")?.textContent;

                var sectionTop = section.offsetTop - (offset + 100);
                var sectionBottom = sectionTop + section.offsetHeight;

                // Check if the section is visible within the viewport
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    if (final_scroll_to !== 'All') {
                        // Remove active class from all tab links
                        document.querySelectorAll('.scrolling_tabs').forEach(function (tab) {
                            tab.classList.remove('active');
                        });

                        // Add active class to the corresponding tab link
                        var activeTabLink = document.querySelector('.scrolling_tabs[href="#' + sectionID + '"]');
                        if (activeTabLink) {
                            activeTabLink.classList.add("active");
                        }
                        if (document.querySelector(".mobile_category_parent a")) {
                            document.querySelector(".mobile_category_parent a").textContent = sectionText;
                        }
                    }
                }
            });

            // Make the final tab active
            var finalTab = document.querySelector('.scrolling_tabs[href="#' + final_scroll_to + '"]');
            if (finalTab) {
                finalTab.classList.add("active");
            }
            final_scroll_to = "";
            var activeTab = document.querySelector(".scrolling_tabs.active");

            if (activeTab) {
                // Calculate the scroll offset based on the active tab's position
                var containerWidth = document.querySelector(".cat_tab_slider").offsetWidth;
                var scrollOffset = 0;

                if (activeTab.offsetLeft > containerWidth / 2) {
                    scrollOffset = activeTab.offsetLeft - containerWidth / 2 + activeTab.offsetWidth / 2;
                }

                // Calculate the maximum scroll offset to prevent getting stuck at the window end
                var maxScrollOffset = document.querySelector(".cat_tab_slider").scrollWidth - containerWidth;
                scrollOffset = Math.min(scrollOffset, maxScrollOffset);

                // Scroll the tab container to the calculated offset with respect to active tab
                document.querySelector(".cat_tab_slider").scroll({
                    left: scrollOffset,
                    behavior: "smooth"
                });
            }
        };
    })();
});

function updateSliderPosition() {
    var header = document.querySelector(".desk_header");
    var categorySlider = document.querySelector(".cat_tab_slider_main");
    if (header && categorySlider) {
        // Get the height of the header
        var headerHeight = header.offsetHeight;

        // Set the top style of the category slider
        categorySlider.style.top = headerHeight + "px";
    }
}

// Run the function on load and resize events
window.addEventListener("load", updateSliderPosition);
window.addEventListener("resize", updateSliderPosition);
