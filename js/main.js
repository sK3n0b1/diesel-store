// Dropdown menu
document.addEventListener("DOMContentLoaded", function () {
	const dropdowns = document.querySelectorAll(".header__nav-item.dropdown");

	dropdowns.forEach(function (dropdown) {
		dropdown
			.querySelector(".dropdown__toggle")
			.addEventListener("click", function (e) {
				e.preventDefault();
				const menu = dropdown.querySelector(".dropdown__menu");
				menu.style.display =
					menu.style.display === "block" ? "none" : "block";
			});
	});

	document.addEventListener("click", function (e) {
		dropdowns.forEach(function (dropdown) {
			const menu = dropdown.querySelector(".dropdown__menu");
			if (!dropdown.contains(e.target)) {
				menu.style.display = "none";
			}
		});
	});
});

// Burger
document.addEventListener("DOMContentLoaded", () => {
	// Управление бургер-меню
	const burgerIcon = document.querySelector(".burger-icon");
	const burgerMenu = document.querySelector(".burger-menu__nav");
	const body = document.body;

	function toggleMenu() {
		burgerMenu.classList.toggle("active");
		body.classList.toggle("menu-open"); // Чтобы запретить скроллинг при открытом меню
	}

	function closeMenu(event) {
		if (
			!burgerMenu.contains(event.target) &&
			!burgerIcon.contains(event.target)
		) {
			burgerMenu.classList.remove("active");
			body.classList.remove("menu-open");

			// Закрываем все аккордеоны при закрытии бургер-меню
			document.querySelectorAll(".burger-menu__item").forEach((item) => {
				item.classList.remove("open", "is-open");
				const dropdown = item.querySelector(".burger-menu-dropdown__list");
				if (dropdown) dropdown.style.maxHeight = null;
			});
		}
	}

	burgerIcon.addEventListener("click", (e) => {
		e.preventDefault(); // Предотвращение перехода по ссылке
		toggleMenu();
	});

	document.addEventListener("click", closeMenu);

	// Управление аккордеоном и поворотом иконок
	const toggles = document.querySelectorAll(".burger-menu__item");

	toggles.forEach((item) => {
		const link = item.querySelector(".burger-menu__link");
		const dropdown = item.querySelector(".burger-menu-dropdown__list");

		link.addEventListener("click", (event) => {
			event.preventDefault(); // Предотвращение перехода по ссылке

			// Закрываем все другие открытые меню
			toggles.forEach((otherItem) => {
				if (otherItem !== item) {
					otherItem.classList.remove("open", "is-open");
					const otherDropdown = otherItem.querySelector(
						".burger-menu-dropdown__list"
					);
					if (otherDropdown) otherDropdown.style.maxHeight = null;
				}
			});

			// Переключение текущего меню
			if (dropdown && dropdown.style.maxHeight) {
				dropdown.style.maxHeight = null; // Скрыть, если уже открыто
				item.classList.remove("open", "is-open"); // Убираем классы
			} else {
				if (dropdown)
					dropdown.style.maxHeight = dropdown.scrollHeight + "px"; // Открыть
				item.classList.add("open", "is-open"); // Добавляем классы
			}
		});
	});

	// Скрытие меню при ширине окна больше 992px
	const mediaQuery = window.matchMedia("(min-width: 992px)");

	function handleMediaQueryChange(e) {
		if (e.matches) {
			// Закрыть бургер-меню
			burgerMenu.classList.remove("active");
			body.classList.remove("menu-open");

			// Закрыть все аккордеоны
			toggles.forEach((item) => {
				item.classList.remove("open", "is-open");
				const dropdown = item.querySelector(".burger-menu-dropdown__list");
				if (dropdown) dropdown.style.maxHeight = null;
			});
		}
	}

	// Слушатель изменений ширины экрана
	mediaQuery.addEventListener("change", handleMediaQueryChange);

	// Выполнить проверку при загрузке страницы
	handleMediaQueryChange(mediaQuery);
});



// Contact section 

