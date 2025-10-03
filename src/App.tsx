import { MantineProvider, createTheme, type MantineColorsTuple } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { CartProvider } from './context/CartContext';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';

const greenTheme: MantineColorsTuple = [
  '#f0f9f4', // 0: самый светлый (90% светлее)
  '#e1f3e8', // 1: очень светлый
  '#c4e7d1', // 2: светлый
  '#a4dbb8', // 3: средне-светлый
  '#89d1a2', // 4: средний
  '#76ca94', // 5: основной светлый
  '#6ac78c', // 6: основной
  '#58af79', // 7: основной (адаптированный #54B46A)
  '#4c9c6a', // 8: темный
  '#3d8a5a'  // 9: самый темный
];

const theme = createTheme({
  colors: {
    green: greenTheme,
  },
  primaryColor: 'green',
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <CartProvider>
        <div style={{ minHeight: '100vh' }}>
          <Header />
          <main>
            <Home />
          </main>
        </div>
      </CartProvider>
    </MantineProvider>
  );
}

export default App;