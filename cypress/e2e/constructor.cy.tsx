beforeEach(() => {
  cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }); // Мокируем запрос к API
  cy.visit('/'); // Переход на главную страницу
  cy.intercept('/api/orders', { fixture: 'NewOrderData.json' });
  cy.intercept('/api/auth/user', { fixture: 'userData.json' }); // // Подставляются моковые токены авторизации.
});

describe('Конструктор - добавление ингредиентов', () => {
  // Протестировано добавление ингредиента из списка в конструктор.
  // Минимальные требования — добавление одного ингредиента, в идеале — добавление булок и добавление начинок.
  it('Проверка на добавление булки в конструктор', () => {
    // Проверяем наличие булки в списке ингредиентов
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]').should('exist');

    // Добавляем булку
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]')
      .find('button')
      .click();

    // Проверяем, что булка появилась в конструкторе
    cy.get('[data-cy="constructor-bun-top"]')
      .contains('Краторная булка N-200i')
      .should('exist'); // Верхняя часть булки
    cy.get('[data-cy="constructor-bun-bottom"]')
      .contains('Краторная булка N-200i')
      .should('exist'); // Нижняя часть булки
  });

  it('Проверка на добавление начинки в конструктор', () => {
    // Проверяем наличие начинки в списке ингредиентов
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]').should('exist');

    // Добавляем начинку
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]')
      .find('button')
      .click();

    // Проверяем, что начинка появилась в конструкторе
    cy.get('[data-cy="constructor-ingredient"]')
      .contains('Биокотлета из марсианской Магнолии') // Используй реальное имя начинки
      .should('exist');
  });

  it('Проверка на добавление соуса в конструктор', () => {
    // Проверяем наличие соуса в списке ингредиентов
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0942"]').should('exist');

    // Добавляем соус
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0942"]')
      .find('button')
      .click();

    // Проверяем, что соус появился в конструкторе
    cy.get('[data-cy="constructor-ingredient"]')
      .contains('Соус Spicy-X') // Используй реальное имя соуса
      .should('exist');
  });

  it('Проверка на добавление булок, начинки и соуса в конструктор', () => {
    // Добавляем булку
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]')
      .find('button')
      .click();

    // Добавляем начинку
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]')
      .find('button')
      .click();

    // Добавляем соус
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0942"]')
      .find('button')
      .click();

    // Проверяем, что все элементы появились в конструкторе
    cy.get('[data-cy="constructor-bun-top"]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy="constructor-bun-bottom"]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy="constructor-ingredient"]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
    cy.get('[data-cy="constructor-ingredient"]')
      .contains('Соус Spicy-X')
      .should('exist');
  });
});

// Протестирована работа модальных окон:
// открытие модального окна ингредиента;
// закрытие по клику на крестик;
// закрытие по клику на оверлей (желательно);

describe('Модальное окно ингредиента', () => {
  it('Открытие модального окна при клике на ингредиент', () => {
    // Находим первый ингредиент и кликаем по нему
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]').click();

    // Проверяем, что модальное окно открыто
    cy.get('[data-cy="modal"]').should('be.visible');

    // Проверяем текст заголовка модального окна
    cy.get('[data-cy="modal-title"]')
      .contains('Детали ингредиента')
      .should('exist');
  });

  it('Закрытие модального окна при клике на крестик', () => {
    // Открываем модальное окно
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]').click();

    // Проверяем, что модальное окно открыто
    cy.get('[data-cy="modal"]').should('be.visible');

    // Кликаем на крестик
    cy.get('[data-cy="modal-close"]').click();

    // Проверяем, что модальное окно закрыто
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('Закрытие модального окна при клике на оверлей', () => {
    // Открываем модальное окно
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]').click();

    // Проверяем, что модальное окно открыто
    cy.get('[data-cy="modal"]').should('be.visible');

    // Кликаем на оверлей
    cy.get('[data-cy="modal-overlay"]').click({ force: true });

    // Проверяем, что модальное окно закрыто
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});

// // Создание заказа:
// // Собирается бургер.
// // Вызывается клик по кнопке «Оформить заказ».
// // Проверяется, что модальное окно открылось и номер заказа верный.
// // Закрывается модальное окно и проверяется успешность закрытия.
// // Проверяется, что конструктор пуст.

describe('Создание заказа', () => {
  it('Создание и проверка заказа', () => {
    // Проверяем, что ингредиенты отображаются
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]').should('exist');
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]').should('exist');

    // Кликаем по кнопке "Добавить" на ингредиенте
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]')
      .find('button')
      .click();

    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]')
      .find('button')
      .click();

    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0942"]')
      .find('button')
      .click();

    // Проверяем, что ингредиенты добавлены в конструктор
    cy.get('[data-cy="constructor-bun-top"]')
      .contains('Краторная булка N-200i')
      .should('exist'); // Верхняя часть булки
    cy.get('[data-cy="constructor-bun-bottom"]')
      .contains('Краторная булка N-200i')
      .should('exist'); // Нижняя часть булки
    cy.get('[data-cy="constructor-ingredient"]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist'); // Начинка
    cy.get('[data-cy="constructor-ingredient"]')
      .contains('Соус Spicy-X')
      .should('exist'); // Соус
    // Кликаем по кнопке "Оформить заказ"
    cy.get('[data-cy="order-button"]').click();

    // Проверяем, что открылось модальное окно с номером заказа
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="order-number"]').should('contain', '123');

    // Закрываем модальное окно
    cy.get('[data-cy="modal-close"]').click();

    // Проверяем, что модальное окно закрыто
    cy.get('[data-cy="modal"]').should('not.exist');

    // Проверяем, что конструктор пуст
    cy.get('[data-cy="constructor-bun-top"]').should('not.exist'); // Верхняя булка не должна быть отображена

    cy.get('[data-cy="constructor-bun-bottom"]').should('not.exist'); // Нижняя булка не должна быть отображена

    // Проверяем, что начинка не отображается
    cy.get('[data-cy="constructor-ingredient"]')
      .contains('Выберите начинку')
      .should('exist'); // Сообщение "Выберите начинку" должно быть отображено
  });
});