document.addEventListener("DOMContentLoaded", () => {
    const contactCall = document.querySelector(".contact__call");
    const contactPromotion = document.querySelector(".contact__promotion");
    const contactDescr = document.querySelector(".contact__descr");
    const contactButton = document.querySelector(".contact__button");
    const contactInner = document.querySelector(".contact__inner");

    function rearrangeElements() {
        if (window.innerWidth <= 768) {
            if (!contactDescr.nextElementSibling || !contactDescr.nextElementSibling.classList.contains("contact__promotion")) {
                contactDescr.after(contactPromotion);
            }
        } else {
            if (contactInner.lastElementChild !== contactPromotion) {
                contactInner.append(contactPromotion);
            }
        }
    }

    rearrangeElements(); // Первоначальная проверка

    window.addEventListener("resize", rearrangeElements); // Динамическая обработка изменения ширины
});


// Accordion question

document
	.querySelectorAll(".question__accordion__item-title")
	.forEach((title) => {
		title.style.display = "flex";
		title.style.alignItems = "center";
		title.style.justifyContent = "space-between";
		title.style.flexWrap = "nowrap"; // Запрещаем перенос элементов

		const svgIconWrapper = document.createElement("div");
		svgIconWrapper.style.cssText = `
      width: 50px;
      height: 50px;
      background-color: #1b1917;
      border-radius: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0; /* Запрещаем сжатие */
      margin-left: 10px; /* Отступ между текстом и иконкой */
      transition: transform 0.3s ease, color 0.3s ease;
    `;
		svgIconWrapper.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 14.5L14.5 1.5M14.5 1.5V13.98M14.5 1.5H2.02" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    `;
		title.appendChild(svgIconWrapper);

		title.addEventListener("click", () => {
			const parent = title.parentElement;
			const content = parent.querySelector(
				".question__accordion__item-descr"
			);

			if (parent.classList.contains("open")) {
				closeAccordion(parent, content, svgIconWrapper, title);
			} else {
				document
					.querySelectorAll(".question__accordion__item")
					.forEach((item) => {
						if (item !== parent && item.classList.contains("open")) {
							const otherContent = item.querySelector(
								".question__accordion__item-descr"
							);
							const otherTitle = item.querySelector(
								".question__accordion__item-title"
							);
							const otherSvgIcon = otherTitle.querySelector("div");
							closeAccordion(
								item,
								otherContent,
								otherSvgIcon,
								otherTitle
							);
						}
					});

				openAccordion(parent, content, svgIconWrapper, title);
			}
		});
	});

function openAccordion(item, content, svgIconWrapper, title) {
	item.classList.add("open");
	content.style.height = content.scrollHeight + "px";
	title.style.color = "var(--color-orange)";
	svgIconWrapper.style.transform = "rotate(180deg)";
	svgIconWrapper.querySelector("svg path").style.stroke =
		"var(--color-orange)";
}

function closeAccordion(item, content, svgIconWrapper, title) {
	content.style.height = content.scrollHeight + "px";
	requestAnimationFrame(() => {
		content.style.height = "0";
	});
	item.classList.remove("open");
	title.style.color = "";
	svgIconWrapper.style.transform = "rotate(0deg)";
	svgIconWrapper.querySelector("svg path").style.stroke = "white";
}

document
	.querySelectorAll(".question__accordion__item-descr")
	.forEach((content) => {
		content.addEventListener("transitionend", () => {
			if (!content.parentElement.classList.contains("open")) {
				content.style.height = "";
			}
		});
	});


	// Popup callback

// Popup callback

