const setActiveClass = (elements, activeElement, className = "active") => {
      elements.forEach((element) => {
        const isActive = element === activeElement;
        element.classList.toggle(className, isActive);

        if (element.matches("[aria-selected]")) {
          element.setAttribute("aria-selected", String(isActive));
        }
      });
    };

    const sectionTabs = document.querySelectorAll(".section-tab");
    sectionTabs.forEach((tab) => {
      tab.addEventListener("click", () => setActiveClass(sectionTabs, tab));
    });

    const clubButtons = document.querySelectorAll(".club-btn");
    clubButtons.forEach((button) => {
      button.addEventListener("click", () => setActiveClass(clubButtons, button));
    });

    const navLinks = document.querySelectorAll(".nav-links li");
    navLinks.forEach((item) => {
      const link = item.querySelector("a");
      link.addEventListener("click", (event) => {
        event.preventDefault();
        setActiveClass(navLinks, item);
      });
    });
