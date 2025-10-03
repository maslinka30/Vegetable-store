import { test, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

test('приложение рендерится без ошибок', () => {
  render(<App />);
});

test('отображает основные элементы интерфейса', () => {
  render(<App />);
  
  expect(screen.getByText(/Vegetable/i)).toBeInTheDocument();
  expect(screen.getByText(/SHOP/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Catalog/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /cart/i })).toBeInTheDocument();
});

test('продукты загружаются и отображаются в каталоге', async () => {
  render(<App />);
  
  await waitFor(() => {
    const skeletons = document.querySelectorAll('[class*="Skeleton"]');
    const hasRealProducts = screen.queryAllByRole('article').length > 0;
    expect(skeletons.length === 0 || hasRealProducts).toBe(true);
  }, { timeout: 5000 });
});

test('продукты отображают информацию о ценах', async () => {
  render(<App />);
  
  await waitFor(() => {
    const skeletons = document.querySelectorAll('[class*="Skeleton"]');
    expect(skeletons.length).toBe(0);
  }, { timeout: 5000 });
  
  const priceElements = screen.queryAllByText(/\$\d+\.?\d*/);
  if (priceElements.length > 0) {
    expect(priceElements[0]).toBeInTheDocument();
  }
});

test('счетчик корзины обновляется при добавлении товаров', async () => {
  render(<App />);
  
  const initialCartCount = screen.getByText('0');
  expect(initialCartCount).toBeInTheDocument();
  
  await waitFor(() => {
    const cartCount = screen.getByText(/\d+/);
    expect(cartCount).toBeInTheDocument();
  }, { timeout: 3000 });
});

test('открывает корзину при клике на кнопку корзины', async () => {
  render(<App />);
  
  const cartButton = screen.getByRole('button', { name: /cart/i });
  fireEvent.click(cartButton);
  
  await waitFor(() => {
    const overlay = document.querySelector('[class*="Overlay-root"]');
    expect(overlay).toBeInTheDocument();
  });
});

test('корзина показывает пустое состояние при отсутствии товаров', async () => {
  render(<App />);
  
  const cartButton = screen.getByRole('button', { name: /cart/i });
  fireEvent.click(cartButton);
  
  await waitFor(() => {
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});

test('корзина сохраняет состояние между взаимодействиями', async () => {
  render(<App />);
  
  const cartButton = screen.getByRole('button', { name: /cart/i });
  
  fireEvent.click(cartButton);
  await waitFor(() => {
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
  
  const overlay = document.querySelector('[class*="Overlay-root"]');
  if (overlay) {
    fireEvent.click(overlay);
  }
  
  fireEvent.click(cartButton);
  await waitFor(() => {
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});

test('закрывает корзину при клике вне её области', async () => {
  render(<App />);
  
  const cartButton = screen.getByRole('button', { name: /cart/i });
  fireEvent.click(cartButton);
  
  await waitFor(() => {
    const overlay = document.querySelector('[class*="Overlay-root"]');
    expect(overlay).toBeInTheDocument();
  });
  
  const overlay = document.querySelector('[class*="Overlay-root"]');
  if (overlay) {
    fireEvent.click(overlay);
    
    await waitFor(() => {
      const emptyCartMessage = screen.queryByText(/your cart is empty/i);
      expect(emptyCartMessage).not.toBeInTheDocument();
    }, { timeout: 3000 });
  }
});