document.addEventListener("DOMContentLoaded", () => {
    const popupOverlay = document.querySelector(".custom-overlay-wrapper");
    const closeButton = document.querySelector(".custom-popup-close");
    const openButtons = document.querySelectorAll(".trigger-custom-popup"); // Все кнопки с этим классом

    // Открытие popup
    const openPopup = () => {
        popupOverlay.classList.add("active");
    };

    // Закрытие popup
    const closePopup = () => {
        popupOverlay.classList.remove("active");
    };

    // Привязка событий к кнопкам открытия
    openButtons.forEach((button) => {
        button.addEventListener("click", openPopup);
    });

    // Привязка события к кнопке закрытия
    closeButton.addEventListener("click", closePopup);

    // Закрытие при клике на фон
    popupOverlay.addEventListener("click", (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
});


// Popup

document.addEventListener("DOMContentLoaded", () => {
	const popupWrapper = document.querySelector(".popup-wrapper");
	const openPopupBtn = document.querySelector(".open-popup");
	const closePopupBtn = document.querySelector(".popup-close");

	// Проверяем, закрыто ли окно
	const isPopupClosed = localStorage.getItem("popupClosed") === "true";

	if (!isPopupClosed) {
		popupWrapper.classList.add("active"); // Показываем окно
		document.body.classList.add("no-scroll"); // Блокируем прокрутку
		localStorage.setItem("popupOpened", "true"); // Устанавливаем флаг открытого окна
	}

	// Функция для открытия окна
	const openPopup = (event) => {
		if (event) event.preventDefault(); // Предотвращаем стандартное поведение
		popupWrapper.classList.add("active");
		document.body.classList.add("no-scroll"); // Блокируем прокрутку
		localStorage.setItem("popupOpened", "true"); // Устанавливаем флаг открытого окна
		localStorage.removeItem("popupClosed");
	};

	// Функция для закрытия окна
	const closePopup = (event) => {
		if (event) event.preventDefault(); // Предотвращаем стандартное поведение
		popupWrapper.classList.remove("active");
		document.body.classList.remove("no-scroll"); // Разрешаем прокрутку
		localStorage.setItem("popupClosed", "true");
		localStorage.removeItem("popupOpened"); // Убираем флаг открытого окна
	};

	// Добавляем события на кнопки открытия и закрытия
	if (openPopupBtn) {
		openPopupBtn.addEventListener("click", openPopup);
	}

	if (closePopupBtn) {
		closePopupBtn.addEventListener("click", closePopup);
	}

	// Закрытие окна при клике на фон
	if (popupWrapper) {
		popupWrapper.addEventListener("click", (event) => {
			if (event.target === popupWrapper) {
				closePopup(event);
			}
		});
	}

	// При перезагрузке страницы проверяем флаг popupOpened и закрываем окно
	if (localStorage.getItem("popupOpened") === "true") {
		closePopup(); // Закрываем окно и сбрасываем флаг
	}
});




// Category ***************************************************************************************************************************

document.addEventListener("DOMContentLoaded", function () {
    // Функция для перестановки элементов
    function rearrangeAdvertisement() {
        const advertisement = document.querySelector(".advertisement");
        const callElement = advertisement.querySelector(".advertisement__call");
        const imagesElement = advertisement.querySelector(".advertisement__images");
        const buttonElement = callElement.querySelector(".advertisement__button");
        const descrElement = callElement.querySelector(".advertisement__descr");

        if (window.innerWidth <= 768) {
            // Если ширина экрана 768px или меньше, вставляем изображения между кнопкой и описанием
            if (!descrElement.previousElementSibling || descrElement.previousElementSibling !== imagesElement) {
                descrElement.parentNode.insertBefore(imagesElement, descrElement);
            }
        } else {
            // Если ширина экрана больше 768px, возвращаем изображения в исходное место
            const advertisementInner = advertisement.querySelector(".advertisement__inner");
            if (!advertisementInner.lastElementChild || advertisementInner.lastElementChild !== imagesElement) {
                advertisementInner.appendChild(imagesElement);
            }
        }
    }

    // Вызываем функцию при загрузке страницы
    rearrangeAdvertisement();

    // Добавляем обработчик события для изменения размера окна
    window.addEventListener("resize", rearrangeAdvertisement);
});



// Products

document.addEventListener("DOMContentLoaded", () => {
    const sidebarLinks = document.querySelectorAll(".products__sidebar-link");
    const productSections = document.querySelectorAll("[data-category]");

    // Добавляем классы скрытия для всех секций
    productSections.forEach(section => {
        if (section.classList.contains("products__grid") || section.classList.contains("products__title")) {
            section.classList.add("hidden");
        }
    });

    // Обновляем счетчики товаров в сайдбаре
    sidebarLinks.forEach(link => {
        const targetCategory = link.getAttribute("data-target");
        const items = document.querySelectorAll(`[data-category="${targetCategory}"] .products__item`);
        const itemCount = items.length;

        // Создаем отдельный элемент для счётчика
        if (itemCount > 0) {
            const counter = document.createElement("span");
            counter.classList.add("products__sidebar-counter");
            counter.textContent = itemCount;
            link.appendChild(counter);
        }
    });

    // Обработчик клика по ссылке
    sidebarLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const targetCategory = link.getAttribute("data-target");

            // Скрываем все секции товаров
            productSections.forEach(section => {
                section.classList.add("hidden");
            });

            // Показываем секции, соответствующие выбранной категории
            const activeSections = document.querySelectorAll(`[data-category="${targetCategory}"]`);
            activeSections.forEach(section => {
                section.classList.remove("hidden");
            });
        });
    });

    // Инициализация: показываем первую категорию по умолчанию
    if (sidebarLinks.length > 0) {
        const initialCategory = sidebarLinks[0].getAttribute("data-target");
        const initialSections = document.querySelectorAll(`[data-category="${initialCategory}"]`);
        initialSections.forEach(section => {
            section.classList.remove("hidden");
        });
    }
});





