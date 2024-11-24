const INGREDIENT_BUN_TOP = '[data-cy="constructor-bun-top"]';
const INGREDIENT_BUN_BOTTOM = '[data-cy="constructor-bun-bottom"]';
const INGREDIENT_ITEM = '[data-cy="constructor-ingredient"]';
const MODAL = '[data-cy="modal"]';
const MODAL_TITLE = '[data-cy="modal-title"]';
const MODAL_CLOSE = '[data-cy="modal-close"]';
const ORDER_BUTTON = '[data-cy="order-button"]';
const ORDER_NUMBER = '[data-cy="order-number"]';

const INGREDIENTS = {
  bun: '[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]',
  main: '[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]',
  sauce: '[data-cy="ingredient-643d69a5c3f7b9001cfa0942"]'
};

beforeEach(() => {
  cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
  cy.visit('/');
  cy.intercept('/api/orders', { fixture: 'NewOrderData.json' });
  cy.intercept('/api/auth/user', { fixture: 'userData.json' });

  cy.setCookie('accessToken', 'fakeAccessToken');
  cy.window().then((window) => {
    window.localStorage.setItem('refreshToken', 'fakeRefreshToken');
  });
});

afterEach(() => {
  cy.clearCookies();
  cy.window().then((window) => {
    window.localStorage.clear();
  });
});

describe('Конструктор - добавление ингредиентов', () => {
  it('Проверка на добавление булки в конструктор', () => {
    cy.get(INGREDIENTS.bun).as('bun');
    cy.get('@bun').should('exist');
    cy.get('@bun').find('button').click();
    cy.get(INGREDIENT_BUN_TOP)
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get(INGREDIENT_BUN_BOTTOM)
      .contains('Краторная булка N-200i')
      .should('exist');
  });

  it('Проверка на добавление начинки (main) в конструктор', () => {
    cy.get(INGREDIENTS.main).as('main');
    cy.get('@main').should('exist'); // Проверяем наличие начинки
    cy.get('@main').find('button').click(); // Кликаем по кнопке для добавления начинки
    cy.get(INGREDIENT_ITEM)
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist'); // Проверяем, что начинка появилась
  });

  it('Проверка на добавление соуса в конструктор', () => {
    cy.get(INGREDIENTS.sauce).as('sauce');
    cy.get('@sauce').should('exist');
    cy.get('@sauce').find('button').click();
    cy.get(INGREDIENT_ITEM).contains('Соус Spicy-X').should('exist');
  });

  it('Проверка на добавление булок, начинки и соуса в конструктор', () => {
    cy.get(INGREDIENTS.bun).as('bun');
    cy.get(INGREDIENTS.main).as('main');
    cy.get(INGREDIENTS.sauce).as('sauce');

    cy.get('@bun').find('button').click();
    cy.get('@main').find('button').click();
    cy.get('@sauce').find('button').click();

    cy.get(INGREDIENT_BUN_TOP)
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get(INGREDIENT_BUN_BOTTOM)
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get(INGREDIENT_ITEM)
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
    cy.get(INGREDIENT_ITEM).contains('Соус Spicy-X').should('exist');
  });
});

describe('Модальное окно ингредиента', () => {
  it('Открытие модального окна при клике на ингредиент', () => {
    cy.get(INGREDIENTS.main).as('main');
    cy.get('@main').click();
    cy.get(MODAL).should('be.visible');
    cy.get(MODAL_TITLE).contains('Детали ингредиента').should('exist');
  });

  it('Закрытие модального окна при клике на крестик', () => {
    cy.get(INGREDIENTS.main).as('main');
    cy.get('@main').click();
    cy.get(MODAL).should('be.visible');
    cy.get(MODAL_CLOSE).click();
    cy.get(MODAL).should('not.exist');
  });

  it('Закрытие модального окна при клике на оверлей', () => {
    cy.get(INGREDIENTS.main).as('main');
    cy.get('@main').click();
    cy.get(MODAL).should('be.visible');
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get(MODAL).should('not.exist');
  });
});

describe('Создание заказа', () => {
  it('Создание и проверка заказа', () => {
    cy.get(INGREDIENTS.bun).as('bun');
    cy.get(INGREDIENTS.main).as('main');
    cy.get(INGREDIENTS.sauce).as('sauce');

    cy.get('@bun').find('button').click();
    cy.get('@main').find('button').click();
    cy.get('@sauce').find('button').click();

    cy.get(INGREDIENT_BUN_TOP)
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get(INGREDIENT_BUN_BOTTOM)
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get(INGREDIENT_ITEM)
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
    cy.get(INGREDIENT_ITEM).contains('Соус Spicy-X').should('exist');
    cy.get(ORDER_BUTTON).click();
    cy.get(MODAL).should('exist');
    cy.get(ORDER_NUMBER).should('contain', '123');
    cy.get(MODAL_CLOSE).click();
    cy.get(MODAL).should('not.exist');
    cy.get(INGREDIENT_BUN_TOP).should('not.exist');
    cy.get(INGREDIENT_BUN_BOTTOM).should('not.exist');
    cy.get(INGREDIENT_ITEM).contains('Выберите начинку').should('exist');
  });
});