// Menu sidebar mob


document.addEventListener("DOMContentLoaded", () => {
    const select = document.querySelector(".products__sidebar-select");
    const current = select.querySelector(".products__sidebar-current");
    const options = select.querySelector(".products__sidebar-options");
    const arrow = current.querySelector(".products__arrow");

    // Устанавливаем изначально выбранный текст
    const initializeCurrentText = () => {
        let firstOption = options.querySelector(".products__sidebar-link");
        if (firstOption) {
            const selectedText = firstOption.textContent.replace(/\d+$/, '').trim(); // Убираем счётчик
            let textElement = current.querySelector(".current-text");
            if (!textElement) {
                textElement = document.createElement("span");
                textElement.classList.add("current-text");
                current.insertBefore(textElement, arrow);
            }
            textElement.textContent = selectedText;
        }
    };
    initializeCurrentText();

    // Открытие/закрытие меню
    current.addEventListener("click", () => {
        select.classList.toggle("open");
    });

    // Выбор элемента из списка
    options.addEventListener("click", (event) => {
        const link = event.target.closest(".products__sidebar-link");
        if (link) {
            event.preventDefault();
            const targetCategory = link.getAttribute("data-target");
            const selectedText = link.textContent.replace(/\d+$/, '').trim(); // Убираем счётчик

            // Устанавливаем текст выбранной категории
            let textElement = current.querySelector(".current-text");
            if (!textElement) {
                textElement = document.createElement("span");
                textElement.classList.add("current-text");
                current.insertBefore(textElement, arrow);
            }
            textElement.textContent = selectedText;

            // Закрываем меню
            setTimeout(() => {
                select.classList.remove("open");
            }, 100);

            // Дополнительная логика отображения категорий
            const productSections = document.querySelectorAll("[data-category]");
            productSections.forEach(section => {
                section.classList.add("hidden");
            });

            const activeSections = document.querySelectorAll(`[data-category="${targetCategory}"]`);
            activeSections.forEach(section => {
                section.classList.remove("hidden");
            });
        }
    });

    // Закрытие меню при клике вне его
    document.addEventListener("click", (event) => {
        if (!select.contains(event.target)) {
            select.classList.remove("open");
        }
    });
});



















document.addEventListener('DOMContentLoaded', function () {
    const decreaseButtons = document.querySelectorAll('.quantity__button--decrease');
    const increaseButtons = document.querySelectorAll('.quantity__button--increase');

    decreaseButtons.forEach(button => {
        button.addEventListener('click', function () {
            const input = this.nextElementSibling;
            const value = parseInt(input.value, 10) || 0;
            input.value = Math.max(value - 1, input.min || 0);
        });
    });

    increaseButtons.forEach(button => {
        button.addEventListener('click', function () {
            const input = this.previousElementSibling;
            const value = parseInt(input.value, 10) || 0;
            input.value = value + 1;
        });
    });
});

